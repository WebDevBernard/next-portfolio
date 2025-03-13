import { EmailTemplate } from "@/components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  try {
    const data = await resend.emails.send({
      from: "Bernard Yang <mail@bernardyang.com>",
      to: ["mail@bernardyang.com"],
      subject: `You received a form submission from 🚀${name}.`,
      react: EmailTemplate({ name, email, message }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
