export const siteConfig = {
  name: "HERMAN Software Solutions Limited",
  shortName: "HERMAN",
  tagline: "Engineered Software, Measurable Results",
  description:
    "We design, develop, and deploy robust software systems — websites, mobile apps, and enterprise platforms — built on sound architecture and delivered with clear, collaborative communication. Based in Jinja, Uganda.",

  url: process.env.NEXT_PUBLIC_SITE_URL || "https://herman-software-website.vercel.app",
  ogImage: "/images/og-default.jpg",

  address: "Haji Tarmchi, Jinja, Uganda",
  email: "infohermansoftware@gmail.com",
  phone: "+256772723188",
  whatsapp: "+256772723188",
  officeHours: "Monday–Friday, 9:00 AM – 5:00 PM EAT",

  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8165!2d33.210978!3d0.439670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db0e4c5e4e6e3%3A0x8e6e3e8e6e3e8e6e!2sHaji%20Tarmchi%2C%20Jinja%2C%20Uganda!5e0!3m2!1sen!2sug!4v1",

  social: {
    linkedin: "https://www.linkedin.com/in/jaing-salim-2641a6280?trk=contact-info",
    twitter: "https://x.com/JiangSalim1",
    facebook: "https://www.facebook.com/jiangsalim1",
  },

  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
  },

  copyright: `© ${new Date().getFullYear()} HERMAN Software Solutions Limited. All rights reserved.`,
} as const;

export type SiteConfig = typeof siteConfig;
