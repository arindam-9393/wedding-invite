import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

// What the panda says the first time each section scrolls into view.
const SECTION_LINES = {
  'panel-title': 'Ooh, a wedding! 💍',
  'panel-blessings': 'So many blessings ✨',
  'panel-couple': 'Aww, cute couple! 💕',
  'panel-event': 'Save the date! 📅',
  'panel-closing': 'See you there! 🥰',
}

const POKES = ['Hehe! 💗', 'That tickles! 😆', 'Shaadi mein zaroor aana! 🎉', 'Hug? 🐼']

const SLEEP_AFTER = 15000

function Eye({ cx, mode, x, y }) {
  if (mode === 'happy') {
    return <path d={`M${cx - 6} 54 q6 -8 12 0`} stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
  }
  if (mode !== 'open') {
    return <path d={`M${cx - 6} 52 q6 3.5 12 0`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
  }
  return (
    <g>
      <circle cx={cx} cy="51" r="6.2" fill="#fff" />
      <motion.g style={{ x, y }}>
        <circle cx={cx} cy="51" r="3.7" fill="#141414" />
        <circle cx={cx + 1.4} cy="49.4" r="1.3" fill="#fff" />
      </motion.g>
    </g>
  )
}

export default function Mascot() {
  const ref = useRef(null)
  const timers = useRef({})
  const nextId = useRef(0)
  const lastHeart = useRef(0)
  const pokeCount = useRef(0)

  const lookX = useMotionValue(0)
  const lookY = useMotionValue(0)
  const lean = useMotionValue(0)
  const eyeX = useSpring(lookX, { stiffness: 260, damping: 22 })
  const eyeY = useSpring(lookY, { stiffness: 260, damping: 22 })
  const tilt = useSpring(lean, { stiffness: 120, damping: 14 })

  const [mood, setMood] = useState('idle') // idle | happy | giggle | sleepy
  const [blink, setBlink] = useState(false)
  const [bubble, setBubble] = useState(null)
  const [hearts, setHearts] = useState([])

  const spawnHearts = useCallback((count) => {
    const fresh = Array.from({ length: count }, () => ({
      id: nextId.current++,
      x: (Math.random() - 0.5) * 70,
      r: (Math.random() - 0.5) * 50,
      delay: Math.random() * 0.25,
    }))
    setHearts((h) => [...h, ...fresh])
  }, [])

  const say = useCallback((text, ms = 2600) => {
    clearTimeout(timers.current.bubble)
    setBubble({ text, key: nextId.current++ })
    timers.current.bubble = setTimeout(() => setBubble(null), ms)
  }, [])

  // Eyes follow the pointer; scrolling makes the panda happy; inactivity sends it to sleep.
  useEffect(() => {
    const t = timers.current
    const scheduleSleep = () => {
      clearTimeout(t.sleep)
      t.sleep = setTimeout(() => setMood('sleepy'), SLEEP_AFTER)
    }
    const wake = () => {
      setMood((m) => (m === 'sleepy' ? 'idle' : m))
      scheduleSleep()
    }

    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height * 0.4)
      const dist = Math.hypot(dx, dy) || 1
      const reach = Math.min(dist / 60, 1) * 2.6
      lookX.set((dx / dist) * reach)
      lookY.set((dy / dist) * reach)
      lean.set(Math.max(-10, Math.min(10, dx / 50)))
      wake()
    }

    const onScroll = () => {
      wake()
      setMood((m) => (m === 'giggle' ? m : 'happy'))
      clearTimeout(t.happy)
      t.happy = setTimeout(() => setMood((m) => (m === 'happy' ? 'idle' : m)), 1100)
      const now = performance.now()
      if (now - lastHeart.current > 650) {
        lastHeart.current = now
        spawnHearts(1)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    scheduleSleep()
    t.hello = setTimeout(() => say('Hi! Scroll to read 💌', 3200), 900)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      window.removeEventListener('scroll', onScroll)
      Object.values(t).forEach(clearTimeout)
    }
  }, [lookX, lookY, lean, say, spawnHearts])

  // Natural, slightly irregular blinking.
  useEffect(() => {
    let id
    const loop = () => {
      id = setTimeout(() => {
        setBlink(true)
        id = setTimeout(() => {
          setBlink(false)
          loop()
        }, 150)
      }, 2500 + Math.random() * 3000)
    }
    loop()
    return () => clearTimeout(id)
  }, [])

  // React to each section the reader reaches.
  useEffect(() => {
    const seen = new Set()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const key = Object.keys(SECTION_LINES).find((k) => entry.target.classList.contains(k))
          if (key && !seen.has(key)) {
            seen.add(key)
            say(SECTION_LINES[key])
            spawnHearts(3)
          }
        })
      },
      { threshold: 0.45 },
    )
    document.querySelectorAll('.panel').forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [say, spawnHearts])

  const poke = () => {
    setMood('giggle')
    clearTimeout(timers.current.giggle)
    timers.current.giggle = setTimeout(() => setMood('idle'), 1400)
    spawnHearts(6)
    say(POKES[pokeCount.current++ % POKES.length], 2000)
  }

  const happy = mood === 'happy' || mood === 'giggle'
  const eyeMode = happy ? 'happy' : mood === 'sleepy' ? 'sleepy' : blink ? 'blink' : 'open'

  return (
    <motion.div
      className={`mascot mood-${mood}`}
      initial={{ y: -260 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 90, damping: 7, delay: 0.5 }}
    >
      <div className="mascot-swing">
        <span className="mascot-rope" />

        <AnimatePresence>
          {bubble && (
            <motion.div
              key={bubble.key}
              className="mascot-bubble"
              initial={{ opacity: 0, scale: 0.6, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {bubble.text}
            </motion.div>
          )}
        </AnimatePresence>

        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="mascot-heart"
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], y: 70, x: h.x, scale: 1, rotate: h.r }}
            transition={{ duration: 1.6, delay: h.delay, ease: 'easeOut' }}
            onAnimationComplete={() => setHearts((hs) => hs.filter((x) => x.id !== h.id))}
          >
            ♥
          </motion.span>
        ))}

        {mood === 'sleepy' && (
          <div className="mascot-zzz" aria-hidden="true">
            <span>z</span>
            <span>z</span>
            <span>Z</span>
          </div>
        )}

        <button ref={ref} type="button" className="mascot-body" onClick={poke} aria-label="Cute panda">
          <svg className="mascot-svg" viewBox="0 0 120 172">
            {/* arms reaching up to the rope */}
            <path d="M40 112 C24 92 30 44 53 16" stroke="#2b2b2b" strokeWidth="13" strokeLinecap="round" fill="none" />
            <path d="M80 112 C96 92 90 44 67 16" stroke="#2b2b2b" strokeWidth="13" strokeLinecap="round" fill="none" />
            <ellipse cx="53" cy="14" rx="8" ry="7" fill="#2b2b2b" />
            <ellipse cx="67" cy="14" rx="8" ry="7" fill="#2b2b2b" />

            {/* dangling body and legs */}
            <ellipse className="leg leg-l" cx="47" cy="153" rx="10" ry="14" fill="#2b2b2b" />
            <ellipse className="leg leg-r" cx="73" cy="153" rx="10" ry="14" fill="#2b2b2b" />
            <ellipse cx="60" cy="126" rx="30" ry="28" fill="#fff" stroke="#e6ddd0" strokeWidth="1.5" />
            <path d="M51 120 c-4 -6 2 -10 9 -4 c7 -6 13 -2 9 4 c-3 5 -9 9 -9 9 c0 0 -6 -4 -9 -9z" fill="#e0607e" />

            <motion.g style={{ rotate: tilt }}>
              <g transform="translate(0 16)">
                <g className="ear ear-l">
                  <circle cx="26" cy="22" r="14" fill="#2b2b2b" />
                  <circle cx="26" cy="22" r="7" fill="#454545" />
                </g>
                <g className="ear ear-r">
                  <circle cx="94" cy="22" r="14" fill="#2b2b2b" />
                  <circle cx="94" cy="22" r="7" fill="#454545" />
                </g>
                <ellipse cx="60" cy="56" rx="46" ry="40" fill="#fff" stroke="#e6ddd0" strokeWidth="1.5" />
                {/* marigold tucked behind the ear */}
                <g transform="translate(88 18)">
                  {Array.from({ length: 8 }, (_, i) => (
                    <ellipse key={i} cy="-5" rx="3" ry="5" fill={i % 2 ? '#f39a1e' : '#f7c12a'} transform={`rotate(${i * 45})`} />
                  ))}
                  <circle r="3" fill="#d9711a" />
                </g>
                <ellipse cx="41" cy="53" rx="12" ry="15" transform="rotate(30 41 53)" fill="#2b2b2b" />
                <ellipse cx="79" cy="53" rx="12" ry="15" transform="rotate(-30 79 53)" fill="#2b2b2b" />
                <Eye cx={42} mode={eyeMode} x={eyeX} y={eyeY} />
                <Eye cx={78} mode={eyeMode} x={eyeX} y={eyeY} />
                <ellipse className="blush" cx="27" cy="70" rx="7" ry="4" fill="#ff8fab" />
                <ellipse className="blush" cx="93" cy="70" rx="7" ry="4" fill="#ff8fab" />
                <ellipse cx="60" cy="66" rx="5.5" ry="3.8" fill="#2b2b2b" />
                {happy ? (
                  <>
                    <path d="M53 71 q7 12 14 0 z" fill="#7a1f2b" />
                    <path d="M56.5 76 q3.5 3.2 7 0" fill="#ff8fab" />
                  </>
                ) : (
                  <path d="M53 71 q3.5 4 7 0 q3.5 4 7 0" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}
              </g>
            </motion.g>
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
