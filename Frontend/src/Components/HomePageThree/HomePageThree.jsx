import React, { useEffect, useRef, useState } from "react";
import "./HomePageThree.css";

// Update these paths to match your project structure
import about1 from "../../assets/about1-1.jpg"; // tall image (left)
import about2 from "../../assets/about1-2.jpg"; // top right
import about3 from "../../assets/about1-3.jpg"; // bottom right
import mantis from "../../assets/about1-5.jpg"; // bottom insect (transparent png)

const TITLE_LINES = ["Control serve safe, and pest", "free year-round"];
const TITLE = TITLE_LINES.join(" ");

const FEATURES = [
  {
    title: "Preventive Care",
    text: "strategy designed to stop infestations before",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="32" width="20" height="26" rx="3" />
        <path d="M13 32v-8h10v8M23 24h9l4-5M36 19l3 2" />
        <circle cx="44" cy="44" r="12" />
        <ellipse cx="44" cy="46" rx="3.6" ry="5" />
        <path d="M44 41v10M40 44l-3-2M48 44l3-2M40 48l-3 2M48 48l3 2" />
      </svg>
    ),
  },
  {
    title: "Safe Treatments",
    text: "strategy designed to stop infestations before",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M32 5 54 14v16c0 15-9 23-22 29C19 53 10 45 10 30V14z" />
        <ellipse cx="32" cy="35" rx="7" ry="10" />
        <circle cx="32" cy="22" r="4" />
        <path d="M25 31h-8M25 38h-8M39 31h8M39 38h8M27 27l-5-4M37 27l5-4" />
      </svg>
    ),
  },
];

const Bee = ({ className }) => (
  <svg className={className} viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <ellipse cx="60" cy="86" rx="22" ry="32" />
    <path d="M40 76h40M39 90h42M42 104h36" />
    <circle cx="60" cy="42" r="14" />
    <path d="M52 30 44 12M68 30l8-18" />
    <path d="M40 66C20 62 4 48 8 34c4-12 30-10 42 8M80 66c20-4 36-18 32-32-4-12-30-10-42 8" />
    <path d="M40 98 24 114M80 98l16 16M38 86 18 96M82 86l20 10" />
  </svg>
);

const HomePageThree = () => {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`HomePageThree ${visible ? "HomePageThree--visible" : ""}`}
    >
      <Bee className="HomePageThree__bee HomePageThree__bee--left" />
      <Bee className="HomePageThree__bee HomePageThree__bee--right" />

      <div className="HomePageThree__container">
        {/* ---------- LEFT: images ---------- */}
        <div className="HomePageThree__left">
          <div className="HomePageThree__gallery">
            <div className="HomePageThree__col HomePageThree__col--one">
              <figure className="HomePageThree__frame HomePageThree__frame--tall" style={{ "--d": 0 }}>
                <img src={about1} alt="Pest control expert treating a wooden structure" className="HomePageThree__img" />
              </figure>
            </div>

            <div className="HomePageThree__col HomePageThree__col--two">
              <figure className="HomePageThree__frame" style={{ "--d": 1 }}>
                <img src={about2} alt="Technician spraying garden plants" className="HomePageThree__img" />
              </figure>
              <figure className="HomePageThree__frame" style={{ "--d": 2 }}>
                <img src={about3} alt="Beetle on a green leaf" className="HomePageThree__img" />
              </figure>
            </div>

            {/* Rotating badge */}
            <div className="HomePageThree__badge" aria-label="25 plus years of experience">
              <svg className="HomePageThree__badge-text" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path
                    id="HomePageThree-circle"
                    d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
                  />
                </defs>
                <text>
                  <textPath
                    href="#HomePageThree-circle"
                    startOffset="0"
                    textLength="474"
                    lengthAdjust="spacing"
                  >
                    25+ YEARS OF EXPERIENCE - 25+ YEARS OF EXPERIENCE -
                  </textPath>
                </text>
              </svg>

              <svg className="HomePageThree__badge-bug" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
                <ellipse cx="32" cy="38" rx="11" ry="16" />
                <circle cx="32" cy="19" r="6" />
                <path d="M21 30 8 24M21 40 6 42M22 50 10 58M43 30l13-6M43 40l15 2M42 50l12 8M28 14l-5-7M36 14l5-7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M32 24v28" stroke="#c6f26a" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT: content ---------- */}
        <div className="HomePageThree__right">
          <span className="HomePageThree__tag HomePageThree__reveal" style={{ "--i": 0 }}>
            <i className="HomePageThree__tag-dot" />
            About Us
          </span>

          <h2 className="HomePageThree__title" aria-label={TITLE}>
            {TITLE_LINES.map((line, li) => (
              <span className="HomePageThree__line" key={li} aria-hidden="true">
                {line.split(" ").map((word, wi) => {
                  const idx =
                    TITLE_LINES.slice(0, li).join(" ").split(" ").filter(Boolean).length + wi;
                  return (
                    <React.Fragment key={wi}>
                      <span className="HomePageThree__word">
                        <span className="HomePageThree__word-inner" style={{ "--w": idx }}>
                          {word}
                        </span>
                      </span>{" "}
                    </React.Fragment>
                  );
                })}
              </span>
            ))}
            <span className="HomePageThree__underline" aria-hidden="true" />
          </h2>

          <p className="HomePageThree__text HomePageThree__reveal" style={{ "--i": 2 }}>
            Our pest control services are designed to keep your home or business
            safe, clean, and pest-free throughout every season. Using advanced
            techniques and eco friendly treatments, we effectively eliminate
            pests.
          </p>

          <div className="HomePageThree__features HomePageThree__reveal" style={{ "--i": 3 }}>
            {FEATURES.map((f) => (
              <div className="HomePageThree__feature" key={f.title}>
                <span className="HomePageThree__feature-icon">{f.icon}</span>
                <div className="HomePageThree__feature-body">
                  <h3 className="HomePageThree__feature-title">{f.title}</h3>
                  <p className="HomePageThree__feature-text">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="HomePageThree__actions HomePageThree__reveal" style={{ "--i": 4 }}>
            <a href="/about" className="HomePageThree__btn">
              <span className="HomePageThree__btn-text">About More</span>
            </a>

            <span className="HomePageThree__divider" />

            <a href="tel:+9238008060" className="HomePageThree__call">
              <span className="HomePageThree__call-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2" />
                  <path d="M15 4a5 5 0 0 1 5 5M15 7.5a1.8 1.8 0 0 1 1.8 1.8" />
                </svg>
              </span>
              <span className="HomePageThree__call-info">
                <small className="HomePageThree__call-label">Contact Us:</small>
                <strong className="HomePageThree__call-number">+92 3800 8060</strong>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom insect: walks in, then moves forward and backward */}
      <div className="HomePageThree__insect" aria-hidden="true">
        <img src={mantis} alt="" className="HomePageThree__insect-img" />
      </div>
    </section>
  );
};

export default HomePageThree;