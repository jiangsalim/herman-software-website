"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

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
      <header className="sticky top-0 z-50 border-b border-gray-light bg-white/95 backdrop-blur-sm">
        <div className="container-site">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
                  <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" stroke="#0A1F3F" strokeWidth="2" fill="none" />
                  <line x1="14" y1="12" x2="14" y2="28" stroke="#0A1F3F" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="26" y1="12" x2="26" y2="28" stroke="#0A1F3F" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="14" y1="20" x2="26" y2="20" stroke="#00C2BA" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold leading-tight tracking-tight text-navy">HERMAN</div>
                <div className="text-[10px] font-light uppercase tracking-[3px] text-charcoal">Software Solutions</div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1">
              {NAV_LINKS.map((link) => {
                if ("children" in link && link.children) {
                  return (
                    <div key={link.label} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                      <button className={cn("flex items-center gap-1 rounded-md px-3 py-2 text-body-sm font-medium transition-colors", servicesOpen ? "text-teal" : "text-charcoal hover:text-teal")}>
                        {link.label}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {servicesOpen && (
                        <div className="absolute left-0 top-full mt-1 w-56 rounded-card border border-gray-light bg-white py-2 shadow-card">
                          {link.children.map((child) => (
                            <a key={child.href} href={child.href} className={cn("block px-4 py-2 text-body-sm transition-colors hover:bg-gray-light hover:text-teal", isActive(child.href) && "font-medium text-teal")}>
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <a key={link.href} href={link.href} className={cn("rounded-md px-3 py-2 text-body-sm font-medium transition-colors", isActive(link.href) ? "text-teal" : "text-charcoal hover:text-teal")}>
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <a href="/client-portal" className="rounded-md border border-navy px-4 py-2 text-body-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white">Client Portal</a>
              <a href="/get-quote" className="rounded-md bg-teal px-4 py-2 text-body-sm font-medium text-white transition-colors hover:bg-teal-dark">Get a Quote</a>
            </div>

            {/* Theme Toggle */}
<ThemeToggle />

            {/* Mobile Toggle */}
<button
  onClick={() => setMobileOpen(!mobileOpen)}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center rounded-md p-2 text-navy lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay — outside the header, always mount, controlled by mobileOpen */}
      <div className={`fixed inset-0 top-16 z-[9999] bg-white lg:hidden overflow-y-auto transition-opacity duration-200 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="container-site flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => {
            if ("children" in link && link.children) {
              return (
                <div key={link.label} className="border-b border-gray-light">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex w-full items-center justify-between px-4 py-3 text-body font-medium text-charcoal"
                  >
                    {link.label}
                    <svg className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 border-l-2 border-gray-light pl-4">
                      {link.children.map((child) => (
                        <a key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className={cn("block px-4 py-3 text-body-sm transition-colors hover:text-teal", isActive(child.href) && "font-medium text-teal")}>
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={cn("rounded-md px-4 py-3 text-body font-medium transition-colors", isActive(link.href) ? "bg-gray-light text-teal" : "text-charcoal hover:bg-gray-light hover:text-teal")}>
                {link.label}
              </a>
            );
          })}
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-light pt-6 px-4">
            <a href="/client-portal" onClick={() => setMobileOpen(false)} className="rounded-md border border-navy px-4 py-3 text-center text-body-sm font-medium text-navy">Client Portal</a>
            <a href="/get-quote" onClick={() => setMobileOpen(false)} className="rounded-md bg-teal px-4 py-3 text-center text-body-sm font-medium text-white">Get a Quote</a>
          </div>
        </div>
      </div>
    </>
  );
}