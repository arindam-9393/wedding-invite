import { motion } from 'framer-motion'
import { Butterfly } from './Ornaments'

// Deterministic pseudo-random so layouts are stable between renders.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(42)
const PETAL_COLORS = ['#f4a7b9', '#e0607e', '#f7c12a', '#f39a1e', '#fbd3dc']
const PETALS = Array.from({ length: 22 }, () => ({
  left: rand() * 100,
  size: 8 + rand() * 12,
  duration: 9 + rand() * 10,
  delay: -rand() * 20,
  drift: (rand() - 0.5) * 160,
  spin: 180 + rand() * 540,
  color: PETAL_COLORS[Math.floor(rand() * PETAL_COLORS.length)],
}))

const DUST = Array.from({ length: 40 }, () => ({
  left: rand() * 100,
  top: rand() * 100,
  size: 1.5 + rand() * 3,
  duration: 2 + rand() * 4,
  delay: rand() * 5,
}))

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}

export function GoldDust() {
  return (
    <div className="dust" aria-hidden="true">
      {DUST.map((d, i) => (
        <span
          key={i}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

const FLIGHTS = [
  { color: '#5b8de0', x: [0, 60, 20, 110, 40, 0], y: [0, -50, -110, -70, -20, 0], d: 16 },
  { color: '#e0607e', x: [0, -70, -30, -120, -50, 0], y: [0, -40, -90, -130, -60, 0], d: 19 },
  { color: '#f39a1e', x: [0, 40, 100, 60, -10, 0], y: [0, -80, -40, -120, -70, 0], d: 14 },
  { color: '#7a5bd0', x: [0, -40, 30, -20, 50, 0], y: [0, -60, -100, -40, -90, 0], d: 21 },
]

export function Butterflies({ spots }) {
  return spots.map((spot, i) => {
    const f = FLIGHTS[i % FLIGHTS.length]
    return (
      <motion.div
        key={i}
        className="butterfly"
        style={{ left: spot[0], top: spot[1] }}
        animate={{ x: f.x, y: f.y, rotate: [0, 12, -8, 10, -6, 0] }}
        transition={{ duration: f.d, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Butterfly color={f.color} />
      </motion.div>
    )
  })
}
