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

function firstNameFrom(name: string) {
  return name.split(/\s+/)[0] || name;
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e8e1d7;color:#7a6c5a;font-size:12px;font-weight:700;letter-spacing:0.08em;width:145px;vertical-align:top">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #e8e1d7;color:#111827;font-size:15px;line-height:1.5;vertical-align:top">${escapeHtml(value)}</td>
    </tr>
  `;
}

async function sendResendEmail(body: {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  text: string;
  html: string;
}) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
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
  const firstName = firstNameFrom(name);

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
                    <p style="margin:0 0 20px;color:#f2eadc;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;letter-spacing:0.16em">SYNAPTIX CAPITAL</p>
                    <p style="margin:0 0 10px;color:#b88a50;font-size:12px;font-weight:700;letter-spacing:0.16em">PRIVATE INQUIRY</p>
                    <h1 style="margin:0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:700;line-height:1.2">New Synaptix Capital inquiry</h1>
                    <p style="margin:14px 0 0;color:#c8d0d6;font-size:15px;line-height:1.65">A new contact form submission has been received. Reply directly to this email to respond to ${escapeHtml(name)}.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 36px 8px">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${detailRow("NAME", name)}
                      ${detailRow("EMAIL", email)}
                      ${detailRow("COMPANY", company)}
                      ${detailRow("INQUIRY", inquiry)}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 36px 36px">
                    <p style="margin:0 0 10px;color:#7a6c5a;font-size:12px;font-weight:700;letter-spacing:0.08em">BRIEF CONTEXT</p>
                    <div style="padding:18px 20px;background:#faf7f2;border-left:3px solid #b88a50;color:#1f2933;font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(message)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 36px;background:#06131a;color:#c8d0d6;font-size:12px;line-height:1.6">
                    <strong style="display:block;color:#e6bd82;font-size:12px;letter-spacing:0.14em">SYNAPTIX CAPITAL</strong>
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

  const acknowledgementText = [
    `Dear ${firstName},`,
    "",
    "Thank you for contacting Synaptix Capital Ltd",
    "",
    "We have successfully received your submission and appreciate your interest in our firm. Whether you are a business owner exploring strategic capital or acquisition opportunities, or an investor interested in partnering with us, we value the opportunity to connect.",
    "",
    "Our team will review the information you have provided and determine the appropriate next steps. If there is a potential fit, a member of our team will reach out directly to continue the conversation and discuss how we may be able to work together.",
    "",
    "At Synaptix Capital Ltd, we focus on identifying and supporting exceptional businesses while creating long-term value for founders, management teams, and investment partners. We appreciate your interest and look forward to learning more about your objectives.",
    "",
    "Please note that response times may vary depending on the volume of inquiries we receive.",
    "",
    "Thank you again for reaching out.",
    "",
    "Kind regards,",
    "",
    "The Team at Synaptix Capital Ltd",
    "",
    "www.synaptix.capital",
    "",
    contactEmail
  ].join("\n");

  const acknowledgementHtml = `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f4f0ea;font-family:Arial,Helvetica,sans-serif;color:#111827">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f0ea;padding:28px 12px">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fff;border:1px solid #e2d8ca">
                <tr>
                  <td style="padding:34px 36px;background:#06131a">
                    <p style="margin:0 0 20px;color:#f2eadc;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;letter-spacing:0.16em">SYNAPTIX CAPITAL</p>
                    <p style="margin:0;color:#b88a50;font-size:12px;font-weight:700;letter-spacing:0.16em">INQUIRY RECEIVED</p>
                    <h1 style="margin:10px 0 0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:700;line-height:1.2">Thank you for contacting Synaptix Capital Ltd</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 36px;color:#1f2933;font-size:15px;line-height:1.75">
                    <p style="margin:0 0 18px">Dear ${escapeHtml(firstName)},</p>
                    <p style="margin:0 0 18px">Thank you for contacting Synaptix Capital Ltd</p>
                    <p style="margin:0 0 18px">We have successfully received your submission and appreciate your interest in our firm. Whether you are a business owner exploring strategic capital or acquisition opportunities, or an investor interested in partnering with us, we value the opportunity to connect.</p>
                    <p style="margin:0 0 18px">Our team will review the information you have provided and determine the appropriate next steps. If there is a potential fit, a member of our team will reach out directly to continue the conversation and discuss how we may be able to work together.</p>
                    <p style="margin:0 0 18px">At Synaptix Capital Ltd, we focus on identifying and supporting exceptional businesses while creating long-term value for founders, management teams, and investment partners. We appreciate your interest and look forward to learning more about your objectives.</p>
                    <p style="margin:0 0 18px">Please note that response times may vary depending on the volume of inquiries we receive.</p>
                    <p style="margin:0 0 24px">Thank you again for reaching out.</p>
                    <p style="margin:0 0 4px">Kind regards,</p>
                    <p style="margin:0 0 18px">The Team at Synaptix Capital Ltd</p>
                    <p style="margin:0"><a href="https://www.synaptix.capital" style="color:#8c5f2b;text-decoration:none">www.synaptix.capital</a></p>
                    <p style="margin:4px 0 0"><a href="mailto:${escapeHtml(contactEmail)}" style="color:#8c5f2b;text-decoration:none">${escapeHtml(contactEmail)}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 36px;background:#06131a;color:#c8d0d6;font-size:12px;line-height:1.6">
                    <strong style="display:block;color:#e6bd82;font-size:12px;letter-spacing:0.14em">SYNAPTIX CAPITAL LTD</strong>
                    This confirmation was sent because an inquiry was submitted at www.synaptix.capital.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const resendResponse = await sendResendEmail({
    from: fromEmail,
    to: [contactEmail],
    reply_to: email,
    subject: `Synaptix Capital inquiry from ${name}`,
    text,
    html
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { message: "Your inquiry could not be sent. Please email info@synaptix.capital directly." },
      { status: 502 }
    );
  }

  const acknowledgementResponse = await sendResendEmail({
    from: fromEmail,
    to: [email],
    reply_to: contactEmail,
    subject: "Thank you for contacting Synaptix Capital Ltd",
    text: acknowledgementText,
    html: acknowledgementHtml
  });

  if (!acknowledgementResponse.ok) {
    return NextResponse.json(
      { message: "Your inquiry was received, but the confirmation email could not be sent." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Your inquiry has been sent. We will reply directly." });
}
