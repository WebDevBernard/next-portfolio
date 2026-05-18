import { useState, useCallback, useRef } from "react";
import type { TurnstileHandle } from "@/components/Form/Turnstile";

export function useTurnstile() {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const widgetRef = useRef<TurnstileHandle>(null);

  const handleTurnstileSubmission = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(null);
    widgetRef.current?.reset();
  }, []);

  return {
    turnstileToken,
    isVerified: !!turnstileToken,
    widgetRef,
    handleTurnstileSubmission,
    resetTurnstile,
  };
}
