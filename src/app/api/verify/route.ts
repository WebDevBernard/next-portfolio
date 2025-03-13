import type { NextRequest } from "next/server";
import type { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";

const verifyEndpoint =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const secret = process.env.CLOUDFLARE_SECRET_KEY!;

// Export the POST method as required by Next.js App Router
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    const res = await fetch(verifyEndpoint, {
      method: "POST",
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
        token
      )}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const data = (await res.json()) as TurnstileServerValidationResponse;

    return new Response(JSON.stringify(data), {
      status: data.success ? 200 : 400,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "content-type": "application/json" },
    });
  }
}
