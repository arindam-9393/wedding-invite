import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function remaining(target, now) {
  const diff = Math.max(0, new Date(target).getTime() - now)
  return {
    Days: Math.floor(diff / 86400000),
    Hours: Math.floor(diff / 3600000) % 24,
    Minutes: Math.floor(diff / 60000) % 60,
    Seconds: Math.floor(diff / 1000) % 60,
  }
}

export default function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = remaining(target, now)

  return (
    <div className="countdown">
      {Object.entries(parts).map(([label, value]) => (
        <div key={label} className="countdown-cell">
          <div className="countdown-value">
            <AnimatePresence initial={false}>
              <motion.span
                key={value}
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
