interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export function TestimonialCard({ name, role, company, quote }: TestimonialCardProps) {
  return (
    <div className="card-base flex flex-col gap-4 p-6 transition-all duration-300 hover:shadow-cardHover">
      {/* Quote Icon */}
      <div className="text-teal">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 11h-4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm8 0h-4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zM6 13v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4H6zm8 0v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h-6z" />
        </svg>
      </div>
      <p className="text-body text-charcoal italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-auto border-t border-gray-light pt-4">
        <p className="text-body-sm font-semibold text-navy">{name}</p>
        <p className="text-body-sm text-gray-medium">{role}, {company}</p>
      </div>
    </div>
  );
}