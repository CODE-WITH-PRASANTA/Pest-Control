import React, { useEffect, useState } from 'react'
import './Loader.css'
import loaderLogo from '../../assets/loader.png'

/**
 * GiriDurga Pest Controls – Premium Loader
 *
 * Props
 *  duration  – time (ms) for progress to reach 100%   (default 3000 = 3s)
 *  onFinish  – called after the smooth closing animation is done
 */

const STATUS = [
  { at: 0, label: 'Inspecting your space' },
  { at: 35, label: 'Treating the problem' },
  { at: 70, label: 'Securing your home' },
  { at: 96, label: 'Your home is protected' },
]

const BUGS = [20, 70, 120, 170, 215, 255, 300, 340]

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 6.9 + 3) % 100}%`,
  size: 3 + ((i * 5) % 7),
  delay: `${(i % 8) * 0.4}s`,
  time: `${3.4 + (i % 5) * 0.7}s`,
}))

const EXIT_TIME = 900 // ms – matches the closing transition in Loader.css

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

const Loader = ({ duration = 3000, onFinish }) => {
  const [progress, setProgress] = useState(0)
  const [exit, setExit] = useState(false)

  // progress runs for exactly `duration` ms, then closes smoothly
  useEffect(() => {
    let raf
    let closeTimer
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setProgress(Math.round(easeInOut(t) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        closeTimer = setTimeout(() => setExit(true), 250)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(closeTimer)
    }
  }, [duration])

  // remove loader after the closing animation
  useEffect(() => {
    if (!exit) return
    const id = setTimeout(() => onFinish && onFinish(), EXIT_TIME)
    return () => clearTimeout(id)
  }, [exit, onFinish])

  // lock page scroll + mark body while loader is visible
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('Loader-active')
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove('Loader-active')
    }
  }, [])

  const status = [...STATUS].reverse().find((s) => progress >= s.at)
  const RADIUS = 96
  const CIRC = 2 * Math.PI * RADIUS

  return (
    <div
      className={`Loader ${exit ? 'Loader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading GiriDurga Pest Controls"
    >
      {/* background */}
      <span className="Loader__glow Loader__glow--one" />
      <span className="Loader__glow Loader__glow--two" />
      <span className="Loader__grid" />

      <div className="Loader__particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="Loader__particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.time,
            }}
          />
        ))}
      </div>

      <div className="Loader__content">
        <div className="Loader__stage">
          <span className="Loader__pulse" />
          <span className="Loader__pulse Loader__pulse--two" />
          <span className="Loader__sweep" />

          {/* rings */}
          <svg className="Loader__rings" viewBox="0 0 220 220" aria-hidden="true">
            <circle className="Loader__ringDash" cx="110" cy="110" r="106" />
            <circle className="Loader__ringTrack" cx="110" cy="110" r={RADIUS} />
            <circle
              className="Loader__ringProgress"
              cx="110"
              cy="110"
              r={RADIUS}
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - (CIRC * progress) / 100}
            />
          </svg>

          {/* pests cleared by the sweep */}
          {BUGS.map((a) => (
            <span
              key={a}
              className="Loader__bug"
              style={{ '--a': `${a}deg`, '--d': `${(a / 360) * 2.4}s` }}
            >
              <i className="Loader__bugDot" />
            </span>
          ))}

          {/* logo inside the middle circle */}
          <div className="Loader__disc">
            <div className="Loader__logoBox">
              <img className="Loader__logo" src={loaderLogo} alt="GiriDurga Pest Controls" />
              <span
                className="Loader__shine"
                style={{
                  WebkitMaskImage: `url(${loaderLogo})`,
                  maskImage: `url(${loaderLogo})`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="Loader__meta">
          <span className="Loader__status" key={status.label}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Loader