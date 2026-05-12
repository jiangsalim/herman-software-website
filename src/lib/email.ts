import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (host && user && pass) {
    console.log("Using real SMTP:", host);
    transporter = nodemailer.createTransport({
      host: host,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
    });
  } else {
    console.log("SMTP not configured, using Ethereal test account");
    const testAccount = await nodemailer.createTestAccount();
    console.log("Ethereal user:", testAccount.user);
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  return transporter;
}

interface SendEmailParams {
  subject: string;
  html: string;
}

export async function sendEmail({ subject, html }: SendEmailParams) {
  try {
    const transport = await getTransporter();

    const mailOptions = {
      from: "infohermansoftware@gmail.com",
      to: process.env.EMAIL_TO || "infohermansoftware@gmail.com",
      subject,
      html,
    };

    console.log("Attempting to send email to:", mailOptions.to);
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("Preview URL:", previewUrl);
    }

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Email send error:", error?.message || error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}

export function buildContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const serviceLabels: Record<string, string> = {
    "custom-software": "Custom Software Engineering",
    "web-applications": "Web & Cloud Applications",
    "mobile-development": "Mobile Development",
    "it-consulting": "IT Strategy & Consulting",
    "enterprise-systems": "Enterprise Systems",
    "other": "Other / Not Sure",
  };

  return {
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A1F3F;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.email}</td></tr>
          ${data.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Company</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.company}</td></tr>` : ""}
          ${data.service ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Service Interest</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${serviceLabels[data.service] || data.service}</td></tr>` : ""}
        </table>
        <h3 style="color: #0A1F3F; margin-top: 20px;">Message</h3>
        <p style="background: #F8F9FA; padding: 16px; border-radius: 8px; line-height: 1.6;">${data.message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  };
}

export function buildQuoteEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string[];
  budget?: string;
  timeline?: string;
  description: string;
  techPreferences?: string;
  source?: string;
}) {
  const budgetLabels: Record<string, string> = {
    "under-5k": "Under $5,000",
    "5k-15k": "$5,000 - $15,000",
    "15k-50k": "$15,000 - $50,000",
    "50k-plus": "$50,000+",
    "not-sure": "Not Sure Yet",
  };

  const timelineLabels: Record<string, string> = {
    "1-month": "Within 1 Month",
    "1-3-months": "1-3 Months",
    "3-6-months": "3-6 Months",
    "6-plus-months": "6+ Months",
    "not-sure": "Not Sure Yet",
  };

  const sourceLabels: Record<string, string> = {
    "google": "Google Search",
    "referral": "Referral",
    "social-media": "Social Media",
    "blog": "Blog Article",
    "other": "Other",
  };

  return {
    subject: `New Quote Request from ${data.name}${data.company ? " - " + data.company : ""}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A1F3F;">New Quote Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.email}</td></tr>
          ${data.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Company</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.company}</td></tr>` : ""}
          ${data.projectType?.length ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Project Type</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${data.projectType.join(", ")}</td></tr>` : ""}
          ${data.budget ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Budget</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${budgetLabels[data.budget] || data.budget}</td></tr>` : ""}
          ${data.timeline ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Timeline</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${timelineLabels[data.timeline] || data.timeline}</td></tr>` : ""}
          ${data.source ? `<tr><td style="padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Source</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${sourceLabels[data.source] || data.source}</td></tr>` : ""}
        </table>
        <h3 style="color: #0A1F3F; margin-top: 20px;">Project Description</h3>
        <p style="background: #F8F9FA; padding: 16px; border-radius: 8px; line-height: 1.6;">${data.description.replace(/\n/g, "<br>")}</p>
        ${data.techPreferences ? `<h3 style="color: #0A1F3F; margin-top: 20px;">Technical Preferences</h3><p style="background: #F8F9FA; padding: 16px; border-radius: 8px; line-height: 1.6;">${data.techPreferences.replace(/\n/g, "<br>")}</p>` : ""}
      </div>
    `,
  };
}