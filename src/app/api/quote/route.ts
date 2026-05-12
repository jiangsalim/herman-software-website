import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validators";
import { sendEmail, buildQuoteEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Quote form body received:", JSON.stringify(body));

    const result = quoteFormSchema.safeParse(body);
    if (!result.success) {
      console.error("Quote validation failed:", result.error.flatten().fieldErrors);
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { subject, html } = buildQuoteEmail(result.data);
    const emailResult = await sendEmail({ subject, html });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Failed to send quote request. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Quote request submitted successfully. We'll get back to you within 1–2 business days." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}