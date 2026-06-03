import { sanityClient } from "./client";

// ─── Blog Posts ───────────────────────────────
export async function getBlogPosts() {
  return sanityClient.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      author,
      publishedAt,
      category,
      excerpt
    }
  `);
}

export async function getBlogPost(slug: string) {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      author,
      publishedAt,
      category,
      excerpt,
      body
    }`,
    { slug }
  );
}

// ─── Projects ─────────────────────────────────
export async function getProjects() {
  return sanityClient.fetch(`
    *[_type == "project"] | order(title asc) {
      "slug": slug.current,
      title,
      sector,
      challenge,
      solution,
      result,
      technologies,
      "thumbnail": thumbnail.asset->url
    }
  `);
}

export async function getProject(slug: string) {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      sector,
      challenge,
      solution,
      result,
      technologies
    }`,
    { slug }
  );
}

// ─── Testimonials ─────────────────────────────
export async function getTestimonials() {
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(order asc) {
      name,
      role,
      quote,
      rating,
      "avatar": avatar.asset->url
    }
  `);
}

// ─── Services ─────────────────────────────────
export async function getServices() {
  return sanityClient.fetch(`
    *[_type == "service"] | order(order asc) {
      title,
      description,
      icon,
      link,
      features
    }
  `);
}

// ─── Team Members ─────────────────────────────
export async function getTeamMembers() {
  return sanityClient.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      name,
      "slug": slug.current,
      role,
      bio,
      "image": image.asset->url,
      linkedin,
      github
    }
  `);
}

export async function getTeamMember(slug: string) {
  return sanityClient.fetch(
    `*[_type == "teamMember" && slug.current == $slug][0] {
      name,
      "slug": slug.current,
      role,
      bio,
      fullBio,
      "image": image.asset->url,
      skills,
      "projects": projects[]-> {
        "slug": slug.current,
        title,
        sector,
        challenge,
        result,
        technologies,
        "thumbnail": thumbnail.asset->url
      },
      linkedin,
      github,
      email
    }`,
    { slug }
  );
}

// ─── FAQs ─────────────────────────────────────
export async function getFAQs() {
  return sanityClient.fetch(`
    *[_type == "faq"] | order(order asc) {
      question,
      answer,
      category
    }
  `);
}

// ─── Stats ────────────────────────────────────
export async function getStats() {
  return sanityClient.fetch(`
    *[_type == "stat"] | order(order asc) {
      value,
      label,
      suffix
    }
  `);
}

// ─── Site Settings ────────────────────────────
export async function getSiteSettings() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      tagline,
      heroTitle,
      heroDescription,
      email,
      phone,
      address,
      workingHours,
      whatsappNumber,
      facebook,
      twitter,
      linkedin,
      instagram,
      youtube
    }
  `);
}

// ─── Process Steps ────────────────────────────
export async function getProcessSteps() {
  return sanityClient.fetch(`
    *[_type == "process"] | order(stepNumber asc) {
      stepNumber,
      title,
      description,
      icon
    }
  `);
}

// ─── Value Propositions ───────────────────────
export async function getValuePropositions() {
  return sanityClient.fetch(`
    *[_type == "valueProposition"] | order(order asc) {
      title,
      description,
      icon
    }
  `);
}

// ─── Products ─────────────────────────────────
export async function getProducts() {
  return sanityClient.fetch(`
    *[_type == "product"] | order(order asc) {
      name,
      tagline,
      description,
      badge,
      platforms,
      link,
      linkText,
      "icon": icon.asset->url
    }
  `);
}

// ─── Navigation ───────────────────────────────
export async function getNavigation() {
  return sanityClient.fetch(`
    *[_type == "navigation"] | order(order asc) {
      label,
      href,
      isButton
    }
  `);
}

// ─── Technologies ─────────────────────────────
export async function getTechnologies() {
  return sanityClient.fetch(`
    *[_type == "technology"] | order(order asc) {
      name,
      "icon": icon.asset->url
    }
  `);
}

// ─── Related Projects ─────────────────────────
export async function getRelatedProjects(sector: string, currentSlug: string) {
  return sanityClient.fetch(
    `*[_type == "project" && sector == $sector && slug.current != $currentSlug] | order(title asc) [0...3] {
      "slug": slug.current,
      title,
      sector,
      challenge,
      result,
      "thumbnail": thumbnail.asset->url
    }`,
    { sector, currentSlug }
  );
}

// ─── Pricing Plans ────────────────────────────
export async function getPricingPlans() {
  return sanityClient.fetch(`
    *[_type == "pricingPlan"] | order(order asc) {
      name,
      price,
      timeline,
      description,
      features,
      cta,
      href,
      highlighted
    }
  `);
}

// ─── Jobs ─────────────────────────────────────
export async function getJobs() {
  return sanityClient.fetch(`
    *[_type == "job" && active == true] | order(order asc) {
      title,
      "slug": slug.current,
      type,
      location,
      description,
      fullDescription,
      requirements,
      applyEmail
    }
  `);
}