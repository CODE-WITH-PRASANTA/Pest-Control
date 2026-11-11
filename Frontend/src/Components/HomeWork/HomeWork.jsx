import React, { useEffect, useRef, useState } from "react";
import "./HomeWork.css";
import aboutImg from "../../assets/shape-13.png";
import logo1 from "../../assets/TeamMember-1.jpg";
import logo2 from "../../assets/TeamMember-2.jpg";
import logo3 from "../../assets/TeamMember-3.jpg";
import logo4 from "../../assets/TeamMember-4.jpg";

const HEADING = "Our step-by-step insect control process designed";

const STEPS = [
  {
    id: "01",
    title: "Site Inspection",
    text: "Our process begins with a comprehensive inspection of your property to identify the type of pests, the extent.",
  },
  {
    id: "02",
    title: "Pest Assessment",
    text: "Our process begins with a comprehensive inspection of your property to identify the type of pests, the extent.",
  },
  {
    id: "03",
    title: "Pest Elimination",
    text: "Our process begins with a comprehensive inspection of your property to identify the type of pests, the extent.",
  },
];

const AVATARS = [logo1, logo2, logo3, logo4];

const BugIcon = () => (
  <svg
    className="HomeWork-bug"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="50" cy="60" rx="19" ry="26" />
    <circle cx="50" cy="28" r="9" />
    <path d="M50 34v52" />
    <path d="M45 21c-4-8-10-12-16-13M55 21c4-8 10-12 16-13" />
    <path d="M32 50L12 42M31 62L8 62M34 75L14 88" />
    <path d="M68 50l20-8M69 62l23 0M66 75l20 13" />
  </svg>
);

const HomeWork = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split heading into words -> letters (keeps words from breaking mid-word)
  let letterIndex = 0;
  const words = HEADING.split(" ");

  return (
    <section
      ref={sectionRef}
      className={`HomeWork ${visible ? "HomeWork-visible" : ""}`}
    >
      <div className="HomeWork-container">
        {/* Header */}
        <div className="HomeWork-header">
          <span className="HomeWork-badge">
            <span className="HomeWork-badge-dot" />
            How It Works
          </span>

          <h2 className="HomeWork-title" aria-label={HEADING}>
            {words.map((word, wi) => (
              <React.Fragment key={wi}>
                <span className="HomeWork-word" aria-hidden="true">
                  {[...word].map((ch, ci) => {
                    const i = letterIndex++;
                    return (
                      <span
                        key={ci}
                        className="HomeWork-letter"
                        style={{ "--i": i }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>{" "}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Step cards */}
        <div className="HomeWork-cards">
          {STEPS.map((step, idx) => (
            <article
              key={step.id}
              className="HomeWork-card"
              style={{ "--c": idx }}
            >
              <span className="HomeWork-card-glow" />
              <BugIcon />
              <div className="HomeWork-number">{step.id}</div>
              <h3 className="HomeWork-card-title">{step.title}</h3>
              <p className="HomeWork-card-text">{step.text}</p>
            </article>
          ))}
        </div>

        {/* CTA bar */}
        <div className="HomeWork-cta">
          <div className="HomeWork-avatars">
            {AVATARS.map((src, n) => (
              <img
                key={n}
                src={src}
                alt={`Team member ${n + 1}`}
                className="HomeWork-avatar"
                loading="lazy"
              />
            ))}
          </div>

          <p className="HomeWork-cta-text">
            Ready to Transform Your Lawn Into a Beautiful Outdoor Space?
          </p>

          <div className="HomeWork-cta-media">
            <img
              src={aboutImg}
              alt="Pest control team at work"
              className="HomeWork-cta-image"
              loading="lazy"
            />
          </div>

          <a href="/contact" className="HomeWork-button">
            <span>Get In Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeWork;