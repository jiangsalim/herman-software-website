interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export function TeamCard({ name, role, bio, image }: TeamCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="card-base flex flex-col items-center p-6 text-center transition-all duration-300 hover:shadow-cardHover">
      {/* Avatar */}
      <div className="mb-4 h-20 w-20 overflow-hidden rounded-full bg-navy">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
            {initials}
          </div>
        )}
      </div>
      <h3 className="text-h4">{name}</h3>
      <p className="mb-3 text-body-sm font-medium text-teal">{role}</p>
      <p className="text-body-sm text-charcoal">{bio}</p>
    </div>
  );
}