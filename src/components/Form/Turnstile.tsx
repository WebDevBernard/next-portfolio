"use client";
import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
    __cfTurnstileOnLoad?: () => void;
  }
}

export type TurnstileHandle = {
  reset: () => void;
  execute: () => void;
};

type TurnstileProps = {
  siteKey: string;
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  options?: {
    theme?: "light" | "dark" | "auto";
    size?: "normal" | "flexible" | "compact" | "invisible";
    retry?: "auto" | "never";
    retryInterval?: number;
  };
};

// Module-level state — shared across all instances
type ScriptState = "unloaded" | "loading" | "ready" | "error";
let scriptState: ScriptState = "unloaded";
let resolveLoad: () => void;
let rejectLoad: (err: unknown) => void;
const scriptReady = new Promise<void>((resolve, reject) => {
  resolveLoad = resolve;
  rejectLoad = reject;
  if (scriptState === "ready") resolve();
});

const SCRIPT_ID = "cf-turnstile-script";
const ONLOAD_CB = "__cfTurnstileOnLoad";
const SCRIPT_SRC = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${ONLOAD_CB}`;

function ensureScript() {
  if (scriptState !== "unloaded") return;

  scriptState = "loading";

  // Called by Cloudflare's script when the API is fully initialised
  window[ONLOAD_CB] = () => {
    scriptState = "ready";
    resolveLoad();
    delete window[ONLOAD_CB];
  };

  // Remove any previously failed script tag
  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    existing.remove();
    scriptState = "loading";
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    scriptState = "error";
    rejectLoad(new Error("Turnstile script failed to load"));
  };
  document.head.appendChild(script);
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  function Turnstile({ siteKey, onSuccess, onError, onExpire, options }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [apiReady, setApiReady] = useState(scriptState === "ready");
    const [loadFailed, setLoadFailed] = useState(scriptState === "error");

    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    const onExpireRef = useRef(onExpire);
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onExpireRef.current = onExpire;

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetIdRef.current != null && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
      execute() {
        if (widgetIdRef.current != null && window.turnstile) {
          window.turnstile.execute(widgetIdRef.current);
        }
      },
    }));

    // Effect 1: ensure the script is loading and await the shared promise
    useEffect(() => {
      if (!siteKey) return;
      if (scriptState === "error") {
        // Reset module state so the next mount retries
        scriptState = "unloaded";
        setLoadFailed(false);
      }

      ensureScript();

      let cancelled = false;
      scriptReady
        .then(() => {
          if (!cancelled) setApiReady(true);
        })
        .catch(() => {
          if (!cancelled) setLoadFailed(true);
        });

      return () => {
        cancelled = true;
      };
    }, [siteKey]);

    // Effect 2: render once the API is ready and the DOM is committed
    useEffect(() => {
      if (!apiReady || !siteKey || !containerRef.current || !window.turnstile)
        return;
      if (widgetIdRef.current != null) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: options?.theme ?? "light",
        size: options?.size ?? "flexible",
        retry: options?.retry ?? "auto",
        "retry-interval": options?.retryInterval ?? 3000,
        callback: (token: string) => onSuccessRef.current?.(token),
        "error-callback": () => onErrorRef.current?.(),
        "expired-callback": () => onExpireRef.current?.(),
      });

      return () => {
        if (widgetIdRef.current != null && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [apiReady, siteKey]);

    if (!siteKey) {
      return (
        <div className="text-red-500 text-sm font-semibold">
          Turnstile site key is missing.
        </div>
      );
    }

    if (loadFailed) {
      return (
        <p className="text-sm text-red-500">
          Security check failed to load. Please refresh the page and try again.
        </p>
      );
    }

    return <div ref={containerRef} className="min-h-[65px]" />;
  },
);

export default Turnstile;
