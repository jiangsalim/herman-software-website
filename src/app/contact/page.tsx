import { ContactForm } from "@/components/forms/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { siteConfig } from "@/data/site-config";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 text-center">
        <div className="container-site">
          <h1 className="text-white">Let&apos;s Start a Conversation</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-gray-medium">
            No obligation, no hard sell. Tell us what you&apos;re working on, and we&apos;ll tell
            you honestly how we can help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-navy">Address</p>
                      <p className="text-body-sm text-charcoal">{siteConfig.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-navy">Email</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-body-sm text-teal hover:underline">
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-navy">Phone</p>
                      <a href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="text-body-sm text-teal hover:underline">
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-navy/5 text-navy">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-navy">Office Hours</p>
                      <p className="text-body-sm text-charcoal">{siteConfig.officeHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h3 className="mb-4">Our Location</h3>
                <MapEmbed />
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* FAQ Section */}
      <section className="section-padding bg-gray-light">
        <div className="container-site">
          <h2 className="mb-8 text-center">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}