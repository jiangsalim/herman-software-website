"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/shared/Button";
import { getProjects } from "@/sanity/queries";

export function FeaturedWork() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const featured = projects.slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <SectionHeading
          title="Selected Projects"
          subtitle="Real solutions we've delivered for real businesses."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project: any) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              sector={project.sector}
              challenge={project.challenge}
              result={project.result}
              href={`/our-work/${project.slug}`}
              thumbnail={project.thumbnail}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/our-work" variant="secondary">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}