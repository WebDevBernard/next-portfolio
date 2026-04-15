import { Email } from "@/components/Email";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { emailInfo } from "@/lib/data";

const resend = new Resend(process.env.RESEND_API_KEY);
const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function POST(req: NextRequest) {
  const { name, email, message, turnstileToken } = await req.json();

  if (!turnstileToken) {
    return NextResponse.json({ error: "Missing captcha token" }, { status: 400 });
  }

  const verifyRes = await fetch(TURNSTILE_VERIFY, {
    method: "POST",
    body: `secret=${encodeURIComponent(process.env.CLOUDFLARE_SECRET_KEY!)}&response=${encodeURIComponent(turnstileToken)}`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  const verifyData = (await verifyRes.json()) as { success: boolean };

  if (!verifyData.success) {
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: emailInfo.from,
      to: emailInfo.to,
      subject: `You received a form submission from 🚀${name}.`,
      react: Email({ name, email, message }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
