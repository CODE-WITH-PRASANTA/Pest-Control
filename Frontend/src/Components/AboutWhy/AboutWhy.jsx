import React, { useEffect, useRef, useState } from "react";
import "./AboutWhy.css";
import aboutImg from "../../assets/AboutWhy.png"; // adjust path if needed
import logoImg from "../../assets/TeamMember-1.jpg"; // adjust path if needed

const HEADING_LINES = ["Experience the difference", "inpest control"];

const HouseBugIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 30 32 8l26 22" />
    <path d="M12 26v28h40V26" />
    <path d="M8 54h48" />
    <circle cx="32" cy="36" r="10" />
    <ellipse cx="32" cy="37" rx="3.6" ry="5" />
    <path d="M32 32v10M28.5 33l-3-2M35.5 33l3-2M28.5 40l-3 2M35.5 40l3 2" />
  </svg>
);

const BugIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="32" cy="28" rx="6" ry="9" />
    <rect x="29" y="14" width="6" height="7" rx="3" />
    <path d="M29 14l-4-6M35 14l4-6" />
    <path d="M26 24c-6-6-14-4-16 0 3 4 10 5 16 1M38 24c6-6 14-4 16 0-3 4-10 5-16 1" />
    <path d="M26 32c-5 3-8 8-8 12M38 32c4 2 6 5 7 8" />
    <circle cx="44" cy="48" r="7" />
    <path d="M41.5 45.5l5 5M46.5 45.5l-5 5" />
  </svg>
);

const WorkerIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 18a10 10 0 0 1 20 0" />
    <path d="M18 18h28" />
    <circle cx="32" cy="24" r="5" />
    <path d="M14 56V40a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v16" />
    <path d="M14 46h-4M10 42v8" />
    <circle cx="50" cy="48" r="8" />
    <path d="M47 45l6 6M53 45l-6 6" />
  </svg>
);

const SprayerIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="16" y="22" width="26" height="34" rx="6" />
    <path d="M24 22v-6h10v6" />
    <path d="M24 16c0-4 3-6 8-6h10" />
    <path d="M46 14v6c4 0 6 3 6 8v20c0 3-2 5-5 5h-5" />
    <path d="M10 32v14" />
    <ellipse cx="29" cy="40" rx="4" ry="5" />
    <path d="M25 36l-3-2M33 36l3-2M25 44l-3 2M33 44l3 2" />
  </svg>
);

const FEATURES = [
  { id: 1, title: "Experienced & Skilled", text: "Team of dedicated professionals works tirelessly to deliver exceptional results.", Icon: HouseBugIcon, side: "left" },
  { id: 2, title: "Guaranteed Customer", text: "Team of dedicated professionals works tirelessly to deliver exceptional results.", Icon: BugIcon, side: "right" },
  { id: 3, title: "Pest Solutions", text: "Team of dedicated professionals works tirelessly to deliver exceptional results.", Icon: WorkerIcon, side: "left" },
  { id: 4, title: "Preventive Care", text: "Team of dedicated professionals works tirelessly to deliver exceptional results.", Icon: SprayerIcon, side: "right" },
];

const CurvedArrow = ({ flip }) => (
  <svg
    className={`AboutWhy__arrow ${flip ? "AboutWhy__arrow--right" : "AboutWhy__arrow--left"}`}
    viewBox="0 0 160 70"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M150 28C138 6 100 -2 72 14c-10 6-14 16-6 20 8 3 14-5 8-11-4-4-12-2-18 4L24 52" />
    <path d="M22 36l2 18 18-6" />
  </svg>
);

const AboutWhy = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let letterIndex = 0;

  const renderHeading = () =>
    HEADING_LINES.map((line, li) => (
      <span className="AboutWhy__line" key={li}>
        {line.split(" ").map((word, wi) => (
          <span className="AboutWhy__word" key={wi}>
            {word.split("").map((ch) => {
              const delay = letterIndex++ * 0.045;
              return (
                <span
                  className="AboutWhy__letter"
                  style={{ animationDelay: `${delay}s` }}
                  key={letterIndex}
                  aria-hidden="true"
                >
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    ));

  const left = FEATURES.filter((f) => f.side === "left");
  const right = FEATURES.filter((f) => f.side === "right");

  const renderFeature = (f, i) => (
    <div
      className={`AboutWhy__item AboutWhy__item--${f.side}`}
      style={{ transitionDelay: `${0.9 + i * 0.15}s` }}
      key={f.id}
    >
      <div className="AboutWhy__itemContent">
        <h3 className="AboutWhy__itemTitle">{f.title}</h3>
        <p className="AboutWhy__itemText">{f.text}</p>
      </div>
      <div className="AboutWhy__iconWrap">
        <f.Icon />
      </div>
    </div>
  );

  return (
    <section className={`AboutWhy ${inView ? "AboutWhy--active" : ""}`} ref={sectionRef}>
      <div className="AboutWhy__glow" />

      <svg className="AboutWhy__bug" viewBox="0 0 200 320" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <ellipse cx="100" cy="170" rx="46" ry="110" transform="rotate(25 100 170)" />
        <path d="M100 70c-20-10-24-40-10-52M110 66c18-10 30-30 22-50" />
        <ellipse cx="108" cy="82" rx="22" ry="18" transform="rotate(25 108 82)" />
        <path d="M70 130c-24-6-44-2-60 16M64 170c-26 4-44 20-52 40M80 210c-18 14-26 32-26 56M138 120c28-14 48-10 58 6M146 168c26 2 42 12 50 30M130 214c18 14 24 30 24 50" />
      </svg>

      <div className="AboutWhy__container">
        <div className="AboutWhy__head">
          <span className="AboutWhy__tag">
            <i className="AboutWhy__tagDot" />
            Why Choose Us
          </span>

          <h2 className="AboutWhy__title" aria-label={HEADING_LINES.join(" ")}>
            {renderHeading()}
          </h2>
        </div>

        <div className="AboutWhy__body">
          <div className="AboutWhy__col AboutWhy__col--left">
            <CurvedArrow />
            {left.map(renderFeature)}
          </div>

          <div className="AboutWhy__imageWrap">
            <div className="AboutWhy__imageRing" />
            <img className="AboutWhy__image" src={aboutImg} alt="Professional pest control expert" loading="lazy" />
          </div>

          <div className="AboutWhy__col AboutWhy__col--right">
            <CurvedArrow flip />
            {right.map((f, i) => renderFeature(f, i + 1))}
          </div>
        </div>

        <div className="AboutWhy__cta">
          <div className="AboutWhy__ctaAvatars">
            <img className="AboutWhy__ctaLogo" src={logoImg} alt="Company logo" />
            <span className="AboutWhy__ctaPhone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
              </svg>
            </span>
          </div>
          <p className="AboutWhy__ctaText">
            Let&rsquo;s make something great work together.
            <a className="AboutWhy__ctaLink" href="/services">View All Services</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutWhy;