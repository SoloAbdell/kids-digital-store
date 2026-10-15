export default function BrandLogo({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-2xl shadow-md border border-slate-800/20 bg-slate-950 ${className}`}>
      <img
        src="/logo.jpg"
        alt="Tagline Logo"
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
