import { Email } from "@/components/Email";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { emailInfo } from "@/lib/data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  try {
    const data = await resend.emails.send({
      from: emailInfo.from,
      to: emailInfo.to,
      subject: `You received a form submission from 🚀${name}.`,
      react: Email({ name, email, message }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
