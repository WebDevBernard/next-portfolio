import type { APIRoute } from "astro";
import { Resend } from "resend";
import { Email } from "../../lib/Email";
import { emailInfo } from "../../lib/data";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const TURNSTILE_VERIFY =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const POST: APIRoute = async ({ request }) => {
  const { name, email, message, turnstileToken } = await request.json();

  if (!turnstileToken) {
    return new Response(JSON.stringify({ error: "Missing captcha token" }), {
      status: 400,
    });
  }

  const verifyRes = await fetch(TURNSTILE_VERIFY, {
    method: "POST",
    body: `secret=${encodeURIComponent(import.meta.env.CLOUDFLARE_SECRET_KEY)}&response=${encodeURIComponent(turnstileToken)}`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  const verifyData = (await verifyRes.json()) as { success: boolean };

  if (!verifyData.success) {
    return new Response(
      JSON.stringify({ error: "Captcha verification failed" }),
      { status: 400 },
    );
  }

  try {
    const data = await resend.emails.send({
      from: emailInfo.from,
      to: emailInfo.to,
      subject: `You received a form submission from \u{1F680}${name}.`,
      react: Email({ name, email, message }) as React.ReactElement,
    });
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
};
