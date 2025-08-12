import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { contactSchema, type ContactInput } from "@/lib/validators/contact";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY!);

export async function POST(request: Request) {
  // 1) try to parse + validate JSON
  let data: ContactInput;
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      // Zod errors are flattened into a nice object for the client
      return NextResponse.json(
        { errors: parsed.error.flatten() },
        { status: 400 },
      );
    }
    data = parsed.data;
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const { name, email, message, recaptchaToken } = data;

  // 2) verify reCAPTCHA
  const secretKey = env.RECAPTCHA_SECRET_KEY!;
  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(
        recaptchaToken,
      )}`,
    },
  );
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return NextResponse.json(
      { error: "reCAPTCHA verification failed" },
      { status: 400 },
    );
  }

  // 3) send the email
  try {
    const result = await resend.emails.send({
      from: env.FROM_EMAIL!,
      to: [env.TO_EMAIL!],
      subject: `New portfolio contact form submission from ${name}`,
      react: <EmailTemplate name={name} email={email} message={message} />,
      replyTo: email,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
