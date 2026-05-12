import { Button } from "@/components/shared/Button";

export default function ClientPortalPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center">
        <div className="container-site">
          <h1 className="text-white">Client Portal</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-gray-medium">
            Access your project dashboard, view progress, submit tickets, and communicate with your development team.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white text-center">
        <div className="container-site mx-auto max-w-lg">
          <div className="card-base p-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy/5 text-navy">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>
            <h2 className="mb-4">Access Your Dashboard</h2>
            <p className="mb-6 text-charcoal">
              Choose how you&apos;d like to reach us. We&apos;ll get you set up with access to your project dashboard.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                href="https://wa.me/256772723188?text=Hi%20HERMAN%20Team%2C%20I%20need%20access%20to%20my%20project%20dashboard"
                variant="primary"
              >
                Chat on WhatsApp
              </Button>
              <Button
                href="mailto:infohermansoftware@gmail.com?subject=Client Portal Access Request"
                variant="secondary"
              >
                Request via Email
              </Button>
            </div>
            <p className="mt-6 text-body-sm text-gray-medium">
              We typically respond within a few hours during business hours (Monday–Friday, 9 AM – 5 PM EAT).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}