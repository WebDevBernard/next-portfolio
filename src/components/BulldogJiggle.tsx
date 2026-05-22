"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_RIPPLES = 6;

const BELLY = {
  cx: 0.36,
  cy: 0.32,
  rx: 0.11,
  ry: 0.07,
  yMax: 0.38,
};

const vert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const frag = `
precision highp float;

uniform sampler2D uTexture;
uniform float     uTime;
uniform float     uAspect;
uniform vec4      uRipples[6];
uniform vec2      uBellyC;
uniform vec2      uBellyRad;
uniform float     uBellyYMax;

varying vec2 vUv;

// Dog silhouette: warm (cream/tan) vs cool (teal bg)
// Wider smoothstep = softer mask edge = no visible seam
float dogMask(vec2 uv) {
  vec4  c      = texture2D(uTexture, clamp(uv, 0.001, 0.999));
  float warmth = c.r - c.b;
  return smoothstep(-0.08, 0.18, warmth);
}

// Lower-belly zone only — excludes head, chest, legs
float bellyMask(vec2 uv) {
  if (uv.y > uBellyYMax) return 0.0;
  vec2  d     = (uv - uBellyC) / uBellyRad;
  float yFade = smoothstep(uBellyYMax, uBellyYMax - 0.06, uv.y);
  return smoothstep(1.0, 0.0, length(d)) * yFade;
}

void main() {
  // Accumulate all displacement first
  vec2 disp = vec2(0.0);

  for (int i = 0; i < 6; i++) {
    float t0 = uRipples[i].z;
    if (t0 < 0.0) continue;

    float age  = uTime - t0;
    if (age > 2.8) continue;

    vec2  ctr  = uRipples[i].xy;
    float jStr = uRipples[i].w;

    vec2  diff = vUv - ctr;
    diff.x    *= uAspect;
    float dist = length(diff);

    float decay = exp(-age * 1.9) * exp(-dist * 4.5);
    float wave  = sin(dist * 38.0 - age * 14.0) * 0.016 * decay;

    if (dist > 0.001) {
      vec2 dir  = diff / dist;
      dir.x    /= uAspect;
      disp     += dir * wave;
    }

    // Jiggle: belly mask gates it spatially, jStr gates it by click zone
    if (jStr > 0.0) {
      float squish = sin(age * 22.0) * exp(-age * 3.2)
                   * jStr * 0.011 * bellyMask(vUv);
      disp.y += squish;
      disp.x += squish * 0.25;
    }
  }

  // Mask: dog silhouette everywhere, belly zone at the bottom boundary
  float bellyBottom = uBellyC.y - uBellyRad.y;
  float bottomCut   = smoothstep(bellyBottom - 0.04, bellyBottom, vUv.y);
  float mask = dogMask(vUv) * mix(bellyMask(vUv), 1.0, bottomCut);
  vec2  uv   = vUv + disp * mask;

  gl_FragColor = texture2D(uTexture, clamp(uv, 0.001, 0.999));
}
`;

interface BulldogBellyProps {
  src: string;
  style?: React.CSSProperties;
}

export default function BulldogBelly({ src, style }: BulldogBellyProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el || !src) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const ripples = Array.from(
      { length: MAX_RIPPLES },
      () => new THREE.Vector4(0, 0, -1, 0),
    );
    let head = 0;
    const clock = new THREE.Clock();

    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uAspect: { value: el.clientWidth / el.clientHeight },
      uRipples: { value: ripples },
      uBellyC: { value: new THREE.Vector2(BELLY.cx, BELLY.cy) },
      uBellyRad: { value: new THREE.Vector2(BELLY.rx, BELLY.ry) },
      uBellyYMax: { value: BELLY.yMax },
    };

    scene.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms,
          vertexShader: vert,
          fragmentShader: frag,
        }),
      ),
    );

    new THREE.TextureLoader().load(src, (tex) => {
      tex.colorSpace = THREE.LinearSRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      uniforms.uTexture.value = tex;
    });

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    tick();

    const isInBelly = (uvX: number, uvY: number) => {
      if (uvY >= BELLY.yMax) return false;
      const dx = (uvX - BELLY.cx) / BELLY.rx;
      const dy = (uvY - BELLY.cy) / BELLY.ry;
      return Math.sqrt(dx * dx + dy * dy) < 1.0;
    };

    const onClick = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const uvX = (e.clientX - r.left) / r.width;
      const uvY = 1 - (e.clientY - r.top) / r.height;

      if (!isInBelly(uvX, uvY)) return;

      const dx = (uvX - BELLY.cx) / BELLY.rx;
      const dy = (uvY - BELLY.cy) / BELLY.ry;
      const d = Math.sqrt(dx * dx + dy * dy);
      const jStr = (1 - d) * 2.5;

      ripples[head % MAX_RIPPLES].set(uvX, uvY, clock.getElapsedTime(), jStr);
      head++;
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const uvX = (e.clientX - r.left) / r.width;
      const uvY = 1 - (e.clientY - r.top) / r.height;
      el.style.cursor = isInBelly(uvX, uvY) ? "pointer" : "default";
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("click", onClick);

    const obs = new ResizeObserver(() => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      uniforms.uAspect.value = el.clientWidth / el.clientHeight;
    });
    obs.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("click", onClick);
      obs.disconnect();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [src]);

  return (
    <div
      ref={mountRef}
      className="w-full rounded-2xl overflow-hidden"
      style={{ aspectRatio: "500 / 336", background: "#1a1a1a", ...style }}
    />
  );
}
