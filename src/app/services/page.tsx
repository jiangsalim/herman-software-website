"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { getServices, getProcessSteps } from "@/sanity/queries";
import { CardSkeleton } from "@/components/shared/Skeleton";

const iconMap: Record<string, React.ReactNode> = {
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  smartphone: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  lightbulb: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  server: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
};

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [processSteps, setProcessSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getServices(), getProcessSteps()]).then(([s, p]) => {
      setServices(s);
      setProcessSteps(p);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="bg-navy py-20 text-center">
        <div className="container-site">
          <h1 className="text-white">What We Build — And How We Build It</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-gray-medium">
            Every project starts with understanding your problem, not pushing a solution. Explore our capabilities below.
          </p>
        </div>
      </section>

      {/* Service Detail Blocks */}
      {loading ? (
        <section className="section-padding bg-white">
          <div className="container-site space-y-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-3">
                  <CardSkeleton />
                </div>
                <div>
                  <div className="h-64 lg:h-80 bg-gray-light rounded-card animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        services.map((service, index) => (
          <section key={service.title} className={`section-padding ${index % 2 === 0 ? "bg-white" : "bg-gray-light"}`}>
            <div className="container-site">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-teal/10 text-teal">
                    {iconMap[service.icon] || iconMap.code}
                  </div>
                  <h2 className="mb-4">{service.title}</h2>
                  <p className="mb-4 text-body text-charcoal">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {service.features.map((feature: string) => (
                          <li key={feature} className="flex items-start gap-2 text-body-sm text-charcoal">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button href={service.link || `/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`} variant="primary">
                    Learn More
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex h-64 items-center justify-center rounded-card bg-navy/5 lg:h-80">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy/10 text-navy">
                        {iconMap[service.icon] || iconMap.code}
                      </div>
                      <p className="text-body-sm font-medium text-navy">{service.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      )}

      {/* How We Work — From Sanity */}
      {processSteps.length > 0 && (
        <section className="section-padding bg-navy text-white">
          <div className="container-site">
            <SectionHeading
              title="Our Delivery Methodology"
              subtitle="A proven process that keeps your project on track and aligned with your goals."
              className="[&_h2]:text-white [&_p]:text-gray-medium"
            />
            <div className="relative hidden lg:block">
              <div className="absolute left-0 right-0 top-12 h-0.5 bg-gray-medium/20" />
              <div className="grid grid-cols-4 gap-8">
                {processSteps.map((step) => (
                  <div key={step.stepNumber} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
                      {String(step.stepNumber).padStart(2, "0")}
                    </div>
                    <h4 className="mb-2 text-white">{step.title}</h4>
                    <p className="text-body-sm text-gray-medium">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8 lg:hidden">
              {processSteps.map((step) => (
                <div key={step.stepNumber} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                    {String(step.stepNumber).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="mb-1 text-white">{step.title}</h4>
                    <p className="text-body-sm text-gray-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-16 text-center">
        <div className="container-site">
          <h2>Not Sure Which Service Fits Your Needs?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-charcoal">
            Tell us about your project and we&apos;ll recommend the right approach — honestly.
          </p>
          <div className="mt-8">
            <Button href="/get-quote" variant="primary">
              Tell Us About Your Project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}