export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Amos Okello",
    role: "Operations Manager",
    company: "Jinja Retail Group",
    quote: "HERMAN built our inventory system and it transformed how we track stock across 12 branches. Stockouts dropped by 60% in the first quarter. They understood our workflow better than we did.",
  },
  {
    name: "Grace Nantume",
    role: "Owner",
    company: "Jinja Heights Hotel",
    quote: "Before HERMAN, all our bookings came by phone. They built us a website with online booking and now 35% of our revenue comes directly from the site. Professional, on time, and on budget.",
  },
  {
    name: "Robert Kisitu",
    role: "CEO",
    company: "AgriCoop Uganda",
    quote: "We needed a payment system for 2,000 farmers and HERMAN delivered a mobile app that works flawlessly. Payment processing time went from 2 weeks to 24 hours. Remarkable team.",
  },
  {
    name: "Sarah Birungi",
    role: "Director",
    company: "Kampala Logistics Ltd",
    quote: "Our fleet tracking system built by HERMAN saved us 22% on fuel costs in the first 6 months. The real-time GPS dashboard gives us visibility we never had before.",
  },
];