"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_RIPPLES = 6;

const BELLY = { cx: 0.369, cy: 0.32, rx: 0.075, ry: 0.07, yMax: 0.39 };
const CUTOFF_Y = 0.293;
const CUTOFF_X3 = 0.46;
const MARKER_X = 0.453;
const MARKER_Y = 0.305;
const DIAG_DX = MARKER_X - (BELLY.cx + BELLY.rx);
const DIAG_DY = MARKER_Y - CUTOFF_Y;
const JIGGLE_LEFT = 0.12;
const JIGGLE_RIGHT = 0.71;

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
uniform float     uCutoffY;
uniform float     uCutoffX3;
uniform float     uDiagDx;
uniform float     uDiagDy;
uniform float     uJiggleLeft;
uniform float     uJiggleRight;
uniform float     uJiggleDuration;
uniform float     uMaxAge;

varying vec2 vUv;

float dogMask(vec2 uv) {
  vec4  c      = texture2D(uTexture, clamp(uv, 0.001, 0.999));
  float warmth = c.r - c.b;
  return smoothstep(-0.08, 0.18, warmth);
}

float bellyMask(vec2 uv) {
  if (uv.y > uBellyYMax) return 0.0;
  float rightEdge = uBellyC.x + uBellyRad.x;
  float cross = uDiagDx * (uv.y - uCutoffY) - uDiagDy * (uv.x - rightEdge);
  if (cross < 0.0) return 0.0;
  float edgeFade = 1.0;
  edgeFade *= smoothstep(uJiggleLeft - 0.04, uJiggleLeft + 0.04, uv.x);
  edgeFade *= 1.0 - smoothstep(uJiggleRight - 0.04, uJiggleRight + 0.04, uv.x);
  if (uv.x > rightEdge)
    edgeFade *= smoothstep(uCutoffY - 0.01, uCutoffY + 0.01, uv.y);
  if (uv.x > uCutoffX3)
    edgeFade *= smoothstep(uBellyC.y - 0.01, uBellyC.y + 0.01, uv.y);
  vec2  d     = (uv - uBellyC) / uBellyRad;
  float yFade = smoothstep(uBellyYMax, uBellyYMax - 0.06, uv.y);
  return smoothstep(1.1, 0.0, length(d)) * yFade * dogMask(uv) * edgeFade;
}

void main() {
  vec2 disp = vec2(0.0);

  for (int i = 0; i < 6; i++) {
    float t0 = uRipples[i].z;
    if (t0 < 0.0) continue;

    float age  = uTime - t0;
    if (age > uMaxAge) continue;

    vec2  ctr  = uRipples[i].xy;
    float jStr = uRipples[i].w;

    vec2  diff = vUv - ctr;
    diff.x    *= uAspect;
    float dist = length(diff);

    float ease = 1.0 - smoothstep(0.0, uJiggleDuration, age);
    float decay = ease * exp(-dist * 4.5);
    float wave  = sin(dist * 38.0 - age * 14.0) * 0.016 * decay;

    if (dist > 0.001) {
      vec2 dir  = diff / dist;
      dir.x    /= uAspect;
      disp     += dir * wave;
    }

    if (jStr > 0.0) {
      float rightEdge  = uBellyC.x + uBellyRad.x;
      float edgeFadeX  = smoothstep(rightEdge - 0.01, rightEdge, vUv.x);
      float edgeFadeX3 = smoothstep(uCutoffX3 - 0.01, uCutoffX3, vUv.x)
                        * step(vUv.y, uBellyC.y);
      float edgeMask   = bellyMask(vUv) * (1.0 - edgeFadeX) * (1.0 - edgeFadeX3);

      float squish = sin(age * 22.0) * ease * jStr * 0.011 * edgeMask;
      disp.y += squish;
      disp.x += squish * 0.25;
    }
  }

  float bellyBottom = uBellyC.y - uBellyRad.y;
  float bottomCut   = smoothstep(bellyBottom - 0.04, bellyBottom, vUv.y);
  float mask = dogMask(vUv) * mix(bellyMask(vUv), 1.0, bottomCut);
  float rightEdge = uBellyC.x + uBellyRad.x;
  if (vUv.x > rightEdge)
    mask *= smoothstep(uCutoffY - 0.01, uCutoffY + 0.01, vUv.y);
  if (vUv.x > uCutoffX3)
    mask *= smoothstep(uBellyC.y - 0.01, uBellyC.y + 0.01, vUv.y);
  mask *= smoothstep(uJiggleLeft - 0.04, uJiggleLeft + 0.04, vUv.x);
  mask *= 1.0 - smoothstep(uJiggleRight - 0.04, uJiggleRight + 0.04, vUv.x);
  vec2  uv   = vUv + disp * mask;

  gl_FragColor = texture2D(uTexture, clamp(uv, 0.001, 0.999));
}
`;

interface BulldogBellyProps {
  src: string;
  jiggleDuration?: number;
  style?: React.CSSProperties;
}

export default function BulldogBelly({ src, jiggleDuration = 1, style }: BulldogBellyProps) {
  const mountRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
  const durationRef = useRef(jiggleDuration);
  durationRef.current = jiggleDuration;

  useEffect(() => {
    const el = mountRef.current;
    if (!el || !src) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
	    renderer.setClearColor(0x000000, 0);
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
      uCutoffY: { value: CUTOFF_Y },
      uCutoffX3: { value: CUTOFF_X3 },
      uDiagDx: { value: DIAG_DX },
      uDiagDy: { value: DIAG_DY },
      uJiggleLeft: { value: JIGGLE_LEFT },
      uJiggleRight: { value: JIGGLE_RIGHT },
      uJiggleDuration: { value: jiggleDuration },
      uMaxAge: { value: jiggleDuration },
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
	    let firstFrame = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dur = durationRef.current;
      const oldDur = uniforms.uJiggleDuration.value;
      if (dur !== oldDur) {
        for (let i = 0; i < MAX_RIPPLES; i++) {
          const t0 = ripples[i].z;
          if (t0 >= 0 && dur < oldDur) {
            const age = clock.getElapsedTime() - t0;
            ripples[i].z = Math.max(0, clock.getElapsedTime() - Math.min(age / oldDur, 1.0) * dur);
          }
        }
        uniforms.uJiggleDuration.value = dur;
        uniforms.uMaxAge.value = dur;
      }
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
	      if (!firstFrame && uniforms.uTexture.value) {
	        firstFrame = true;
	        if (imgRef.current) imgRef.current.style.opacity = '0';
	      }
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

      for (let i = 0; i < MAX_RIPPLES; i++) ripples[i].z = -1;
      ripples[0].set(uvX, uvY, clock.getElapsedTime(), jStr);
      head = 1;
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
      className="w-full rounded-2xl overflow-hidden relative"
      style={{ aspectRatio: "500 / 336", background: "#1a1a1a", ...style }}>
	  <img ref={imgRef} src={src} alt="" className="absolute inset-0 w-full h-full transition-opacity duration-300" />
	</div>
  );
}
