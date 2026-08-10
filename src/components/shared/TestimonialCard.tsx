interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating?: number;
  avatar?: string;
}

export function TestimonialCard({ name, role, quote, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="card-base flex flex-col gap-4 p-6 transition-all duration-300 hover:shadow-cardHover">
      {/* Avatar + Stars + Quote Icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-navy/10">
            {avatar ? (
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-navy">
                {name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
            )}
          </div>
          {/* Quote Icon */}
          <div className="text-teal">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 11h-4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm8 0h-4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zM6 13v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4H6zm8 0v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h-6z" />
            </svg>
          </div>
        </div>
        {rating && (
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#F59E0B" : "#E5E7EB"}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        )}
      </div>
      <p className="text-body text-charcoal italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-auto border-t border-gray-light pt-4">
        <p className="text-body-sm font-semibold text-navy">{name}</p>
        <p className="text-body-sm text-gray-medium">{role}</p>
      </div>
    </div>
  );
}