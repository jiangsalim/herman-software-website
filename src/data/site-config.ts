export const siteConfig = {
  name: "HERMAN Software Solutions Limited",
  shortName: "HERMAN",
  tagline: "Engineered Software, Measurable Results",
  description:
    "We design, develop, and deploy robust software systems — websites, mobile apps, and enterprise platforms — built on sound architecture and delivered with clear, collaborative communication. Based in Jinja, Uganda.",

  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hermansoftware.com",
  ogImage: "/images/og-default.jpg",

  address: "Haji Tarmchi, Jinja, Uganda",
  email: "infohermansoftware@gmail.com",
  phone: "+256-772-723-188",
  whatsapp: "+256772723188",
  officeHours: "Monday–Friday, 9:00 AM – 5:00 PM EAT",

  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.XXXXX!2d33.XXXXX!3d0.XXXXX!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDAnMDAuMCJOIDMzwrAwMCcwMC4wIkU!5e0!3m2!1sen!2sug!4vXXXXXXXXXX",

  social: {
    linkedin: "https://linkedin.com/company/herman-software",
    twitter: "https://twitter.com/hermansoftware",
    facebook: "https://facebook.com/hermansoftware",
  },

  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
  },

  copyright: `© ${new Date().getFullYear()} HERMAN Software Solutions Limited. All rights reserved.`,
} as const;

export type SiteConfig = typeof siteConfig;