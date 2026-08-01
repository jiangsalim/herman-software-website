import Link from "next/link";

interface ProjectCardProps {
  title: string;
  sector: string;
  challenge: string;
  result: string;
  href: string;
  thumbnail?: string;
}

export function ProjectCard({ title, sector, challenge, result, href, thumbnail }: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="card-base group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden bg-navy/5">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A1F3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-20">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
        )}
        {/* Sector badge overlay */}
        <span className="absolute top-3 left-3 rounded-full bg-navy/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
          {sector}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-h5 font-semibold text-navy group-hover:text-teal transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-body-sm text-charcoal line-clamp-2 leading-relaxed">
          {challenge}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-gray-light pt-3">
          <span className="text-xs font-medium text-teal line-clamp-1 flex-1 mr-2">
            {result}
          </span>
          <span className="flex-shrink-0 text-xs font-medium text-teal opacity-0 group-hover:opacity-100 transition-opacity">
            View Project →
          </span>
        </div>
      </div>
    </Link>
  );
}