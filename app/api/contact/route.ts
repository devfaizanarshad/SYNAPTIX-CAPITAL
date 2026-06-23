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
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">
      <h2 style="margin:0 0 16px;color:#06131a">New Synaptix Capital inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Inquiry type:</strong> ${escapeHtml(inquiry)}</p>
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
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
