import { siteConfig } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-site py-xl md:py-2xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="mb-4 inline-block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
                    <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" stroke="white" strokeWidth="2" fill="none" />
                    <line x1="14" y1="12" x2="14" y2="28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="26" y1="12" x2="26" y2="28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="14" y1="20" x2="26" y2="20" stroke="#00C2BA" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold leading-tight tracking-tight text-white">HERMAN</div>
                  <div className="text-[10px] font-light uppercase tracking-[3px] text-gray-medium">Software Solutions</div>
                </div>
              </div>
            </a>
            <p className="text-body-sm text-gray-medium">
              Engineered software from Jinja, Uganda — serving clients across East Africa and beyond.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-body-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-body-sm text-gray-medium hover:text-teal">Home</a></li>
              <li><a href="/about" className="text-body-sm text-gray-medium hover:text-teal">About</a></li>
              <li><a href="/our-work" className="text-body-sm text-gray-medium hover:text-teal">Our Work</a></li>
              <li><a href="/blog" className="text-body-sm text-gray-medium hover:text-teal">Blog</a></li>
              <li><a href="/contact#map" className="text-body-sm text-gray-medium hover:text-teal">Find Us</a></li>
              <li><a href="/contact" className="text-body-sm text-gray-medium hover:text-teal">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="mb-4 text-body-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services/custom-software" className="text-body-sm text-gray-medium hover:text-teal">Custom Software</a></li>
              <li><a href="/services/web-applications" className="text-body-sm text-gray-medium hover:text-teal">Web Applications</a></li>
              <li><a href="/services/mobile-development" className="text-body-sm text-gray-medium hover:text-teal">Mobile Development</a></li>
              <li><a href="/services/it-consulting" className="text-body-sm text-gray-medium hover:text-teal">IT Consulting</a></li>
              <li><a href="/services/enterprise-systems" className="text-body-sm text-gray-medium hover:text-teal">Enterprise Systems</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="mb-4 text-body-sm font-semibold uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="space-y-2 text-body-sm text-gray-medium">
              <li>{siteConfig.address}</li>
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-teal">{siteConfig.email}</a></li>
              <li><a href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="hover:text-teal">{siteConfig.phone}</a></li>
              <li>{siteConfig.officeHours}</li>
            </ul>
          </div>

          {/* Column 5: Social */}
          <div>
            <h4 className="mb-4 text-body-sm font-semibold uppercase tracking-wider text-white">Connect</h4>
            <div className="flex gap-3">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-gray-medium hover:bg-navy hover:text-teal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="rounded-md p-2 text-gray-medium hover:bg-navy hover:text-teal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-md p-2 text-gray-medium hover:bg-navy hover:text-teal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-body-sm text-gray-medium">Last updated: May 2026 &nbsp;|&nbsp; {siteConfig.copyright}</p>
          <div className="flex gap-4">
            <a href="/privacy-policy" className="text-body-sm text-gray-medium hover:text-teal">Privacy Policy</a>
            <a href="/terms-of-service" className="text-body-sm text-gray-medium hover:text-teal">Terms</a>
            <a href="/sitemap.xml" className="text-body-sm text-gray-medium hover:text-teal">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}