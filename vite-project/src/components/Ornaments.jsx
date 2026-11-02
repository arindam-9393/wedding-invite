// Hand-drawn SVG artwork for the invitation. Shared gradients live in <SvgDefs />,
// which is rendered once at the top of the app and referenced by id everywhere else.

export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe7a6" />
          <stop offset="0.35" stopColor="#d9a84e" />
          <stop offset="0.65" stopColor="#a8731f" />
          <stop offset="1" stopColor="#e7c26b" />
        </linearGradient>
        <linearGradient id="g-gold-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a8731f" />
          <stop offset="0.5" stopColor="#f6dc93" />
          <stop offset="1" stopColor="#a8731f" />
        </linearGradient>
        <linearGradient id="g-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e6c6" />
          <stop offset="1" stopColor="#ecd3a4" />
        </linearGradient>
        <radialGradient id="g-lotus" cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor="#fff4f6" />
          <stop offset="0.55" stopColor="#f5a9bd" />
          <stop offset="1" stopColor="#d9567c" />
        </radialGradient>
        <radialGradient id="g-lantern" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#fff6c2" />
          <stop offset="0.5" stopColor="#ffbb4d" />
          <stop offset="1" stopColor="#d9591a" />
        </radialGradient>
        <linearGradient id="g-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fc4d8" />
          <stop offset="1" stopColor="#2b7fa3" />
        </linearGradient>
        <linearGradient id="g-peacock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f7fd0" />
          <stop offset="1" stopColor="#123f8a" />
        </linearGradient>
        <linearGradient id="g-tail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d8a3a" />
          <stop offset="1" stopColor="#1f5e3b" />
        </linearGradient>
        <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8cc063" />
          <stop offset="1" stopColor="#2f6b3a" />
        </linearGradient>
        <linearGradient id="g-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf1dc" />
          <stop offset="1" stopColor="#e2c79a" />
        </linearGradient>
        <pattern id="p-jaali" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M14 3 C18 9 18 9 25 14 C18 19 18 19 14 25 C10 19 10 19 3 14 C10 9 10 9 14 3Z"
            fill="none"
            stroke="#c99a4a"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <circle cx="14" cy="14" r="1.6" fill="#c99a4a" fillOpacity="0.45" />
        </pattern>
        <filter id="f-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

/* ---------- Architecture ---------- */

// Cusped (multifoil) Rajasthani arch. Points run up the right side to the apex and back down.
const ARCH_PTS = [
  [354, 205], [338, 165], [312, 130], [278, 103], [240, 84], [200, 64],
  [160, 84], [122, 103], [88, 130], [62, 165], [46, 205], [40, 250],
]
const ARCH_FOILS = ARCH_PTS.map(([x, y]) => `A27 27 0 0 0 ${x} ${y}`).join(' ')
const ARCH_EDGE = `M360 250 ${ARCH_FOILS}`
const ARCH_FRAME = `M0 0 H400 V320 H360 V250 ${ARCH_FOILS} V320 H0 Z`

export function ArchTop() {
  return (
    <svg className="arch-top" viewBox="0 0 400 320" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <path d={ARCH_FRAME} fill="url(#g-arch)" />
      <path d={ARCH_FRAME} fill="url(#p-jaali)" />
      <path d={ARCH_EDGE} fill="none" stroke="url(#g-gold)" strokeWidth="5" />
      <path d={ARCH_EDGE} fill="none" stroke="#fff6dc" strokeWidth="1.2" transform="translate(0 7)" opacity="0.8" />
      {/* cornice band */}
      <rect x="0" y="0" width="400" height="18" fill="url(#g-gold-h)" opacity="0.85" />
      <rect x="0" y="18" width="400" height="3" fill="#8c5a17" opacity="0.5" />
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={i} cx={10 + i * 20} cy="9" r="3.2" fill="#fff3cf" opacity="0.8" />
      ))}
      {/* keystone flower */}
      <g transform="translate(200 46)">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} rx="3.4" ry="9" cy="-8" fill="url(#g-gold)" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="4.5" fill="#9c1c2c" />
      </g>
      {/* spandrel florals */}
      <Flourish x={70} y={70} />
      <Flourish x={330} y={70} flip />
    </svg>
  )
}

function Flourish({ x, y, flip }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} opacity="0.75">
      <path d="M-40 10 C-20 -20 10 -20 30 0 C10 -6 -10 -2 -24 16" fill="none" stroke="url(#g-gold)" strokeWidth="2" />
      <path d="M-10 -8 c-6 -14 6 -22 12 -10 c4 8 -6 14 -12 10z" fill="#e7a0ae" opacity="0.8" />
      <circle cx="30" cy="0" r="4" fill="#d9567c" opacity="0.8" />
      <circle cx="-40" cy="10" r="3" fill="url(#g-gold)" />
    </g>
  )
}

export function Pillars() {
  return (
    <>
      <div className="pillar pillar-left" />
      <div className="pillar pillar-right" />
    </>
  )
}

/* ---------- Hanging ornaments ---------- */

export function Bell({ length = 60 }) {
  const beads = Math.floor(length / 9)
  return (
    <svg viewBox={`0 0 40 ${length + 52}`} width="100%" style={{ overflow: 'visible' }}>
      <line x1="20" y1="0" x2="20" y2={length} stroke="#a8731f" strokeWidth="1" />
      {Array.from({ length: beads }, (_, i) => (
        <circle key={i} cx="20" cy={4 + i * 9} r="2.4" fill={i % 3 === 1 ? '#c2283f' : 'url(#g-gold)'} />
      ))}
      <g transform={`translate(0 ${length})`}>
        <circle cx="20" cy="2" r="3" fill="url(#g-gold)" />
        <path d="M20 4 C12 4 9 12 9 22 L4 34 H36 L31 22 C31 12 28 4 20 4Z" fill="url(#g-gold)" stroke="#8c5a17" strokeWidth="0.8" />
        <path d="M6 30 H34" stroke="#8c5a17" strokeWidth="1" />
        <path d="M14 12 C13 18 13 22 12 28" stroke="#fff3cf" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <circle cx="20" cy="39" r="3.6" fill="#8c5a17" />
      </g>
    </svg>
  )
}

export function Lantern({ length = 70 }) {
  return (
    <svg viewBox={`0 0 60 ${length + 90}`} width="100%" style={{ overflow: 'visible' }}>
      <line x1="30" y1="0" x2="30" y2={length} stroke="#6b4210" strokeWidth="1.5" />
      <g transform={`translate(0 ${length})`}>
        <circle className="lantern-halo" cx="30" cy="44" r="34" fill="#ffb347" opacity="0.28" filter="url(#f-glow)" />
        <path d="M22 0 H38 L44 10 H16Z" fill="url(#g-gold)" />
        <path d="M16 10 H44 L48 18 H12Z" fill="#8c3d12" />
        <path className="lantern-body" d="M14 18 H46 C52 32 52 56 46 70 H14 C8 56 8 32 14 18Z" fill="url(#g-lantern)" />
        <path d="M30 18 V70 M20 18 C16 34 16 54 20 70 M40 18 C44 34 44 54 40 70" stroke="#a8461a" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M12 70 H48 L42 78 H18Z" fill="url(#g-gold)" />
        <path d="M30 78 V86" stroke="#c2283f" strokeWidth="2" />
        <path d="M26 86 h8 l-2 8 h-4z" fill="#c2283f" />
      </g>
    </svg>
  )
}

// String of marigolds draped across the top of a panel.
export function Toran() {
  const n = 26
  const flowers = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    const x = 8 + t * 384
    const y = 14 + Math.sin(t * Math.PI * 3) ** 2 * 26
    return { x, y, c: i % 2 ? '#f39a1e' : '#f7c12a' }
  })
  const drops = [0.17, 0.83]
  return (
    <svg className="toran" viewBox="0 0 400 110" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      {drops.map((t) => {
        const x = 8 + t * 384
        return (
          <g key={t}>
            {Array.from({ length: 5 }, (_, j) => (
              <circle key={j} cx={x} cy={50 + j * 11} r="5.5" fill={j % 2 ? '#f39a1e' : '#f7c12a'} />
            ))}
            <path d={`M${x - 5} 106 l5 -8 l5 8`} fill="#3f8a3a" />
          </g>
        )
      })}
      {flowers.map((f, i) => (
        <g key={i}>
          <ellipse cx={f.x + 6} cy={f.y + 5} rx="5" ry="2.4" fill="#3f8a3a" transform={`rotate(30 ${f.x + 6} ${f.y + 5})`} />
          <circle cx={f.x} cy={f.y} r="7.5" fill={f.c} />
          <circle cx={f.x} cy={f.y} r="4.5" fill="none" stroke="#d9711a" strokeWidth="1" strokeDasharray="2 1.5" />
        </g>
      ))}
    </svg>
  )
}

/* ---------- Sacred motifs ---------- */

export function Mandala({ center = 'ॐ', className = '' }) {
  return (
    <svg className={`mandala ${className}`} viewBox="-100 -100 200 200" aria-hidden="true">
      <g className="mandala-spin">
        {Array.from({ length: 24 }, (_, i) => (
          <path key={i} d="M0 -96 C7 -84 7 -74 0 -66 C-7 -74 -7 -84 0 -96Z" fill="url(#g-gold)" transform={`rotate(${i * 15})`} opacity="0.9" />
        ))}
        <circle r="66" fill="none" stroke="url(#g-gold)" strokeWidth="1.4" />
        {Array.from({ length: 48 }, (_, i) => (
          <circle key={i} cy="-70" r="1.6" fill="#a8731f" transform={`rotate(${i * 7.5})`} />
        ))}
      </g>
      <g className="mandala-spin-rev">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d="M0 -62 C12 -50 12 -38 0 -30 C-12 -38 -12 -50 0 -62Z" fill="none" stroke="url(#g-gold)" strokeWidth="1.6" transform={`rotate(${i * 22.5})`} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cy="-46" r="2.2" fill="#c2283f" transform={`rotate(${i * 22.5 + 11.25})`} />
        ))}
      </g>
      <circle r="30" fill="#fbf1dc" stroke="url(#g-gold)" strokeWidth="2.5" />
      <circle r="25" fill="none" stroke="#c99a4a" strokeWidth="0.8" strokeDasharray="2 2" />
      <text y="11" textAnchor="middle" className="mandala-glyph" fill="url(#g-gold)">
        {center}
      </text>
    </svg>
  )
}

export function RingsDivider() {
  return (
    <svg className="rings" viewBox="0 0 120 50" aria-hidden="true">
      <path d="M2 25 H34 M86 25 H118" stroke="#c9973f" strokeWidth="1.2" />
      <circle cx="50" cy="27" r="14" fill="none" stroke="url(#g-gold)" strokeWidth="3" />
      <circle cx="70" cy="27" r="14" fill="none" stroke="url(#g-gold)" strokeWidth="3" />
      <path d="M66 9 l4 -5 l4 5 l-4 4z" fill="#f4f8ff" stroke="#a8731f" strokeWidth="0.8" />
    </svg>
  )
}

export function Divider() {
  return (
    <svg className="divider" viewBox="0 0 240 24" aria-hidden="true">
      <path d="M0 12 H96 M144 12 H240" stroke="#c9973f" strokeWidth="1" />
      <path d="M100 12 C108 2 112 2 120 12 C128 2 132 2 140 12 C132 22 128 22 120 12 C112 22 108 22 100 12Z" fill="url(#g-gold)" />
      <circle cx="120" cy="12" r="2.5" fill="#c2283f" />
    </svg>
  )
}

/* ---------- Nature ---------- */

export function Lotus({ size = 60, className = '', style }) {
  return (
    <svg className={className} style={style} width={size} viewBox="-50 -50 100 70" aria-hidden="true">
      {[-62, -36, 36, 62].map((r) => (
        <path key={r} d="M0 10 C-14 -6 -10 -30 0 -42 C10 -30 14 -6 0 10Z" fill="url(#g-lotus)" transform={`rotate(${r} 0 10)`} opacity="0.9" />
      ))}
      {[-18, 18].map((r) => (
        <path key={r} d="M0 10 C-14 -6 -10 -32 0 -46 C10 -32 14 -6 0 10Z" fill="url(#g-lotus)" transform={`rotate(${r} 0 10)`} />
      ))}
      <path d="M0 10 C-12 -8 -9 -36 0 -50 C9 -36 12 -8 0 10Z" fill="url(#g-lotus)" />
      <ellipse cy="12" rx="26" ry="5" fill="#3d8a4a" opacity="0.6" />
    </svg>
  )
}

export function LilyPad({ w = 60, style }) {
  return (
    <svg style={style} width={w} viewBox="-30 -12 60 24" aria-hidden="true">
      <path d="M0 0 L22 -6 A24 10 0 1 1 22 6 Z" fill="#4f9a4a" />
      <path d="M0 0 L-16 4 M0 0 L-12 -5 M0 0 L6 8" stroke="#2f6b3a" strokeWidth="0.8" />
    </svg>
  )
}

export function Butterfly({ color = '#5b8de0' }) {
  return (
    <svg viewBox="-20 -16 40 32" width="100%" aria-hidden="true">
      <g className="wing wing-l">
        <path d="M0 0 C-6 -14 -20 -16 -18 -4 C-17 2 -8 3 0 0Z" fill={color} />
        <path d="M0 1 C-6 4 -14 12 -8 14 C-3 15 -1 8 0 1Z" fill={color} opacity="0.85" />
        <circle cx="-11" cy="-7" r="2" fill="#fff" opacity="0.7" />
      </g>
      <g className="wing wing-r">
        <path d="M0 0 C6 -14 20 -16 18 -4 C17 2 8 3 0 0Z" fill={color} />
        <path d="M0 1 C6 4 14 12 8 14 C3 15 1 8 0 1Z" fill={color} opacity="0.85" />
        <circle cx="11" cy="-7" r="2" fill="#fff" opacity="0.7" />
      </g>
      <ellipse rx="1.4" ry="7" cy="2" fill="#2b1a10" />
    </svg>
  )
}

export function Rose({ size = 34, style }) {
  return (
    <svg style={style} width={size} viewBox="-20 -20 40 40" aria-hidden="true">
      <ellipse cx="-14" cy="10" rx="9" ry="4" fill="#4f8f45" transform="rotate(-30 -14 10)" />
      <ellipse cx="14" cy="12" rx="9" ry="4" fill="#3f7f3a" transform="rotate(25 14 12)" />
      <circle r="14" fill="#e0607e" />
      <path d="M-10 -2 C-8 -12 8 -12 10 -2 C6 -8 -6 -8 -10 -2Z" fill="#f29bb0" />
      <path d="M-7 3 C-6 -6 6 -6 7 3 C3 -2 -3 -2 -7 3Z" fill="#c9405f" />
      <circle r="4" fill="#f7b3c3" />
      <path d="M-11 6 C-4 12 4 12 11 6" stroke="#b3304f" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export function Foliage({ flip, style }) {
  const leaves = [-70, -45, -22, 0, 20, 40]
  return (
    <svg style={{ ...style, transform: flip ? 'scaleX(-1)' : undefined }} viewBox="0 0 120 120" aria-hidden="true">
      {leaves.map((r, i) => (
        <g key={r} transform={`translate(30 118) rotate(${r})`}>
          <path d={`M0 0 C-14 -${40 + i * 6} 14 -${70 + i * 6} 4 -${92 + i * 3} C20 -${60 + i * 6} 12 -${30} 0 0Z`} fill="url(#g-leaf)" />
          <path d={`M0 0 C2 -40 4 -70 4 -${88 + i * 3}`} stroke="#2a5a2f" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>
      ))}
    </svg>
  )
}

export function PeacockFeather({ style, className = '' }) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 200" aria-hidden="true">
      <path d="M30 200 C28 140 30 80 30 30" stroke="#6b7f2a" strokeWidth="1.6" fill="none" />
      {Array.from({ length: 34 }, (_, i) => {
        const y = 40 + i * 4.6
        const w = 22 - i * 0.45
        return (
          <g key={i} opacity="0.85">
            <path d={`M30 ${y} q-${w * 0.5} -6 -${w} -2`} stroke="#4f9a3a" strokeWidth="0.9" fill="none" />
            <path d={`M30 ${y} q${w * 0.5} -6 ${w} -2`} stroke="#4f9a3a" strokeWidth="0.9" fill="none" />
          </g>
        )
      })}
      <ellipse cx="30" cy="34" rx="22" ry="30" fill="#2f8a4a" opacity="0.85" />
      <ellipse cx="30" cy="36" rx="15" ry="20" fill="#d9a84e" />
      <ellipse cx="30" cy="38" rx="11" ry="14" fill="#1b9a9a" />
      <ellipse cx="30" cy="40" rx="7" ry="9" fill="#173f8a" />
      <ellipse cx="29" cy="40" rx="3" ry="4" fill="#0b1a40" />
    </svg>
  )
}

export function Peacock({ flip, className = '' }) {
  const eyes = [
    [70, 64], [86, 74], [102, 86], [116, 98], [128, 110],
    [80, 88], [96, 100], [110, 114], [122, 126],
  ]
  return (
    <svg className={`peacock ${className}`} viewBox="0 0 150 150" style={{ transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <g className="peacock-tail">
        <path d="M50 70 C80 62 120 90 146 140 C110 136 70 120 46 96Z" fill="url(#g-tail)" />
        <path d="M50 78 C80 78 112 104 134 138" stroke="#7fb04a" strokeWidth="1" fill="none" opacity="0.6" />
        {eyes.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(40)`}>
            <ellipse rx="5.5" ry="7" fill="#d9a84e" />
            <ellipse rx="3.8" ry="5" fill="#1b9a9a" />
            <ellipse rx="2.2" ry="3" fill="#123f8a" />
          </g>
        ))}
      </g>
      <path d="M30 58 C24 76 34 96 52 98 C64 98 70 86 64 72 C58 60 44 56 40 50Z" fill="url(#g-peacock)" />
      <path d="M44 78 C54 76 62 82 62 90 C56 86 50 86 44 88Z" fill="#c99a4a" opacity="0.75" />
      <g className="peacock-head">
        <path d="M40 52 C36 40 38 26 30 18 C26 14 20 16 20 22 C20 28 26 30 28 36 C30 44 30 52 32 60Z" fill="url(#g-peacock)" />
        <path d="M20 21 L11 24 L20 25Z" fill="#e8a33a" />
        <circle cx="25" cy="20" r="2" fill="#fff" />
        <circle cx="25" cy="20" r="1" fill="#111" />
        {[-20, 0, 20].map((r) => (
          <g key={r} transform={`translate(27 15) rotate(${r})`}>
            <line y2="-10" stroke="#1d4f9a" strokeWidth="0.8" />
            <circle cy="-11" r="1.8" fill="#1d4f9a" />
          </g>
        ))}
      </g>
      <path d="M44 98 L42 112 M52 98 L54 112" stroke="#b07a2a" strokeWidth="1.8" />
    </svg>
  )
}

/* ---------- Scenery ---------- */

export function Balustrade() {
  const n = 14
  return (
    <svg className="balustrade" viewBox="0 0 400 70" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="400" height="9" rx="2" fill="url(#g-dome)" stroke="#c99a4a" strokeWidth="1" />
      {Array.from({ length: n }, (_, i) => {
        const x = 14 + i * (372 / (n - 1))
        return (
          <path
            key={i}
            d={`M${x - 6} 9 h12 v4 c0 4 -5 6 -5 12 c0 6 9 10 9 18 c0 5 -4 8 -4 10 h4 v4 h-20 v-4 h4 c0 -2 -4 -5 -4 -10 c0 -8 9 -12 9 -18 c0 -6 -5 -8 -5 -12z`}
            fill="url(#g-dome)"
            stroke="#c99a4a"
            strokeWidth="0.8"
          />
        )
      })}
      {[0, 133, 266, 386].map((x) => (
        <rect key={x} x={x} y="0" width="14" height="70" fill="url(#g-dome)" stroke="#c99a4a" strokeWidth="1" />
      ))}
      <rect x="0" y="61" width="400" height="9" fill="url(#g-dome)" stroke="#c99a4a" strokeWidth="1" />
    </svg>
  )
}

export function Chhatri({ style, className = '' }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 150" aria-hidden="true">
      <path d="M60 2 V14" stroke="url(#g-gold)" strokeWidth="2.4" />
      <circle cx="60" cy="16" r="3.4" fill="url(#g-gold)" />
      <path d="M24 64 C24 34 44 20 60 18 C76 20 96 34 96 64Z" fill="url(#g-dome)" stroke="#c99a4a" strokeWidth="1.2" />
      <path d="M36 64 C38 44 48 30 60 24 M84 64 C82 44 72 30 60 24 M60 24 V64" stroke="#c99a4a" strokeWidth="0.8" fill="none" opacity="0.7" />
      <rect x="16" y="64" width="88" height="8" fill="url(#g-dome)" stroke="#c99a4a" />
      {[22, 47, 73, 98].map((x) => (
        <rect key={x} x={x - 3} y="72" width="6" height="56" fill="url(#g-dome)" stroke="#c99a4a" strokeWidth="0.8" />
      ))}
      {[34.5, 60, 85.5].map((x) => (
        <path key={x} d={`M${x - 10} 128 V92 C${x - 10} 80 ${x + 10} 80 ${x + 10} 92 V128`} fill="#e9d5ad" opacity="0.7" />
      ))}
      <rect x="10" y="128" width="100" height="10" fill="url(#g-dome)" stroke="#c99a4a" />
    </svg>
  )
}

export function Pond() {
  return (
    <div className="pond">
      <svg className="pond-water" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
        <rect width="400" height="60" fill="url(#g-water)" />
        {[12, 26, 40].map((y, i) => (
          <path
            key={y}
            className={`ripple ripple-${i}`}
            d={`M0 ${y} q25 -4 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0`}
            stroke="#d8f1f7"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        ))}
      </svg>
      <div className="pond-flora">
        <LilyPad w={54} style={{ left: '4%', bottom: '30%' }} />
        <Lotus size={44} className="bob" style={{ left: '14%', bottom: '28%' }} />
        <LilyPad w={40} style={{ left: '32%', bottom: '12%' }} />
        <Lotus size={36} className="bob bob-2" style={{ left: '46%', bottom: '18%' }} />
        <LilyPad w={60} style={{ left: '60%', bottom: '34%' }} />
        <Lotus size={48} className="bob bob-3" style={{ left: '76%', bottom: '22%' }} />
        <LilyPad w={44} style={{ left: '88%', bottom: '8%' }} />
      </div>
    </div>
  )
}
