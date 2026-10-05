import { NextResponse } from "next/server";

/**
 * Contact form API route.
 *
 * To enable email sending:
 * 1. Set CONTACT_EMAIL_SERVICE=nodemailer (or resend, sendgrid, etc.)
 * 2. Configure your email service environment variables
 * 3. Replace the TODO block below with your mailer implementation.
 *
 * Without configuration, returns { fallbackMailto: true }
 * which makes the client open a mailto: link instead.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ── Email Service Integration ──────────────────────────
    // Uncomment and configure when you have an email service:
    //
    // if (process.env.CONTACT_EMAIL_SERVICE) {
    //   // Example with Resend:
    //   // const { Resend } = await import('resend');
    //   // const resend = new Resend(process.env.RESEND_API_KEY);
    //   // await resend.emails.send({ from: ..., to: ..., subject: ..., text: message });
    //   return NextResponse.json({ success: true });
    // }
    // ──────────────────────────────────────────────────────

    // Fallback: tell the client to use mailto
    return NextResponse.json(
      {
        fallbackMailto: true,
        message: "Email service not configured. Opening mail client.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
