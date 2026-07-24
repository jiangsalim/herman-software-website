"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: any[];
  settings: any;
}

export function MobileMenu({ isOpen, onClose, navLinks, settings }: MobileMenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[380px] bg-white dark:bg-navy-dark lg:hidden shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-light dark:border-navy-light px-4 py-4">
          <span className="text-sm font-semibold text-navy dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-navy hover:bg-gray-light dark:text-white dark:hover:bg-navy-light transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 overflow-y-auto px-4 py-4" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "rounded-lg px-4 py-3 text-body font-medium transition-all duration-200",
                isActive(link.href)
                  ? "bg-teal/10 text-teal"
                  : "text-charcoal dark:text-white hover:bg-gray-light dark:hover:bg-navy-light hover:text-teal hover:translate-x-1"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-light dark:border-navy-light bg-white dark:bg-navy-dark p-4 space-y-3">
          <Link
            href="/client-portal"
            onClick={onClose}
            className="block rounded-lg border border-navy dark:border-gray-light px-4 py-3 text-center text-body-sm font-medium text-navy dark:text-white hover:bg-navy hover:text-white dark:hover:bg-gray-light dark:hover:text-navy transition-all duration-200"
          >
            Client Portal
          </Link>
          <Link
            href="/get-quote"
            onClick={onClose}
            className="block rounded-lg bg-teal px-4 py-3 text-center text-body-sm font-medium text-white hover:bg-teal-dark transition-all duration-200 hover:shadow-lg hover:shadow-teal/20"
          >
            Get a Quote
          </Link>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-2">
            {settings?.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-charcoal hover:text-teal dark:text-white dark:hover:text-teal transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {settings?.twitter && (
              <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-charcoal hover:text-teal dark:text-white dark:hover:text-teal transition-colors" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
            {settings?.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-charcoal hover:text-teal dark:text-white dark:hover:text-teal transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}