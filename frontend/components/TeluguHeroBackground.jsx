export default function TeluguHeroBackground({ className = "" }) {
  const buildings = [
    { x: 520, y: 560, w: 46, h: 130 },
    { x: 572, y: 520, w: 40, h: 170 },
    { x: 618, y: 580, w: 36, h: 110 },
    { x: 660, y: 500, w: 44, h: 190 },
    { x: 710, y: 545, w: 34, h: 145 },
    { x: 750, y: 575, w: 38, h: 115 },
    { x: 950, y: 555, w: 40, h: 135 },
    { x: 996, y: 515, w: 36, h: 175 },
    { x: 1038, y: 570, w: 34, h: 120 },
    { x: 1078, y: 535, w: 42, h: 155 },
    { x: 1126, y: 565, w: 32, h: 125 },
  ];

  const windows = buildings.flatMap((b, i) =>
    [0, 1, 2].map((row) => ({
      x: b.x + b.w / 2 - 3,
      y: b.y + 20 + row * 28,
      key: `${i}-${row}`,
    }))
  );

  const garlandLeaves = Array.from({ length: 10 }, (_, i) => ({ x: 30, y: 40 + i * 40 }));

  const familyFigures = [
    { x: 130, y: 560, h: 78, head: 10 },
    { x: 168, y: 575, h: 62, head: 8 },
    { x: 200, y: 590, h: 46, head: 7 },
    { x: 96, y: 592, h: 44, head: 7 },
  ];

  return (
    <svg
      viewBox="0 0 1600 700"
      preserveAspectRatio="xMinYMid slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of Telugu families connected across Pune, Maharashtra"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF3FF" />
          <stop offset="45%" stopColor="#FDEFCF" />
          <stop offset="100%" stopColor="#F6CE81" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF3CE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF3CE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3C567" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D9A441" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FB9AE" />
          <stop offset="100%" stopColor="#5E8C82" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="1600" height="700" fill="url(#sky)" />

      {/* Sun glow behind the map */}
      <circle cx="800" cy="260" r="260" fill="url(#sunGlow)" />

      {/* Maharashtra map (stylised, not geographically precise) */}
      <g opacity="0.9">
        <path
          d="M660 90 L900 80 L980 140 L1020 150 L1010 210 L1060 230 L1040 280 L960 300 L940 340 L860 350 L800 320 L720 330 L660 290 L620 240 L640 180 Z"
          fill="url(#mapFill)"
          stroke="#B9822C"
          strokeWidth="2"
        />
      </g>

      {/* Pune pin */}
      <g transform="translate(770, 230)">
        <path d="M0 -34C-13 -34 -23 -24 -23 -12C-23 6 0 30 0 30C0 30 23 6 23 -12C23 -24 13 -34 0 -34Z" fill="#B3261E" />
        <circle cx="0" cy="-12" r="8" fill="#FFF7E8" />
        <text x="30" y="-6" fontSize="26" fontWeight="700" fill="#123822" style={{ fontFamily: "serif" }}>
          Pune
        </text>
      </g>

      {/* Distant hills */}
      <path d="M0 480 Q 200 420 400 470 T 800 460 T 1200 470 T 1600 450 L1600 560 L0 560 Z" fill="#3E6B4C" opacity="0.55" />

      {/* Skyline */}
      <g fill="#123822">
        {buildings.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" />
        ))}
        {/* fort-like tower, center */}
        <rect x="850" y="470" width="90" height="220" />
        <rect x="870" y="440" width="50" height="30" />
        <rect x="885" y="415" width="20" height="25" />
      </g>
      <g fill="#F3C567" opacity="0.85">
        {windows.map((w) => (
          <rect key={w.key} x={w.x} y={w.y} width="6" height="6" rx="1" />
        ))}
      </g>

      {/* River */}
      <rect x="0" y="620" width="1600" height="80" fill="url(#river)" />
      <g stroke="#EAF3FF" strokeWidth="1.5" opacity="0.35">
        <line x1="0" y1="640" x2="1600" y2="640" />
        <line x1="0" y1="660" x2="1600" y2="660" />
        <line x1="0" y1="680" x2="1600" y2="680" />
      </g>

      {/* Foreground ledge */}
      <rect x="0" y="690" width="1600" height="10" fill="#0F5132" />

      {/* Garland along the left edge */}
      <g>
        <line x1="30" y1="0" x2="30" y2="420" stroke="#7A5230" strokeWidth="3" />
        {garlandLeaves.map((l, i) => (
          <g key={i} transform={`translate(${l.x}, ${l.y})`}>
            <ellipse cx="-10" cy="10" rx="9" ry="15" fill="#2F7A3E" transform="rotate(-25 -10 10)" />
            <ellipse cx="10" cy="10" rx="9" ry="15" fill="#2F7A3E" transform="rotate(25 10 10)" />
            <circle cx="0" cy="18" r="6" fill="#F5A623" />
          </g>
        ))}
      </g>

      {/* Diya (lamp) bottom-left */}
      <g transform="translate(70, 640)">
        <path d="M-26 0 Q0 22 26 0 L20 -6 Q0 8 -20 -6 Z" fill="#D4A017" />
        <path d="M-3 -8 Q0 -26 4 -8 Q8 -16 3 -8 Q0 -12 -3 -8Z" fill="#F5A623" />
        <circle cx="55" cy="6" r="7" fill="#F5A623" />
        <circle cx="70" cy="-2" r="6" fill="#F0921C" />
        <circle cx="82" cy="8" r="5" fill="#F5A623" />
      </g>

      {/* Abstract family silhouette (non-photorealistic) */}
      <g fill="#0F5132" opacity="0.3">
        {familyFigures.map((f, i) => (
          <g key={i} transform={`translate(${f.x}, ${f.y})`}>
            <circle cx="0" cy={-f.h + f.head} r={f.head} />
            <path d={`M${-f.head * 1.3} 0 Q0 ${-f.head * 0.6} ${f.head * 1.3} 0 L${f.head} ${f.h * 0.6} Q0 ${f.h * 0.7} ${-f.head} ${f.h * 0.6} Z`} />
          </g>
        ))}
      </g>
    </svg>
  );
}
