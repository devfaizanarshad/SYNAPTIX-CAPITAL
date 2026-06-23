import { NextRequest, NextResponse } from "next/server";

const contactEmail = process.env.CONTACT_TO_EMAIL || "info@synaptix.capital";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "Synaptix Capital <onboarding@resend.dev>";
const resendApiKey = process.env.RESEND_API_KEY;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  inquiry?: unknown;
  message?: unknown;
  website?: unknown;
};

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e8e1d7;color:#7a6c5a;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;width:145px;vertical-align:top">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #e8e1d7;color:#111827;font-size:15px;line-height:1.5;vertical-align:top">${escapeHtml(value)}</td>
    </tr>
  `;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid submission. Please try again." }, { status: 400 });
  }

  if (stringValue(payload.website)) {
    return NextResponse.json({ message: "Thanks, your inquiry has been received." });
  }

  const name = stringValue(payload.name);
  const email = stringValue(payload.email);
  const company = stringValue(payload.company);
  const inquiry = stringValue(payload.inquiry);
  const message = stringValue(payload.message);

  if (!name || !email || !company || !inquiry || !message) {
    return NextResponse.json({ message: "Please complete every field before submitting." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!resendApiKey) {
    return NextResponse.json(
      { message: "Email delivery is not configured yet. Please email info@synaptix.capital directly." },
      { status: 500 }
    );
  }

  const text = [
    "New Synaptix Capital inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Inquiry type: ${inquiry}`,
    "",
    "Brief context:",
    message
  ].join("\n");

  const html = `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f4f0ea;font-family:Arial,Helvetica,sans-serif;color:#111827">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f0ea;padding:28px 12px">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fff;border:1px solid #e2d8ca">
                <tr>
                  <td style="padding:34px 36px 12px;background:#06131a">
                    <p style="margin:0 0 20px;color:#f2eadc;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase">Synaptix Capital</p>
                    <p style="margin:0 0 10px;color:#b88a50;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase">Private Inquiry</p>
                    <h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;line-height:1.2">New Synaptix Capital inquiry</h1>
                    <p style="margin:14px 0 0;color:#c8d0d6;font-size:15px;line-height:1.65">A new contact form submission has been received. Reply directly to this email to respond to ${escapeHtml(name)}.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 36px 8px">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${detailRow("Name", name)}
                      ${detailRow("Email", email)}
                      ${detailRow("Company", company)}
                      ${detailRow("Inquiry", inquiry)}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 36px 36px">
                    <p style="margin:0 0 10px;color:#7a6c5a;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Brief Context</p>
                    <div style="padding:18px 20px;background:#faf7f2;border-left:3px solid #b88a50;color:#1f2933;font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(message)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 36px;background:#06131a;color:#c8d0d6;font-size:12px;line-height:1.6">
                    <strong style="display:block;color:#e6bd82;font-size:12px;letter-spacing:0.14em;text-transform:uppercase">Synaptix Capital</strong>
                    Confidential first contact routed to ${escapeHtml(contactEmail)}.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [contactEmail],
      reply_to: email,
      subject: `Synaptix Capital inquiry from ${name}`,
      text,
      html
    })
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { message: "Your inquiry could not be sent. Please email info@synaptix.capital directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Your inquiry has been sent. We will reply directly." });
}
