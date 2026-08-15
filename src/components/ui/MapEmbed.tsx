export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-card border border-gray-light">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d680.1075880155107!2d33.20557573586829!3d0.42424728551584795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177e7bd7011a2805%3A0x4d35e31438c6d5ff!2sHERMAN%20Software%20Solutions%20Limited!5e1!3m2!1sen!2sug!4v1786814001125!5m2!1sen!2sug"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="HERMAN Software Solutions Location — Jinja, Uganda"
        className="block"
      />
    </div>
  );
}