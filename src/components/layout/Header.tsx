"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Custom Software", href: "/services/custom-software" },
      { label: "Web Applications", href: "/services/web-applications" },
      { label: "Mobile Development", href: "/services/mobile-development" },
      { label: "IT Consulting", href: "/services/it-consulting" },
      { label: "Enterprise Systems", href: "/services/enterprise-systems" },
    ],
  },
  { label: "Our Work", href: "/our-work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-light bg-white/95 backdrop-blur-sm dark:bg-navy-dark/95 dark:border-navy-light">
        <div className="container-site">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
                  <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" stroke="#0A1F3F" strokeWidth="2" fill="none" className="dark:stroke-white" />
                  <line x1="14" y1="12" x2="14" y2="28" stroke="#0A1F3F" strokeWidth="2.5" strokeLinecap="round" className="dark:stroke-white" />
                  <line x1="26" y1="12" x2="26" y2="28" stroke="#0A1F3F" strokeWidth="2.5" strokeLinecap="round" className="dark:stroke-white" />
                  <line x1="14" y1="20" x2="26" y2="20" stroke="#00C2BA" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold leading-tight tracking-tight text-navy dark:text-white">HERMAN</div>
                <div className="text-[10px] font-light uppercase tracking-[3px] text-charcoal dark:text-gray-medium">Software Solutions</div>
              </div>
            </a>

            <nav className="hidden lg:flex lg:items-center lg:gap-1">
              {NAV_LINKS.map((link) => {
                if ("children" in link && link.children) {
                  return (
                    <div key={link.label} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                      <button className={cn("flex items-center gap-1 rounded-md px-3 py-2 text-body-sm font-medium transition-colors", servicesOpen ? "text-teal" : "text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal")}>
                        {link.label}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {servicesOpen && (
                        <div className="absolute left-0 top-full mt-1 w-56 rounded-card border border-gray-light bg-white py-2 shadow-card dark:bg-navy dark:border-navy-light">
                          {link.children.map((child) => (
                            <a key={child.href} href={child.href} className={cn("block px-4 py-2 text-body-sm transition-colors hover:bg-gray-light hover:text-teal dark:hover:bg-navy-light", isActive(child.href) && "font-medium text-teal")}>{child.label}</a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <a key={link.href} href={link.href} className={cn("rounded-md px-3 py-2 text-body-sm font-medium transition-colors", isActive(link.href) ? "text-teal" : "text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal")}>{link.label}</a>
                );
              })}
            </nav>

            <div className="hidden lg:flex lg:items-center lg:gap-2">
              <ThemeToggle />
              <a href="https://linkedin.com/company/herman-software" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://twitter.com/hermansoftware" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal transition-colors" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href="https://facebook.com/hermansoftware" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="/client-portal" className="rounded-md border border-navy px-4 py-2 text-body-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white dark:border-gray-light dark:text-gray-light dark:hover:bg-gray-light dark:hover:text-navy">Client Portal</a>
              <a href="/get-quote" className="rounded-md bg-teal px-4 py-2 text-body-sm font-medium text-white transition-colors hover:bg-teal-dark">Get a Quote</a>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <button onClick={() => setMobileOpen(!mobileOpen)} className="flex items-center justify-center rounded-md p-2 text-navy dark:text-white" aria-label="Toggle menu">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 top-16 z-[9999] bg-white dark:bg-navy-dark lg:hidden overflow-y-auto transition-opacity duration-200 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="container-site flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => {
            if ("children" in link && link.children) {
              return (
                <div key={link.label} className="border-b border-gray-light dark:border-navy-light">
                  <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex w-full items-center justify-between px-4 py-3 text-body font-medium text-charcoal dark:text-white">
                    {link.label}
                    <svg className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 border-l-2 border-gray-light dark:border-navy-light pl-4">
                      {link.children.map((child) => (
                        <a key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className={cn("block px-4 py-3 text-body-sm transition-colors hover:text-teal", isActive(child.href) && "font-medium text-teal")}>{child.label}</a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={cn("rounded-md px-4 py-3 text-body font-medium transition-colors", isActive(link.href) ? "bg-gray-light dark:bg-navy-light text-teal" : "text-charcoal dark:text-white hover:bg-gray-light dark:hover:bg-navy-light hover:text-teal")}>{link.label}</a>
            );
          })}
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-light dark:border-navy-light pt-6 px-4">
            <a href="/client-portal" onClick={() => setMobileOpen(false)} className="rounded-md border border-navy dark:border-gray-light px-4 py-3 text-center text-body-sm font-medium text-navy dark:text-white">Client Portal</a>
            <a href="/get-quote" onClick={() => setMobileOpen(false)} className="rounded-md bg-teal px-4 py-3 text-center text-body-sm font-medium text-white">Get a Quote</a>
            <div className="flex items-center justify-center gap-4 pt-4">
              <a href="https://linkedin.com/company/herman-software" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-white dark:hover:text-teal transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://twitter.com/hermansoftware" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-white dark:hover:text-teal transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href="https://facebook.com/hermansoftware" target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-white dark:hover:text-teal transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}