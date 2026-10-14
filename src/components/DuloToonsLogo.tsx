export default function DuloToonsLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none font-black tracking-wider leading-none text-center ${
      isLg ? 'scale-125 my-4' : isSm ? 'scale-90' : 'scale-100'
    }`}>
      {/* Crown */}
      <div className="-mb-1.5 z-10 animate-bounce transition-transform">
        <svg
          className={`${isLg ? 'w-10 h-7' : 'w-7 h-5'} text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] fill-current`}
          viewBox="0 0 24 16"
        >
          <path d="M1 14L4 3L9 9L12 1L15 9L20 3L23 14H1Z" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="4" cy="3" r="1.5" fill="#EF4444" />
          <circle cx="12" cy="1" r="1.5" fill="#3B82F6" />
          <circle cx="20" cy="3" r="1.5" fill="#10B981" />
        </svg>
      </div>

      {/* DULO TOONS Badge */}
      <div className="relative px-3 py-1 bg-white/95 rounded-2xl border-3 border-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex flex-col items-center">
        <span
          className={`font-black text-slate-900 tracking-wider ${
            isLg ? 'text-4xl' : 'text-xl'
          }`}
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 2px 0 rgba(0,0,0,0.08)',
            letterSpacing: '0.05em'
          }}
        >
          DULO
        </span>
        <span
          className={`font-black text-slate-800 tracking-widest -mt-1 ${
            isLg ? 'text-2xl' : 'text-sm'
          }`}
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.12em'
          }}
        >
          TOONS
        </span>
      </div>
    </div>
  );
}
