// src/app/api/whatsapp/route.ts
//
// WhatsApp Customer Service Bot — Next.js App Router API route
// ----------------------------------------------------------------
// Setup:
// 1. Place this file at: src/app/api/whatsapp/route.ts
// 2. Add these to your .env.local (and to Vercel's Environment Variables
//    under Project Settings > Environment Variables for production):
//
//   
//
// 3. Push to GitHub -> Vercel auto-deploys -> your webhook URL becomes:
//    https://herman-software-website.vercel.app/api/whatsapp
//
// 4. In Meta dashboard > WhatsApp > Configuration:
//    - Callback URL: https://herman-software-website.vercel.app/api/whatsapp
//    - Verify token: same string as WHATSAPP_VERIFY_TOKEN
//    - Subscribe to the "messages" field

import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN!;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;
const GRAPH_API_URL = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;

async function sendWhatsAppMessage(to: string, text: string) {
  await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });
}

function getMenuText() {
  return (
    "👋 Welcome to HERMAN Software Solutions!\n\n" +
    "1️⃣ Our Services\n" +
    "2️⃣ Get a Quote\n" +
    "3️⃣ Talk to an Agent\n" +
    "4️⃣ Business Hours\n\n" +
    "Reply with a number (1-4)."
  );
}

async function handleIncomingMessage(from: string, text: string) {
  const cleaned = text.trim().toLowerCase();
  let reply: string;

  if (["hi", "hello", "hey", "start", "menu"].includes(cleaned)) {
    reply = getMenuText();
  } else if (cleaned === "1") {
    reply =
      "🛠️ Our Services:\n" +
      "- Custom Software Development\n" +
      "- Web & Mobile Apps\n" +
      "- Systems Architecture & Consulting\n\n" +
      "Reply 'menu' to go back.";
  } else if (cleaned === "2") {
    reply =
      "📋 To get a quote, tell us:\n" +
      "- Project type\n" +
      "- Rough budget\n" +
      "- Timeline\n\n" +
      "Our team replies within 24hrs.";
  } else if (cleaned === "3") {
    reply = "📞 Connecting you to an agent. Someone will reply shortly!";
  } else if (cleaned === "4") {
    reply = "🕒 We're open Mon-Sat, 8:00 AM - 6:00 PM (EAT).";
  } else {
    reply = "Sorry, I didn't understand that. 🤔\n\n" + getMenuText();
  }

  await sendWhatsAppMessage(from, reply);
}

// Meta calls this with GET once, to verify your webhook URL
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Verification failed", { status: 403 });
}

// Meta calls this with POST whenever a message arrives
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    if (message) {
      const from = message.from as string;
      const type = message.type;

      if (type === "text") {
        const text = message.text.body as string;
        await handleIncomingMessage(from, text);
      } else {
        await sendWhatsAppMessage(
          from,
          "Sorry, I can only understand text messages right now."
        );
      }
    }
  } catch (err) {
    console.error("WhatsApp webhook error:", err);
  }

  // Always return 200 quickly so Meta doesn't retry/flag the webhook
  return NextResponse.json({ status: "ok" }, { status: 200 });
}