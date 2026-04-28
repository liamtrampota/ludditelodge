import * as React from 'react';

// Watercolor SVG library for Luddite Lodge.
// Each illustration uses layered translucent shapes + feTurbulence
// displacement filters to evoke pigment bleed and rough paper.
// Palette tokens (kept here so SVGs are self-contained):
const WC = {
  parchment: '#F4EFE6',
  parchment2: '#EDE5D6',
  ink: '#2A2620',
  ink2: '#4A4138',
  pine: '#5A6B52',
  pine2: '#3F4D38',
  pineDeep: '#2D3A28',
  pineLight: '#8A9A7E',
  clay: '#B8845F',
  clayDeep: '#8E5E3D',
  clayLight: '#D6A77F',
  slate: '#A8B5BD',
  slateDeep: '#7C8A92',
  cream: '#E8DEC7',
  goldHour: '#E2B07A',
  rose: '#C98E7E',
};

// Reusable filter defs — paste once per SVG via <WCFilters/>
const WCFilters = ({ id = 'wc' }) => (
  <defs>
    {/* pigment bleed — slight displacement on edges */}
    <filter id={`${id}-bleed`} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="3" />
      <feDisplacementMap in="SourceGraphic" scale="3.2" />
    </filter>
    <filter id={`${id}-bleed-strong`} x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" />
      <feDisplacementMap in="SourceGraphic" scale="6" />
    </filter>
    {/* paper texture inside fills */}
    <filter id={`${id}-grain`}>
      <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="5" />
      <feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.14  0 0 0 0 0.12  0 0 0 0.18 0" />
      <feComposite in2="SourceGraphic" operator="in" />
    </filter>
    {/* soft edge wash */}
    <filter id={`${id}-soft`}>
      <feGaussianBlur stdDeviation="0.6" />
    </filter>
  </defs>
);

/* ============================================================
   1. HERO — full-bleed property at golden hour
   Lodge, A-frames in trees, distant pond, pool nestled in landscape.
   ============================================================ */
const HeroPlate = ({ className = '' }) => (
  <svg viewBox="0 0 1600 900" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <WCFilters id="h" />

    {/* sky — golden hour wash */}
    <rect width="1600" height="900" fill={WC.parchment} />
    <rect width="1600" height="540" fill={WC.goldHour} opacity="0.32" />
    <rect y="80" width="1600" height="380" fill={WC.rose} opacity="0.18" />
    <rect y="0" width="1600" height="200" fill={WC.slate} opacity="0.22" />

    {/* sun glow */}
    <circle cx="1180" cy="280" r="90" fill={WC.goldHour} opacity="0.55" filter="url(#h-soft)" />
    <circle cx="1180" cy="280" r="42" fill="#F2D29A" opacity="0.85" />

    {/* far ridge — Catskills silhouette */}
    <g filter="url(#h-bleed-strong)">
      <path d="M0,470 C 120,420 220,455 320,425 C 420,395 520,440 640,415 C 760,390 880,440 1000,420 C 1120,400 1260,445 1380,425 C 1480,408 1560,430 1600,420 L1600,540 L0,540 Z" fill={WC.slateDeep} opacity="0.55" />
    </g>
    <g filter="url(#h-bleed-strong)">
      <path d="M0,510 C 140,470 260,495 380,475 C 520,452 640,490 780,468 C 920,448 1060,488 1200,470 C 1320,455 1480,478 1600,468 L1600,560 L0,560 Z" fill={WC.pine2} opacity="0.55" />
    </g>

    {/* mid forest line */}
    <g filter="url(#h-bleed)">
      <path d="M0,560 C 100,540 200,565 300,548 C 420,528 540,560 660,545 C 800,528 920,562 1060,548 C 1200,535 1340,565 1480,550 C 1540,544 1580,552 1600,548 L1600,640 L0,640 Z" fill={WC.pine} opacity="0.78" />
    </g>

    {/* pond — distant water, mirror of sky */}
    <ellipse cx="430" cy="650" rx="200" ry="22" fill={WC.slate} opacity="0.7" filter="url(#h-bleed)" />
    <ellipse cx="430" cy="648" rx="180" ry="14" fill={WC.cream} opacity="0.35" />

    {/* meadow foreground */}
    <g filter="url(#h-bleed)">
      <path d="M0,640 C 200,620 400,650 600,635 C 800,620 1000,648 1200,634 C 1380,622 1500,645 1600,638 L1600,900 L0,900 Z" fill={WC.pineLight} opacity="0.55" />
    </g>
    <g filter="url(#h-bleed)">
      <path d="M0,720 C 240,700 480,728 720,712 C 960,696 1200,724 1440,710 C 1520,705 1580,712 1600,710 L1600,900 L0,900 Z" fill={WC.pine} opacity="0.62" />
    </g>

    {/* — POOL — nestled into landscape, lower-left */}
    <g filter="url(#h-bleed)">
      <ellipse cx="220" cy="775" rx="135" ry="28" fill={WC.ink} opacity="0.18" />
      <ellipse cx="220" cy="770" rx="130" ry="24" fill={WC.slate} opacity="0.85" />
      <ellipse cx="210" cy="767" rx="100" ry="14" fill="#C2CDD3" opacity="0.6" />
      <path d="M150,770 q 30,-4 60,0 t 60,0" stroke={WC.parchment} strokeWidth="1.2" fill="none" opacity="0.7" />
    </g>

    {/* — LODGE — main building, center-right, two-story farmhouse silhouette */}
    <g filter="url(#h-bleed)">
      {/* shadow */}
      <ellipse cx="900" cy="745" rx="180" ry="14" fill={WC.ink} opacity="0.18" />
      {/* main body */}
      <rect x="780" y="585" width="240" height="140" fill={WC.cream} opacity="0.95" />
      {/* roof */}
      <path d="M760,590 L900,520 L1040,590 Z" fill={WC.ink2} opacity="0.85" />
      {/* chimney */}
      <rect x="965" y="540" width="18" height="35" fill={WC.ink2} opacity="0.8" />
      {/* faint smoke */}
      <path d="M974,538 q -4,-12 4,-22 q -6,-10 4,-22 q -6,-12 2,-22" stroke={WC.slateDeep} strokeWidth="1.2" fill="none" opacity="0.55" />
      {/* windows — warm glow */}
      <rect x="800" y="620" width="22" height="28" fill={WC.goldHour} opacity="0.85" />
      <rect x="838" y="620" width="22" height="28" fill={WC.goldHour} opacity="0.85" />
      <rect x="940" y="620" width="22" height="28" fill={WC.goldHour} opacity="0.85" />
      <rect x="978" y="620" width="22" height="28" fill={WC.goldHour} opacity="0.85" />
      <rect x="878" y="660" width="44" height="65" fill={WC.ink2} opacity="0.7" />
      {/* porch line */}
      <rect x="775" y="722" width="250" height="6" fill={WC.ink} opacity="0.5" />
    </g>

    {/* — A-FRAMES tucked in the trees, right side */}
    {[1240, 1350, 1460].map((x, i) => (
      <g key={x} filter="url(#h-bleed)">
        <ellipse cx={x} cy="730" rx="38" ry="6" fill={WC.ink} opacity="0.2" />
        <path d={`M${x - 38},730 L${x},650 L${x + 38},730 Z`} fill={WC.ink2} opacity="0.9" />
        <path d={`M${x - 28},730 L${x},668 L${x + 28},730 Z`} fill={WC.clayDeep} opacity={0.55 + i * 0.05} />
        <rect x={x - 8} y="700" width="16" height="22" fill={WC.goldHour} opacity="0.9" />
      </g>
    ))}

    {/* — Trees scattered in mid + foreground */}
    {[
      [110, 660, 30], [70, 690, 22], [560, 670, 26], [620, 680, 22],
      [1120, 660, 28], [1180, 680, 24], [1540, 690, 30], [40, 720, 36],
      [350, 730, 40], [690, 740, 44], [1080, 750, 38], [1310, 745, 36],
    ].map(([x, y, h], i) => (
      <g key={i} filter="url(#h-bleed)">
        <ellipse cx={x} cy={y + h * 0.1} rx={h * 0.55} ry={h * 0.7} fill={WC.pine2} opacity="0.85" />
        <rect x={x - 2} y={y + h * 0.5} width="4" height={h * 0.55} fill={WC.ink2} opacity="0.85" />
      </g>
    ))}

    {/* tall conifers in foreground left and right corners */}
    <g filter="url(#h-bleed)">
      <path d="M30,860 L60,720 L90,860 Z" fill={WC.pineDeep} opacity="0.92" />
      <path d="M50,860 L75,750 L100,860 Z" fill={WC.pine2} opacity="0.88" />
      <path d="M1500,860 L1530,720 L1560,860 Z" fill={WC.pineDeep} opacity="0.92" />
      <path d="M1530,860 L1555,750 L1580,860 Z" fill={WC.pine2} opacity="0.88" />
    </g>

    {/* foreground grass strokes — irregular, hand-drawn */}
    <g stroke={WC.pine2} strokeWidth="1.3" opacity="0.55" fill="none" filter="url(#h-bleed)">
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (i * 27 + 10) % 1600;
        const y = 820 + (i % 5) * 8;
        return <path key={i} d={`M${x},${y + 14} q 1,-7 0,-14`} />;
      })}
    </g>

    {/* very faint flying birds */}
    <g stroke={WC.ink2} strokeWidth="1.2" fill="none" opacity="0.55">
      <path d="M380,180 q 6,-6 12,0 q 6,-6 12,0" />
      <path d="M450,160 q 5,-5 10,0 q 5,-5 10,0" />
      <path d="M520,200 q 5,-5 10,0 q 5,-5 10,0" />
    </g>
  </svg>
);

/* ============================================================
   2. KEY + MAP STILL LIFE — for "The ritual"
   ============================================================ */
const KeyMapVignette = ({ className = '' }) => (
  <svg viewBox="0 0 600 480" className={className} aria-hidden="true">
    <WCFilters id="km" />
    {/* wood counter wash */}
    <rect width="600" height="480" fill={WC.parchment} />
    <g filter="url(#km-bleed-strong)">
      <rect x="0" y="180" width="600" height="300" fill={WC.clay} opacity="0.45" />
      <rect x="0" y="220" width="600" height="40" fill={WC.clayDeep} opacity="0.18" />
      <rect x="0" y="320" width="600" height="30" fill={WC.clayDeep} opacity="0.14" />
    </g>
    {/* wood grain lines */}
    <g stroke={WC.clayDeep} strokeWidth="0.8" opacity="0.35" fill="none">
      <path d="M0,250 q 200,-4 400,0 t 200,2" />
      <path d="M0,300 q 250,-3 460,0 t 140,1" />
      <path d="M0,360 q 180,-5 380,0 t 220,2" />
      <path d="M0,410 q 220,-4 420,0 t 180,2" />
    </g>

    {/* folded paper map */}
    <g filter="url(#km-bleed)" transform="translate(60,170) rotate(-6)">
      <rect width="320" height="220" fill={WC.cream} opacity="0.95" />
      <rect width="320" height="220" fill={WC.parchment} opacity="0.5" filter="url(#km-grain)" />
      {/* fold creases */}
      <line x1="106" y1="0" x2="106" y2="220" stroke={WC.ink2} strokeWidth="0.6" opacity="0.4" />
      <line x1="213" y1="0" x2="213" y2="220" stroke={WC.ink2} strokeWidth="0.6" opacity="0.4" />
      <line x1="0" y1="110" x2="320" y2="110" stroke={WC.ink2} strokeWidth="0.6" opacity="0.4" />
      {/* squiggly road */}
      <path d="M20,160 C 80,140 120,180 180,150 C 240,120 280,170 310,150" stroke={WC.clayDeep} strokeWidth="1.6" fill="none" opacity="0.7" />
      {/* river */}
      <path d="M30,40 C 90,80 70,130 130,160 C 190,190 240,210 300,200" stroke={WC.slate} strokeWidth="3" fill="none" opacity="0.6" />
      {/* tree marks */}
      {[[60, 50], [100, 70], [140, 60], [220, 50], [260, 70], [80, 100], [240, 110], [180, 90]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill={WC.pine} opacity="0.7" />
          <line x1={x} y1={y} x2={x} y2={y + 5} stroke={WC.ink2} strokeWidth="0.6" opacity="0.7" />
        </g>
      ))}
      {/* X marks the lodge */}
      <g transform="translate(170,130)">
        <line x1="-6" y1="-6" x2="6" y2="6" stroke={WC.clayDeep} strokeWidth="2" />
        <line x1="-6" y1="6" x2="6" y2="-6" stroke={WC.clayDeep} strokeWidth="2" />
      </g>
      {/* compass rose */}
      <g transform="translate(280,40)" stroke={WC.ink2} strokeWidth="0.8" fill="none" opacity="0.7">
        <circle r="14" />
        <path d="M0,-14 L3,0 L0,14 L-3,0 Z" fill={WC.ink2} opacity="0.6" />
        <text x="0" y="-18" textAnchor="middle" fontSize="9" fill={WC.ink2} fontFamily="Caveat">N</text>
      </g>
    </g>

    {/* event card — leans on the map */}
    <g filter="url(#km-bleed)" transform="translate(330,250) rotate(4)">
      <rect width="170" height="100" fill={WC.parchment2} />
      <rect width="170" height="100" fill="#E8DCC0" opacity="0.6" filter="url(#km-grain)" />
      <line x1="14" y1="22" x2="156" y2="22" stroke={WC.ink2} strokeWidth="0.6" opacity="0.5" />
      <text x="14" y="18" fontFamily="Caveat" fontSize="14" fill={WC.ink}>Saturday</text>
      <text x="14" y="40" fontFamily="EB Garamond" fontSize="10" fill={WC.ink2}>7am · yoga on the deck</text>
      <text x="14" y="55" fontFamily="EB Garamond" fontSize="10" fill={WC.ink2}>11am · foraging walk</text>
      <text x="14" y="70" fontFamily="EB Garamond" fontSize="10" fill={WC.ink2}>7pm · bistro dinner</text>
      <text x="14" y="85" fontFamily="EB Garamond" fontSize="10" fill={WC.ink2}>9pm · film on the lawn</text>
    </g>

    {/* iron key with leather tag */}
    <g filter="url(#km-bleed)" transform="translate(280,330) rotate(-18)">
      {/* leather tag */}
      <rect x="-90" y="-12" width="80" height="32" rx="3" fill={WC.clayDeep} opacity="0.92" />
      <rect x="-90" y="-12" width="80" height="32" rx="3" fill={WC.clay} opacity="0.5" filter="url(#km-grain)" />
      <text x="-50" y="9" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill={WC.parchment}>n° 7</text>
      {/* key shaft */}
      <rect x="-10" y="-3" width="120" height="6" fill={WC.ink2} />
      {/* key teeth */}
      <rect x="100" y="3" width="6" height="10" fill={WC.ink2} />
      <rect x="88" y="3" width="6" height="6" fill={WC.ink2} />
      {/* key bow */}
      <circle cx="-14" cy="0" r="14" fill={WC.ink2} />
      <circle cx="-14" cy="0" r="7" fill={WC.parchment} opacity="0.95" />
    </g>

    {/* cup of coffee partly visible */}
    <g filter="url(#km-bleed)" transform="translate(490,150)">
      <ellipse cx="0" cy="40" rx="48" ry="10" fill={WC.ink} opacity="0.18" />
      <ellipse cx="0" cy="20" rx="42" ry="10" fill={WC.cream} />
      <ellipse cx="0" cy="20" rx="36" ry="7" fill={WC.clayDeep} opacity="0.85" />
      <path d="M-42,20 Q-42,46 0,46 Q 42,46 42,20" fill={WC.cream} stroke={WC.ink2} strokeWidth="0.6" />
    </g>
  </svg>
);

/* ============================================================
   3. BISTRO TABLE — used for before/after
   `mode` = 'devices' | 'present'
   Same scene, two states.
   ============================================================ */
const BistroTable = ({ mode = 'present', className = '' }) => {
  const isPhones = mode === 'devices';
  return (
    <svg viewBox="0 0 800 600" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <WCFilters id={`bt-${mode}`} />
      {/* warm interior wash */}
      <rect width="800" height="600" fill={WC.parchment} />
      <rect width="800" height="600" fill={isPhones ? '#C9C2B2' : WC.goldHour} opacity={isPhones ? 0.45 : 0.22} />
      {/* back wall */}
      <rect y="0" width="800" height="280" fill={isPhones ? '#9DA39A' : WC.clayLight} opacity="0.45" filter={`url(#bt-${mode}-bleed)`} />
      {/* hanging pendant lights */}
      {[180, 400, 620].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x} y2="80" stroke={WC.ink2} strokeWidth="0.8" opacity="0.7" />
          <circle cx={x} cy="92" r="14" fill={WC.goldHour} opacity={isPhones ? 0.4 : 0.85} filter={`url(#bt-${mode}-soft)`} />
          <circle cx={x} cy="92" r="6" fill="#F2D29A" opacity={isPhones ? 0.6 : 1} />
        </g>
      ))}
      {/* window slits showing dusk */}
      <rect x="40" y="60" width="60" height="120" fill={WC.slate} opacity="0.55" />
      <rect x="700" y="60" width="60" height="120" fill={WC.slate} opacity="0.55" />

      {/* long wooden table — perspective */}
      <g filter={`url(#bt-${mode}-bleed)`}>
        <path d="M40,420 L760,420 L680,560 L120,560 Z" fill={WC.clay} opacity="0.92" />
        <path d="M40,420 L760,420 L680,560 L120,560 Z" fill={WC.clayDeep} opacity="0.3" filter={`url(#bt-${mode}-grain)`} />
        {/* table edge highlight */}
        <line x1="40" y1="420" x2="760" y2="420" stroke={WC.clayDeep} strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* table runner */}
      <path d="M120,430 L680,430 L640,540 L160,540 Z" fill={WC.cream} opacity="0.6" filter={`url(#bt-${mode}-bleed)`} />

      {/* candles down the center — only lit when not on phones */}
      {[260, 400, 540].map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y="430" width="8" height="22" fill={WC.cream} />
          <rect x={x - 4} y="430" width="8" height="22" fill={WC.clay} opacity="0.3" />
          {!isPhones && <ellipse cx={x} cy="425" rx="3" ry="6" fill={WC.goldHour} />}
          {!isPhones && <ellipse cx={x} cy="423" rx="6" ry="10" fill={WC.goldHour} opacity="0.35" filter={`url(#bt-${mode}-soft)`} />}
        </g>
      ))}

      {/* wine glasses + plates — sketchy */}
      {[200, 320, 480, 600].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="445" rx="22" ry="5" fill={WC.parchment} opacity="0.95" />
          <ellipse cx={x} cy="445" rx="22" ry="5" fill="none" stroke={WC.ink2} strokeWidth="0.6" opacity="0.6" />
          {/* wine glass */}
          <ellipse cx={x + 30} cy="430" rx="6" ry="3" fill="none" stroke={WC.ink2} strokeWidth="0.6" opacity="0.6" />
          <path d={`M${x + 24},430 q 6,16 12,0`} fill={isPhones ? 'none' : WC.rose} opacity={isPhones ? 0 : 0.55} stroke={WC.ink2} strokeWidth="0.6" />
          <line x1={x + 30} y1="446" x2={x + 30} y2="458" stroke={WC.ink2} strokeWidth="0.6" opacity="0.6" />
        </g>
      ))}

      {/* — DINERS — five figures around the table, mirrored on near + far side */}
      {/* Far side (3 figures, smaller, behind table) */}
      {[
        { x: 220, y: 380, far: true, role: 0 },
        { x: 400, y: 375, far: true, role: 1 },
        { x: 580, y: 380, far: true, role: 2 },
      ].map((f, i) => (
        <Diner key={`far-${i}`} {...f} mode={mode} idx={i} />
      ))}
      {/* Near side (2 figures, larger, in front of table) */}
      {[
        { x: 280, y: 520, far: false, role: 3 },
        { x: 520, y: 520, far: false, role: 4 },
      ].map((f, i) => (
        <Diner key={`near-${i}`} {...f} mode={mode} idx={i + 3} />
      ))}

      {/* small kid drawing on placemat — only visible in 'present' mode */}
      {!isPhones && (
        <g transform="translate(440,500)" filter={`url(#bt-${mode}-bleed)`}>
          <rect x="-40" y="-20" width="80" height="50" fill={WC.parchment2} opacity="0.95" />
          <path d="M-30,0 q 10,-10 20,0 t 20,0 t 20,0" stroke={WC.clayDeep} strokeWidth="1.2" fill="none" />
          <path d="M-25,15 q 15,-8 30,0" stroke={WC.pine} strokeWidth="1.2" fill="none" />
        </g>
      )}
    </svg>
  );
};

const Diner = ({ x, y, far, mode, idx }) => {
  const isPhones = mode === 'devices';
  const scale = far ? 0.7 : 1;
  const skinTones = ['#D6A77F', '#C98E7E', '#B8845F', '#D6B89F', '#A87858'];
  const shirts = isPhones
    ? ['#6E7068', '#7A746A', '#5E6A60', '#766A60', '#646E68']
    : [WC.pine, WC.clay, WC.clayDeep, WC.pine2, WC.rose];

  // posture: phones = hunched, present = upright/turned
  const tilt = isPhones ? 12 : far ? -2 : -4;
  const headY = -56 * scale;

  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} filter={`url(#bt-${mode}-bleed)`}>
      {/* torso */}
      <path
        d={`M-30,0 Q -28,${isPhones ? -36 : -44} 0,${isPhones ? -42 : -50} Q 28,${isPhones ? -36 : -44} 30,0 Z`}
        fill={shirts[idx % shirts.length]}
        opacity="0.95"
      />
      {/* head */}
      <g transform={`rotate(${tilt}, 0, ${headY})`}>
        <ellipse cx="0" cy={headY} rx="16" ry="18" fill={skinTones[idx % skinTones.length]} />
        {/* hair */}
        <path
          d={`M-16,${headY - 6} Q 0,${headY - 22} 16,${headY - 6} Q 14,${headY - 14} 0,${headY - 18} Q -14,${headY - 14} -16,${headY - 6} Z`}
          fill={[WC.ink, WC.ink2, '#5C3A24', WC.ink, '#8A5A3A'][idx % 5]}
        />
      </g>
      {/* arms */}
      {isPhones ? (
        <>
          {/* both hands cradling phone in lap */}
          <path d={`M-22,-10 Q -18,8 -6,10`} stroke={shirts[idx % shirts.length]} strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d={`M22,-10 Q 18,8 6,10`} stroke={shirts[idx % shirts.length]} strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* phone — bright rectangle */}
          <rect x="-9" y="0" width="18" height="26" rx="2" fill={WC.ink} />
          <rect x="-7" y="2" width="14" height="22" rx="1" fill="#9BB7C7" opacity="0.95" />
        </>
      ) : (
        <>
          {/* arms gesturing, holding glass */}
          <path d={`M-26,-12 Q -36,-2 -32,${far ? -22 : -18}`} stroke={shirts[idx % shirts.length]} strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d={`M26,-12 Q 36,2 28,${far ? -10 : -6}`} stroke={shirts[idx % shirts.length]} strokeWidth="9" fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  );
};

/* ============================================================
   4. DIMENSION PLATES — Restoration / Connection / Creativity / Movement / Solitude
   ============================================================ */

// Restoration — pool + spa
const PlateRestoration = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="pr" />
    <rect width="800" height="600" fill={WC.parchment} />
    {/* sky */}
    <rect width="800" height="320" fill={WC.slate} opacity="0.35" />
    {/* tree backdrop */}
    <g filter="url(#pr-bleed)">
      <ellipse cx="120" cy="280" rx="80" ry="120" fill={WC.pine2} opacity="0.65" />
      <ellipse cx="680" cy="270" rx="90" ry="130" fill={WC.pine2} opacity="0.65" />
      <ellipse cx="220" cy="320" rx="70" ry="90" fill={WC.pine} opacity="0.6" />
      <ellipse cx="580" cy="310" rx="65" ry="85" fill={WC.pine} opacity="0.6" />
    </g>
    {/* deck */}
    <g filter="url(#pr-bleed)">
      <rect x="40" y="380" width="720" height="60" fill={WC.clay} opacity="0.88" />
      <rect x="40" y="380" width="720" height="60" fill={WC.clayDeep} opacity="0.25" filter="url(#pr-grain)" />
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={40 + i * 52} y1="380" x2={40 + i * 52} y2="440" stroke={WC.clayDeep} strokeWidth="0.6" opacity="0.45" />
      ))}
    </g>
    {/* pool */}
    <g filter="url(#pr-bleed)">
      <rect x="120" y="440" width="560" height="120" fill={WC.slateDeep} opacity="0.45" />
      <rect x="130" y="446" width="540" height="108" fill={WC.slate} opacity="0.92" />
      {/* ripple lines */}
      {[470, 495, 520, 545].map((y, i) => (
        <path key={i} d={`M150,${y} q 40,-3 80,0 t 80,0 t 80,0 t 80,0 t 80,0 t 80,0`} stroke={WC.parchment} strokeWidth="1" fill="none" opacity={0.45 + i * 0.05} />
      ))}
    </g>
    {/* lone swimmer */}
    <g filter="url(#pr-bleed)">
      <ellipse cx="400" cy="480" rx="14" ry="6" fill="#D6A77F" opacity="0.9" />
      <ellipse cx="400" cy="480" rx="6" ry="3" fill={WC.ink2} opacity="0.6" />
      <ellipse cx="400" cy="482" rx="22" ry="4" fill={WC.parchment} opacity="0.5" />
    </g>
    {/* towel + glass on deck */}
    <g filter="url(#pr-bleed)">
      <rect x="80" y="392" width="60" height="20" fill={WC.cream} opacity="0.9" />
      <rect x="80" y="392" width="60" height="20" fill={WC.rose} opacity="0.25" />
      <ellipse cx="170" cy="402" rx="6" ry="2" fill={WC.slate} />
    </g>
    {/* steam from spa hut */}
    <g opacity="0.7">
      <path d="M620,360 q -6,-14 4,-26 q -8,-12 2,-26 q -8,-12 2,-26" stroke={WC.cream} strokeWidth="2.5" fill="none" />
      <path d="M650,370 q -6,-12 2,-22 q -6,-10 4,-22" stroke={WC.cream} strokeWidth="2.5" fill="none" />
    </g>
  </svg>
);

// Connection — long farmhouse table from above, with hands, bread, wine
const PlateConnection = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="pc" />
    <rect width="800" height="600" fill={WC.parchment} />
    {/* room wash */}
    <rect width="800" height="600" fill={WC.clayLight} opacity="0.18" />
    {/* big farmhouse table — top-down */}
    <g filter="url(#pc-bleed-strong)">
      <rect x="100" y="40" width="600" height="520" fill={WC.clay} opacity="0.95" />
      <rect x="100" y="40" width="600" height="520" fill={WC.clayDeep} opacity="0.22" filter="url(#pc-grain)" />
      {/* plank lines */}
      {[170, 240, 310, 380, 450, 520].map((y, i) => (
        <line key={i} x1="100" y1={y} x2="700" y2={y} stroke={WC.clayDeep} strokeWidth="0.6" opacity="0.4" />
      ))}
    </g>
    {/* runner */}
    <rect x="180" y="40" width="120" height="520" fill={WC.cream} opacity="0.55" filter="url(#pc-bleed)" />

    {/* bread board with bread */}
    <g filter="url(#pc-bleed)" transform="translate(400,160)">
      <ellipse cx="0" cy="0" rx="80" ry="22" fill={WC.clayDeep} opacity="0.9" />
      <ellipse cx="-30" cy="-2" rx="32" ry="14" fill="#D9B48A" />
      <ellipse cx="22" cy="0" rx="34" ry="16" fill="#C99868" />
      <line x1="-10" y1="-6" x2="-2" y2="-10" stroke={WC.ink2} strokeWidth="0.6" opacity="0.6" />
    </g>
    {/* wine bottle + 4 glasses */}
    <g filter="url(#pc-bleed)" transform="translate(400,300)">
      <rect x="-10" y="-50" width="20" height="60" fill={WC.pineDeep} opacity="0.95" />
      <rect x="-7" y="-65" width="14" height="18" fill={WC.pineDeep} opacity="0.95" />
      <rect x="-9" y="-30" width="18" height="14" fill={WC.cream} opacity="0.9" />
    </g>
    {[[230, 360], [560, 360], [240, 480], [550, 480]].map(([x, y], i) => (
      <g key={i} filter="url(#pc-bleed)" transform={`translate(${x},${y})`}>
        <ellipse cx="0" cy="0" rx="22" ry="8" fill={WC.cream} />
        <ellipse cx="0" cy="0" rx="22" ry="8" fill="none" stroke={WC.ink2} strokeWidth="0.6" opacity="0.55" />
        {/* wine in glass */}
        <ellipse cx="0" cy="-2" rx="14" ry="5" fill={WC.rose} opacity="0.7" />
      </g>
    ))}

    {/* hands reaching in from edges — gestural */}
    {/* top-left */}
    <g filter="url(#pc-bleed)" transform="translate(140,140) rotate(20)">
      <ellipse cx="0" cy="0" rx="34" ry="22" fill="#D6A77F" />
      <path d="M-28,-4 q -18,8 -28,18" stroke="#D6A77F" strokeWidth="20" strokeLinecap="round" fill="none" />
    </g>
    {/* top-right */}
    <g filter="url(#pc-bleed)" transform="translate(660,160) rotate(-22)">
      <ellipse cx="0" cy="0" rx="32" ry="20" fill="#C98E7E" />
      <path d="M24,2 q 18,8 30,20" stroke="#C98E7E" strokeWidth="20" strokeLinecap="round" fill="none" />
    </g>
    {/* bottom-left */}
    <g filter="url(#pc-bleed)" transform="translate(160,520) rotate(-15)">
      <ellipse cx="0" cy="0" rx="34" ry="22" fill="#B8845F" />
      <path d="M-30,4 q -22,10 -32,24" stroke="#B8845F" strokeWidth="20" strokeLinecap="round" fill="none" />
    </g>
    {/* bottom-right */}
    <g filter="url(#pc-bleed)" transform="translate(640,500) rotate(18)">
      <ellipse cx="0" cy="0" rx="32" ry="22" fill="#A87858" />
      <path d="M28,4 q 22,10 30,24" stroke="#A87858" strokeWidth="20" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

// Creativity — disposable camera, journal, hand-lettering
const PlateCreativity = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="pcr" />
    <rect width="800" height="600" fill={WC.parchment} />
    {/* desk wash */}
    <rect width="800" height="600" fill={WC.clayLight} opacity="0.2" filter="url(#pcr-bleed-strong)" />

    {/* journal — open spread */}
    <g filter="url(#pcr-bleed)" transform="translate(120,120) rotate(-3)">
      <rect width="380" height="280" fill={WC.cream} />
      <rect width="380" height="280" fill={WC.parchment2} opacity="0.6" filter="url(#pcr-grain)" />
      <line x1="190" y1="0" x2="190" y2="280" stroke={WC.ink2} strokeWidth="0.8" opacity="0.4" />
      {/* journal lines */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`l-${i}`} x1="20" y1={50 + i * 26} x2="170" y2={50 + i * 26} stroke={WC.ink2} strokeWidth="0.4" opacity="0.5" />
      ))}
      {/* handwriting strokes */}
      {[60, 86, 112, 138, 164, 190].map((y, i) => (
        <path key={i} d={`M22,${y} q 8,-4 18,0 t 20,0 t 20,0 t 20,0 t 20,0 t 22,0`} stroke={WC.ink} strokeWidth="0.9" fill="none" opacity="0.7" />
      ))}
      {/* small sketch on right page */}
      <g transform="translate(220,40)">
        <path d="M0,80 q 30,-30 60,0 q 30,-30 60,0" stroke={WC.pine} strokeWidth="1.5" fill="none" />
        <ellipse cx="80" cy="120" rx="40" ry="14" fill={WC.slate} opacity="0.5" />
        <text x="40" y="180" fontFamily="Caveat" fontSize="14" fill={WC.ink2}>oct 12 · the pond</text>
      </g>
    </g>

    {/* disposable camera — labeled, classic yellow-and-black */}
    <g filter="url(#pcr-bleed)" transform="translate(450,300) rotate(8)">
      <rect width="220" height="130" rx="6" fill={WC.goldHour} />
      <rect width="220" height="130" rx="6" fill={WC.clayDeep} opacity="0.18" filter="url(#pcr-grain)" />
      {/* lens */}
      <circle cx="60" cy="65" r="32" fill={WC.ink} />
      <circle cx="60" cy="65" r="22" fill={WC.ink2} />
      <circle cx="60" cy="65" r="10" fill={WC.slate} opacity="0.7" />
      {/* viewfinder */}
      <rect x="120" y="40" width="22" height="22" fill={WC.ink} />
      {/* flash */}
      <rect x="160" y="38" width="34" height="22" rx="3" fill={WC.cream} />
      {/* shutter */}
      <circle cx="170" cy="92" r="9" fill={WC.clayDeep} />
      {/* label */}
      <text x="160" y="118" fontFamily="Caveat" fontSize="14" fill={WC.ink}>27 exp · 400 ISO</text>
    </g>

    {/* fountain pen */}
    <g filter="url(#pcr-bleed)" transform="translate(140,440) rotate(-12)">
      <rect x="0" y="0" width="220" height="14" rx="6" fill={WC.ink2} />
      <rect x="0" y="0" width="80" height="14" rx="6" fill={WC.clayDeep} />
      <path d="M220,0 L260,7 L220,14 Z" fill={WC.ink} />
    </g>

    {/* small pressed leaves */}
    <g filter="url(#pcr-bleed)" transform="translate(540,140) rotate(20)">
      <path d="M0,0 q 20,-30 40,0 q -20,30 -40,0 Z" fill={WC.pine} opacity="0.85" />
      <line x1="0" y1="0" x2="40" y2="0" stroke={WC.ink2} strokeWidth="0.6" opacity="0.6" />
    </g>
    <g filter="url(#pcr-bleed)" transform="translate(680,180) rotate(-30)">
      <path d="M0,0 q 16,-22 32,0 q -16,22 -32,0 Z" fill={WC.clay} opacity="0.85" />
    </g>
  </svg>
);

// Movement — trail through trees, foraging basket
const PlateMovement = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="pm" />
    <rect width="800" height="600" fill={WC.parchment} />
    <rect width="800" height="600" fill={WC.cream} opacity="0.5" />
    {/* misty atmosphere */}
    <rect width="800" height="240" fill={WC.slate} opacity="0.3" filter="url(#pm-bleed-strong)" />

    {/* canopy — far, mid, near (three layers of trees) */}
    <g filter="url(#pm-bleed-strong)">
      {[
        [80, 280, 60, 0.5], [200, 270, 70, 0.5], [340, 280, 65, 0.5],
        [480, 270, 70, 0.5], [620, 280, 65, 0.5], [740, 270, 60, 0.5],
      ].map(([x, y, h, op], i) => (
        <ellipse key={`c-${i}`} cx={x} cy={y} rx={h * 0.7} ry={h} fill={WC.pine2} opacity={op} />
      ))}
    </g>
    <g filter="url(#pm-bleed)">
      {[
        [60, 360, 80, 0.7], [180, 340, 90, 0.7], [340, 360, 85, 0.7],
        [500, 340, 90, 0.7], [660, 360, 85, 0.7], [780, 340, 80, 0.7],
      ].map(([x, y, h, op], i) => (
        <g key={`m-${i}`}>
          <ellipse cx={x} cy={y} rx={h * 0.7} ry={h} fill={WC.pine} opacity={op} />
          <rect x={x - 4} y={y + h * 0.4} width="8" height={h * 0.7} fill={WC.ink2} opacity="0.7" />
        </g>
      ))}
    </g>

    {/* trail — meandering ochre path */}
    <g filter="url(#pm-bleed)">
      <path
        d="M380,600 C 380,520 320,470 360,400 C 400,330 460,300 440,240 C 420,200 380,180 400,140"
        stroke={WC.clay}
        strokeWidth="38"
        fill="none"
        opacity="0.85"
        strokeLinecap="round"
      />
      <path
        d="M380,600 C 380,520 320,470 360,400 C 400,330 460,300 440,240 C 420,200 380,180 400,140"
        stroke={WC.clayDeep}
        strokeWidth="44"
        fill="none"
        opacity="0.18"
        strokeLinecap="round"
        filter="url(#pm-grain)"
      />
    </g>

    {/* foreground trees framing the path */}
    <g filter="url(#pm-bleed)">
      <ellipse cx="120" cy="500" rx="100" ry="160" fill={WC.pineDeep} opacity="0.92" />
      <rect x="116" y="540" width="8" height="60" fill={WC.ink} />
      <ellipse cx="700" cy="500" rx="110" ry="170" fill={WC.pineDeep} opacity="0.92" />
      <rect x="696" y="540" width="8" height="60" fill={WC.ink} />
    </g>

    {/* small figure walking, far up the path */}
    <g filter="url(#pm-bleed)" transform="translate(390,330)">
      <ellipse cx="0" cy="0" rx="6" ry="10" fill={WC.ink2} />
      <circle cx="0" cy="-12" r="4" fill="#D6A77F" />
      {/* basket on hip */}
      <ellipse cx="6" cy="6" rx="5" ry="3" fill={WC.clayDeep} />
    </g>

    {/* mushrooms on trail edge */}
    {[[290, 530, 1.4], [340, 560, 1.1], [470, 540, 1.3], [510, 570, 1]].map(([x, y, s], i) => (
      <g key={i} filter="url(#pm-bleed)" transform={`translate(${x},${y}) scale(${s})`}>
        <ellipse cx="0" cy="0" rx="9" ry="5" fill={WC.rose} />
        <rect x="-2" y="0" width="4" height="8" fill={WC.cream} />
      </g>
    ))}
  </svg>
);

// Solitude — A-frame in trees, single window glow, evening
const PlateSolitude = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="ps" />
    <rect width="800" height="600" fill={WC.parchment} />
    {/* dusk sky */}
    <rect width="800" height="600" fill="#3F4D5A" opacity="0.42" />
    <rect width="800" height="280" fill={WC.ink} opacity="0.3" />
    {/* moon */}
    <circle cx="640" cy="120" r="42" fill={WC.cream} opacity="0.85" filter="url(#ps-soft)" />
    <circle cx="640" cy="120" r="34" fill="#F2EAD8" />
    {/* stars */}
    {[[120, 80], [210, 140], [320, 90], [480, 100], [560, 60], [720, 200]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1.5" fill={WC.cream} opacity="0.85" />
    ))}
    {/* deep forest backdrop */}
    <g filter="url(#ps-bleed-strong)">
      {[100, 200, 300, 500, 600, 700].map((x, i) => (
        <path key={i} d={`M${x - 60},600 L${x},${260 + (i % 3) * 30} L${x + 60},600 Z`} fill={WC.pineDeep} opacity="0.85" />
      ))}
      {[40, 240, 380, 460, 560, 740].map((x, i) => (
        <path key={`b-${i}`} d={`M${x - 80},600 L${x},${320 + (i % 2) * 20} L${x + 80},600 Z`} fill={WC.pine2} opacity="0.92" />
      ))}
    </g>

    {/* — A-FRAME — center-stage */}
    <g filter="url(#ps-bleed)" transform="translate(400,420)">
      <ellipse cx="0" cy="120" rx="180" ry="14" fill={WC.ink} opacity="0.5" />
      {/* roof */}
      <path d="M-150,120 L0,-90 L150,120 Z" fill={WC.ink} opacity="0.96" />
      {/* roof texture */}
      <path d="M-150,120 L0,-90 L150,120 Z" fill={WC.clayDeep} opacity="0.32" filter="url(#ps-grain)" />
      {/* front gable wood */}
      <path d="M-90,120 L0,-30 L90,120 Z" fill={WC.clay} opacity="0.92" />
      {/* big triangular window — warm glow */}
      <path d="M-60,120 L0,0 L60,120 L40,120 L0,30 L-40,120 Z" fill={WC.goldHour} opacity="0.95" />
      <path d="M-60,120 L0,0 L60,120 L40,120 L0,30 L-40,120 Z" fill={WC.cream} opacity="0.5" />
      {/* small loft window */}
      <rect x="-8" y="-66" width="16" height="20" fill={WC.goldHour} opacity="0.9" />
      {/* door */}
      <rect x="-14" y="60" width="28" height="60" fill={WC.ink2} opacity="0.85" />
      {/* small porch */}
      <rect x="-90" y="120" width="180" height="6" fill={WC.ink2} opacity="0.9" />
    </g>

    {/* light spill on ground in front of cabin */}
    <ellipse cx="400" cy="560" rx="120" ry="14" fill={WC.goldHour} opacity="0.3" filter="url(#ps-soft)" />

    {/* lone figure sitting on porch step */}
    <g filter="url(#ps-bleed)" transform="translate(420,532)">
      <ellipse cx="0" cy="6" rx="14" ry="4" fill={WC.ink} opacity="0.7" />
      <path d="M-8,-4 q 6,-12 16,-12 q 10,0 12,8 q 0,8 -2,12 z" fill={WC.pine2} />
      <circle cx="2" cy="-18" r="4" fill="#D6A77F" />
    </g>
  </svg>
);

/* ============================================================
   4b. SUPPLEMENTARY PLATES — Events, Residency
   ============================================================ */
const PlateEvents = ({ className = '' }) => (
  <svg viewBox="0 0 600 420" className={className} aria-hidden="true">
    <WCFilters id="pev" />
    <rect width="600" height="420" fill={WC.parchment2} />
    <rect width="600" height="420" fill={WC.goldHour} opacity="0.12" />
    {/* barn ceiling / back wall — warm wash */}
    <g filter="url(#pev-bleed-strong)">
      <rect x="0" y="0" width="600" height="420" fill={WC.clayLight} opacity="0.22" />
      <rect x="0" y="0" width="600" height="200" fill={WC.cream} opacity="0.72" />
    </g>
    {/* string lights — catenary curves */}
    {[0, 1, 2, 3, 4].map((row) => {
      const y0 = 28 + row * 28;
      const sag = 10 + row * 4;
      const bulbCount = 8;
      return (
        <g key={row}>
          <path
            d={`M 0,${y0} Q 300,${y0 + sag} 600,${y0}`}
            stroke={WC.ink2} strokeWidth="0.7" fill="none" opacity="0.5"
          />
          {Array.from({ length: bulbCount }).map((_, b) => {
            const t = b / (bulbCount - 1);
            const bx = t * 600;
            const by = y0 + sag * 4 * t * (1 - t);
            return (
              <g key={b}>
                <circle cx={bx} cy={by} r="4.5" fill={WC.goldHour} opacity="0.9" />
                <circle cx={bx} cy={by} r="9" fill={WC.goldHour} opacity="0.22" filter="url(#pev-soft)" />
              </g>
            );
          })}
        </g>
      );
    })}
    {/* stage platform */}
    <g filter="url(#pev-bleed)">
      <rect x="160" y="160" width="280" height="12" fill={WC.ink2} opacity="0.7" rx="2" />
      <rect x="160" y="172" width="280" height="8" fill={WC.clayDeep} opacity="0.5" />
    </g>
    {/* performer — single figure at center */}
    <g filter="url(#pev-bleed)" transform="translate(300, 110)">
      <ellipse cx="0" cy="50" rx="80" ry="8" fill={WC.goldHour} opacity="0.35" filter="url(#pev-soft)" />
      <circle cx="0" cy="-8" r="13" fill={WC.ink2} opacity="0.82" />
      <path d="M-10,6 Q0,50 10,6" fill={WC.pine2} opacity="0.88" />
      <path d="M-10,12 Q-22,34 -20,48" stroke={WC.ink2} strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M10,12 Q18,30 16,44" stroke={WC.ink2} strokeWidth="3" fill="none" opacity="0.8" />
      {/* guitar body */}
      <ellipse cx="22" cy="32" rx="11" ry="14" fill={WC.clay} opacity="0.78" />
      <ellipse cx="22" cy="22" rx="7" ry="9" fill={WC.clay} opacity="0.72" />
      <line x1="22" y1="13" x2="22" y2="-2" stroke={WC.ink2} strokeWidth="2" opacity="0.7" />
    </g>
    {/* audience — four rows of figures */}
    {[230, 268, 306, 344].map((rowY, row) => (
      Array.from({ length: 8 }).map((_, i) => (
        <g key={`${row}-${i}`} filter="url(#pev-bleed)" transform={`translate(${44 + i * 72}, ${rowY})`}>
          <rect x="-12" y="0" width="24" height="28" fill={WC.clayDeep} opacity={0.38 + row * 0.07} rx="2" />
          {row < 3 && (
            <circle cx="0" cy="-8" r={9 - row} fill={WC.ink2} opacity={0.55 + row * 0.08} />
          )}
        </g>
      ))
    ))}
    {/* warm floor glow beneath stage */}
    <ellipse cx="300" cy="170" rx="130" ry="22" fill={WC.goldHour} opacity="0.28" filter="url(#pev-soft)" />
  </svg>
);

const PlateResidency = ({ className = '' }) => (
  <svg viewBox="0 0 600 420" className={className} aria-hidden="true">
    <WCFilters id="prs" />
    <rect width="600" height="420" fill={WC.parchment2} />
    <rect width="600" height="420" fill={WC.cream} opacity="0.35" />
    {/* large studio window */}
    <g filter="url(#prs-bleed)">
      <rect x="50" y="28" width="220" height="180" fill={WC.slate} opacity="0.48" />
      <line x1="160" y1="28" x2="160" y2="208" stroke={WC.ink2} strokeWidth="2.5" opacity="0.72" />
      <line x1="50" y1="118" x2="270" y2="118" stroke={WC.ink2} strokeWidth="2.5" opacity="0.72" />
      <rect x="46" y="24" width="228" height="188" fill="none" stroke={WC.ink2} strokeWidth="3" opacity="0.85" />
      {/* tree canopy outside */}
      <ellipse cx="95" cy="175" rx="28" ry="50" fill={WC.pine} opacity="0.62" />
      <ellipse cx="185" cy="182" rx="34" ry="42" fill={WC.pine2} opacity="0.65" />
      <ellipse cx="248" cy="190" rx="20" ry="32" fill={WC.pineDeep} opacity="0.55" />
      {/* light flooding in */}
      <rect x="50" y="28" width="220" height="180" fill={WC.goldHour} opacity="0.09" />
    </g>
    {/* workbench top */}
    <g filter="url(#prs-bleed)">
      <rect x="20" y="268" width="420" height="16" fill={WC.ink2} opacity="0.88" />
      <rect x="20" y="284" width="420" height="70" fill={WC.clay} opacity="0.62" />
      {/* bench front grain */}
      <rect x="20" y="284" width="420" height="70" fill={WC.clayDeep} opacity="0.12" filter="url(#prs-grain)" />
    </g>
    {/* tools on bench surface */}
    <g filter="url(#prs-bleed)">
      {/* hand plane */}
      <rect x="48" y="248" width="52" height="18" fill={WC.clayDeep} opacity="0.9" rx="2" />
      <rect x="54" y="244" width="14" height="8" fill={WC.ink2} opacity="0.8" />
      {/* chisel */}
      <rect x="122" y="238" width="5" height="36" fill={WC.ink2} opacity="0.82" transform="rotate(-6, 124, 256)" />
      <rect x="119" y="262" width="11" height="7" fill={WC.clay} opacity="0.75" transform="rotate(-6, 124, 265)" />
      {/* wood shavings */}
      {[160, 175, 192, 207, 222].map((x, i) => (
        <path key={i}
          d={`M${x},264 q ${3 + i * 1.5},${-7 - i * 2} ${10 + i},0`}
          stroke={WC.cream} strokeWidth="1.4" fill="none" opacity="0.9"
        />
      ))}
      {/* open sketchbook */}
      <rect x="256" y="240" width="84" height="64" fill={WC.parchment} opacity="0.96" />
      <line x1="298" y1="240" x2="298" y2="304" stroke={WC.ink2} strokeWidth="0.8" opacity="0.45" />
      {[248, 255, 262, 269, 276, 283].map((y, i) => (
        <line key={i} x1="260" y1={y} x2="295" y2={y} stroke={WC.ink2} strokeWidth="0.5" opacity="0.35" />
      ))}
      {/* coffee cup */}
      <rect x="358" y="250" width="22" height="26" fill={WC.parchment} opacity="0.92" rx="2" />
      <path d="M380,258 Q390,258 390,266 Q390,274 380,274" stroke={WC.ink2} strokeWidth="1.5" fill="none" opacity="0.6" />
      <line x1="358" y1="258" x2="380" y2="258" stroke={WC.ink2} strokeWidth="0.8" opacity="0.4" />
    </g>
    {/* wall shelves with materials */}
    <g filter="url(#prs-bleed)" transform="translate(354, 40)">
      <rect x="0" y="60" width="200" height="7" fill={WC.ink2} opacity="0.72" />
      <rect x="0" y="148" width="200" height="7" fill={WC.ink2} opacity="0.72" />
      {/* jars on upper shelf */}
      {[12, 44, 76, 108, 140, 170].map((x, i) => (
        <g key={i}>
          <rect x={x} y={28} width="22" height="30" fill={[WC.clay, WC.pine, WC.slate, WC.cream, WC.goldHour, WC.rose][i]} opacity="0.82" rx="2" />
          <rect x={x + 4} y={24} width="14" height="6" fill={WC.parchment} opacity="0.7" rx="1" />
        </g>
      ))}
      {/* books standing on lower shelf */}
      {[12, 36, 60, 84, 110, 136, 160].map((x, i) => (
        <rect key={i} x={x} y={116} width={i % 3 === 0 ? 22 : 18} height="30"
          fill={[WC.pine2, WC.clay, WC.ink2, WC.slate, WC.clayDeep, WC.pine, WC.cream][i]}
          opacity="0.78" rx="1"
        />
      ))}
    </g>
    {/* wood floor planks */}
    <g filter="url(#prs-bleed-strong)">
      <rect x="0" y="354" width="600" height="66" fill={WC.clay} opacity="0.68" />
      {[360, 380, 400].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke={WC.clayDeep} strokeWidth="0.7" opacity="0.35" />
      ))}
    </g>
  </svg>
);

/* ============================================================
   5. ACCOMMODATION CARDS — Lodge, Dorms, A-frames (exterior + interior)
   ============================================================ */
const RoomLodge = ({ className = '' }) => (
  <svg viewBox="0 0 600 400" className={className} aria-hidden="true">
    <WCFilters id="rl" />
    <rect width="600" height="400" fill={WC.parchment2} />
    {/* interior wash — warm wood */}
    <rect width="600" height="400" fill={WC.clayLight} opacity="0.25" />
    {/* far wall */}
    <rect y="0" width="600" height="200" fill={WC.cream} opacity="0.85" filter="url(#rl-bleed-strong)" />
    {/* wood floor */}
    <g filter="url(#rl-bleed-strong)">
      <path d="M0,200 L600,200 L600,400 L0,400 Z" fill={WC.clay} opacity="0.85" />
      <path d="M0,200 L600,200 L600,400 L0,400 Z" fill={WC.clayDeep} opacity="0.2" filter="url(#rl-grain)" />
      {[260, 320, 380].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke={WC.clayDeep} strokeWidth="0.6" opacity="0.45" />
      ))}
    </g>
    {/* window */}
    <g filter="url(#rl-bleed)">
      <rect x="60" y="40" width="160" height="130" fill={WC.slate} opacity="0.6" />
      <line x1="140" y1="40" x2="140" y2="170" stroke={WC.ink2} strokeWidth="2" />
      <line x1="60" y1="105" x2="220" y2="105" stroke={WC.ink2} strokeWidth="2" />
      <rect x="56" y="36" width="168" height="138" fill="none" stroke={WC.ink2} strokeWidth="3" opacity="0.85" />
      {/* trees outside */}
      <ellipse cx="100" cy="120" rx="20" ry="40" fill={WC.pine} opacity="0.7" />
      <ellipse cx="180" cy="130" rx="22" ry="35" fill={WC.pine2} opacity="0.7" />
    </g>
    {/* bed — single, dressed */}
    <g filter="url(#rl-bleed)">
      <rect x="280" y="180" width="280" height="120" fill={WC.cream} />
      <rect x="280" y="180" width="280" height="40" fill={WC.parchment} />
      {/* duvet folds */}
      <path d="M280,220 q 70,8 140,0 t 140,0" stroke={WC.ink2} strokeWidth="0.6" fill="none" opacity="0.4" />
      {/* pillows */}
      <rect x="290" y="170" width="80" height="36" fill={WC.parchment} />
      <rect x="290" y="170" width="80" height="36" fill="none" stroke={WC.ink2} strokeWidth="0.6" opacity="0.5" />
      <rect x="380" y="170" width="80" height="36" fill={WC.parchment} />
      <rect x="380" y="170" width="80" height="36" fill="none" stroke={WC.ink2} strokeWidth="0.6" opacity="0.5" />
      {/* throw blanket */}
      <rect x="290" y="260" width="260" height="32" fill={WC.pine} opacity="0.85" />
      {/* headboard */}
      <rect x="278" y="160" width="284" height="14" fill={WC.ink2} opacity="0.85" />
    </g>
    {/* nightstand with book + lamp */}
    <g filter="url(#rl-bleed)" transform="translate(80,250)">
      <rect width="80" height="80" fill={WC.clayDeep} opacity="0.9" />
      <rect x="14" y="14" width="40" height="14" fill={WC.cream} />
      <text x="20" y="24" fontFamily="Caveat" fontSize="9" fill={WC.ink2}>Tao Te Ching</text>
      {/* lamp */}
      <rect x="56" y="-30" width="6" height="40" fill={WC.ink2} />
      <path d="M44,-50 L74,-50 L66,-30 L52,-30 Z" fill={WC.cream} />
    </g>
  </svg>
);

const RoomDorm = ({ className = '' }) => (
  <svg viewBox="0 0 600 400" className={className} aria-hidden="true">
    <WCFilters id="rd" />
    <rect width="600" height="400" fill={WC.parchment2} />
    <rect width="600" height="400" fill={WC.cream} opacity="0.4" />
    {/* shoji-screen back wall */}
    <g filter="url(#rd-bleed-strong)">
      <rect y="0" width="600" height="240" fill={WC.cream} opacity="0.95" />
      {[100, 200, 300, 400, 500].map((x, i) => (
        <line key={i} x1={x} y1="0" x2={x} y2="240" stroke={WC.ink2} strokeWidth="0.8" opacity="0.5" />
      ))}
      {[60, 120, 180].map((y, i) => (
        <line key={`h-${i}`} x1="0" y1={y} x2="600" y2={y} stroke={WC.ink2} strokeWidth="0.8" opacity="0.5" />
      ))}
    </g>
    {/* wood floor */}
    <g filter="url(#rd-bleed-strong)">
      <rect y="240" width="600" height="160" fill={WC.clay} opacity="0.85" />
      <rect y="240" width="600" height="160" fill={WC.clayDeep} opacity="0.18" filter="url(#rd-grain)" />
    </g>
    {/* four low futons in a row, ryokan style */}
    {[60, 200, 340, 480].map((x, i) => (
      <g key={i} filter="url(#rd-bleed)" transform={`translate(${x},250)`}>
        {/* bed frame */}
        <rect x="0" y="0" width="100" height="48" fill={WC.ink2} opacity="0.85" />
        {/* mattress + linen */}
        <rect x="4" y="-4" width="92" height="32" fill={WC.parchment} />
        <rect x="4" y="-4" width="92" height="10" fill={WC.parchment2} />
        {/* pillow */}
        <rect x="8" y="-10" width="34" height="14" fill={WC.cream} />
        {/* folded throw */}
        <rect x="60" y="14" width="32" height="10" fill={[WC.pine, WC.clay, WC.slate, WC.rose][i]} opacity="0.85" />
        {/* small reading lamp on wall */}
        <circle cx="50" cy="-30" r="5" fill={WC.goldHour} opacity="0.85" />
      </g>
    ))}
    {/* paper lanterns hanging */}
    {[150, 450].map((x, i) => (
      <g key={i} filter="url(#rd-bleed)">
        <line x1={x} y1="0" x2={x} y2="40" stroke={WC.ink2} strokeWidth="0.6" />
        <ellipse cx={x} cy="60" rx="22" ry="28" fill={WC.cream} />
        <ellipse cx={x} cy="60" rx="22" ry="28" fill={WC.goldHour} opacity="0.4" />
      </g>
    ))}
    {/* tatami mat in foreground */}
    <rect x="0" y="380" width="600" height="20" fill={WC.cream} opacity="0.7" />
  </svg>
);

const RoomAFrame = ({ className = '' }) => (
  <svg viewBox="0 0 600 400" className={className} aria-hidden="true">
    <WCFilters id="ra" />
    <rect width="600" height="400" fill={WC.parchment2} />
    <rect width="600" height="400" fill={WC.cream} opacity="0.5" />
    {/* triangular interior — looking up at peak */}
    <g filter="url(#ra-bleed-strong)">
      <path d="M0,400 L300,40 L600,400 Z" fill={WC.clay} opacity="0.55" />
      {/* roof beams from peak */}
      {[120, 200, 280, 380, 460].map((x, i) => (
        <line key={i} x1="300" y1="40" x2={x} y2="400" stroke={WC.ink2} strokeWidth="1.2" opacity="0.6" />
      ))}
    </g>
    {/* big triangular window with view of trees */}
    <g filter="url(#ra-bleed)">
      <path d="M120,400 L300,180 L480,400 L420,400 L300,260 L180,400 Z" fill={WC.slate} opacity="0.55" />
      {/* trees behind window */}
      <ellipse cx="240" cy="350" rx="30" ry="60" fill={WC.pine2} opacity="0.7" />
      <ellipse cx="320" cy="340" rx="34" ry="65" fill={WC.pine} opacity="0.7" />
      <ellipse cx="380" cy="360" rx="28" ry="50" fill={WC.pineDeep} opacity="0.7" />
    </g>
    {/* bed in foreground, low platform */}
    <g filter="url(#ra-bleed)">
      <rect x="100" y="320" width="400" height="60" fill={WC.cream} />
      <rect x="100" y="320" width="400" height="20" fill={WC.parchment} />
      <rect x="120" y="306" width="80" height="20" fill={WC.cream} />
      <rect x="220" y="306" width="80" height="20" fill={WC.cream} />
      <rect x="100" y="358" width="400" height="14" fill={WC.pineDeep} opacity="0.85" />
    </g>
    {/* wood stove to one side */}
    <g filter="url(#ra-bleed)" transform="translate(40,260)">
      <rect width="44" height="80" fill={WC.ink} opacity="0.95" />
      <circle cx="22" cy="40" r="10" fill={WC.goldHour} />
      <rect x="14" y="-30" width="16" height="30" fill={WC.ink2} />
    </g>
  </svg>
);

/* ============================================================
   6. HUDSON VALLEY MAP — hand-drawn, lodge marked
   ============================================================ */
const HudsonMap = ({ className = '' }) => (
  <svg viewBox="0 0 1200 700" className={className} aria-hidden="true">
    <WCFilters id="hv" />
    <rect width="1200" height="700" fill={WC.parchment2} />
    <rect width="1200" height="700" fill={WC.cream} opacity="0.4" filter="url(#hv-bleed-strong)" />
    {/* Catskill mountain washes — west side */}
    <g filter="url(#hv-bleed-strong)" opacity="0.55">
      <ellipse cx="280" cy="320" rx="220" ry="120" fill={WC.pine2} />
      <ellipse cx="380" cy="380" rx="180" ry="100" fill={WC.pine} />
      <ellipse cx="220" cy="420" rx="150" ry="80" fill={WC.pineLight} />
    </g>
    {/* small mountain peaks */}
    <g stroke={WC.ink2} strokeWidth="1" fill="none" opacity="0.55">
      {[[200, 300], [280, 280], [360, 320], [440, 290]].map(([x, y], i) => (
        <path key={i} d={`M${x - 24},${y + 16} L${x - 8},${y - 8} L${x},${y} L${x + 12},${y - 12} L${x + 28},${y + 14} Z`} />
      ))}
    </g>

    {/* Hudson River — winding ribbon */}
    <g filter="url(#hv-bleed)">
      <path
        d="M780,40 C 760,140 820,220 780,300 C 740,380 800,460 760,540 C 720,620 760,680 740,700"
        stroke={WC.slate}
        strokeWidth="22"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M780,40 C 760,140 820,220 780,300 C 740,380 800,460 760,540 C 720,620 760,680 740,700"
        stroke={WC.slateDeep}
        strokeWidth="26"
        fill="none"
        opacity="0.18"
      />
    </g>

    {/* roads — thin meandering */}
    <g stroke={WC.clayDeep} strokeWidth="1.4" fill="none" opacity="0.6" strokeDasharray="4 3">
      <path d="M80,540 C 240,500 360,520 460,460 C 540,420 640,440 760,420" />
      <path d="M260,260 C 360,300 460,320 560,300 C 640,290 720,280 760,260" />
      <path d="M420,440 C 480,460 520,500 560,540 C 600,560 660,580 760,580" />
    </g>

    {/* — TOWN MARKERS — */}
    {[
      { x: 260, y: 380, label: 'Phoenicia' },
      { x: 380, y: 460, label: 'Woodstock' },
      { x: 540, y: 540, label: 'Kingston' },
      { x: 760, y: 200, label: 'Hudson' },
      { x: 800, y: 600, label: 'Beacon' },
    ].map((t) => (
      <g key={t.label} filter="url(#hv-bleed)">
        <circle cx={t.x} cy={t.y} r="4" fill={WC.ink} />
        <text x={t.x + 10} y={t.y + 4} fontFamily="EB Garamond" fontSize="14" fill={WC.ink}>{t.label}</text>
      </g>
    ))}

    {/* — LODGE marker — large X */}
    <g filter="url(#hv-bleed)" transform="translate(330,420)">
      <circle r="22" fill="none" stroke={WC.clayDeep} strokeWidth="1.4" strokeDasharray="3 3" />
      <line x1="-10" y1="-10" x2="10" y2="10" stroke={WC.clayDeep} strokeWidth="3" />
      <line x1="-10" y1="10" x2="10" y2="-10" stroke={WC.clayDeep} strokeWidth="3" />
      <text x="30" y="6" fontFamily="Caveat" fontSize="22" fill={WC.clayDeep}>Luddite Lodge</text>
    </g>

    {/* NYC marker (south) + drive-time arc from NYC */}
    <g filter="url(#hv-bleed)">
      <rect x="940" y="650" width="100" height="14" fill={WC.ink} opacity="0.7" />
      <text x="990" y="688" fontFamily="EB Garamond" fontSize="14" fill={WC.ink} textAnchor="middle">New York City</text>
    </g>
    {/* drive arc */}
    <g fill="none" stroke={WC.clay} strokeWidth="2" opacity="0.85">
      <path d="M990,656 C 800,500 540,420 350,420" strokeDasharray="6 6" />
    </g>
    <g transform="translate(680,540) rotate(-18)">
      <text fontFamily="Caveat" fontSize="22" fill={WC.clayDeep}>~ 2 hours by car</text>
    </g>

    {/* compass rose, top right */}
    <g transform="translate(1080,90)" stroke={WC.ink2} strokeWidth="1" fill="none" opacity="0.85">
      <circle r="32" />
      <path d="M0,-32 L6,0 L0,32 L-6,0 Z" fill={WC.ink2} opacity="0.6" />
      <text x="0" y="-42" textAnchor="middle" fontFamily="Caveat" fontSize="18" fill={WC.ink2}>N</text>
    </g>

    {/* small painted flora marks */}
    {[[120, 200], [140, 480], [600, 100], [1000, 460], [950, 120], [620, 660]].map(([x, y], i) => (
      <g key={i} filter="url(#hv-bleed)" transform={`translate(${x},${y}) scale(${0.8 + (i % 3) * 0.2})`}>
        <ellipse cx="0" cy="0" rx="6" ry="9" fill={WC.pine} opacity="0.7" />
        <ellipse cx="-3" cy="-3" rx="2" ry="4" fill={WC.pine2} opacity="0.7" />
      </g>
    ))}

    {/* train line dotted */}
    <g stroke={WC.ink2} strokeWidth="1.4" opacity="0.55" fill="none" strokeDasharray="2 4">
      <path d="M780,40 C 760,140 820,220 780,300 C 740,380 800,460 760,540 C 720,620 760,680 740,700" />
    </g>
  </svg>
);

/* ============================================================
   7. SMALL ORNAMENTS — section breaks, marks, ampersand
   ============================================================ */
const Mark = ({ className = '', size = 32 }) => (
  <svg viewBox="0 0 60 60" width={size} height={size} className={className} aria-hidden="true">
    <WCFilters id="mk" />
    <g filter="url(#mk-bleed)" stroke={WC.ink} strokeWidth="1.4" fill="none">
      <circle cx="30" cy="30" r="12" />
      <circle cx="30" cy="30" r="20" opacity="0.45" />
      <line x1="6" y1="30" x2="14" y2="30" />
      <line x1="46" y1="30" x2="54" y2="30" />
    </g>
  </svg>
);

const SectionDivider = ({ label }) => (
  <div className="ornament flex items-center justify-center gap-5 my-16 reveal">
    <span className="block h-px bg-ink/30 flex-1 max-w-[160px]" />
    <Mark />
    {label && <span className="font-hand text-2xl text-ink/70">{label}</span>}
    {label && <Mark />}
    <span className="block h-px bg-ink/30 flex-1 max-w-[160px]" />
  </div>
);

// Small wordmark — Caveat hand-lettered
const Wordmark = ({ className = '', size = 'normal' }) => (
  <span className={`font-hand whitespace-nowrap ${size === 'large' ? 'text-5xl leading-[1.1]' : 'text-2xl leading-none'} ${className}`}>
    Luddite Lodge
  </span>
);

/* ============================================================
   8. BAR & BISTRO — three vignettes: bar, bistro tables, lounge
   ============================================================ */

// The Bar — long counter, low pendants, bottles backlit
const PlateBar = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="pba" />
    <rect width="800" height="600" fill={WC.parchment} />
    {/* dim back wall */}
    <rect width="800" height="600" fill="#3D352B" opacity="0.78" filter="url(#pba-bleed-strong)" />
    {/* warm wash from bottle shelves */}
    <rect y="100" width="800" height="220" fill={WC.goldHour} opacity="0.22" filter="url(#pba-bleed-strong)" />

    {/* back-bar shelving — three tiers, backlit */}
    {[150, 210, 270].map((y, i) => (
      <g key={i} filter="url(#pba-bleed)">
        <rect x="60" y={y - 6} width="680" height="2" fill={WC.clayDeep} opacity="0.85" />
        <rect x="60" y={y - 50} width="680" height="44" fill="#2E2820" opacity="0.55" />
        {/* warm strip light */}
        <rect x="60" y={y - 8} width="680" height="3" fill={WC.goldHour} opacity="0.7" />
        {/* bottles */}
        {Array.from({ length: 22 }).map((_, j) => {
          const x = 70 + j * 30;
          const palettes = ['#7A4A2A', '#8E6438', '#3F4D38', '#A88440', '#5A6B52', '#B8845F', '#2A2620'];
          const c = palettes[(i * 7 + j) % palettes.length];
          const h = 26 + ((j * 3) % 12);
          return (
            <g key={j}>
              <rect x={x - 5} y={y - h - 4} width="10" height={h} fill={c} opacity="0.92" />
              <rect x={x - 3} y={y - h - 10} width="6" height="8" fill={c} opacity="0.92" />
              {/* highlight */}
              <rect x={x - 4} y={y - h - 2} width="1.5" height={h - 6} fill={WC.cream} opacity="0.4" />
            </g>
          );
        })}
      </g>
    ))}

    {/* pendant lights over bar */}
    {[180, 360, 540, 720].map((x, i) => (
      <g key={i}>
        <line x1={x} y1="0" x2={x} y2="50" stroke={WC.ink} strokeWidth="0.8" opacity="0.7" />
        <path d={`M${x - 14},50 Q ${x},78 ${x + 14},50 Z`} fill={WC.ink2} opacity="0.95" />
        <ellipse cx={x} cy="68" rx="14" ry="6" fill={WC.goldHour} opacity="0.95" filter="url(#pba-soft)" />
        <ellipse cx={x} cy="76" rx="22" ry="10" fill={WC.goldHour} opacity="0.35" filter="url(#pba-soft)" />
      </g>
    ))}

    {/* bar counter — big slab in foreground */}
    <g filter="url(#pba-bleed-strong)">
      <rect x="0" y="380" width="800" height="14" fill={WC.clayDeep} opacity="0.95" />
      <rect x="0" y="394" width="800" height="170" fill={WC.clay} opacity="0.95" />
      <rect x="0" y="394" width="800" height="170" fill={WC.clayDeep} opacity="0.22" filter="url(#pba-grain)" />
      {/* live edge highlight */}
      <path d="M0,380 q 100,-2 200,1 t 200,-1 t 200,2 t 200,-1" stroke={WC.cream} strokeWidth="1" fill="none" opacity="0.5" />
    </g>

    {/* bar service mat + glasses on the bar */}
    {[120, 280, 460, 620].map((x, i) => (
      <g key={i} filter="url(#pba-bleed)">
        {/* coupe glass */}
        <ellipse cx={x} cy="386" rx="18" ry="3.2" fill={WC.cream} opacity="0.85" />
        <path d={`M${x - 14},386 q 14,18 28,0`} fill={i % 2 ? WC.rose : WC.goldHour} opacity="0.6" stroke={WC.ink2} strokeWidth="0.6" />
        <line x1={x} y1="395" x2={x} y2="416" stroke={WC.ink2} strokeWidth="0.5" />
        <ellipse cx={x} cy="418" rx="9" ry="1.6" fill={WC.ink2} opacity="0.6" />
      </g>
    ))}

    {/* bartender silhouette, behind bar mid-frame */}
    <g filter="url(#pba-bleed)" transform="translate(400,310)">
      <ellipse cx="0" cy="22" rx="44" ry="14" fill="#2A2620" opacity="0.4" />
      <path d="M-30,40 Q -28,-8 0,-16 Q 28,-8 30,40 Z" fill={WC.cream} opacity="0.92" />
      <path d="M-30,40 Q -28,4 0,-2 Q 28,4 30,40 Z" fill={WC.ink2} opacity="0.55" />
      {/* apron */}
      <path d="M-22,8 L-12,40 L12,40 L22,8 Z" fill={WC.clayDeep} opacity="0.85" />
      {/* head */}
      <circle cx="0" cy="-30" r="14" fill="#D6A77F" />
      {/* hair */}
      <path d="M-12,-32 Q 0,-46 12,-32 Q 10,-40 0,-44 Q -10,-40 -12,-32 Z" fill={WC.ink2} />
      {/* arms — pouring */}
      <path d="M-16,-4 Q -28,12 -16,22" stroke="#D6A77F" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M16,-4 Q 28,12 18,22" stroke="#D6A77F" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* shaker */}
      <rect x="-22" y="14" width="10" height="22" rx="2" fill={WC.cream} />
    </g>

    {/* two patron silhouettes seated at bar, foreground from behind */}
    {[180, 600].map((x, i) => (
      <g key={i} filter="url(#pba-bleed)" transform={`translate(${x},480)`}>
        {/* stool */}
        <rect x="-3" y="60" width="6" height="60" fill={WC.ink2} />
        <ellipse cx="0" cy="60" rx="22" ry="6" fill={WC.ink2} opacity="0.95" />
        {/* torso */}
        <path d="M-30,60 Q -26,10 0,2 Q 26,10 30,60 Z" fill={i ? WC.pine2 : '#3F4D5A'} opacity="0.95" />
        {/* head */}
        <circle cx="0" cy="-12" r="14" fill={i ? '#C98E7E' : '#D6A77F'} />
        <path d="M-14,-12 Q 0,-28 14,-12 Q 12,-22 0,-26 Q -12,-22 -14,-12 Z" fill={i ? WC.ink : '#5C3A24'} />
      </g>
    ))}

    {/* shelf bottle reflections / smoke at top */}
    <g opacity="0.4">
      <path d="M120,40 q -4,-12 4,-22 q -8,-10 4,-22" stroke={WC.cream} strokeWidth="1.6" fill="none" />
    </g>
  </svg>
);

// The Bistro — alcove tables, candles, banquette
const PlateBistro = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="pbi" />
    <rect width="800" height="600" fill={WC.parchment} />
    {/* warm wood-paneled back wall */}
    <rect width="800" height="600" fill={WC.clayLight} opacity="0.45" filter="url(#pbi-bleed-strong)" />
    <rect y="320" width="800" height="280" fill={WC.clay} opacity="0.55" filter="url(#pbi-bleed-strong)" />
    {/* paneling lines */}
    {[120, 240, 360, 480, 620, 740].map((x, i) => (
      <line key={i} x1={x} y1="0" x2={x} y2="320" stroke={WC.clayDeep} strokeWidth="0.6" opacity="0.4" />
    ))}
    <line x1="0" y1="190" x2="800" y2="190" stroke={WC.clayDeep} strokeWidth="0.6" opacity="0.4" />
    <line x1="0" y1="320" x2="800" y2="320" stroke={WC.clayDeep} strokeWidth="1.2" opacity="0.6" />

    {/* arched alcove on back wall — hand-drawn */}
    <g filter="url(#pbi-bleed)">
      <path d="M280,320 L280,180 Q 280,90 400,90 Q 520,90 520,180 L520,320 Z" fill="#3D352B" opacity="0.55" />
      <path d="M280,320 L280,180 Q 280,90 400,90 Q 520,90 520,180 L520,320 Z" fill="none" stroke={WC.ink2} strokeWidth="1.4" opacity="0.6" />
      {/* art in alcove — small landscape */}
      <rect x="350" y="170" width="100" height="80" fill={WC.cream} stroke={WC.ink2} strokeWidth="1.2" />
      <rect x="356" y="176" width="88" height="50" fill={WC.pine2} opacity="0.7" />
      <rect x="356" y="220" width="88" height="24" fill={WC.slate} opacity="0.65" />
    </g>

    {/* sconces — small wall lights with warm halo */}
    {[140, 660].map((x, i) => (
      <g key={i}>
        <path d={`M${x - 8},150 L${x + 8},150 L${x + 4},170 L${x - 4},170 Z`} fill={WC.cream} />
        <ellipse cx={x} cy="158" rx="20" ry="14" fill={WC.goldHour} opacity="0.4" filter="url(#pbi-soft)" />
        <circle cx={x} cy="160" r="3" fill={WC.goldHour} />
      </g>
    ))}

    {/* banquette — upholstered bench across back, ochre velvet */}
    <g filter="url(#pbi-bleed-strong)">
      <rect x="0" y="320" width="800" height="100" fill={WC.clayDeep} opacity="0.85" />
      <rect x="0" y="320" width="800" height="100" fill="#A35A4A" opacity="0.55" />
      {/* tufting */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={40 + i * 65} cy="360" r="2.5" fill={WC.ink} opacity="0.5" />
      ))}
      {/* edge piping */}
      <line x1="0" y1="320" x2="800" y2="320" stroke={WC.ink} strokeWidth="0.8" opacity="0.6" />
    </g>

    {/* floor — dark planks */}
    <rect y="420" width="800" height="180" fill="#3D352B" opacity="0.92" filter="url(#pbi-bleed-strong)" />
    <rect y="420" width="800" height="180" fill="#2A2620" opacity="0.45" filter="url(#pbi-grain)" />

    {/* — three small two-top tables along the banquette — */}
    {[160, 400, 640].map((x, i) => (
      <g key={i} filter="url(#pbi-bleed)">
        {/* table base + top — round bistro */}
        <ellipse cx={x} cy="490" rx="60" ry="14" fill={WC.ink} opacity="0.5" />
        <ellipse cx={x} cy="478" rx="64" ry="16" fill={WC.cream} />
        <ellipse cx={x} cy="478" rx="64" ry="16" fill={WC.parchment2} opacity="0.55" filter="url(#pbi-grain)" />
        <line x1={x - 64} y1="478" x2={x + 64} y2="478" stroke={WC.ink2} strokeWidth="0.6" opacity="0.5" />
        {/* iron pedestal */}
        <rect x={x - 3} y="478" width="6" height="80" fill={WC.ink} opacity="0.95" />
        <ellipse cx={x} cy="560" rx="22" ry="4" fill={WC.ink} opacity="0.95" />
        {/* candle */}
        <rect x={x - 2} y="466" width="4" height="14" fill={WC.cream} />
        <ellipse cx={x} cy="462" rx="2" ry="4" fill={WC.goldHour} />
        <ellipse cx={x} cy="460" rx="6" ry="9" fill={WC.goldHour} opacity="0.4" filter="url(#pbi-soft)" />
        {/* two place settings */}
        <ellipse cx={x - 28} cy="478" rx="14" ry="3.5" fill={WC.parchment} opacity="0.95" stroke={WC.ink2} strokeWidth="0.5" />
        <ellipse cx={x + 28} cy="478" rx="14" ry="3.5" fill={WC.parchment} opacity="0.95" stroke={WC.ink2} strokeWidth="0.5" />
        {/* wine glasses */}
        <ellipse cx={x - 28} cy="466" rx="4" ry="2" fill={WC.rose} opacity="0.7" stroke={WC.ink2} strokeWidth="0.4" />
        <ellipse cx={x + 28} cy="466" rx="4" ry="2" fill={WC.rose} opacity="0.7" stroke={WC.ink2} strokeWidth="0.4" />
      </g>
    ))}

    {/* couple seated at center table on banquette */}
    <g filter="url(#pbi-bleed)">
      {/* left figure */}
      <g transform="translate(360,360)">
        <path d="M-22,60 Q -20,-2 0,-10 Q 22,-2 22,60 Z" fill={WC.pine2} opacity="0.95" />
        <circle cx="0" cy="-22" r="11" fill="#D6A77F" />
        <path d="M-10,-22 Q 0,-36 10,-22 Q 8,-32 0,-34 Q -8,-32 -10,-22 Z" fill="#5C3A24" />
      </g>
      {/* right figure */}
      <g transform="translate(440,360)">
        <path d="M-20,60 Q -18,2 0,-6 Q 20,2 22,60 Z" fill={WC.cream} opacity="0.95" />
        <circle cx="0" cy="-22" r="11" fill="#C98E7E" />
        <path d="M-12,-22 Q 0,-38 12,-22 Q 14,-30 0,-36 Q -14,-30 -12,-22 Z" fill={WC.ink} />
      </g>
    </g>

    {/* hanging brass pendant over center table */}
    <g filter="url(#pbi-bleed)">
      <line x1="400" y1="0" x2="400" y2="60" stroke={WC.ink} strokeWidth="0.8" opacity="0.7" />
      <ellipse cx="400" cy="68" rx="22" ry="10" fill={WC.clayDeep} opacity="0.95" />
      <ellipse cx="400" cy="80" rx="20" ry="8" fill={WC.goldHour} opacity="0.95" />
      <ellipse cx="400" cy="90" rx="40" ry="20" fill={WC.goldHour} opacity="0.25" filter="url(#pbi-soft)" />
    </g>

    {/* small chalkboard */}
    <g filter="url(#pbi-bleed)" transform="translate(60,200)">
      <rect width="100" height="72" fill="#2A2620" />
      <rect width="100" height="72" fill="none" stroke={WC.clayDeep} strokeWidth="3" />
      <text x="50" y="22" textAnchor="middle" fontFamily="Caveat" fontSize="14" fill={WC.cream}>tonight</text>
      <line x1="14" y1="30" x2="86" y2="30" stroke={WC.cream} strokeWidth="0.4" opacity="0.5" />
      <text x="10" y="44" fontFamily="EB Garamond" fontSize="9" fill={WC.cream}>burrata · figs</text>
      <text x="10" y="56" fontFamily="EB Garamond" fontSize="9" fill={WC.cream}>roast chicken</text>
      <text x="10" y="68" fontFamily="EB Garamond" fontSize="9" fill={WC.cream}>plum tart</text>
    </g>
  </svg>
);

// The Lounge — fireside reading nook, two armchairs, side table
const PlateLounge = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={className} aria-hidden="true">
    <WCFilters id="plo" />
    <rect width="800" height="600" fill={WC.parchment} />
    {/* warm room wash */}
    <rect width="800" height="600" fill={WC.clayLight} opacity="0.35" filter="url(#plo-bleed-strong)" />

    {/* stone fireplace, center */}
    <g filter="url(#plo-bleed-strong)">
      <rect x="280" y="120" width="240" height="280" fill={WC.slateDeep} opacity="0.85" />
      <rect x="280" y="120" width="240" height="280" fill="#5A5048" opacity="0.55" filter="url(#plo-grain)" />
      {/* stone seams */}
      {[
        [280, 120, 80, 50], [360, 120, 60, 60], [420, 120, 100, 50],
        [280, 170, 60, 40], [340, 180, 80, 40], [420, 170, 60, 50], [480, 180, 40, 40],
        [280, 220, 90, 50], [370, 230, 70, 40], [440, 220, 80, 50],
        [280, 270, 60, 50], [340, 280, 80, 40], [420, 270, 100, 50],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="none" stroke={WC.ink2} strokeWidth="0.8" opacity="0.55" />
      ))}
      {/* hearth opening */}
      <rect x="340" y="260" width="120" height="100" fill={WC.ink} opacity="0.95" />
      {/* fire glow */}
      <ellipse cx="400" cy="350" rx="55" ry="14" fill={WC.goldHour} opacity="0.9" filter="url(#plo-soft)" />
      <path d="M370,350 q 10,-30 16,-10 q 8,-26 14,-6 q 6,-22 14,-2 q 4,-18 12,2" fill={WC.goldHour} opacity="0.85" />
      <path d="M380,350 q 8,-22 12,-6 q 6,-18 10,-2 q 6,-14 10,2" fill={WC.cream} opacity="0.55" />
      {/* mantel */}
      <rect x="270" y="106" width="260" height="14" fill={WC.clayDeep} opacity="0.95" />
      {/* mantel objects — book, vase */}
      <rect x="296" y="84" width="22" height="22" fill={WC.pine2} />
      <rect x="318" y="80" width="6" height="26" fill={WC.cream} />
      <ellipse cx="490" cy="98" rx="10" ry="8" fill={WC.cream} />
      <rect x="486" y="76" width="8" height="24" fill={WC.cream} />
    </g>

    {/* dark plank floor */}
    <rect y="400" width="800" height="200" fill="#3D352B" opacity="0.95" filter="url(#plo-bleed-strong)" />
    <rect y="400" width="800" height="200" fill="#2A2620" opacity="0.4" filter="url(#plo-grain)" />

    {/* persian-ish rug */}
    <g filter="url(#plo-bleed-strong)" transform="translate(150,440)">
      <rect width="500" height="140" fill="#A35A4A" opacity="0.85" />
      <rect width="500" height="140" fill={WC.clayDeep} opacity="0.35" filter="url(#plo-grain)" />
      <rect x="14" y="14" width="472" height="112" fill="none" stroke={WC.cream} strokeWidth="1.2" opacity="0.55" />
      <rect x="28" y="28" width="444" height="84" fill="none" stroke={WC.cream} strokeWidth="0.6" opacity="0.4" />
      {/* central diamond */}
      <path d="M250,40 L290,70 L250,100 L210,70 Z" fill="none" stroke={WC.cream} strokeWidth="0.8" opacity="0.5" />
    </g>

    {/* — two armchairs facing fire — */}
    {/* left armchair, three-quarter angle */}
    <g filter="url(#plo-bleed)" transform="translate(160,460)">
      {/* shadow */}
      <ellipse cx="0" cy="120" rx="80" ry="10" fill={WC.ink} opacity="0.45" />
      {/* back */}
      <path d="M-46,40 Q -50,-30 0,-40 Q 50,-30 46,40 Z" fill={WC.pine2} opacity="0.95" />
      {/* seat cushion */}
      <rect x="-50" y="40" width="100" height="40" rx="6" fill={WC.pine} opacity="0.95" />
      {/* arm */}
      <rect x="40" y="10" width="20" height="60" rx="6" fill={WC.pine2} opacity="0.95" />
      <rect x="-60" y="10" width="20" height="60" rx="6" fill={WC.pine2} opacity="0.95" />
      {/* legs */}
      <rect x="-44" y="80" width="6" height="22" fill={WC.ink} />
      <rect x="38" y="80" width="6" height="22" fill={WC.ink} />
      {/* throw blanket draped */}
      <path d="M-30,30 q 30,-8 60,4 q 8,18 -10,30 q -30,8 -54,-4 z" fill={WC.cream} opacity="0.85" />
    </g>

    {/* right armchair, mirrored */}
    <g filter="url(#plo-bleed)" transform="translate(640,460)">
      <ellipse cx="0" cy="120" rx="80" ry="10" fill={WC.ink} opacity="0.45" />
      <path d="M-46,40 Q -50,-30 0,-40 Q 50,-30 46,40 Z" fill={WC.clayDeep} opacity="0.95" />
      <rect x="-50" y="40" width="100" height="40" rx="6" fill="#A35A4A" opacity="0.95" />
      <rect x="40" y="10" width="20" height="60" rx="6" fill={WC.clayDeep} opacity="0.95" />
      <rect x="-60" y="10" width="20" height="60" rx="6" fill={WC.clayDeep} opacity="0.95" />
      <rect x="-44" y="80" width="6" height="22" fill={WC.ink} />
      <rect x="38" y="80" width="6" height="22" fill={WC.ink} />
    </g>

    {/* small side table between, with lamp & book */}
    <g filter="url(#plo-bleed)" transform="translate(400,490)">
      <ellipse cx="0" cy="44" rx="44" ry="6" fill={WC.ink} opacity="0.5" />
      <ellipse cx="0" cy="36" rx="40" ry="7" fill={WC.clayDeep} opacity="0.95" />
      <rect x="-3" y="36" width="6" height="50" fill={WC.ink} />
      <ellipse cx="0" cy="86" rx="20" ry="3.5" fill={WC.ink} opacity="0.85" />
      {/* lamp on top */}
      <rect x="-1.2" y="-10" width="2.4" height="46" fill={WC.ink2} />
      <path d="M-18,-30 L18,-30 L12,-10 L-12,-10 Z" fill={WC.cream} />
      <ellipse cx="0" cy="-10" rx="14" ry="3" fill={WC.goldHour} opacity="0.85" />
      <ellipse cx="0" cy="-4" rx="32" ry="14" fill={WC.goldHour} opacity="0.25" filter="url(#plo-soft)" />
      {/* book + glass */}
      <rect x="-30" y="32" width="22" height="6" fill={WC.pine2} />
      <ellipse cx="22" cy="34" rx="6" ry="2" fill={WC.cream} stroke={WC.ink2} strokeWidth="0.5" />
    </g>

    {/* one figure curled in left chair, reading */}
    <g filter="url(#plo-bleed)" transform="translate(160,440)">
      <path d="M-26,42 Q -22,0 0,-4 Q 22,0 24,42 Z" fill={WC.cream} opacity="0.95" />
      <circle cx="-4" cy="-14" r="10" fill="#D6A77F" />
      <path d="M-12,-14 Q -2,-26 8,-14 Q 4,-22 -4,-24 Q -10,-22 -12,-14 Z" fill={WC.ink2} />
      {/* book */}
      <rect x="-12" y="14" width="22" height="14" fill={WC.clayDeep} />
      <line x1="-1" y1="14" x2="-1" y2="28" stroke={WC.cream} strokeWidth="0.4" />
    </g>
  </svg>
);

// The dimensions/etc spread expects exposure; add to window
window.PlateBar = PlateBar;
window.PlateBistro = PlateBistro;
window.PlateLounge = PlateLounge;

// expose
Object.assign(window, {
  WC, WCFilters,
  HeroPlate, KeyMapVignette, BistroTable,
  PlateRestoration, PlateConnection, PlateCreativity, PlateMovement, PlateSolitude,
  PlateBar, PlateBistro, PlateLounge,
  RoomLodge, RoomDorm, RoomAFrame,
  HudsonMap, Mark, SectionDivider, Wordmark,
});


// Luddite Lodge — concept site
// Editorial single-page artifact. Sections in scroll order:
// Hero · The ritual · Before/After · Dimensions · Accommodations
// · A weekend at the Lodge · Ethos · Location · The opportunity · Footer

const { useState, useEffect, useRef, useCallback, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "displayFont": "Cardo",
  "bodyFont": "EB Garamond",
  "handFont": "Caveat",
  "scale": 1,
  "leading": 1.7,
  "tracking": -0.01,
  "paperTone": "parchment",
  "accent": "clay",
  "grain": 0.16,
  "showDropcaps": true,
  "scriptMarginalia": true,
  "spacing": "editorial",
  "vignette": "soft",
  "showOrnaments": true
}/*EDITMODE-END*/;

// Paper tone presets — all warm, never cold; chroma kept very low
const PAPER_TONES = {
  parchment: { bg: '#F4EFE6', soft: '#EDE5D6', ink: '#2A2620' },
  bone:      { bg: '#F2EAD8', soft: '#E8DEC7', ink: '#2A2620' },
  chalk:     { bg: '#F7F3EB', soft: '#EFE9DC', ink: '#28251F' },
  driftwood: { bg: '#EBE2D2', soft: '#DFD3BD', ink: '#2A2620' },
  fog:       { bg: '#EDEBE3', soft: '#E2DED1', ink: '#2A2725' },
};

// Accent presets — share chroma, vary hue
const ACCENTS = {
  clay:    { hex: '#B8845F', name: 'Clay'    },
  pine:    { hex: '#5A6B52', name: 'Pine'    },
  slate:   { hex: '#7C8A92', name: 'Slate'   },
  ochre:   { hex: '#A88440', name: 'Ochre'   },
  rust:    { hex: '#A35A4A', name: 'Rust'    },
  ink:     { hex: '#3F4D38', name: 'Forest'  },
};

// expose tweaks to other modules via context
const TweakContext = React.createContext(TWEAK_DEFAULTS);

/* — small reveal-on-scroll util — */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   NAV — quiet, top-aligned wordmark + a single right-side anchor
   ============================================================ */
const TopBar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-6 flex justify-between items-center pointer-events-none">
    <a href="#top" className="pointer-events-auto">
      <Wordmark className="text-ink/90" />
    </a>
    <nav className="pointer-events-auto hidden md:flex gap-10 small-caps text-[12px] text-ink/75">
      <a href="#ritual" className="ink-link">The ritual</a>
      <a href="#stay" className="ink-link">Stay</a>
      <a href="#bar" className="ink-link">The lodge</a>
      <a href="#weekend" className="ink-link">A weekend</a>
      <a href="#events" className="ink-link">Events</a>
      <a href="#residency" className="ink-link">Residency</a>
      <a href="#location" className="ink-link">Location</a>
      <a href="#waitlist" className="ink-link">Join the list</a>
      <a href="#opportunity" className="ink-link">The opportunity</a>
    </nav>
  </header>
);

/* ============================================================
   1. HERO
   ============================================================ */
const Hero = () => (
  <section id="top" className="relative h-[100vh] min-h-[720px] w-full overflow-hidden">
    {/* full-bleed plate — watercolor rendering */}
    <div className="absolute inset-0">
      <img
        src="/hero-lodge.png"
        alt="Luddite Lodge — watercolor rendering at golden hour"
        className="w-full h-full object-cover"
      />
      {/* faint top-down vignette so type sits */}
      <div className="hero-vignette absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(244,239,230,0.55) 0%, rgba(244,239,230,0) 32%, rgba(244,239,230,0) 60%, rgba(42,38,32,0.45) 100%)' }} />
    </div>

    {/* hero copy block — bottom-left, restrained */}
    <div className="absolute inset-x-0 bottom-0 px-8 md:px-20 pb-20 md:pb-28 text-parchment">
      <div className="max-w-[860px]">
        <p className="small-caps text-[12px] text-parchment/80 mb-6">Catskills · phone-free weekends · opening 2027</p>
        <h1 className="font-display text-[44px] md:text-[78px] leading-[0.98] tracking-[-0.01em] text-parchment" style={{ textShadow: '0 2px 24px rgba(20,16,10,0.55)' }}>
          A phone-free lodge<br />
          <span className="italic">in the Catskills.</span>
        </h1>
        <p className="mt-8 max-w-[560px] text-parchment/90 text-[19px] leading-[1.55]" style={{ textShadow: '0 1px 12px rgba(20,16,10,0.6)' }}>
          Two hours from Penn Station. Phones stay at the desk. Iron key, folded map, dinner
          at half past seven. Opening 2027.
        </p>
      </div>
    </div>

    {/* scroll affordance */}
    <a href="#ritual" className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-parchment/85 small-caps text-[10px]">
      <span>scroll</span>
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M7,2 L7,18 M2,13 L7,18 L12,13" strokeLinecap="round" />
      </svg>
    </a>
  </section>
);

/* ============================================================
   2. THE RITUAL — hosted arrival passage + key/map vignette
   ============================================================ */
const Ritual = () => (
  <section id="ritual" className="relative px-8 md:px-20 pt-32 md:pt-44 pb-20">
    <div className="max-w-[1280px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
      <div className="md:col-span-6 reveal">
        <p className="small-caps text-[12px] text-ink/60 mb-6">i. the ritual</p>
        <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em] mb-8">
          A small ceremony for crossing over.
        </h2>
        <div className="font-body text-[19px] leading-[1.7] text-ink2 space-y-5">
          <p className="dropcap">
            At check-in, the phone goes away and the weekend gets a little more physical.
            You leave the desk with an iron key, a folded map, and a card for the next few days.
            It is not meant to feel severe. It is meant to make the threshold visible.
          </p>
          <p>
            The card has the rhythm of the place on it: coffee, sauna, bistro hours, dinner at
            half past seven, maybe a foraging walk or a film on the lawn after dark. Enough
            structure to enter the weekend, not so much that it starts to feel scheduled.
          </p>
          <p>
            That is the whole system. Nothing to download, nothing to scan, nothing to manage.
            The map shows the trails, the cabins, the pond, the bistro, and the places worth
            reaching slowly. The rest you find by walking.
          </p>
        </div>
      </div>
      <div className="md:col-span-6 reveal">
        <KeyMapVignette className="w-full h-auto" />
        <p className="marginalia font-hand text-[20px] text-ink/70 mt-3 text-center md:text-right pr-4">
          — the key, the map, the card.
        </p>
      </div>
    </div>
  </section>
);

/* ============================================================
   3. BEFORE / AFTER — draggable comparison slider
   ============================================================ */
const BeforeAfter = () => {
  const [pct, setPct] = useState(50);
  const wrapRef = useRef(null);
  const draggingRef = useRef(false);

  const move = useCallback((clientX) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = Math.max(0, Math.min(r.width, clientX - r.left));
    setPct((x / r.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      move(cx);
    };
    const onUp = () => { draggingRef.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [move]);

  // gentle nudge animation on first reveal
  useEffect(() => {
    let raf;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        let p = 50;
        let dir = 1;
        let frames = 0;
        const tick = () => {
          frames++;
          p += dir * 0.45;
          if (p > 64) dir = -1;
          if (p < 36) dir = 1;
          setPct(p);
          if (frames < 110) raf = requestAnimationFrame(tick);
          else setPct(50);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="relative px-8 md:px-20 py-24 md:py-32 bg-parchment2/50">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="small-caps text-[12px] text-ink/60 mb-5">v. the difference</p>
          <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em] max-w-[720px] mx-auto">
            One table.<br />
            <span className="italic text-ink/75">Two versions of the same dinner.</span>
          </h2>
          <p className="mt-6 text-ink2 text-[18px] leading-[1.65] max-w-[540px] mx-auto">
            Drag to compare. The food is identical. The room is not.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="reveal relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[680px] mx-auto rounded-[2px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(42,38,32,0.25)] select-none"
          onMouseDown={(e) => { draggingRef.current = true; move(e.clientX); }}
          onTouchStart={(e) => { draggingRef.current = true; move(e.touches[0].clientX); }}
        >
          {/* "AFTER" — present, full layer */}
          <div className="absolute inset-0">
            <BistroTable mode="present" className="w-full h-full" />
          </div>
          {/* "BEFORE" — devices, clipped to left side */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          >
            <BistroTable mode="devices" className="w-full h-full" />
          </div>

          {/* labels */}
          <div className="absolute top-5 left-5 small-caps text-[11px] tracking-[0.22em] text-ink/85 bg-parchment/85 px-3 py-1.5">
            screen-lit
          </div>
          <div className="absolute top-5 right-5 small-caps text-[11px] tracking-[0.22em] text-ink/85 bg-parchment/85 px-3 py-1.5">
            present
          </div>

          {/* divider line + handle */}
          <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
            {/* hand-drawn divider — wobbly stroke */}
            <svg className="h-full" width="3" viewBox="0 0 3 100" preserveAspectRatio="none">
              <path d="M1.5,0 q -1,15 0.5,30 q 1,15 -0.5,30 q -1,15 0.5,40" stroke="#2A2620" strokeWidth="1.6" fill="none" opacity="0.85" />
            </svg>
          </div>
          {/* handle button */}
          <button
            aria-label="Drag to compare"
            className="ba-handle absolute top-1/2"
            style={{ left: `${pct}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={(e) => { e.stopPropagation(); draggingRef.current = true; }}
            onTouchStart={(e) => { e.stopPropagation(); draggingRef.current = true; }}
          >
            <svg width="62" height="62" viewBox="0 0 62 62">
              <WCFilters id="hd" />
              <g filter="url(#hd-bleed)">
                <circle cx="31" cy="31" r="26" fill="#F4EFE6" stroke="#2A2620" strokeWidth="1.4" />
                <circle cx="31" cy="31" r="22" fill="none" stroke="#2A2620" strokeWidth="0.6" opacity="0.4" />
                <path d="M22,31 L16,31 M40,31 L46,31" stroke="#2A2620" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M22,31 L26,27 M22,31 L26,35" stroke="#2A2620" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <path d="M40,31 L36,27 M40,31 L36,35" stroke="#2A2620" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </g>
            </svg>
          </button>
        </div>

        <p className="marginalia text-center font-hand text-[22px] text-ink/70 mt-6 reveal">
          — the bistro, half past seven.
        </p>
      </div>
    </section>
  );
};

/* ============================================================
   4. THE DIMENSIONS — alternating left/right plates
   ============================================================ */
const DIMENSIONS = [
  {
    n: 'i',
    title: 'Restoration',
    body: [
      `A spring-fed pool cut into the hillside, cold enough in August to remind you where you are. A wood-fired sauna behind the birch stand. Beds dressed in linen, curtains that do the job, and windows that open onto the forest at night.`,
      `We don't program the recovery. We remove what interrupts it. Quiet grounds after ten, mornings soft enough to hear the first chair move on the porch, and a kitchen that opens before the trails do.`,
    ],
    Plate: PlateRestoration,
    cap: 'the pool — the spring keeps it cold all summer.',
  },
  {
    n: 'ii',
    title: 'Connection',
    body: [
      `Dinner at the bistro starts at half past seven: a few specials from nearby farms, set at the long table. You sit where there's room. The kitchen grows the vegetables; the valley does the rest.`,
      `During the day the shared kitchen stays open — kettle on, bread board out, beans ground. A few guests arrive alone and leave with plans for next autumn.`,
    ],
    Plate: PlateConnection,
    cap: 'the bistro — single seating, half past seven.',
  },
  {
    n: 'iii',
    title: 'Creativity',
    body: [
      `A shelf of journals in every room. A stack of field guides no one owns. An upright piano in the reading room that holds its tune imperfectly. Kids get disposable cameras; we develop the rolls and mail the prints after checkout.`,
      `Film nights run on the lawn in summer — a white sheet, a projector, fireflies filling in the rest. In winter they move inside and start a little earlier.`,
    ],
    Plate: PlateCreativity,
    cap: 'a journal, a leaf, a Yashica T4.',
  },
  {
    n: 'iv',
    title: 'Movement',
    body: [
      `Twelve miles of trail through old-growth hardwood and hemlock, hand-drawn onto your folded map. A foraging walk most mornings with a guide who knows the difference between sumac and poison oak. Yoga on the upper deck at seven — optional, no mat required.`,
      `The map marks a bench by the lower pond that takes forty minutes to reach at a proper pace. Most people take longer. It's worth taking longer.`,
    ],
    Plate: PlateMovement,
    cap: 'the upper trail — mile four, soft season.',
  },
  {
    n: 'v',
    title: 'Solitude',
    body: [
      `Eight A-frame cabins in the trees, spaced far enough apart to hear the creek and not your neighbor. A wood stove in each that takes a little patience, a reading nook with a lamp, a porch with two chairs and room for a dog.`,
      `Some guests arrive, light the stove, and don't make it to the lodge for dinner once. We leave them to it. The bistro delivers to the eastern path.`,
    ],
    Plate: PlateSolitude,
    cap: 'the eastern A-frame — the long way around.',
  },
  {
    n: 'vi',
    title: 'Events',
    body: [
      `Each season the lodge runs a short calendar: a concert in the barn, a visiting chef taking over the bistro, a small exhibition, an outdoor screening with a guest speaker. Open to current guests and a modest walk-in list.`,
      `Nothing is ticketed far in advance. The schedule is printed and posted at the bar each week. The idea is that the best things here happen without much planning on your part.`,
    ],
    Plate: PlateEvents,
    cap: 'the barn — first friday of the month.',
  },
  {
    n: 'vii',
    title: 'Residency',
    body: [
      `A small number of residents live and work at the lodge each season — a chef developing a menu, a woodworker building furniture for the rooms, a farmer on the kitchen garden, an artist finishing a body of work. Residencies run four to twelve weeks.`,
      `Residents eat at the bistro, sleep in a lodge room, and contribute something specific to the place. The granary has been converted into a studio. Applications open in March.`,
    ],
    Plate: PlateResidency,
    cap: 'the granary studio — residency hours.',
  },
];

const Dimensions = () => (
  <section className="relative px-8 md:px-20 py-24 md:py-36">
    <div className="max-w-[1320px] mx-auto">
      <div className="text-center max-w-[760px] mx-auto reveal mb-20 md:mb-28">
        <p className="small-caps text-[12px] text-ink/60 mb-5">ii. the dimensions</p>
        <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em]">
          Seven ways a weekend can open.
        </h2>
        <p className="mt-6 text-ink2 text-[18px] leading-[1.65]">
          The property is built around seven rhythms. None are mandatory. Most happen whether
          you join in or simply let them shape the background.
        </p>
      </div>

      <div className="space-y-28 md:space-y-40">
        {DIMENSIONS.map((d, i) => {
          const flipped = i % 2 === 1;
          const Plate = d.Plate;
          return (
            <div key={d.title} className="grid md:grid-cols-12 gap-10 md:gap-16 items-center reveal">
              <div className={`md:col-span-7 ${flipped ? 'md:order-2' : ''}`}>
                <div className="relative">
                  <Plate className="w-full h-auto" />
                  <p className={`marginalia font-hand text-[18px] text-ink/65 mt-3 ${flipped ? 'text-left pl-3' : 'text-right pr-3'}`}>
                    — {d.cap}
                  </p>
                </div>
              </div>
              <div className={`md:col-span-5 ${flipped ? 'md:order-1' : ''}`}>
                <p className="small-caps text-[11px] text-ink/55 mb-4">no. {d.n}</p>
                <h3 className="font-display text-[40px] md:text-[58px] leading-[1] mb-6 tracking-[-0.01em]">
                  {d.title}
                </h3>
                <div className="space-y-4 text-ink2 text-[18px] leading-[1.7] max-w-[480px]">
                  {d.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ============================================================
   5. ACCOMMODATIONS — three product cards, kept editorial
   ============================================================ */
const STAYS = [
  {
    title: 'The Lodge rooms',
    Art: RoomLodge,
    sleeps: 'sleeps 1–2',
    season: 'year-round',
    inroom: ['linen sheets', 'wood stove', 'french press', 'a small library'],
    body: `Twelve small private rooms in the main building, each named after a tree you can see from the window. You're a stair away from the shared kitchen and the reading room — close to company, easy to step away from.`,
    range: '$320–$440 / night',
  },
  {
    title: 'The Dorms',
    Art: RoomDorm,
    sleeps: 'four or six beds',
    season: 'year-round',
    inroom: ['low platform beds', 'shoji screens', 'reading lamp at each pillow', 'shared tea bar'],
    body: `For solo travelers and friend groups, two dormitories appointed in the spirit of a Japanese ryokan. Beds are low, light is soft, voices are quiet by ten. The shared kitchen is a flight away.`,
    range: '$140–$190 / night',
  },
  {
    title: 'The A-frames',
    Art: RoomAFrame,
    sleeps: 'sleeps 2–4',
    season: 'all seasons',
    inroom: ['wood stove', 'CD player & shelf', 'a porch & two chairs', 'french doors to the trees'],
    body: `Eight standalone cabins set back in the trees. Best for stays of three nights or more — long enough for the silence to find you. Dinner can be delivered if the porch is calling louder than the table.`,
    range: '$520–$760 / night',
  },
];

const Accommodations = () => (
  <section id="stay" className="relative px-8 md:px-20 py-24 md:py-32 bg-parchment2/50">
    <div className="max-w-[1320px] mx-auto">
      <div className="text-center max-w-[760px] mx-auto mb-20 reveal">
        <p className="small-caps text-[12px] text-ink/60 mb-5">iii. accommodations</p>
        <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em]">
          Three ways to stay.
        </h2>
        <p className="mt-6 text-ink2 text-[18px] leading-[1.65]">
          Rooms in the lodge, beds for solo travelers, and cabins for longer stays.
          Different degrees of privacy, all on the same quiet program.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {STAYS.map((s) => {
          const Art = s.Art;
          return (
            <article key={s.title} className="reveal flex flex-col">
              <div className="bg-parchment shadow-[0_20px_40px_-24px_rgba(42,38,32,0.3)]">
                <Art className="w-full h-auto" />
              </div>
              <div className="pt-7 pr-2">
                <h3 className="font-display text-[30px] md:text-[34px] leading-[1.05] mb-3 tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="small-caps text-[10px] text-ink/55 mb-4">
                  {s.sleeps} · {s.season} · {s.range}
                </p>
                <p className="text-ink2 text-[17px] leading-[1.65] mb-5">{s.body}</p>
                <p className="marginalia font-hand text-[18px] text-ink/65 leading-[1.4]">
                  {s.inroom.join(' · ')}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

/* ============================================================
   6. THE LODGE — bar, bistro, board games, all one room
   ============================================================ */
const LODGE_BITS = [
  { Plate: PlateLounge, title: 'Couches & games',
    small: 'a corner with no agenda',
    body: `Low couches around a working fireplace. Backgammon, cribbage, a chess set someone always seems to be in the middle of. A shelf of cards and dominoes; a basket of throws when it gets late.` },
  { Plate: PlateBar, title: 'The bar',
    small: 'pour your own, or ask',
    body: `One walnut counter at the back of the room. Local spirits, a short list of natural wines, beer from a brewery up the road. Help yourself when we're not behind it; we are usually nearby.` },
  { Plate: PlateBistro, title: 'A few farm specials',
    small: 'three things, written that morning',
    body: `Two or three dishes a night, sourced from the valley — a roasted chicken, a bowl of beans, whatever the garden gave up. Eat at the long table, on a couch, or on the porch. There are no reservations because there is no other room.` },
];

const BarBistro = () => (
  <section id="bar" className="relative px-8 md:px-20 py-24 md:py-36">
    <div className="max-w-[1320px] mx-auto">
      <div className="text-center max-w-[760px] mx-auto mb-20 reveal">
        <p className="small-caps text-[12px] text-ink/60 mb-5">iv. the lodge</p>
        <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em]">
          One room. A bar, a kitchen,<br />
          <span className="italic text-ink/80">and a lot of soft furniture.</span>
        </h2>
        <p className="mt-6 text-ink2 text-[18px] leading-[1.65] max-w-[620px] mx-auto">
          The lodge is the heart of the property, and it does everything at once: a counter to pour from,
          a kitchen running a few specials a night, couches by the fireplace, and a board-game table that
          stays half-finished from one evening to the next.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:gap-8">
        {LODGE_BITS.map(({ Plate, title, small, body }) => (
          <article key={title} className="reveal">
            <div className="bg-parchment shadow-[0_24px_48px_-26px_rgba(42,38,32,0.32)]">
              <Plate className="w-full h-auto" />
            </div>
            <div className="pt-7 pr-2">
              <p className="small-caps text-[10px] text-ink/55 mb-3">{small}</p>
              <h3 className="font-display text-[28px] md:text-[34px] leading-[1.05] mb-4 tracking-[-0.01em]">
                {title}
              </h3>
              <p className="text-ink2 text-[17px] leading-[1.65]">{body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 max-w-[820px] mx-auto reveal text-center">
        <p className="font-display italic text-[22px] md:text-[26px] text-ink/85 leading-[1.5]">
          Open from late afternoon until the last person heads back to their room.
          Help yourself to the bar, the chess set, or the kettle — someone will be around.
        </p>
        <p className="marginalia font-hand text-[20px] text-ink/60 mt-5">
          — kitchen run by Aly, formerly of Scribe Winery and The Whitney.
        </p>
      </div>
    </div>
  </section>
);
const SCHEDULE = [
  {
    day: 'Friday',
    items: [
      ['4:00', 'arrival · keys, maps, and a slow exhale'],
      ['5:30', 'tea & a slow tour of the grounds'],
      ['7:30', 'bistro dinner — pork shoulder, polenta, the last of the figs'],
      ['9:30', 'a fire on the lawn, weather depending'],
    ],
  },
  {
    day: 'Saturday',
    items: [
      ['7:00', 'yoga on the deck (optional, always)'],
      ['8:30', 'breakfast — bread, eggs, soft butter'],
      ['10:30', 'foraging walk with Sam — chanterelles, sumac, the small things'],
      ['1:00', 'lunch in the kitchen, then nap'],
      ['4:00', 'pool, sauna, the porch'],
      ['7:30', 'dinner — Provençal night'],
      ['9:30', 'film on the lawn — projector, sheet, fireflies'],
    ],
  },
  {
    day: 'Sunday',
    items: [
      ['8:00', 'pancakes & the New York Times in print'],
      ['10:00', 'optional services — neither religious nor not'],
      ['11:30', 'the long checkout — photographs taken, bread to take home'],
    ],
  },
];

const Weekend = () => (
  <section id="weekend" className="relative px-8 md:px-20 py-24 md:py-32">
    <div className="max-w-[1180px] mx-auto">
      <div className="text-center max-w-[760px] mx-auto mb-16 reveal">
        <p className="small-caps text-[12px] text-ink/60 mb-5">vi. a sample weekend</p>
        <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em]">
          A weekend, written on one card.
        </h2>
      </div>

      {/* the page itself — like a hand-lettered itinerary */}
      <div className="reveal relative bg-parchment border border-ink/15 shadow-[0_30px_60px_-30px_rgba(42,38,32,0.3)] p-8 md:p-16 max-w-[920px] mx-auto">
        {/* paper grain inside */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' seed='5'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0 0.12 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }} />
        {/* corner mark */}
        <div className="absolute top-4 right-5 font-hand text-[18px] text-ink/55">— a weekend —</div>

        <div className="relative space-y-12">
          {SCHEDULE.map((d) => (
            <div key={d.day}>
              <h3 className="font-hand text-[44px] md:text-[56px] leading-[0.9] mb-5 text-ink">{d.day}.</h3>
              <ul className="space-y-3 max-w-[640px]">
                {d.items.map(([t, label], i) => (
                  <li key={i} className="grid grid-cols-[80px_1fr] gap-5 items-baseline">
                    <span className="font-display italic text-[20px] text-ink/85">{t}</span>
                    <span className="text-ink2 text-[18px] leading-[1.5] border-b border-dotted border-ink/25 pb-2">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* signoff */}
        <div className="relative mt-14 flex justify-end items-center gap-4">
          <Mark size={26} />
          <span className="font-hand text-[20px] text-ink/60">tear off & keep</span>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   7. ETHOS — long prose + pull quote
   ============================================================ */

/* ============================================================
   7a. EVENTS — seasonal programming
   ============================================================ */
const EVENTS_LIST = [
  {
    type: 'Music',
    examples: 'A concert in the barn. A string quartet on the upper deck. A pianist in the reading room. Usually a single performer, occasionally a duo. Always a small room.',
  },
  {
    type: 'Visiting chefs',
    examples: 'One weekend a month a chef takes over the bistro — a different menu, a different hand. Local farmers cook once a season. Staff cook the rest.',
  },
  {
    type: 'Exhibitions',
    examples: 'Small shows in the lodge: a photographer who spent a season in the valley, a woodworker\u2019s new series, an artist from the current residency. Work is available to buy; we handle the paperwork.',
  },
  {
    type: 'Screenings & talks',
    examples: 'A film on the lawn in summer with a guest introduction. A conversation about a book, a landscape, an idea. Nothing keynote-style — more like a long dinner that starts with a question.',
  },
];

const Events = () => (
  <section id="events" className="relative px-8 md:px-20 py-24 md:py-36 bg-parchment2/40">
    <div className="max-w-[1180px] mx-auto">
      <div className="text-center max-w-[760px] mx-auto mb-16 reveal">
        <p className="small-caps text-[12px] text-ink/60 mb-5">vii. events</p>
        <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em]">
          A short calendar.<br />
          <span className="italic text-ink/75">Printed, not announced.</span>
        </h2>
        <p className="mt-6 text-ink2 text-[18px] leading-[1.65] max-w-[600px] mx-auto">
          Each season the lodge hosts a small number of events: concerts, exhibitions, visiting chefs,
          outdoor screenings. Open to current guests and a walk-in list. Nothing ticketed months ahead.
          The schedule is posted at the bar each week.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-[900px] mx-auto">
        {EVENTS_LIST.map((e) => (
          <div key={e.type} className="reveal">
            <p className="small-caps text-[11px] text-ink/55 mb-3">{e.type}</p>
            <p className="text-ink2 text-[18px] leading-[1.7]">{e.examples}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center reveal">
        <p className="font-hand text-[22px] text-ink/60">
          — the barn, first friday of the month.
        </p>
      </div>
    </div>
  </section>
);

/* ============================================================
   7b. RESIDENCY — long-term creative residencies
   ============================================================ */
const RESIDENCY_TRACKS = [
  {
    track: 'Culinary',
    detail: 'A chef or food researcher develops a menu or project, cooking at the bistro one or two nights a week. The kitchen garden and the valley farms are at their disposal.',
  },
  {
    track: 'Craft & making',
    detail: 'A woodworker, weaver, ceramicist, or maker works in the granary studio. Resident work often ends up in the lodge — a chair, a set of bowls, a piece of textile on the wall.',
  },
  {
    track: 'Land & farming',
    detail: 'A farmer or ecologist works on the kitchen garden, the orchard, or a research project with the land. The lodge has six acres of cultivated ground and a working composting operation.',
  },
  {
    track: 'Art & writing',
    detail: 'An artist or writer completes a body of work. The granary has a large skylight, north-facing, and good silence. Exhibitions and readings are offered at the end of each residency.',
  },
];

const Residency = () => (
  <section id="residency" className="relative px-8 md:px-20 py-24 md:py-36">
    <div className="max-w-[1180px] mx-auto">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5 reveal">
          <p className="small-caps text-[12px] text-ink/60 mb-5">viii. residency</p>
          <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em] mb-8">
            Live here.<br />
            <span className="italic text-ink/75">Make something.</span>
          </h2>
          <div className="space-y-5 text-ink2 text-[18px] leading-[1.75]">
            <p>
              A small number of residents live and work at the lodge each season — a chef developing
              a menu, a woodworker building furniture for the rooms, a farmer working the kitchen
              garden, an artist finishing a body of work.
            </p>
            <p>
              Residencies run four to twelve weeks. Residents eat at the bistro, sleep in a lodge
              room, and contribute something specific to the place. The contribution is part of the
              agreement: the work either stays at the lodge or is shown here before it goes elsewhere.
            </p>
            <p>
              Applications open in March. We take four residents per season. The granary has been
              converted into a shared studio with good north light, a separate entrance, and enough
              quiet to work in.
            </p>
          </div>
          <p className="font-hand text-[20px] text-ink/60 mt-8">— applications open each March.</p>
        </div>

        <div className="md:col-span-7 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {RESIDENCY_TRACKS.map((r) => (
              <div key={r.track} className="border-t border-ink/15 pt-6">
                <p className="small-caps text-[11px] text-ink/55 mb-3">{r.track}</p>
                <p className="text-ink2 text-[17px] leading-[1.7]">{r.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <PlateResidency className="w-full h-auto opacity-90" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   9. ETHOS — long prose + pull quote
   ============================================================ */
const Ethos = () => (
  <section className="relative px-8 md:px-20 py-28 md:py-40 bg-parchment2/60">
    <div className="max-w-[820px] mx-auto reveal">
      <p className="small-caps text-[12px] text-ink/60 mb-6 text-center">ix. ethos</p>
      <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em] text-center mb-14">
        Why a hotel, and why like this.
      </h2>

      <div className="space-y-6 text-ink2 text-[19px] leading-[1.75]">
        <p className="dropcap">
          Most people no longer need another argument against the phone. They need a place where the
          argument has already been settled. Luddite Lodge is a third door between everyday distraction
          and a formal retreat: quality time, the kind that used to come for free in a summer cabin or a
          grandmother's house, available on a Friday afternoon out of Penn Station.
        </p>
        <p>
          The lineage we draw on is older than the wellness category. Monasteries built rules around
          attention long before that was a marketed phrase. Amish farms run a software-free operating
          system that produces some of the most settled families in the country. Eco-villages, summer
          camps, the small Greek islands where the WiFi cuts out at noon — these are the references.
          Less <em>retreat</em>, more <em>visiting somewhere with rules</em>.
        </p>
      </div>

      <figure className="my-16 md:my-20 text-center">
        <blockquote className="font-display italic text-[32px] md:text-[44px] leading-[1.2] tracking-[-0.005em] text-ink max-w-[760px] mx-auto">
          “The hardest thing isn't giving up the phone. It's the first hour after, when you don't know
          where to put your hands.”
        </blockquote>
        <figcaption className="font-hand text-[20px] text-ink/65 mt-6">
          — a guest, after the first soft-opening weekend.
        </figcaption>
      </figure>

      <div className="space-y-6 text-ink2 text-[19px] leading-[1.75]">
        <p>
          The answer to that first hour is the architecture, the programming, and the unfussy fact of
          someone else's hands having put a fire together for you. The rule is not an austerity measure.
          It is what makes the rest of the place possible.
        </p>
        <p>
          Luddite Lodge is for couples on their second visit, for the friend group that travels every
          October, for the kid who's never seen a film projected on a sheet, for the writer whose draft
          needs a Saturday. It is not for everyone. We think that's the point.
        </p>
      </div>
    </div>
  </section>
);

/* ============================================================
   8. LOCATION — hand-drawn Hudson Valley map
   ============================================================ */
const Location = () => (
  <section id="location" className="relative px-8 md:px-20 py-24 md:py-32">
    <div className="max-w-[1320px] mx-auto">
      <div className="text-center max-w-[760px] mx-auto mb-16 reveal">
      <p className="small-caps text-[12px] text-ink/60 mb-5">x. the location</p>
        <h2 className="font-display text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.01em]">
          Two hours from Penn Station,<br />far enough to feel it.
        </h2>
      </div>

      <div className="reveal">
        <HudsonMap className="w-full h-auto" />
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-14 max-w-[1080px] mx-auto reveal">
        <div>
          <p className="small-caps text-[11px] text-ink/55 mb-3">by car</p>
          <p className="text-ink2 text-[17px] leading-[1.6]">
            ~ 2 hours from Manhattan via the Thruway, exit at Kingston.
            Most guests arrive on a Friday afternoon and leave on a Sunday by lunch.
          </p>
        </div>
        <div>
          <p className="small-caps text-[11px] text-ink/55 mb-3">by train</p>
          <p className="text-ink2 text-[17px] leading-[1.6]">
            Amtrak to Hudson, ~ 2h. We meet the train with a small van Friday and Sunday,
            no charge. Bring something to read; the weekend starts before the driveway.
          </p>
        </div>
        <div>
          <p className="small-caps text-[11px] text-ink/55 mb-3">nearby</p>
          <p className="text-ink2 text-[17px] leading-[1.6]">
            Phoenicia, Woodstock, Hudson, Beacon, Kingston — all within forty minutes.
            We have favourite bookstores and bakeries in each, marked on the paper map.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   8b. WAITLIST — guest-facing email capture
   ============================================================ */
const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative px-8 md:px-20 py-28 md:py-40 bg-ink text-parchment">
      <div className="max-w-[760px] mx-auto text-center reveal">
        <Mark size={34} className="mx-auto mb-10 opacity-60" />
        <p className="small-caps text-[12px] text-parchment/55 mb-6 tracking-[0.18em]">
          opening 2027 · catskills
        </p>
        <h2 className="font-display text-[36px] md:text-[56px] leading-[1.03] tracking-[-0.01em] mb-7">
          Be the first to know<br />
          <span className="italic text-parchment/80">when the phones go away.</span>
        </h2>
        <p className="text-parchment/70 text-[18px] leading-[1.65] mb-12 max-w-[520px] mx-auto">
          No newsletter. One email when bookings open — early access for waitlist guests before
          the general release. We'll write back if you have questions.
        </p>

        {submitted ? (
          <div className="space-y-4">
            <p className="font-hand text-[28px] text-parchment/90">You're on the list.</p>
            <p className="text-parchment/55 text-[16px]">We'll be in touch before 2027.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-parchment/35 px-5 py-3.5 text-parchment placeholder:text-parchment/35 text-[17px] font-body focus:outline-none focus:border-parchment/75 transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-parchment text-ink text-[14px] small-caps tracking-[0.14em] hover:bg-cream transition-colors whitespace-nowrap"
            >
              Join the list
            </button>
          </form>
        )}

        <p className="font-hand text-[16px] text-parchment/40 mt-8">
          — no phones, no newsletters, no exceptions.
        </p>
      </div>
    </section>
  );
};

/* ============================================================
   9. THE OPPORTUNITY — investor section, editorial
   ============================================================ */
const Opportunity = () => (
  <section id="opportunity" className="relative px-8 md:px-20 py-28 md:py-36 bg-ink text-parchment">
    <div className="max-w-[1280px] mx-auto">

      {/* — opener — */}
      <div className="max-w-[860px] mx-auto reveal">
        <p className="small-caps text-[12px] text-parchment/60 mb-6">xi. the opportunity</p>
        <h2 className="font-display text-[40px] md:text-[68px] leading-[1.0] tracking-[-0.012em] mb-10">
          A clear category,<br />
          <span className="italic text-parchment/85">built on a single rule.</span>
        </h2>
        <p className="dropcap text-[19.5px] leading-[1.75] text-parchment/85 mb-6">
          Phone-free is a feature at most hotels. At Luddite Lodge it is the operating system.
          Every guest, every room, every night shares the same rule. That discipline gives the
          property a simple promise, a memorable ritual, and a rate-worthy reason to exist.
        </p>
        <p className="text-[18px] leading-[1.7] text-parchment/75">
          That distinction — <span className="italic">programmatic</span> rather than
          <span className="italic"> permissive</span> — is the category. Inness, Piaule,
          Wildflower, and Eastwind are useful references for design, programming, and rate.
          Luddite Lodge is positioned around the one promise they do not lead with.
        </p>
      </div>

      {/* — three thesis cards — */}
      <div className="grid md:grid-cols-3 gap-10 md:gap-8 mt-24 reveal">
        {[
          {
            n: '01',
            title: 'The promise is unusually clear at boutique price.',
            body: `Device-free hospitality has mostly lived at the edges: bare-bones cabins, wellness centers, or clinical programs. The open lane is a $400–$700 ADR boutique stay whose central promise is the absence of the screen, not as a perk but as the product.`,
          },
          {
            n: '02',
            title: 'The appetite is already visible in the city.',
            body: `Aire, Bathhouse, Othership, Remedy Place, World Spa — urban guests already pay premium rates for screen-restricted rooms, shared rituals, and restored nervous systems. The Lodge extends that behavior to the weekend scale, two hours up the Hudson.`,
          },
          {
            n: '03',
            title: 'Communal by design, not by force.',
            body: `Every guest shares the same rule; community happens because the room is built for it — bistro, lounge, fire, board games. The room is also large enough to read alone in. Guests can opt in or out of any moment. What they cannot opt out of is the premise.`,
          },
        ].map(({ n, title, body }) => (
          <article key={n} className="border-t border-parchment/25 pt-7">
            <p className="small-caps text-[11px] text-parchment/55 mb-5 tracking-[0.18em]">{n}</p>
            <h3 className="font-display text-[24px] md:text-[28px] leading-[1.18] mb-5 tracking-[-0.005em]">
              {title}
            </h3>
            <p className="text-parchment/80 text-[16.5px] leading-[1.7]">{body}</p>
          </article>
        ))}
      </div>

      {/* — the long argument — */}
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 mt-28 reveal">
        <div className="md:col-span-7 space-y-10">
          <div>
            <h3 className="font-display text-[26px] md:text-[32px] leading-[1.12] mb-4 tracking-[-0.005em]">
              NYC has spent a decade proving the appetite.
            </h3>
            <p className="text-parchment/80 text-[17.5px] leading-[1.7]">
              Bathhouse Williamsburg, Bathhouse Flatiron, Aire Tribeca, Othership Flatiron and SoHo,
              Remedy Place, World Spa, the run clubs, the sound baths, the silent reading parties —
              each points to the same appetite: paid spaces where attention is protected and the room
              does some of the social work. We are building the weekend version, ninety minutes north.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[26px] md:text-[32px] leading-[1.12] mb-4 tracking-[-0.005em]">
              The Catskills is the most defensible geography.
            </h3>
            <p className="text-parchment/80 text-[17.5px] leading-[1.7]">
              Inness, Wildflower, Piaule, and Eastwind have trained a large drive market to pay
              boutique rates within reach of New York. Luddite Lodge belongs in that corridor, but with
              a sharper reason to choose it: the absence of the screen is not incidental to the setting.
              It is the setting.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[26px] md:text-[32px] leading-[1.12] mb-4 tracking-[-0.005em]">
              A unit mix and program designed for repeatable demand.
            </h3>
            <p className="text-parchment/80 text-[17.5px] leading-[1.7]">
              Twelve lodge rooms, two dormitories, eight A-frames — three price tiers under one
              ruleset. Dorms reach the solo traveler; A-frames anchor longer stays and group buyouts.
              The shared lodge — bar, kitchen, fireside — concentrates the social product into one room.
              Programming gives guests a reason to arrive on purpose, not just a place to sleep.
            </p>
          </div>
        </div>

        {/* — sidebar — */}
        <aside className="md:col-span-5 space-y-9">
          <div className="border-l border-parchment/30 pl-6">
            <p className="small-caps text-[11px] text-parchment/55 mb-3">design comps · ADR range</p>
            <ul className="text-parchment/85 text-[15.5px] leading-[1.65] space-y-2">
              <li className="flex justify-between gap-4"><span>Inness, Accord</span><span className="font-display italic">$525–$1,100</span></li>
              <li className="flex justify-between gap-4"><span>Wildflower Farms, Gardiner</span><span className="font-display italic">$700–$1,400</span></li>
              <li className="flex justify-between gap-4"><span>Piaule, Catskill</span><span className="font-display italic">$525–$900</span></li>
              <li className="flex justify-between gap-4"><span>Eastwind, Windham</span><span className="font-display italic">$340–$520</span></li>
              <li className="flex justify-between gap-4"><span>Hutton Brickyards</span><span className="font-display italic">$420–$680</span></li>
            </ul>
            <p className="font-hand text-parchment/55 text-[15px] mt-3">— inspirations on design and rate. None lead with phone-free hospitality.</p>
          </div>

          <div className="border-l border-parchment/30 pl-6">
            <p className="small-caps text-[11px] text-parchment/55 mb-3">demand comps · NYC, screen-free</p>
            <ul className="text-parchment/85 text-[15.5px] leading-[1.65] space-y-2">
              <li className="flex justify-between gap-4"><span>Bathhouse Williamsburg / Flatiron</span><span className="font-display italic">$60–$95 / day</span></li>
              <li className="flex justify-between gap-4"><span>Othership</span><span className="font-display italic">$2,800 / yr</span></li>
              <li className="flex justify-between gap-4"><span>Remedy Place, SoHo</span><span className="font-display italic">$5,000 / yr</span></li>
              <li className="flex justify-between gap-4"><span>Aire, Tribeca</span><span className="font-display italic">$185–$345 / visit</span></li>
              <li className="flex justify-between gap-4"><span>World Spa, Brooklyn</span><span className="font-display italic">$110 / day · waitlist</span></li>
            </ul>
            <p className="font-hand text-parchment/55 text-[15px] mt-3">— screens away, communal, premium, waitlisted.</p>
          </div>

          <div className="border-l border-parchment/30 pl-6">
            <p className="small-caps text-[11px] text-parchment/55 mb-3">positioning</p>
            <p className="text-parchment/85 text-[16px] leading-[1.65]">
              Blended ADR target of <span className="font-display italic">$385</span>. Premium against
              Eastwind, beneath Piaule and Wildflower, structurally differentiated from each.
              A-frame and dorm formats keep the unit mix flexible. The marketing can carry on one
              sentence — <span className="italic">no phones, no screens, no exceptions</span>.
            </p>
          </div>

          <div className="border-l border-parchment/30 pl-6">
            <p className="small-caps text-[11px] text-parchment/55 mb-3">the honest line</p>
            <p className="text-parchment/85 text-[16px] leading-[1.65]">
              Phone-free retreats exist. Boutique hotels with that as the central promise remain rare.
              The thesis is simple: the appetite that fills the city's quiet rooms can also fill
              a thirty-room weekend property a hundred miles up the Hudson.
            </p>
          </div>
        </aside>
      </div>

      {/* — closer — */}
      <div className="mt-28 text-center reveal max-w-[760px] mx-auto">
        <p className="font-display italic text-[24px] md:text-[30px] leading-[1.4] text-parchment/90 mb-10">
          Luddite Lodge is not a wellness brand with a phone policy.<br />
          It is a phone-free hotel with everything else built around the rule.
        </p>
        <p className="font-hand text-[22px] text-parchment/65 mb-3">for partners, press, and investors —</p>
        <a
          href="mailto:lodge@ludditelodge.com?subject=Request%20the%20deck"
          className="inline-block font-display text-[24px] md:text-[28px] italic border-b border-parchment/60 pb-1 hover:border-parchment transition-colors"
        >
          Request the investor deck →
        </a>
        <p className="small-caps text-[11px] text-parchment/45 mt-5">lodge@ludditelodge.com</p>
      </div>
    </div>
  </section>
);

/* ============================================================
   10. FOOTER
   ============================================================ */
const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer className="relative px-8 md:px-20 py-24 text-center">
      <div className="max-w-[640px] mx-auto reveal">
        <div className="flex justify-center mb-8">
          <Mark size={42} />
        </div>
        <p className="marginalia font-hand text-[28px] text-ink/85 leading-[1.3] mb-4">
          Thank you for reading.<br />
          We hope to see you upstate.
        </p>
        <p className="font-display italic text-[18px] text-ink/60 mb-10">— the lodge</p>

        {/* compact waitlist */}
        <div className="border-t border-ink/12 pt-10 mb-10">
          {submitted ? (
            <p className="font-hand text-[22px] text-ink/70">You're on the list. See you in 2027.</p>
          ) : (
            <>
              <p className="small-caps text-[11px] text-ink/50 mb-5 tracking-[0.14em]">opening 2027 · join the waitlist</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[400px] mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 border border-ink/25 bg-transparent px-4 py-3 text-ink placeholder:text-ink/30 text-[16px] font-body focus:outline-none focus:border-ink/55 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-ink text-parchment text-[12px] small-caps tracking-[0.14em] hover:bg-ink/85 transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-5 text-ink2 text-[15px]">
          <Wordmark className="text-ink/85" size="large" />
          <p className="small-caps text-[11px] text-ink/55">phone-free weekends · catskills · 2027</p>
          <a href="mailto:lodge@ludditelodge.com" className="ink-link">lodge@ludditelodge.com</a>
        </div>

        <p className="font-hand text-[15px] text-ink/40 mt-14 max-w-[440px] mx-auto leading-[1.5]">
          Concept site. All renderings are watercolor studies; the property is in development.
          No social, no app. We'll write back.
        </p>
      </div>
    </footer>
  );
};

/* ============================================================
   APP
   ============================================================ */
function App() {
  useReveal();
  const t = TWEAK_DEFAULTS;

  // apply tweaks to root via inline style + body classes
  useEffect(() => {
    const tone = PAPER_TONES[t.paperTone] || PAPER_TONES.parchment;
    const accent = ACCENTS[t.accent] || ACCENTS.clay;
    const root = document.documentElement;
    root.style.setProperty('--tw-bg', tone.bg);
    root.style.setProperty('--tw-bg-soft', tone.soft);
    root.style.setProperty('--tw-ink', tone.ink);
    root.style.setProperty('--tw-accent', accent.hex);
    root.style.setProperty('--tw-grain', t.grain);
    root.style.setProperty('--tw-display', `'${t.displayFont}', serif`);
    root.style.setProperty('--tw-body', `'${t.bodyFont}', 'Cardo', serif`);
    root.style.setProperty('--tw-hand', `'${t.handFont}', cursive`);
    root.style.setProperty('--tw-leading', t.leading);
    root.style.setProperty('--tw-tracking', `${t.tracking}em`);
    root.style.setProperty('--tw-scale', t.scale);
    document.body.classList.toggle('no-dropcap', !t.showDropcaps);
    document.body.classList.toggle('no-script', !t.scriptMarginalia);
    document.body.classList.toggle('no-ornaments', !t.showOrnaments);
    document.body.dataset.spacing = t.spacing;
    document.body.dataset.vignette = t.vignette;
  }, [t]);

  return (
    <TweakContext.Provider value={t}>
      <main className="relative font-body text-ink overflow-x-hidden">
        <TopBar />
        <Hero />
        <SectionDivider />
        <Ritual />
        <Dimensions />
        <SectionDivider />
        <Accommodations />
        <BarBistro />
        <BeforeAfter />
        <Weekend />
        <Events />
        <Residency />
        <Ethos />
        <Location />
        <Waitlist />
        <Opportunity />
        <Footer />
      </main>
    </TweakContext.Provider>
  );
}

export default App;
