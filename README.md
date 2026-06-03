herman-software-website/README.md

```markdown
# HERMAN Software Solutions — Website

[![Deploy on Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://herman-software-website.vercel.app)
[![Sanity Studio](https://img.shields.io/badge/cms-sanity-f03e2f?logo=sanity)](https://herman-software-solutions.sanity.studio)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The official website for **HERMAN Software Solutions Limited** — a software engineering company based in Jinja, Uganda, serving clients across East Africa and beyond.

🌐 **Live Site:** [herman-software-website.vercel.app](https://herman-software-website.vercel.app)  
🎛️ **CMS Dashboard:** [herman-software-solutions.sanity.studio](https://herman-software-solutions.sanity.studio)

---

## About

We design, develop, and deploy robust software systems — websites, mobile apps, and enterprise platforms — built on sound architecture and delivered with clear, collaborative communication.

This site serves as our digital storefront, portfolio, and client engagement platform.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **CMS** | [Sanity](https://www.sanity.io/) (headless) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Analytics** | Google Analytics (consent-based) |
| **Live Chat** | Tawk.to (with proactive triggers) |

---

## Features

- ⚡ Server-side rendering with Next.js App Router
- 🎨 Fully responsive design with Tailwind CSS + dark mode
- 📝 Blog with search, categories, and social sharing
- 🗂️ Dynamic portfolio with sector-based filtering
- 👥 Team member profiles with skills, bios, and project history
- 💬 Client testimonials with star ratings
- 💰 Transparent pricing page
- 📧 Contact & quote request forms
- 📰 Newsletter signup
- 🔍 SEO optimized (sitemap, OG images, FAQ schema, breadcrumbs)
- 🍪 GDPR-friendly cookie consent
- ♿ Accessibility focused (skip links, ARIA labels)
- 📄 Case study PDF downloads
- 🔄 Page transition animations

---

## Related Repositories

| Repo | Description |
|------|-------------|
| [herman-sanity-studio](https://github.com/jiangsalim/herman-sanity-studio) | Sanity Studio — content management dashboard |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/jiangsalim/herman-software-website.git
cd herman-software-website

# Install dependencies
npm install

# Get the .env.local file from the project owner
# (Contains Sanity project credentials)

# Run the development server
npm run dev
```

Open http://localhost:3000 in your browser.

Build

```bash
npm run build
npm start
```

---

Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/            # About page (team, mission, values)
│   ├── api/              # API routes (contact, quote, OG images)
│   ├── blog/             # Blog listing, categories, detail pages
│   ├── careers/          # Careers/jobs page
│   ├── contact/          # Contact page
│   ├── our-work/         # Portfolio listing & project detail
│   ├── pricing/          # Pricing page
│   ├── services/         # Services overview & detail pages
│   ├── team/[slug]/      # Individual team member profiles
│   ├── testimonials/     # All client testimonials
│   ├── layout.tsx        # Root layout (header, footer, scripts)
│   ├── sitemap.ts        # Dynamic sitemap from Sanity
│   └── robots.ts         # Robots.txt config
├── components/
│   ├── blog/             # BlogCard, BlogList, BlogSearch, TableOfContents
│   ├── forms/            # ContactForm, QuoteForm, NewsletterForm
│   ├── home/             # Homepage sections (Hero, Services, Testimonials, etc.)
│   ├── layout/           # Header, Footer, MobileMenu, WhatsAppButton
│   ├── portfolio/        # PortfolioContent, ProjectFilters
│   ├── shared/           # Reusable components (Button, Card, Skeleton, etc.)
│   └── ui/               # Utility components (BackToTop, ThemeToggle, Logo)
├── data/                 # Static fallback data
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, validators, SEO helpers
├── sanity/               # Sanity client & GROQ queries
└── types/                # TypeScript type definitions
public/                   # Static assets (images, fonts, downloads)
```

---

Content Management

All dynamic content is managed via Sanity Studio at:

👉 herman-software-solutions.sanity.studio

Content types in Sanity:

Schema Used On
Blog Post Blog pages
Project Portfolio / Our Work
Testimonial Homepage, Testimonials page
Service Homepage, Services page, Footer
Team Member About page, Team detail pages
FAQ Contact page
Stat Homepage TrustBar, About page
Site Settings Header, Footer, Hero, Contact info
Process Step Homepage, Services page
Value Proposition Homepage (Why Choose Us)
Product Homepage (Product Showcase)
Navigation Item Header, Footer links
Technology Homepage TrustBar
Pricing Plan Pricing page

---

Deployment

This site auto-deploys to Vercel on every push to main. Preview deployments are created for all pull requests.

---

Contributing

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m 'Add amazing feature'
4. Push to your fork: git push origin feature/amazing-feature
5. Open a Pull Request against jiangsalim/herman-software-website/main

Keeping your fork updated:

```bash
git remote add upstream https://github.com/jiangsalim/herman-software-website.git
git checkout main
git pull upstream main
git push origin main
```

---

Owner

Jiang Herman Salim
Founder & Lead Software Engineer
HERMAN Software Solutions Limited

· 🌐 herman-software-website.vercel.app
· 💼 LinkedIn
· 🐦 X / Twitter
· 📘 Facebook
· 📧 infohermansoftware@gmail.com

---

License

MIT License — see LICENSE for details.

---

Engineered Software, Measurable Results — From Jinja, for the World.

```

---