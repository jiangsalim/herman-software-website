import { CountUp } from "@/components/shared/CountUp";

export function TrustBar() {
  const technologies = [
    "React", "Next.js", "Node.js", "Python", "PostgreSQL",
    "MongoDB", "AWS", "Docker", "Android", "iOS",
  ];

  return (
    <section className="border-b border-gray-light bg-gray-light py-8 dark:bg-navy dark:border-navy-light">
      <div className="container-site">
        <p className="mb-6 text-center text-body-sm font-medium uppercase tracking-wider text-gray-medium">
          Trusted technology partner for startups, SMEs, and enterprises across East Africa
        </p>

        {/* Stats with Animated Counters */}
        <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { end: 50, suffix: "+", label: "Projects Delivered" },
            { end: 6, suffix: "+", label: "Years Experience" },
            { end: 30, suffix: "+", label: "Clients Served" },
            { end: 5, suffix: "", label: "Countries Reached" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-navy dark:text-white">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-body-sm text-gray-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-medium/30 bg-white px-4 py-1.5 text-xs font-medium text-gray-medium dark:bg-navy-light dark:border-navy dark:text-gray-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}