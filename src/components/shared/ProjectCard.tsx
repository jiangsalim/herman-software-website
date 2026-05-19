interface ProjectCardProps {
  title: string;
  sector: string;
  challenge: string;
  result: string;
  href: string;
}

// Screenshots for specific projects
const screenshots: Record<string, string> = {
  "mediavault-toolkit": "https://herman-software-website.vercel.app/images/projects/mediavault-home.jpg",
};

export function ProjectCard({ title, sector, challenge, result, href }: ProjectCardProps) {
  // Extract slug from href (e.g., "/our-work/mediavault-toolkit" → "mediavault-toolkit")
  const slug = href.split("/").pop() || "";
  const thumbnailSrc = screenshots[slug];

  return (
    <a
      href={href}
      className="card-base group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="flex h-48 items-center justify-center bg-navy/5">
        {thumbnailSrc ? (
          <img src={thumbnailSrc} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-navy/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A1F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <p className="text-body-sm font-medium text-navy">{title}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="inline-block w-fit rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
          {sector}
        </span>
        <h3 className="text-h4 transition-colors group-hover:text-teal">{title}</h3>
        <p className="text-body-sm text-charcoal">{challenge}</p>
        <div className="mt-auto border-t border-gray-light pt-3">
          <p className="text-body-sm font-semibold text-teal">{result}</p>
        </div>
      </div>
    </a>
  );
}