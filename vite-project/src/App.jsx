import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { SvgDefs } from './components/Ornaments'
import { Petals, GoldDust } from './components/Effects'
import Gate from './components/Gate'
import Mascot from './components/Mascot'
import Backdrop from './components/Backdrop'
import { Invocation, Title, Blessings, Couple, EventDetails, Closing } from './components/Sections'
import './App.css'

// Drop an mp3 at public/music.mp3 and it will play once the doors open.
const MUSIC_SRC = '/music.mp3'

function MusicToggle({ audioRef, playing, setPlaying }) {
  const toggle = () => {
    const audio = audioRef.current
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }
  return (
    <motion.button
      type="button"
      className={`music ${playing ? 'is-playing' : ''}`}
      onClick={toggle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span className="music-bars">
        <i /><i /><i /><i />
      </span>
    </motion.button>
  )
}

export default function App() {
  const [opening, setOpening] = useState(false)
  const [gateGone, setGateGone] = useState(false)
  const [hasMusic, setHasMusic] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = 0.6
    audio.addEventListener('canplaythrough', () => setHasMusic(true), { once: true })
    audioRef.current = audio
    return () => audio.pause()
  }, [])

  useEffect(() => {
    document.body.style.overflow = gateGone ? '' : 'hidden'
  }, [gateGone])

  const handleOpen = () => {
    setOpening(true)
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }

  return (
    <>
      <SvgDefs />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Backdrop show={opening} />
      <GoldDust />
      <Petals />

      <main className="invite">
        <Invocation play={opening} />
        <Title />
        <Blessings />
        <Couple />
        <EventDetails />
        <Closing />
        <footer className="footer">Made with love · 26.11.2026</footer>
      </main>

      {!gateGone && <Gate onOpen={handleOpen} onDone={() => setGateGone(true)} />}
      {gateGone && <Mascot />}
      {hasMusic && gateGone && <MusicToggle audioRef={audioRef} playing={playing} setPlaying={setPlaying} />}
    </>
  )
}
