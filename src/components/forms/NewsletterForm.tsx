"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // For now, just show success — you can integrate with Mailchimp/ConvertKit later
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  if (status === "success") {
    return (
      <div className="rounded-lg bg-teal/10 border border-teal/20 p-4 text-center">
        <p className="text-body-sm font-medium text-teal">✅ You&apos;re subscribed! Check your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 rounded-md border border-gray-light bg-white px-4 py-2.5 text-body-sm text-charcoal placeholder:text-gray-medium focus:border-teal focus:outline-none dark:bg-navy dark:border-navy-light dark:text-white"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-teal px-4 py-2.5 text-body-sm font-medium text-white hover:bg-teal-dark transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Subscribe"}
      </button>
    </form>
  );
}