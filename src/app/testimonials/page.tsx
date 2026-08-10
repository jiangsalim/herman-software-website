"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/shared/Button";
import { getTestimonials } from "@/sanity/queries";
import { CardSkeleton } from "@/components/shared/Skeleton";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials().then((data) => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="bg-navy py-20 text-center">
        <div className="container-site">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Testimonials" }]} />
          <h1 className="text-white">What Our Clients Say</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-gray-medium">
            Real feedback from businesses we&apos;ve helped build and grow across East Africa.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} name={t.name} role={t.role} quote={t.quote} rating={t.rating} avatar={t.avatar} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy py-16 text-center">
        <div className="container-site">
          <h2 className="text-white">Ready to Be Our Next Success Story?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-gray-medium">
            Let&apos;s discuss your project and see how we can help.
          </p>
          <div className="mt-8">
            <Button href="/get-quote" variant="primary">Start Your Project</Button>
          </div>
        </div>
      </section>
    </>
  );
}