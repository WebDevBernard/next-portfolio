import { useState, useEffect } from "react";

export function useTurnstile() {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [turnstileMessage, setTurnstileMessage] = useState<string | null>(null);

  async function handleTurnstileSubmission(token: string | null) {
    setTurnstileToken(token);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setIsVerified(data.success);
    } catch {
      setIsVerified(false);
    }
  }

  useEffect(() => {
    setTurnstileMessage(
      isVerified ? "Ready to submit" : "One moment, checking for bots..."
    );
  }, [isVerified]);

  return {
    turnstileToken,
    isVerified,
    turnstileMessage,
    handleTurnstileSubmission,
  };
}
