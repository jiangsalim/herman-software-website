"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ProjectFilters } from "@/components/portfolio/ProjectFilters";

interface Project {
  slug: string;
  title: string;
  sector: string;
  challenge: string;
  result: string;
}

interface PortfolioContentProps {
  projects: Project[];
}

export function PortfolioContent({ projects }: PortfolioContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.sector)))];
  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.sector === activeCategory);

  return (
    <>
      <ProjectFilters categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            sector={project.sector}
            challenge={project.challenge}
            result={project.result}
            href={`/our-work/${project.slug}`}
          />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-10 text-center text-charcoal">No projects found.</p>}
    </>
  );
}