"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { getNavigation, getSiteSettings } from "@/sanity/queries";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    getNavigation().then(setNavLinks);
    getSiteSettings().then(setSettings);
  }, []);

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
                <div className="text-lg font-bold leading-tight tracking-tight text-navy dark:text-white">{settings?.siteName || "HERMAN"}</div>
                <div className="text-[10px] font-light uppercase tracking-[3px] text-charcoal dark:text-gray-medium">Software Solutions</div>
              </div>
            </a>

            <nav className="hidden lg:flex lg:items-center lg:gap-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className={cn("rounded-md px-3 py-2 text-body-sm font-medium transition-colors", isActive(link.href) ? "text-teal" : "text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal")}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex lg:items-center lg:gap-2">
              <ThemeToggle />
              {settings?.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal transition-colors" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              )}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal transition-colors" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </a>
              )}
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-charcoal hover:text-teal dark:text-gray-light dark:hover:text-teal transition-colors" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              )}
              <a href="/client-portal" className="rounded-md border border-navy px-4 py-2 text-body-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white dark:border-gray-light dark:text-gray-light dark:hover:bg-gray-light dark:hover:text-navy">Client Portal</a>
              <a href="/get-quote" className="rounded-md bg-teal px-4 py-2 text-body-sm font-medium text-white transition-colors hover:bg-teal-dark">Get a Quote</a>
            </div>

            {/* Mobile: ThemeToggle + Hamburger */}
            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg p-2 text-navy transition-colors hover:bg-gray-light dark:text-white dark:hover:bg-navy-light"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <span className={cn("block h-0.5 w-5 bg-current transition-all duration-300", mobileOpen && "translate-y-2 rotate-45")} />
                  <span className={cn("block h-0.5 w-5 bg-current transition-all duration-300", mobileOpen && "opacity-0")} />
                  <span className={cn("block h-0.5 w-5 bg-current transition-all duration-300", mobileOpen && "-translate-y-2 -rotate-45")} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Smooth Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        settings={settings}
      />
    </>
  );
}