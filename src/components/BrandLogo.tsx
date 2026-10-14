export default function BrandLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <img
        src="/logo.svg"
        alt="Tagline Logo"
        className="w-full h-full object-contain rounded-2xl shadow-sm hover:scale-105 transition-transform"
      />
    </div>
  );
}
