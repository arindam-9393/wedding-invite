import { motion } from 'framer-motion'
import { Lantern, Mandala } from './Ornaments'
import { invite } from '../data'

// Decorates the empty space beside the invitation card on tablets and laptops.
function Side({ side, name }) {
  const e = invite.event
  return (
    <div className={`backdrop-side backdrop-${side}`}>
      <div className="backdrop-mandala">
        <Mandala center="" />
      </div>
      <div className="backdrop-lanterns">
        {[90, 150, 60].map((len, i) => (
          <div key={i} className="backdrop-lantern">
            <div className="swing swing-slow" style={{ animationDelay: `${-i * 1.3}s` }}>
              <Lantern length={len} />
            </div>
          </div>
        ))}
      </div>
      <div className="backdrop-names">
        <span className="backdrop-name">{name}</span>
        <span className="backdrop-date">
          {side === 'left' ? `${e.weekday}` : `${e.day} · ${e.month} · ${e.year}`}
        </span>
      </div>
    </div>
  )
}

export default function Backdrop({ show }) {
  return (
    <motion.div
      className="backdrop"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 1.6, delay: show ? 0.8 : 0 }}
    >
      <Side side="left" name={invite.bride.name} />
      <Side side="right" name={invite.groom.name} />
    </motion.div>
  )
}
