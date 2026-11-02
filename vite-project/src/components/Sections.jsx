import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
  ArchTop, Pillars, Bell, Lantern, Toran, Mandala, Divider, RingsDivider,
  Rose, Foliage, Peacock, PeacockFeather, Balustrade, Chhatri, Pond, Lotus,
} from './Ornaments'
import { Butterflies } from './Effects'
import Countdown from './Countdown'
import { invite, mapsUrl, calendarUrl } from '../data'

const EASE = [0.22, 1, 0.36, 1]

const stagger = (gap = 0.18, delay = 0.2) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

const reveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
}

const drop = {
  hidden: { y: -160, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 60, damping: 9, delay: 0.1 + i * 0.12 },
  }),
}

const bloom = {
  hidden: { scale: 0.4, rotate: -120, opacity: 0 },
  show: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 1.8, ease: EASE } },
}

const wipe = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
  show: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1.6, ease: EASE } },
}

const rise = {
  hidden: { y: 80, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.4, ease: EASE } },
}

const letters = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: EASE } },
}

function SplitText({ text, className }) {
  return (
    <motion.span className={className} variants={stagger(0.07, 0)} aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span key={i} className="char ruby-text" style={{ animationDelay: `${i * 0.09}s` }} variants={letters} aria-hidden="true">
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Wraps a full-screen arched panel. `play` lets the first panel wait for the gate to open.
function Panel({ children, play, className = '', decor, scene, mandala = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mandalaY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ['6%', '0%', '-6%'])

  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } }
      : { initial: 'hidden', animate: play ? 'show' : 'hidden' }

  return (
    <motion.section ref={ref} className={`panel ${className}`} variants={stagger(0.15, 0)} {...trigger}>
      <ArchTop />
      <Pillars />
      {mandala && (
        <motion.div className="panel-mandala" style={{ y: mandalaY }}>
          <Mandala center="" />
        </motion.div>
      )}
      {decor}
      <motion.div className="panel-content" style={{ y: contentY }} variants={stagger()}>
        {children}
      </motion.div>
      {scene}
    </motion.section>
  )
}

function Hanging({ items, kind = 'bell' }) {
  return items.map(([left, top, length, width], i) => (
    <motion.div key={i} className="hanging" style={{ left: `${left}%`, top: `${top}cqw`, width: `${width}cqw` }} variants={drop} custom={i}>
      <div className={kind === 'bell' ? 'swing' : 'swing swing-slow'} style={{ animationDelay: `${-i * 0.7}s` }}>
        {kind === 'bell' ? <Bell length={length} /> : <Lantern length={length} />}
      </div>
    </motion.div>
  ))
}

function Scene({ peacocks = [], chhatris = false, foliage = true, pond = true }) {
  return (
    <motion.div className="scene" variants={rise}>
      {chhatris && (
        <div className="skyline">
          <Chhatri className="chhatri chhatri-small" />
          <Chhatri className="chhatri" />
          <Chhatri className="chhatri chhatri-small" />
        </div>
      )}
      {foliage && (
        <>
          <Foliage style={{ position: 'absolute', left: '-4%', bottom: '18cqw', width: '30cqw' }} />
          <Foliage flip style={{ position: 'absolute', right: '-4%', bottom: '18cqw', width: '30cqw' }} />
        </>
      )}
      <div className="rail-wrap">
        <Balustrade />
        {peacocks.includes('left') && <Peacock className="peacock-left" />}
        {peacocks.includes('right') && <Peacock flip className="peacock-right" />}
      </div>
      {pond && <Pond />}
    </motion.div>
  )
}

/* ---------- 1. Invocation ---------- */

export function Invocation({ play }) {
  return (
    <Panel
      play={play}
      className="panel-invocation"
      mandala={false}
      decor={
        <>
          <motion.div className="toran-wrap" variants={reveal}>
            <Toran />
          </motion.div>
          <Hanging
            items={[
              [20, 33, 30, 7], [30, 24, 60, 7], [40, 19, 90, 7], [50, 16, 115, 7],
              [60, 19, 90, 7], [70, 24, 60, 7], [80, 33, 30, 7],
            ]}
          />
          <motion.div className="rose-cluster rose-left" variants={reveal}>
            <Rose size={38} /><Rose size={28} /><Rose size={22} />
          </motion.div>
          <motion.div className="rose-cluster rose-right" variants={reveal}>
            <Rose size={22} /><Rose size={34} /><Rose size={26} />
          </motion.div>
        </>
      }
      scene={<Scene peacocks={['left', 'right']} foliage={false} />}
    >
      <motion.div className="ganesh" variants={bloom}>
        <div className="ganesh-glow" />
        <Mandala center="ॐ" />
      </motion.div>
      <motion.p className="sanskrit" variants={reveal}>
        {invite.invocation.sanskrit}
      </motion.p>
      <motion.p className="invocation-en" variants={reveal}>
        <span>||</span> {invite.invocation.english} <span>||</span>
      </motion.p>
      <motion.div className="scroll-hint" variants={reveal}>
        <span>Scroll</span>
        <i />
      </motion.div>
    </Panel>
  )
}

/* ---------- 2. Title ---------- */

export function Title() {
  return (
    <Panel
      className="panel-title"
      decor={
        <>
          <Hanging kind="lantern" items={[[11, 42, 60, 10], [89, 42, 60, 10]]} />
          <Butterflies spots={[['22%', '62%'], ['70%', '58%'], ['48%', '70%'], ['60%', '48%']]} />
        </>
      }
      scene={<Scene peacocks={['left']} />}
    >
      <motion.p className="eyebrow" variants={reveal}>
        You are cordially invited
      </motion.p>
      <motion.h1 className="script-title" variants={wipe}>
        <span className="script-gold">Wedding</span>
        <span className="script-maroon">Invitation</span>
      </motion.h1>
      <motion.div variants={reveal}>
        <Divider />
      </motion.div>
      <motion.p className="title-names" variants={reveal}>
        {invite.bride.name} <em>&amp;</em> {invite.groom.name}
      </motion.p>
    </Panel>
  )
}

/* ---------- 3. Blessings ---------- */

export function Blessings() {
  return (
    <Panel
      className="panel-blessings"
      decor={
        <>
          <Hanging kind="lantern" items={[[11, 42, 50, 10], [89, 42, 50, 10]]} />
          <Butterflies spots={[['30%', '66%'], ['66%', '70%']]} />
        </>
      }
      scene={<Scene peacocks={['right']} chhatris />}
    >
      <motion.h2 className="script-heading" variants={reveal}>
        {invite.hosts.blessing}
      </motion.h2>
      <motion.div variants={reveal}>
        <Divider />
      </motion.div>
      <motion.p className="hosts" variants={reveal}>
        {invite.hosts.parents}
      </motion.p>
      <motion.p className="request" variants={reveal}>
        {invite.hosts.request}
      </motion.p>
    </Panel>
  )
}

/* ---------- 4. Couple ---------- */

export function Couple() {
  return (
    <Panel
      className="panel-couple"
      decor={
        <>
          <Hanging items={[[26, 26, 40, 6], [35, 20, 70, 6], [65, 20, 70, 6], [74, 26, 40, 6]]} />
          <motion.div className="feather feather-left" variants={reveal}>
            <PeacockFeather />
          </motion.div>
          <motion.div className="feather feather-right" variants={reveal}>
            <PeacockFeather />
          </motion.div>
        </>
      }
      scene={<Scene chhatris pond={false} />}
    >
      <motion.h2 className="name" variants={stagger(0, 0)}>
        <SplitText text={invite.bride.name.toUpperCase()} />
      </motion.h2>
      {invite.bride.lines.map((l) => (
        <motion.p key={l} className="family" variants={reveal}>
          {l}
        </motion.p>
      ))}
      <motion.div className="with" variants={reveal}>
        <RingsDivider />
        <span>with</span>
      </motion.div>
      <motion.h2 className="name" variants={stagger(0, 0)}>
        <SplitText text={invite.groom.name.toUpperCase()} />
      </motion.h2>
      {invite.groom.lines.map((l) => (
        <motion.p key={l} className="family" variants={reveal}>
          {l}
        </motion.p>
      ))}
    </Panel>
  )
}

/* ---------- 5. Event ---------- */

export function EventDetails() {
  const e = invite.event
  return (
    <Panel
      className="panel-event"
      scene={<Scene foliage={false} />}
    >
      <motion.p className="eyebrow" variants={reveal}>
        Save the date
      </motion.p>
      <motion.div className="date-block" variants={reveal}>
        <span className="date-side">{e.weekday}</span>
        <span className="date-day gold-text">{e.day}</span>
        <span className="date-side">
          {e.month}
          <br />
          {e.year}
        </span>
      </motion.div>
      <motion.p className="time" variants={reveal}>
        {e.title} · {e.time} onwards
      </motion.p>
      <motion.div variants={reveal}>
        <Countdown target={e.startISO} />
      </motion.div>
      <motion.div variants={reveal}>
        <Divider />
      </motion.div>
      <motion.p className="venue-name" variants={reveal}>
        {invite.venue.name}
      </motion.p>
      {invite.venue.address.map((l) => (
        <motion.p key={l} className="address" variants={reveal}>
          {l}
        </motion.p>
      ))}
      <motion.div className="location" variants={reveal}>
        <a className="qr" href={mapsUrl} target="_blank" rel="noreferrer">
          <QRCodeSVG value={mapsUrl} size={92} bgColor="transparent" fgColor="#5a0f1a" level="M" />
          <span>Scan for location</span>
        </a>
        <div className="actions">
          <a className="btn" href={mapsUrl} target="_blank" rel="noreferrer">
            Get directions
          </a>
          <a className="btn btn-ghost" href={calendarUrl} target="_blank" rel="noreferrer">
            Add to calendar
          </a>
        </div>
      </motion.div>
    </Panel>
  )
}

/* ---------- 6. Closing ---------- */

export function Closing() {
  return (
    <Panel
      className="panel-closing"
      decor={
        <>
          <Hanging kind="lantern" items={[[11, 42, 40, 10], [89, 42, 40, 10]]} />
          <Butterflies spots={[['28%', '40%'], ['66%', '46%'], ['46%', '30%']]} />
        </>
      }
      scene={<Scene peacocks={['left', 'right']} />}
    >
      <motion.div className="closing-lotus" variants={bloom}>
        <Lotus size={90} />
      </motion.div>
      <motion.p className="closing-line" variants={reveal}>
        {invite.closing.line}
      </motion.p>
      <motion.div variants={reveal}>
        <Divider />
      </motion.div>
      <motion.p className="closing-from" variants={reveal}>
        {invite.closing.from}
      </motion.p>
      <motion.p className="closing-sign gold-text" variants={reveal}>
        {invite.bride.name} &amp; {invite.groom.name}
      </motion.p>
    </Panel>
  )
}
