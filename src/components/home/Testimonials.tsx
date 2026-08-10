"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { getTestimonials } from "@/sanity/queries";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="section-padding bg-gray-light">
      <div className="container-site">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Real feedback from businesses we've helped build and grow."
        />

        {/* Desktop: Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.slice(0, 4).map((t) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              role={t.role}
              quote={t.quote}
              rating={t.rating}
              avatar={t.avatar}
            />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="sm:hidden">
          {testimonials.length > 0 && (
            <TestimonialCard
              name={testimonials[active]?.name}
              role={testimonials[active]?.role}
              quote={testimonials[active]?.quote}
              rating={testimonials[active]?.rating}
              avatar={testimonials[active]?.avatar}
            />
          )}
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === active ? "bg-teal" : "bg-gray-medium/30"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}