import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";
import { SkipLink } from "@/components/ui/SkipLink";
import { PageTransition } from "@/components/shared/PageTransition";
import { generateLocalBusinessSchema } from "@/lib/seo";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "software development Uganda",
    "web development Jinja",
    "mobile apps East Africa",
    "IT consulting Uganda",
    "custom software Jinja",
    "ERP systems Uganda",
    "POS systems Jinja",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
    icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Google Analytics — Consent-based */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var consent = localStorage.getItem('cookie-consent');
                if (consent === 'accepted') {
                  var gaId = '${process.env.NEXT_PUBLIC_GA_ID || ""}';
                  if (gaId) {
                    var script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
                    document.head.appendChild(script);
                    
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', gaId);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-charcoal dark:bg-navy-dark dark:text-gray-light transition-colors">
        <SkipLink />
        <Header />
        <main className="flex-1">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />

        {/* Tawk.to Live Chat — Enhanced */}
<script
  type="text/javascript"
  dangerouslySetInnerHTML={{
    __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      
      Tawk_API.onLoad = function(){
        // Suppress performance logging CORS errors
        Tawk_API.logPerformance = function(){};
        
        var visitorId = localStorage.getItem('tawk_visitor');
        if (visitorId) {
          Tawk_API.setAttributes({ id: visitorId }, function(){});
        } else {
          var newId = 'v_' + Date.now();
          localStorage.setItem('tawk_visitor', newId);
          Tawk_API.setAttributes({ id: newId }, function(){});
        }
        
        // Proactive chat after 45 seconds on pricing/quote pages
        var proactivePages = ['/get-quote', '/pricing', '/services', '/contact'];
        var currentPath = window.location.pathname;
        if (proactivePages.some(function(p) { return currentPath.startsWith(p); })) {
          setTimeout(function() {
            Tawk_API.maximize();
          }, 45000);
        }
      };
      
      // Track page views for analytics
      Tawk_API.onChatStarted = function(){
        if (typeof gtag !== 'undefined') {
          gtag('event', 'chat_started', { event_category: 'engagement' });
        }
      };
      
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6a031e36b31dab1c398e1064/1joe2s2dm';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `,
  }}
/>
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}