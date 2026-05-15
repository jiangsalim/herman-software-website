export interface Project {
  slug: string;
  title: string;
  sector: string;
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    slug: "smartstock-inventory",
    title: "SmartStock Inventory System",
    sector: "Retail",
    challenge:
      "A regional retail chain with 12 branches was relying on manual stock counts using paper and spreadsheets. Stockouts were frequent, inter-branch transfers were untracked, and shrinkage was estimated at 15% annually.",
    solution:
      "We built a cloud-based inventory management web application with barcode scanning via mobile devices, real-time stock level dashboards, automated low-stock alerts via SMS, and role-based access for branch managers, warehouse staff, and head office.",
    result: "60% reduction in stockouts, full audit traceability across all branches.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Redis"],
  },
  {
    slug: "jinja-heights-booking",
    title: "Jinja Heights Hotel — Booking Platform",
    sector: "Hospitality",
    challenge:
      "A popular hotel in Jinja had no online presence. All reservations came via phone calls or walk-ins, leading to double-bookings during peak seasons and no way to capture guest data for marketing.",
    solution:
      "We designed and developed a responsive, SEO-optimized website with an integrated real-time booking engine, automated email and SMS confirmations, a basic CRM for guest profiles, and a simple revenue dashboard for management.",
    result: "35% revenue uplift from direct online bookings within three months of launch.",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Twilio API"],
  },
  {
    slug: "agripay-mobile",
    title: "AgriPay Mobile",
    sector: "Agriculture / Fintech",
    challenge:
      "An agricultural cooperative with over 2,000 smallholder farmers needed a way to distribute payments for produce without cash. Most farmers were unbanked, and existing mobile money solutions required complex USSD codes that confused users.",
    solution:
      "We developed a cross-platform mobile application (Android and iOS) with a simple interface for farmers to receive payments, check balances, and view transaction history. Integrated with MTN Mobile Money and Airtel Money APIs, with a USSD fallback for feature phones.",
    result: "98% payment delivery success rate, eliminating cash handling risk and reducing payment processing time from 2 weeks to 24 hours.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Mobile Money APIs"],
  },
  {
    slug: "edulink-sms",
    title: "EduLink SMS — School Management System",
    sector: "Education",
    challenge:
      "A network of 8 private schools needed a centralized system to manage student records, fee payments, exam results, and parent communication. Each school was using its own Excel files, leading to data inconsistencies and delayed reporting.",
    solution:
      "We built a modular school management platform with: student enrollment and records, automated fee invoicing and payment tracking via mobile money, exam result entry and report card generation, and bulk SMS/email for parent communication.",
    result: "Administrative workload reduced by 40%, fee collection rate improved from 72% to 94%.",
    technologies: ["Laravel", "Vue.js", "MySQL", "Africa's Talking SMS API"],
  },
  {
    slug: "logitrack-fleet",
    title: "LogiTrack Fleet Management",
    sector: "Logistics / Transport",
    challenge:
      "A cross-border logistics company operating between Uganda, Kenya, and Rwanda had no visibility into truck locations, driver behavior, or delivery times. Fuel costs were high, and customers complained about lack of delivery updates.",
    solution:
      "We developed a GPS-based fleet tracking system with: real-time vehicle location on a map, driver behavior monitoring (speed, harsh braking, idling), automated ETA calculations and customer notifications, and fuel consumption analytics.",
    result: "Fuel costs reduced by 22%, on-time deliveries improved from 68% to 91%.",
    technologies: ["Node.js", "React", "MongoDB", "Google Maps API", "Socket.io"],
  },
];
