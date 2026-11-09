import React, { useCallback, useEffect, useRef, useState } from "react";
import "./AboutService.css";

// Update these paths to match your project structure
import service1 from "../../assets/AboutService-1.jpg";
import service2 from "../../assets/AboutService-3.jpg";
import service3 from "../../assets/AboutService-6.jpg";
import service4 from "../../assets/AboutService-2.jpg";
import service5 from "../../assets/AboutService-5.jpg";
import service6 from "../../assets/AboutService-4.jpg";

/* ---------- Icons ---------- */
const Bug = ({ x = 0, y = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="32" cy="38" rx="7" ry="10" />
    <circle cx="32" cy="24" r="4" />
    <path d="M25 33h-9M25 40h-9M39 33h9M39 40h9M27 28l-6-5M37 28l6-5" />
  </g>
);

const ICONS = {
  house: (
    <>
      <path d="M5 30 32 8l27 22M11 26v30h42V26" />
      <Bug x={14} y={14} s={0.56} />
    </>
  ),
  spray: (
    <>
      <rect x="8" y="32" width="18" height="24" rx="3" />
      <path d="M12 32v-7h10v7M22 25h9l4-5" />
      <circle cx="44" cy="26" r="14" />
      <Bug x={33} y={14} s={0.34} />
    </>
  ),
  device: (
    <>
      <rect x="8" y="8" width="48" height="38" rx="6" />
      <path d="M24 56h16M32 46v10" />
      <Bug x={16} y={8} s={0.5} />
    </>
  ),
  person: (
    <>
      <circle cx="32" cy="14" r="7" />
      <path d="M18 58V36a14 14 0 0 1 28 0v22M25 58V42M39 58V42M46 32l10-4" />
    </>
  ),
  shield: (
    <>
      <path d="M32 5 54 14v16c0 15-9 23-22 29C19 53 10 45 10 30V14z" />
      <Bug x={16} y={10} s={0.52} />
    </>
  ),
  paw: (
    <>
      <path d="M18 50c0-9 6-15 14-15s14 6 14 15c0 5-3 7-7 7-3 0-5-2-7-2s-4 2-7 2c-4 0-7-2-7-7z" />
      <circle cx="16" cy="28" r="5" />
      <circle cx="26" cy="16" r="5" />
      <circle cx="38" cy="16" r="5" />
      <circle cx="48" cy="28" r="5" />
    </>
  ),
};

const SERVICES = [
  {
    title: "Wasp Removal Services",
    text: "Safe nest removal and lasting protection for your home.",
    icon: "house",
    image: service1,
  },
  {
    title: "Termite Treatment Solutions",
    text: "Deep inspection and treatment that stops damage early.",
    icon: "spray",
    image: service2,
  },
  {
    title: "Mosquito Control Services",
    text: "Targeted treatments that keep your outdoor spaces clear.",
    icon: "device",
    image: service3,
  },
  {
    title: "Commercial Pest Solutions",
    text: "Reliable pest programs for offices, shops and factories.",
    icon: "person",
    image: service4,
  },
  {
    title: "Mobility Assistance Services",
    text: "Careful, accessible service for every client we visit.",
    icon: "shield",
    image: service5,
  },
  {
    title: "Rodent Control Services",
    text: "Trapping, sealing and prevention against rats and mice.",
    icon: "paw",
    image: service6,
  },
];

// Image shown on the back when the card flips (change to any image you like)
SERVICES.forEach((item, i) => {
  item.backImage = item.backImage || SERVICES[(i + 1) % SERVICES.length].image;
});

const HEADING = ["Comprehensive pest", "control services designed"];
const AUTOPLAY_MS = 2000;
const TOTAL = SERVICES.length;

const getPerView = (w) => (w >= 1200 ? 4 : w >= 992 ? 3 : w >= 640 ? 2 : 1);

const AboutService = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  /* responsive items per view */
  useEffect(() => {
    const update = () => setPerView(getPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* reveal on enter */
  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* autoplay: right to left every 2s (starts after entrance) */
  useEffect(() => {
    if (!visible || paused) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timer = setInterval(() => {
      setIndex((i) => (i < TOTAL ? i + 1 : i));
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [visible, paused]);

  /* seamless loop reset */
  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      if (index >= TOTAL) {
        setAnimate(false);
        setIndex(0);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimate(true))
        );
      }
    },
    [index]
  );

  const slides = [...SERVICES, ...SERVICES.slice(0, perView)];
  const activeOffset = Math.min(2, perView - 1);

  return (
    <section
      ref={sectionRef}
      className={`AboutService ${visible ? "AboutService--visible" : ""}`}
    >
      {/* SVG clover shape used to clip the images */}
      <svg width="0" height="0" className="AboutService__defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="AboutService-clover" clipPathUnits="objectBoundingBox">
            <circle cx="0.5" cy="0.27" r="0.27" />
            <circle cx="0.73" cy="0.5" r="0.27" />
            <circle cx="0.5" cy="0.73" r="0.27" />
            <circle cx="0.27" cy="0.5" r="0.27" />
            <circle cx="0.5" cy="0.5" r="0.26" />
          </clipPath>
        </defs>
      </svg>

      {/* Decorative bee */}
      <svg className="AboutService__bee" viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <ellipse cx="60" cy="86" rx="22" ry="32" />
        <path d="M40 76h40M39 90h42M42 104h36" />
        <circle cx="60" cy="42" r="14" />
        <path d="M52 30 44 12M68 30l8-18" />
        <path d="M40 66C20 62 4 48 8 34c4-12 30-10 42 8M80 66c20-4 36-18 32-32-4-12-30-10-42 8" />
        <path d="M40 98 24 114M80 98l16 16M38 86 18 96M82 86l20 10" />
      </svg>

      <div className="AboutService__container">
        {/* Heading */}
        <div className="AboutService__head">
          <span className="AboutService__badge">
            <i className="AboutService__badge-dot" />
            Service Area
          </span>

          <h2 className="AboutService__title" aria-label={HEADING.join(" ")}>
            {HEADING.map((line, li) => (
              <span className="AboutService__line" key={li} aria-hidden="true">
                {line.split(" ").map((word, wi) => (
                  <React.Fragment key={wi}>
                    <span className="AboutService__word">
                      <span
                        className="AboutService__word-inner"
                        style={{ "--w": li * 3 + wi }}
                      >
                        {word}
                      </span>
                    </span>{" "}
                  </React.Fragment>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="AboutService__viewport"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className={`AboutService__track ${animate ? "" : "AboutService__track--static"}`}
            style={{ "--per": perView, "--index": index }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((item, i) => (
              <div
                className="AboutService__slide"
                key={`${item.title}-${i}`}
                style={{ "--d": Math.min(i, 5) }}
              >
                <article
                  className={`AboutService__card ${i === index + activeOffset ? "AboutService__card--active" : ""}`}
                  tabIndex={0}
                >
                  <span className="AboutService__icon">
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {ICONS[item.icon]}
                    </svg>
                  </span>

                  <h3 className="AboutService__card-title">{item.title}</h3>

                  <div className="AboutService__flip">
                    <div className="AboutService__flip-inner">
                      <div className="AboutService__face AboutService__face--front">
                        <img src={item.image} alt={item.title} className="AboutService__img" loading="lazy" />
                      </div>
                      <div className="AboutService__face AboutService__face--back">
                        <img src={item.backImage} alt="" className="AboutService__img" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="AboutService__cta">
          <span className="AboutService__cta-avatars" aria-hidden="true">
            <span className="AboutService__cta-avatar">AK</span>
            <span className="AboutService__cta-call">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
            </span>
          </span>
          <p className="AboutService__cta-text">
            Let’s make something great work together.{" "}
            <a href="/services" className="AboutService__cta-link">
              View All Services
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutService;