import React, { useEffect, useRef, useState } from "react";
import "./DashboardOne.css";

/* ------------------------------------------------------------------ */
/*  Default data (replace with API data or pass through props)         */
/* ------------------------------------------------------------------ */

const DEFAULT_STATS = [
  { key: "bookings", label: "Total Bookings", value: 248, trend: 12, up: true, icon: "calendar", mark: "calendar", tone: "bookings" },
  { key: "projects", label: "Total Projects", value: 56, trend: 8, up: true, icon: "layers", mark: "layers", tone: "projects" },
  { key: "orders", label: "Total Orders", value: 182, trend: 15, up: true, icon: "cart", mark: "cart", tone: "orders" },
  { key: "enquiries", label: "Total Enquiries", value: 37, trend: 5, up: true, icon: "mail", mark: "mail", tone: "enquiries" },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/* Counts from 0 to `target` once `start` is true */
const useCountUp = (target, { duration = 1800, delay = 0, start = true } = {}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let frame;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setValue(Math.round(target * easeOutCubic(progress)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target, duration, delay, start]);

  return value;
};

/* True once the element has scrolled into view */
const useInView = (ref) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
};

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const ICON_PATHS = {
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  cart: (
    <>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
  bug: (
    <>
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </>
  ),
};

const Icon = ({ name, size = 18, className = "", strokeWidth = 2 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICON_PATHS[name]}
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Decorative leaves for the welcome banner                           */
/* ------------------------------------------------------------------ */

const Leaves = () => (
  <svg className="DashboardOne-leaves" viewBox="0 0 520 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="DashboardOne-leafA" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7ddc9a" />
        <stop offset="1" stopColor="#2fa857" />
      </linearGradient>
      <linearGradient id="DashboardOne-leafB" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bdeccb" />
        <stop offset="1" stopColor="#5cc37f" />
      </linearGradient>
    </defs>
    <path d="M300 150C292 96 330 40 400 18c10 62-26 112-100 132Z" fill="url(#DashboardOne-leafA)" opacity="0.55" />
    <path d="M300 150c40-50 62-86 100-132" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />
    <path d="M440 150c-6-60 24-110 86-136 12 64-18 118-86 136Z" fill="url(#DashboardOne-leafB)" opacity="0.6" />
    <path d="M440 150c30-48 52-88 86-136" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />
    <path d="M200 160c-4-38 16-70 56-88 8 40-14 74-56 88Z" fill="url(#DashboardOne-leafB)" opacity="0.4" />
    <circle cx="150" cy="130" r="70" fill="none" stroke="#7ddc9a" strokeOpacity="0.35" strokeWidth="2" />
    <circle cx="150" cy="130" r="104" fill="none" stroke="#7ddc9a" strokeOpacity="0.2" strokeWidth="2" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Stat card with count-up                                            */
/* ------------------------------------------------------------------ */

const StatCard = ({ stat, index, visible }) => {
  const count = useCountUp(stat.value, { duration: 1900, delay: index * 140, start: visible });
  const trend = useCountUp(stat.trend, { duration: 1500, delay: index * 140 + 200, start: visible });
  const done = visible && count === stat.value;

  return (
    <article
      className={`DashboardOne-stat DashboardOne-stat--${stat.tone} ${visible ? "is-visible" : ""}`}
      style={{ "--DashboardOne-delay": `${index * 110}ms` }}
    >
      <span className="DashboardOne-statIcon">
        <Icon name={stat.icon} size={24} />
      </span>

      <div className="DashboardOne-statBody">
        <p className="DashboardOne-statLabel">{stat.label}</p>
        <p className={`DashboardOne-statValue ${done ? "is-done" : ""}`} aria-label={`${stat.label}: ${stat.value}`}>
          {count.toLocaleString("en-IN")}
        </p>
        <p className={`DashboardOne-statTrend ${stat.up ? "is-up" : "is-down"}`}>
          <Icon name={stat.up ? "arrowUp" : "arrowDown"} size={13} strokeWidth={2.6} />
          <strong>
            {stat.up ? "+" : "-"}
            {trend}%
          </strong>
          <span>from last month</span>
        </p>
      </div>

      <Icon name={stat.mark} size={84} strokeWidth={1.4} className="DashboardOne-statWatermark" />
    </article>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const DashboardOne = ({ adminName = "Admin", stats = DEFAULT_STATS }) => {
  const gridRef = useRef(null);
  const visible = useInView(gridRef);

  return (
    <section className="DashboardOne">
      {/* Welcome banner */}
     

      {/* Stat cards */}
      <div className="DashboardOne-stats" ref={gridRef}>
        {stats.map((stat, index) => (
          <StatCard key={stat.key} stat={stat} index={index} visible={visible} />
        ))}
      </div>
    </section>
  );
};

export default DashboardOne;