import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiBarChart2,
  FiPieChart,
  FiZap,
  FiPlus,
  FiUserPlus,
  FiLayers,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiChevronRight,
  FiChevronDown,
  FiEye,
  FiCheck,
  FiArrowUp,
} from 'react-icons/fi'
import { FaCoins } from 'react-icons/fa'
import './DashboardTwo.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SERVICE_COLORS = ['#16a34a', '#2563eb', '#f59e0b', '#a855f7', '#38bdf8']

const QUICK_ACTIONS = [
  { label: 'Add Booking', icon: FiPlus, path: '/booking' },
  { label: 'Add Member', icon: FiUserPlus, path: '/team' },
  { label: 'New Project', icon: FiLayers, path: '/projects/add' },
  { label: 'View Enquiries', icon: FiMail, path: '/enquiry' },
]

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const buildMonthlyData = (bookings, monthsCount) => {
  const now = new Date()
  const buckets = []
  for (let i = monthsCount - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    buckets.push({ key, m: MONTH_SHORT[d.getMonth()], v: 0 })
  }
  const map = new Map(buckets.map((b) => [b.key, b]))
  bookings.forEach((bk) => {
    const raw = bk.date || bk.createdAt
    if (!raw) return
    const key = String(raw).slice(0, 7)
    if (map.has(key)) map.get(key).v += 1
  })
  return buckets.map(({ m, v }) => ({ m, v }))
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const useCountUp = (target, duration = 1400) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target)
      return undefined
    }
    let raf
    let start
    const step = (ts) => {
      if (start === undefined) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

/* Smooth monotone curve (no overshoot) */
const smoothPath = (pts) => {
  const n = pts.length
  if (n < 2) return ''
  const dx = []
  const m = []
  const t = new Array(n)
  for (let i = 0; i < n - 1; i += 1) {
    dx[i] = pts[i + 1].x - pts[i].x
    m[i] = (pts[i + 1].y - pts[i].y) / dx[i]
  }
  t[0] = m[0]
  t[n - 1] = m[n - 2]
  for (let i = 1; i < n - 1; i += 1) {
    t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2
  }
  for (let i = 0; i < n - 1; i += 1) {
    if (m[i] === 0) {
      t[i] = 0
      t[i + 1] = 0
    } else {
      const a = t[i] / m[i]
      const b = t[i + 1] / m[i]
      const s = a * a + b * b
      if (s > 9) {
        const tau = 3 / Math.sqrt(s)
        t[i] = tau * a * m[i]
        t[i + 1] = tau * b * m[i]
      }
    }
  }
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 0; i < n - 1; i += 1) {
    const c1x = pts[i].x + dx[i] / 3
    const c1y = pts[i].y + (t[i] * dx[i]) / 3
    const c2x = pts[i + 1].x - dx[i] / 3
    const c2y = pts[i + 1].y - (t[i + 1] * dx[i]) / 3
    d += `C${c1x},${c1y} ${c2x},${c2y} ${pts[i + 1].x},${pts[i + 1].y}`
  }
  return d
}

/* ------------------------------------------------------------------ */
/*  Premium dropdown                                                   */
/* ------------------------------------------------------------------ */

const DashboardTwoDropdown = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false)
  const [focusIdx, setFocusIdx] = useState(0)
  const rootRef = useRef(null)
  const selectedIdx = options.findIndex((o) => o.value === value)
  const selected = options[selectedIdx] || options[0]

  useEffect(() => {
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [])

  const toggle = () => {
    setFocusIdx(selectedIdx < 0 ? 0 : selectedIdx)
    setOpen((o) => !o)
  }

  const choose = (opt) => {
    onChange(opt.value)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) toggle()
      else setFocusIdx((i) => (i + 1) % options.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) toggle()
      else setFocusIdx((i) => (i - 1 + options.length) % options.length)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) toggle()
      else choose(options[focusIdx])
    }
  }

  return (
    <div className="DashboardTwo-dropdown" ref={rootRef}>
      <button
        type="button"
        className={`DashboardTwo-dropdownButton${open ? ' is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <span>{selected.label}</span>
        <FiChevronDown className="DashboardTwo-dropdownChevron" />
      </button>

      <ul
        className={`DashboardTwo-dropdownMenu${open ? ' is-open' : ''}`}
        role="listbox"
        aria-hidden={!open}
      >
        {options.map((opt, i) => (
          <li
            key={opt.value}
            role="option"
            aria-selected={opt.value === value}
            className={`DashboardTwo-dropdownItem${opt.value === value ? ' is-selected' : ''}${
              i === focusIdx ? ' is-focused' : ''
            }`}
            onMouseEnter={() => setFocusIdx(i)}
            onClick={() => choose(opt)}
          >
            <span>{opt.label}</span>
            {opt.value === value && <FiCheck className="DashboardTwo-dropdownCheck" />}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Booking chart (real SVG, responsive, interactive)                  */
/* ------------------------------------------------------------------ */

const DashboardTwoChart = ({ data }) => {
  const wrapRef = useRef(null)
  const [size, setSize] = useState({ width: 560, height: 262 })
  const [active, setActive] = useState(null)
  const { width, height } = size

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const update = () => {
      const w = Math.max(260, Math.round(el.clientWidth))
      const h = Math.min(Math.max(240, Math.round(el.clientHeight)), 400)
      setSize((prev) => (prev.width === w && prev.height === h ? prev : { width: w, height: h }))
    }
    update()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const geo = useMemo(() => {
    const pad = { top: 16, right: 14, bottom: 34, left: 40 }
    const iw = width - pad.left - pad.right
    const ih = height - pad.top - pad.bottom
    const maxV = Math.max(...data.map((d) => d.v))
    const max = Math.ceil((maxV * 1.08) / 50) * 50
    const ticks = []
    for (let t = 0; t <= max; t += 50) ticks.push(t)
    const inset = Math.min(14, iw * 0.03)
    const n = data.length
    const pts = data.map((d, i) => ({
      ...d,
      x: pad.left + inset + (iw - inset * 2) * (i / (n - 1)),
      y: pad.top + ih - (d.v / max) * ih,
    }))
    const line = smoothPath(pts)
    const baseY = pad.top + ih
    const area = `${line}L${pts[n - 1].x},${baseY}L${pts[0].x},${baseY}Z`
    const gap = (iw - inset * 2) / (n - 1)
    const step = Math.max(1, Math.ceil(46 / gap))
    return { pad, iw, ih, max, ticks, pts, line, area, baseY, step }
  }, [data, width, height])

  const { pad, ticks, max, pts, line, area, baseY, step, ih } = geo
  const yOf = (v) => pad.top + ih - (v / max) * ih

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    let idx = 0
    let best = Infinity
    pts.forEach((p, i) => {
      const dist = Math.abs(p.x - x)
      if (dist < best) {
        best = dist
        idx = i
      }
    })
    setActive(idx)
  }

  const tip = active !== null ? pts[active] : null
  const tipLeft = tip ? Math.min(Math.max(tip.x, 62), width - 62) : 0

  return (
    <div className="DashboardTwo-chart" ref={wrapRef}>
      <svg
        className="DashboardTwo-chartSvg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Bookings per month line chart"
      >
        <defs>
          <linearGradient id="DashboardTwo-areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="DashboardTwo-lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line
              className="DashboardTwo-gridLine"
              x1={pad.left}
              x2={width - pad.right}
              y1={yOf(t)}
              y2={yOf(t)}
            />
            <text className="DashboardTwo-axisText" x={pad.left - 10} y={yOf(t) + 4} textAnchor="end">
              {t}
            </text>
          </g>
        ))}

        <g key={data.length}>
          <path className="DashboardTwo-area" d={area} fill="url(#DashboardTwo-areaGradient)" />
          <path
            className="DashboardTwo-line"
            d={line}
            pathLength="1"
            fill="none"
            stroke="url(#DashboardTwo-lineGradient)"
          />
        </g>

        {tip && (
          <line
            className="DashboardTwo-crosshair"
            x1={tip.x}
            x2={tip.x}
            y1={pad.top}
            y2={baseY}
          />
        )}

        {pts.map((p, i) => (
          <g key={p.m + i}>
            {active === i && <circle className="DashboardTwo-dotHalo" cx={p.x} cy={p.y} r="11" />}
            <circle
              className={`DashboardTwo-dot${active === i ? ' is-active' : ''}`}
              cx={p.x}
              cy={p.y}
              r={active === i ? 6 : 4.5}
            />
            {(pts.length - 1 - i) % step === 0 && (
              <text className="DashboardTwo-axisText" x={p.x} y={baseY + 22} textAnchor="middle">
                {p.m}
              </text>
            )}
          </g>
        ))}

        <rect
          className="DashboardTwo-chartHit"
          x={pad.left}
          y={pad.top}
          width={width - pad.left - pad.right}
          height={ih}
          fill="transparent"
          onPointerMove={handleMove}
          onPointerDown={handleMove}
          onPointerLeave={() => setActive(null)}
        />
      </svg>

      {tip && (
        <div className="DashboardTwo-tooltip" style={{ left: tipLeft, top: tip.y }}>
          <span className="DashboardTwo-tooltipMonth">{tip.m} 2026</span>
          <strong className="DashboardTwo-tooltipValue">{tip.v} Bookings</strong>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const DashboardTwo = ({ bookings = [], enquiries = [] }) => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)
  const [ready, setReady] = useState(false)

  const recentEnquiries = useMemo(
    () =>
      enquiries.slice(0, 5).map((e) => ({
        id: e._id || e.id,
        name: e.name || 'Customer',
        email: e.email || '',
        service: e.service || e.subject || 'General Enquiry',
        phone: e.phone || '',
        status: e.status || 'New',
        date: e.createdAt || e.at
          ? new Date(e.createdAt || e.at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'Today',
      })),
    [enquiries]
  )

  const enquirySummary = useMemo(
    () => [
      { label: 'New', count: enquiries.filter((e) => (e.status || 'New') === 'New').length, color: '#2563eb', bg: '#eff6ff', border: '#dbeafe' },
      { label: 'In Progress', count: enquiries.filter((e) => e.status === 'In Progress').length, color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
      { label: 'Closed', count: enquiries.filter((e) => e.status === 'Closed').length, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    ],
    [enquiries]
  )

  const services = useMemo(() => {
    if (!bookings.length) return []
    const counts = new Map()
    bookings.forEach((b) => {
      const name = b.service || 'General Pest Control'
      counts.set(name, (counts.get(name) || 0) + 1)
    })
    const total = bookings.length
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count], idx) => ({
        name,
        count,
        percent: Math.round((count / total) * 100),
        color: SERVICE_COLORS[idx % SERVICE_COLORS.length],
      }))
  }, [bookings])

  const monthRevenue = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    const monthly = bookings
      .filter((b) => String(b.date || b.createdAt || '').startsWith(currentMonth))
      .reduce((sum, b) => sum + (Number(b.amount) || 0), 0)
    return monthly
  }, [bookings])

  const scheduleItems = useMemo(() => {
    const tones = ['green', 'blue', 'orange']
    return bookings
      .filter((b) => b.status === 'Pending' || b.status === 'In Progress')
      .slice(0, 3)
      .map((b, i) => ({
        id: b._id || b.id,
        time: b.date
          ? new Date(b.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
          : 'Today',
        title: b.service || 'Pest Control Service',
        place: b.location || 'Contact Form',
        tone: tones[i % tones.length],
      }))
  }, [bookings])

  const recentBookings = useMemo(
    () =>
      bookings.slice(0, 5).map((b, i) => ({
        id: `#${String(b._id || b.id).slice(-6).toUpperCase()}`,
        name: b.name || 'Customer',
        service: b.service || 'General Pest Control',
        color: SERVICE_COLORS[i % SERVICE_COLORS.length],
        location: b.location || 'Contact Form',
        date: b.date || b.createdAt
          ? new Date(b.date || b.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : '—',
        status: b.status || 'Pending',
      })),
    [bookings]
  )

  const totalBookings = bookings.length
  const animatedTotal = useCountUp(totalBookings, 1200)
  const animatedRevenue = useCountUp(monthRevenue, 1500)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const R = 76
  const C = 2 * Math.PI * R
  const GAP = 3
  const segments = useMemo(() => {
    let acc = 0
    return services.map((s) => {
      const len = (s.percent / 100) * C
      const seg = { ...s, dash: Math.max(len - GAP, 0), offset: -acc }
      acc += len
      return seg
    })
  }, [C, services])

  const activeService = hovered !== null ? services[hovered] : null

  return (
    <div className="DashboardTwo">
      <div className="DashboardTwo-grid">
        {/* ---------------- Recent Enquiries ---------------- */}
        <section className="DashboardTwo-card DashboardTwo-overview">
          <header className="DashboardTwo-cardHead">
            <h3 className="DashboardTwo-cardTitle">
              <span className="DashboardTwo-titleIcon">
                <FiMail />
              </span>
              Recent Enquiries
            </h3>
            <button type="button" className="DashboardTwo-viewAll" onClick={() => navigate('/enquiry')}>
              View All
            </button>
          </header>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            {enquirySummary.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: item.bg,
                  border: `1px solid ${item.border}`,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                <span>{item.label}</span>
                <span
                  style={{
                    padding: '1px 7px',
                    borderRadius: '999px',
                    background: '#ffffff',
                    color: item.color,
                    fontSize: '12px',
                  }}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>

          {recentEnquiries.length === 0 ? (
            <div
              style={{
                padding: '36px 16px',
                textAlign: 'center',
                borderRadius: '16px',
                background: 'linear-gradient(180deg, #f8fbf9 0%, #f1f7f3 100%)',
                border: '1px dashed #c8dfd0',
                color: '#5c7265',
                fontSize: '14px',
              }}
            >
              No enquiries yet. Website enquiries will appear here in real time.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  onClick={() => navigate('/enquiry')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') navigate('/enquiry')
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    padding: '13px 16px',
                    borderRadius: '14px',
                    background: '#ffffff',
                    border: '1px solid #e4efe8',
                    boxShadow: '0 4px 14px rgba(8, 48, 31, 0.04)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <span className="DashboardTwo-avatar">
                      {enq.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#08301f' }}>
                        {enq.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#5c7265', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {enq.service}
                        {enq.phone ? ` • ${enq.phone}` : ''}
                        {enq.email ? ` • ${enq.email}` : ''}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{enq.date}</span>
                    <span
                      className={`DashboardTwo-status DashboardTwo-status--${
                        enq.status === 'Closed' ? 'completed' : enq.status === 'In Progress' ? 'in-progress' : 'pending'
                      }`}
                    >
                      {enq.status}
                    </span>
                    <FiChevronRight style={{ color: '#94a3b8' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------------- Service Distribution ---------------- */}
        <section className="DashboardTwo-card DashboardTwo-service">
          <header className="DashboardTwo-cardHead">
            <h3 className="DashboardTwo-cardTitle">
              <span className="DashboardTwo-titleIcon">
                <FiPieChart />
              </span>
              Service Distribution
            </h3>
          </header>

          <div className="DashboardTwo-serviceBody">
            <div className="DashboardTwo-donut">
              <svg
                className="DashboardTwo-donutSvg"
                viewBox="0 0 200 200"
                role="img"
                aria-label="Service distribution donut chart"
              >
                <circle className="DashboardTwo-donutTrack" cx="100" cy="100" r={R} />
                <g transform="rotate(-90 100 100)">
                  {segments.map((s, i) => (
                    <circle
                      key={s.name}
                      className={`DashboardTwo-donutSegment${hovered === i ? ' is-active' : ''}${
                        hovered !== null && hovered !== i ? ' is-dim' : ''
                      }`}
                      cx="100"
                      cy="100"
                      r={R}
                      stroke={s.color}
                      strokeDasharray={ready ? `${s.dash} ${C - s.dash}` : `0 ${C}`}
                      strokeDashoffset={s.offset}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setHovered(hovered === i ? null : i)}
                    />
                  ))}
                </g>
              </svg>
              <div className="DashboardTwo-donutCenter">
                <strong className="DashboardTwo-donutValue">
                  {activeService ? activeService.count : animatedTotal}
                </strong>
                <span className="DashboardTwo-donutLabel">
                  {activeService ? activeService.name : 'Bookings'}
                </span>
              </div>
            </div>

            <ul className="DashboardTwo-legend">
              {services.length === 0 ? (
                <li className="DashboardTwo-legendItem">
                  <span className="DashboardTwo-legendName">No bookings yet</span>
                </li>
              ) : (
                services.map((s, i) => (
                  <li
                    key={s.name}
                    className={`DashboardTwo-legendItem${hovered === i ? ' is-active' : ''}`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="DashboardTwo-legendDot" style={{ background: s.color }} />
                    <span className="DashboardTwo-legendName">{s.name}</span>
                    <span className="DashboardTwo-legendValue">{s.percent}%</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* ---------------- Right column ---------------- */}
        <aside className="DashboardTwo-side">
          <section className="DashboardTwo-card DashboardTwo-actions">
            <h3 className="DashboardTwo-cardTitle DashboardTwo-cardTitle--light">
              <span className="DashboardTwo-titleIcon DashboardTwo-titleIcon--lime">
                <FiZap />
              </span>
              Quick Actions
            </h3>
            <div className="DashboardTwo-actionGrid">
              {QUICK_ACTIONS.map(({ label, icon: Icon, path }) => (
                <button
                  type="button"
                  className="DashboardTwo-actionBtn"
                  key={label}
                  onClick={() => navigate(path)}
                >
                  <Icon className="DashboardTwo-actionIcon" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="DashboardTwo-card DashboardTwo-schedule">
            <header className="DashboardTwo-cardHead">
              <h3 className="DashboardTwo-cardTitle">
                <span className="DashboardTwo-titleIcon">
                  <FiCalendar />
                </span>
                Today&rsquo;s Schedule
              </h3>
              <button type="button" className="DashboardTwo-viewAll" onClick={() => navigate('/booking')}>
                View All
              </button>
            </header>
            <ul className="DashboardTwo-scheduleList">
              {scheduleItems.length === 0 ? (
                <li style={{ padding: '12px 0', color: '#6b7f72', fontSize: '14px' }}>
                  No pending bookings scheduled.
                </li>
              ) : (
                scheduleItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="DashboardTwo-scheduleItem"
                      onClick={() => navigate('/booking')}
                    >
                      <span className={`DashboardTwo-time DashboardTwo-time--${item.tone}`}>
                        {item.time}
                      </span>
                      <span className="DashboardTwo-scheduleInfo">
                        <strong className="DashboardTwo-scheduleTitle">{item.title}</strong>
                        <span className="DashboardTwo-schedulePlace">
                          <FiMapPin /> {item.place}
                        </span>
                      </span>
                      <FiChevronRight className="DashboardTwo-scheduleArrow" />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="DashboardTwo-card DashboardTwo-revenue">
            <span className="DashboardTwo-revenueIcon">
              <FaCoins />
            </span>
            <div className="DashboardTwo-revenueInfo">
              <span className="DashboardTwo-revenueLabel">This Month Revenue</span>
              <strong className="DashboardTwo-revenueValue">
                ₹ {animatedRevenue.toLocaleString('en-IN')}
              </strong>
            </div>
            <span className="DashboardTwo-revenueBadge">
              <FiArrowUp /> +{monthRevenue > 0 ? 18 : 0}%
            </span>
          </section>
        </aside>

        {/* ---------------- Recent Bookings ---------------- */}
        <section className="DashboardTwo-card DashboardTwo-recent">
          <header className="DashboardTwo-cardHead">
            <h3 className="DashboardTwo-cardTitle">
              <span className="DashboardTwo-titleIcon">
                <FiCalendar />
              </span>
              Recent Bookings
            </h3>
            <button type="button" className="DashboardTwo-viewAll" onClick={() => navigate('/booking')}>
              View All
            </button>
          </header>

          <div className="DashboardTwo-tableWrap">
            <table className="DashboardTwo-table">
              <thead className="DashboardTwo-thead">
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Service</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="DashboardTwo-thCenter">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#6b7f72' }}>
                      No bookings found in database.
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr className="DashboardTwo-tr" key={b.id}>
                      <td data-label="Booking" className="DashboardTwo-tdId">
                        {b.id}
                      </td>
                      <td data-label="Customer">
                        <span className="DashboardTwo-customer">
                          <span className="DashboardTwo-avatar">
                            {b.name
                              .split(' ')
                              .map((w) => w[0])
                              .join('')}
                          </span>
                          {b.name}
                        </span>
                      </td>
                      <td data-label="Service">
                        <span className="DashboardTwo-serviceCell">
                          <span className="DashboardTwo-serviceDot" style={{ background: b.color }} />
                          {b.service}
                        </span>
                      </td>
                      <td data-label="Location">{b.location}</td>
                      <td data-label="Date">{b.date}</td>
                      <td data-label="Status">
                        <span
                          className={`DashboardTwo-status DashboardTwo-status--${b.status
                            .toLowerCase()
                            .replace(' ', '-')}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td data-label="Action" className="DashboardTwo-tdAction">
                        <button
                          type="button"
                          className="DashboardTwo-viewBtn"
                          aria-label={`View booking ${b.id}`}
                          onClick={() => navigate('/booking')}
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardTwo