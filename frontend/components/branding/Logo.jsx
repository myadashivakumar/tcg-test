export default function Logo({ tagline = true, className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 48 56" className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="5" r="2.5" fill="#D4A017" />
          <path d="M24 9 L27.5 15 L20.5 15 Z" fill="#D4A017" />
          <path d="M15 17 H33 L29.5 25 H18.5 Z" fill="#D4A017" />
          <path d="M11 27 H37 L32.5 36 H15.5 Z" fill="#0F5132" />
          <path d="M7 38 H41 L41 46 H7 Z" fill="#0F5132" />
          <rect x="15" y="46" width="4.5" height="9" fill="#0F5132" />
          <rect x="28.5" y="46" width="4.5" height="9" fill="#0F5132" />
        </svg>
        <div className="text-left">
          <div className="font-serif-display text-3xl font-bold leading-none tracking-wide text-emerald-900" style={{ fontFamily: "var(--font-playfair)" }}>
            TTCG
          </div>
          <div className="mt-1 text-[10px] font-semibold tracking-[0.25em] text-amber-600">
            TELUGU COMMUNITY GROUP
          </div>
        </div>
      </div>
      {tagline && (
        <div className="mt-2 flex items-center gap-2 text-xs italic text-emerald-800/80">
          <span>Connect</span>
          <span className="text-amber-500">•</span>
          <span>Support</span>
          <span className="text-amber-500">•</span>
          <span>Grow Together</span>
        </div>
      )}
    </div>
  );
}
