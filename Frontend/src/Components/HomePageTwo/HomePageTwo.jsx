import React, { useEffect, useRef, useState } from "react";
import "./HomePageTwo.css";

/* ---------- Logo icons (inline SVG, use currentColor) ---------- */
const CactusIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="20" cy="20" r="17" />
    <path d="M20 31V14a3 3 0 0 1 6 0v6M20 25v-8a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3h3" />
  </svg>
);

const GreenishIcon = () => (
  <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
    <circle cx="20" cy="9" r="6" />
    <path d="M3 20c9 0 14 4 14 12-9 0-14-4-14-12zM37 20c-9 0-14 4-14 12 9 0 14-4 14-12z" />
    <path d="M20 17c4 0 5 4 5 8 0 3-2 5-5 5s-5-2-5-5c0-4 1-8 5-8z" />
  </svg>
);

const VertigoIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
    <path d="M6 28a14 14 0 1 1 28-2" />
    <path d="M13 28a8 8 0 1 1 16-2" />
    <circle cx="21" cy="25" r="2.2" fill="currentColor" stroke="none" />
    <path d="M6 28c0 4 3 8 8 8s9-3 9-9" />
  </svg>
);

const SitemarkIcon = () => (
  <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
    <path d="M17 2h6l-1 12 10-7 3 5-11 6 11 6-3 5-10-7 1 12h-6l1-12-10 7-3-5 11-6-11-6 3-5 10 7z" />
  </svg>
);

const HuesIcon = () => (
  <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
    <path d="M4 10c0-4 3-7 8-7 3 0 6 2 6 6s-3 8-8 8c-4 0-6-3-6-7z" />
    <circle cx="27" cy="9" r="6" />
    <path d="M17 24c6 0 8 4 8 8 0 4-3 6-6 6-5 0-8-5-8-9 0-3 2-5 6-5z" />
    <circle cx="31" cy="27" r="5" />
  </svg>
);

const EbooksIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="19" fill="currentColor" />
    <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 9 31 14l-11 5-11-5z" />
      <path d="m9 19 11 5 11-5M9 24l11 5 11-5" />
    </g>
  </svg>
);

const LOGOS = [
  { name: "Cactus", icon: <CactusIcon /> },
  { name: "Greenish", icon: <GreenishIcon /> },
  { name: "Vertigo", icon: <VertigoIcon /> },
  { name: "Sitemark", icon: <SitemarkIcon /> },
  { name: "hues", icon: <HuesIcon /> },
  { name: "Ebooks", icon: <EbooksIcon /> },
];

const LogoList = ({ hidden = false }) => (
  <ul className="HomePageTwo__list" aria-hidden={hidden || undefined}>
    {LOGOS.map((logo, i) => (
      <li className="HomePageTwo__item" key={logo.name} style={{ "--i": i }}>
        <a
          href="#"
          className="HomePageTwo__logo"
          tabIndex={hidden ? -1 : 0}
          onClick={(e) => e.preventDefault()}
          aria-label={logo.name}
        >
          <span className="HomePageTwo__icon">{logo.icon}</span>
          <span className="HomePageTwo__name">{logo.name}</span>
        </a>
      </li>
    ))}
  </ul>
);

const HomePageTwo = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor spotlight: follows the mouse inside the card
  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    card.classList.add("HomePageTwo__card--hover");
  };

  const handleLeave = (e) => {
    e.currentTarget.classList.remove("HomePageTwo__card--hover");
  };

  return (
    <section
      ref={ref}
      className={`HomePageTwo ${visible ? "HomePageTwo--visible" : ""}`}
    >
      <div
        className="HomePageTwo__card"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <span className="HomePageTwo__glow" aria-hidden="true" />
        <span className="HomePageTwo__spot" aria-hidden="true" />

        <div className="HomePageTwo__marquee">
          <div className="HomePageTwo__track">
            <LogoList />
            <LogoList hidden />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageTwo;