import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { getProject, getProjects } from "@/sanity/queries";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}