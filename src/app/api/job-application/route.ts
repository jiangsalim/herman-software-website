import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const cv = formData.get("cv") as File | null;

    if (!name || !email || !coverLetter) {
      return NextResponse.json({ error: "Name, email, and cover letter are required." }, { status: 400 });
    }

    // Build email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #0A1F3F;">📬 New Job Application</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Position</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${jobTitle}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${email}</td></tr>
          ${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${phone}</td></tr>` : ""}
          ${linkedin ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">LinkedIn</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;"><a href="${linkedin}">${linkedin}</a></td></tr>` : ""}
          ${portfolio ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Portfolio</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;"><a href="${portfolio}">${portfolio}</a></td></tr>` : ""}
          ${source ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Source</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${source}</td></tr>` : ""}
        </table>
        <h3 style="color: #0A1F3F; margin-top: 20px;">Cover Letter</h3>
        <p style="background: #F8F9FA; padding: 16px; border-radius: 8px;">${coverLetter}</p>
      </div>
    `;

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.ethereal.email",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS || "",
      },
    });

    const attachments: any[] = [];
    if (cv) {
      const bytes = await cv.arrayBuffer();
      attachments.push({
        filename: cv.name,
        content: Buffer.from(bytes),
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "infohermansoftware@gmail.com",
      to: "infohermansoftware@gmail.com",
      subject: `New Application: ${jobTitle} - ${name}`,
      html,
      attachments,
    });

    // Send WhatsApp notification via Brevo
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (BREVO_API_KEY) {
      const whatsappBody = `📬 *New Job Application!*\n\n*Position:* ${jobTitle}\n*Name:* ${name}\n*Email:* ${email}\n${phone ? `*Phone:* ${phone}\n` : ""}\n*Cover Letter:* ${coverLetter.substring(0, 200)}...\n\n📎 Full details & CV sent to email.`;

      await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: "HERMAN",
          recipient: "+256772723188",
          content: whatsappBody,
        }),
      }).catch((err) => console.log("WhatsApp notification skipped:", err.message));
    }

    return NextResponse.json({ success: true, message: "Application submitted!" });
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}