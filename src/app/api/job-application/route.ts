import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobTitle = formData.get("jobTitle") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const linkedin = formData.get("linkedin") as string;
    const portfolio = formData.get("portfolio") as string;
    const source = formData.get("source") as string;

    if (!name || !email || !coverLetter) {
      return NextResponse.json({ error: "Name, email, and cover letter are required." }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    // Build email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #0A1F3F;">📬 New Job Application</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Position</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${jobTitle}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${phone}</td></tr>` : ""}
          ${linkedin ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">LinkedIn</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;"><a href="${linkedin}">${linkedin}</a></td></tr>` : ""}
          ${portfolio ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Portfolio/GitHub</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;"><a href="${portfolio}">${portfolio}</a></td></tr>` : ""}
          ${source ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Source</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${source}</td></tr>` : ""}
        </table>
        <h3 style="color: #0A1F3F; margin-top: 20px;">Cover Letter</h3>
        <p style="background: #F8F9FA; padding: 16px; border-radius: 8px; line-height: 1.6;">${coverLetter.replace(/\n/g, "<br>")}</p>
        <p style="color: #718096; font-size: 12px; margin-top: 24px;">CV is attached to this email.</p>
      </div>
    `;

    // Prepare attachment if CV uploaded
    const cv = formData.get("cv") as File | null;
    let attachment = null;
    if (cv) {
      const bytes = await cv.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      attachment = {
        name: cv.name,
        content: base64,
      };
    }

    // Send email via Brevo
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: "infohermansoftware@gmail.com", name: "HERMAN Careers" },
        to: [{ email: "infohermansoftware@gmail.com", name: "HERMAN HR" }],
        replyTo: { email, name },
        subject: `New Application: ${jobTitle} — ${name}`,
        htmlContent: emailHtml,
        attachment: attachment ? [attachment] : undefined,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      console.error("Brevo email error:", err);
      return NextResponse.json({ error: "Failed to send application." }, { status: 500 });
    }

    // Generate free WhatsApp link
    const whatsappMessage = encodeURIComponent(
      `📬 *New Job Application!*\n\n*Position:* ${jobTitle}\n*Name:* ${name}\n*Email:* ${email}${phone ? `\n*Phone:* ${phone}` : ""}\n\n📎 Full details & CV sent to email.`
    );
    const whatsappLink = `https://wa.me/256772723188?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      whatsappLink,
    });
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}