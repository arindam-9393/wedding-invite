import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mandala } from './Ornaments'
import { invite } from '../data'

const EASE = [0.65, 0, 0.35, 1]

function Door({ side, opening }) {
  return (
    <motion.div
      className={`door door-${side}`}
      initial={false}
      animate={{ rotateY: opening ? (side === 'left' ? -108 : 108) : 0 }}
      transition={{ duration: 2.2, ease: EASE }}
    >
      <div className="door-panel door-panel-top" />
      <div className="door-panel door-panel-bottom" />
      <Mandala className="door-mandala" center="" />
      <span className="door-ring" />
      <span className="door-shade" />
    </motion.div>
  )
}

export default function Gate({ onOpen, onDone }) {
  const [opening, setOpening] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    onOpen()
  }

  return (
    <motion.div
      className="gate"
      initial={false}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ delay: opening ? 1.6 : 0, duration: 0.9 }}
      onAnimationComplete={() => opening && onDone()}
      onClick={open}
    >
      <div className="gate-doors">
        <Door side="left" opening={opening} />
        <Door side="right" opening={opening} />
      </div>

      <motion.div
        className="gate-center"
        initial={{ opacity: 0, y: 20 }}
        animate={opening ? { opacity: 0, scale: 1.15, filter: 'blur(8px)' } : { opacity: 1, y: 0 }}
        transition={{ duration: opening ? 0.6 : 1.4, ease: 'easeOut' }}
      >
        <div className="gate-monogram">
          <span>{invite.bride.name[0]}</span>
          <i>&amp;</i>
          <span>{invite.groom.name[0]}</span>
        </div>
        <p className="gate-names">
          {invite.bride.name} <em>weds</em> {invite.groom.name}
        </p>
        {/* clicks bubble up to the gate's handler */}
        <button type="button" className="gate-button">
          <span className="gate-button-pulse" />
          Tap to open the invitation
        </button>
      </motion.div>
    </motion.div>
  )
}
