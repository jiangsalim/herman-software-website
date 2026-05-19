import { sanityClient } from "./client";

export async function getBlogPosts() {
  return sanityClient.fetch(
    *[_type == "blogPost"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      author,
      publishedAt,
      category,
      excerpt
    }
  );
}

export async function getBlogPost(slug: string) {
  return sanityClient.fetch(
    *[_type == "blogPost" && slug.current ==  + "$slug" + ][0] {
      "slug": slug.current,
      title,
      author,
      publishedAt,
      category,
      excerpt,
      body
    },
    { slug }
  );
}

export async function getProjects() {
  return sanityClient.fetch(
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
  );
}

export async function getProject(slug: string) {
  return sanityClient.fetch(
    *[_type == "project" && slug.current ==  + "$slug" + ][0] {
      "slug": slug.current,
      title,
      sector,
      challenge,
      solution,
      result,
      technologies,
      "thumbnail": thumbnail.asset->url
    },
    { slug }
  );
}
