"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/data/faqs";

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="card-base overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-light/50"
            aria-expanded={openIndex === index}
          >
            <span className="text-body font-medium text-navy pr-4">{faq.question}</span>
            <svg
              className={cn(
                "h-5 w-5 flex-shrink-0 text-teal transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-body text-charcoal leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}