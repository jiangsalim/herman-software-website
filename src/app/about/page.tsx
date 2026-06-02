"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamCard } from "@/components/shared/TeamCard";
import { Button } from "@/components/shared/Button";
import { getTeamMembers } from "@/sanity/queries";
import type { Metadata } from "next";

export default function AboutPage() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    getTeamMembers().then(setTeam);
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy py-20 text-center">
        <div className="container-site">
          <h1 className="text-white">We Are HERMAN Software Solutions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-gray-medium">
            A Ugandan technology company building world-class software from Jinja.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              title="Our Story"
              subtitle="Founded on a simple belief: businesses in Uganda and across East Africa deserve the same quality of technology as anywhere else in the world."
            />
            <div className="space-y-4 text-body text-charcoal">
              <p>
                HERMAN Software Solutions Limited was founded on a simple belief: that businesses in
                Uganda and across East Africa deserve the same quality of technology as anywhere else
                in the world — built by people who understand the local context, delivered with global
                engineering standards.
              </p>
              <p>
                What started as a small team of engineers in Jinja has grown into a full-service software
                firm serving startups, SMEs, and enterprises. We don&apos;t just write code. We study your
                operations, design clean architectures, and stay with you long after deployment.
              </p>
              <p>
                We are proudly based at Haji Tarmchi, Jinja — and from here, we serve clients locally,
                regionally, and internationally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-light">
        <div className="container-site">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="card-base p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h2 className="mb-3">Our Mission</h2>
              <p className="text-body text-charcoal">
                To deliver robust, scalable, and maintainable software that solves real operational
                problems — on time, on budget, and with complete transparency.
              </p>
            </div>
            <div className="card-base p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy/10 text-navy mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="mb-3">Our Vision</h2>
              <p className="text-body text-charcoal">
                To be East Africa&apos;s most trusted software engineering firm — known for technical
                excellence, honest partnerships, and measurable client results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide every project and every client relationship."
          />
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                title: "Engineering Integrity",
                description: "We write tested, documented, production-ready code. No shortcuts.",
              },
              {
                title: "Client Partnership",
                description: "Your goals become our goals. We communicate early and often.",
              },
              {
                title: "Continuous Learning",
                description: "Technology moves fast. We invest heavily in staying ahead.",
              },
              {
                title: "Practical Innovation",
                description: "We recommend what you need — not what's trendy.",
              },
              {
                title: "Local Roots, Global Standards",
                description:
                  "We understand the Ugandan business environment and apply international best practices.",
              },
            ].map((value) => (
              <div key={value.title} className="flex gap-4 border-b border-gray-light pb-6 last:border-0">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1">{value.title}</h4>
                  <p className="text-body-sm text-charcoal">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gray-light">
        <div className="container-site">
          <SectionHeading
            title="The People Behind the Code"
            subtitle="A talented team of engineers, designers, and consultants dedicated to your success."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 text-center">
        <div className="container-site">
          <h2 className="text-white">Want to Know If We&apos;re the Right Partner?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-gray-medium">
            Let&apos;s talk about your project. No obligation, honest assessment.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}