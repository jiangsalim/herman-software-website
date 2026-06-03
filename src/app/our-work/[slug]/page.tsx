"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProject, getRelatedProjects } from "@/sanity/queries";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/shared/Button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SocialShare } from "@/components/shared/SocialShare";
import { Skeleton } from "@/components/shared/Skeleton";
import { DownloadPDF } from "@/components/shared/DownloadPDF";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getProject(slug as string).then((data) => {
        setProject(data);
        if (data?.sector) {
          getRelatedProjects(data.sector, slug as string).then(setRelatedProjects);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <section className="bg-navy py-20">
          <div className="container-site">
            <Skeleton className="h-10 w-2/3 mb-4" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </section>
        <section className="section-padding bg-white">
          <div className="container-site mx-auto max-w-3xl space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </section>
      </>
    );
  }

  if (!project) {
    return (
      <section className="section-padding bg-white text-center">
        <div className="container-site">
          <h1 className="mb-4">Project Not Found</h1>
          <p className="text-charcoal mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Button href="/our-work" variant="primary">View All Projects</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Our Work", href: "/our-work" },
              { label: project.title },
            ]}
          />
          <span className="inline-block rounded-full bg-teal/20 px-3 py-1 text-xs font-medium text-teal mb-4">
            {project.sector}
          </span>
          <h1 className="text-white max-w-3xl">{project.title}</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies?.map((tech: string) => (
              <span key={tech} className="rounded-full border border-gray-medium/30 px-3 py-1 text-xs text-gray-medium">
                {tech}
              </span>
            ))}
          </div>
          {/* Download PDF */}
          <div className="mt-6">
            <DownloadPDF
              title={project.title}
              sector={project.sector}
              challenge={project.challenge}
              solution={project.solution}
              result={project.result}
              technologies={project.technologies || []}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-site mx-auto max-w-3xl">
          <div className="mb-8">
            <SocialShare
              title={project.title}
              url={typeof window !== "undefined" ? window.location.href : ""}
            />
          </div>

          <div className="mb-10">
            <h3 className="mb-3 text-teal">The Challenge</h3>
            <p className="text-body text-charcoal">{project.challenge}</p>
          </div>

          <div className="mb-10">
            <h3 className="mb-3 text-teal">Our Solution</h3>
            <p className="text-body text-charcoal">{project.solution}</p>
          </div>

          <div className="mb-10">
            <h3 className="mb-3 text-teal">The Result</h3>
            <p className="text-body text-charcoal">{project.result}</p>
          </div>

          <div className="rounded-card bg-gray-light p-8 text-center dark:bg-navy">
            <h3 className="mb-2">Have a Similar Project?</h3>
            <p className="mb-4 text-charcoal dark:text-gray-medium">Let&apos;s discuss how we can help your business.</p>
            <Button href="/get-quote" variant="primary">Get a Quote</Button>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-gray-light">
          <div className="container-site">
            <h2 className="mb-8 text-center">Related Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((rp: any) => (
                <ProjectCard
                  key={rp.slug}
                  title={rp.title}
                  sector={rp.sector}
                  challenge={rp.challenge}
                  result={rp.result}
                  href={`/our-work/${rp.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-navy py-16 text-center">
        <div className="container-site">
          <h2 className="text-white">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-gray-medium">
            Let&apos;s talk about your requirements. Free consultation, no obligation.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary">Start the Conversation</Button>
          </div>
        </div>
      </section>
    </>
  );
}