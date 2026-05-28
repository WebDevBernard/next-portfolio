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
      ready: (callback: () => void) => void;
    };
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

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SCRIPT_TIMEOUT = 15_000;

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  function Turnstile({ siteKey, onSuccess, onError, onExpire, options }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [apiReady, setApiReady] = useState(false);
    const [loadFailed, setLoadFailed] = useState(false);

    // Store callbacks in refs so the rendered widget always calls the latest props
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

    // Effect 1: load the script, wait for turnstile.ready()
    useEffect(() => {
      if (!siteKey) return;

      if (window.turnstile) {
        window.turnstile.ready(() => setApiReady(true));
        return;
      }

      let cancelled = false;

      const existing = document.getElementById(SCRIPT_ID);
      if (existing) existing.remove();

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;

      const timeoutId = setTimeout(() => {
        if (!cancelled) setLoadFailed(true);
      }, SCRIPT_TIMEOUT);

      script.onload = () => {
        if (cancelled) return;
        clearTimeout(timeoutId);
        // turnstile.ready() is the canonical way to wait for full init —
        // window.turnstile can exist before the API is actually usable
        if (window.turnstile) {
          window.turnstile.ready(() => {
            if (!cancelled) setApiReady(true);
          });
        }
      };
      script.onerror = () => {
        if (!cancelled) {
          clearTimeout(timeoutId);
          setLoadFailed(true);
        }
      };
      document.head.appendChild(script);

      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
      };
    }, [siteKey]);

    // Effect 2: render the widget once the API is ready
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
        "timeout-callback": () => {
          // Reset widget so user can retry the interactive challenge
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        },
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

    return <div ref={containerRef} />;
  },
);

export default Turnstile;
