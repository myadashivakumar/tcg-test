export default function PuneCommunityGraphic() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md"
      role="img"
      aria-label="Illustration of a network of Telugu families connected across Pune"
    >
      <rect x="0" y="0" width="480" height="360" rx="24" fill="#EEF2FF" />

      {/* Skyline */}
      <g fill="#312E81" opacity="0.9">
        <rect x="24" y="230" width="36" height="100" rx="3" />
        <rect x="66" y="200" width="30" height="130" rx="3" />
        <rect x="102" y="250" width="28" height="80" rx="3" />
        <rect x="136" y="180" width="34" height="150" rx="3" />
        <rect x="176" y="220" width="26" height="110" rx="3" />
        <rect x="208" y="240" width="30" height="90" rx="3" />
        <rect x="244" y="195" width="32" height="135" rx="3" />
        <rect x="282" y="235" width="28" height="95" rx="3" />
        <rect x="316" y="210" width="30" height="120" rx="3" />
        <rect x="352" y="250" width="26" height="80" rx="3" />
        <rect x="384" y="225" width="34" height="105" rx="3" />
        <rect x="424" y="245" width="28" height="85" rx="3" />
      </g>

      {/* Window lights */}
      <g fill="#FBBF24" opacity="0.85">
        <rect x="32" y="245" width="6" height="6" rx="1" />
        <rect x="46" y="245" width="6" height="6" rx="1" />
        <rect x="32" y="262" width="6" height="6" rx="1" />
        <rect x="74" y="215" width="6" height="6" rx="1" />
        <rect x="74" y="235" width="6" height="6" rx="1" />
        <rect x="144" y="200" width="6" height="6" rx="1" />
        <rect x="144" y="220" width="6" height="6" rx="1" />
        <rect x="252" y="215" width="6" height="6" rx="1" />
        <rect x="252" y="235" width="6" height="6" rx="1" />
        <rect x="324" y="230" width="6" height="6" rx="1" />
        <rect x="392" y="245" width="6" height="6" rx="1" />
      </g>

      {/* Ground line */}
      <line x1="16" y1="330" x2="464" y2="330" stroke="#C7D2FE" strokeWidth="2" />

      {/* Map pin marking Pune */}
      <g transform="translate(240, 96)">
        <path
          d="M0 -46C-17 -46 -30 -33 -30 -16C-30 8 0 40 0 40C0 40 30 8 30 -16C30 -33 17 -46 0 -46Z"
          fill="#4338CA"
        />
        <circle cx="0" cy="-16" r="11" fill="#EEF2FF" />
        <text x="0" y="58" textAnchor="middle" fontSize="14" fontWeight="600" fill="#312E81">
          PUNE
        </text>
      </g>

      {/* Community network: family nodes connected around the pin */}
      <g stroke="#A5B4FC" strokeWidth="1.5">
        <line x1="240" y1="80" x2="120" y2="130" />
        <line x1="240" y1="80" x2="360" y2="130" />
        <line x1="240" y1="80" x2="180" y2="60" />
        <line x1="240" y1="80" x2="300" y2="60" />
        <line x1="120" y1="130" x2="70" y2="170" />
        <line x1="360" y1="130" x2="410" y2="170" />
        <line x1="180" y1="60" x2="120" y2="130" />
        <line x1="300" y1="60" x2="360" y2="130" />
      </g>

      {/* Family nodes (house glyph inside each) */}
      {[
        { x: 180, y: 60, r: 16 },
        { x: 300, y: 60, r: 16 },
        { x: 120, y: 130, r: 20 },
        { x: 360, y: 130, r: 20 },
        { x: 70, y: 170, r: 16 },
        { x: 410, y: 170, r: 16 },
      ].map((n, i) => (
        <g key={i} transform={`translate(${n.x}, ${n.y})`}>
          <circle r={n.r} fill={i % 2 === 0 ? "#F59E0B" : "#4338CA"} />
          <path
            d={`M${-n.r * 0.45} ${n.r * 0.1} L0 ${-n.r * 0.4} L${n.r * 0.45} ${n.r * 0.1} L${n.r * 0.3} ${n.r * 0.1} L${n.r * 0.3} ${n.r * 0.45} L${-n.r * 0.3} ${n.r * 0.45} L${-n.r * 0.3} ${n.r * 0.1} Z`}
            fill="#FFFFFF"
          />
        </g>
      ))}
    </svg>
  );
}
