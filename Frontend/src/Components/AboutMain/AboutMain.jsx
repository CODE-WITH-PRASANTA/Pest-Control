import React, { useEffect, useRef, useState } from "react";
import "./AboutMain.css";

// Update these paths to match your project structure
import aboutImg1 from "../../assets/About-us-1.jpg"; // person with sprayer
import aboutImg2 from "../../assets/shape-20.png"; // hanging bottle sprayer
import aboutImg3 from "../../assets/about1-3.jpg"; // video thumbnail (bug)

const MissionIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 30 32 8l26 22" />
    <path d="M12 26v30h40V26" />
    <circle cx="32" cy="38" r="9" />
    <path d="M32 31v14M26 34l12 8M38 34 26 42M29 29l-2-3M35 29l2-3" />
  </svg>
);

const VisionIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 6v18M6 10h8M22 14v10" />
    <rect x="22" y="24" width="34" height="34" rx="8" />
    <path d="M30 24v-6h18v6" />
    <circle cx="39" cy="41" r="8" />
    <path d="M39 35v12M34 38l10 6M44 38l-10 6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

const TITLE_LINES = ["A proactive preventive pest", "management approach"];
const TITLE = TITLE_LINES.join(" ");

const AboutMain = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`AboutMain ${visible ? "AboutMain--visible" : ""}`}
    >
      <div className="AboutMain__container">
        {/* LEFT */}
        <div className="AboutMain__left">
          <div className="AboutMain__media">
            <div className="AboutMain__photo">
              <img
                src={aboutImg1}
                alt="Pest control expert in protective suit"
                className="AboutMain__photo-img"
              />
            </div>

            <div className="AboutMain__hang" aria-hidden="true">
              <span className="AboutMain__rope" />
              <span className="AboutMain__hook" />
              <img
                src={aboutImg2}
                alt=""
                className="AboutMain__bottle"
              />
            </div>

            <span className="AboutMain__glow" aria-hidden="true" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="AboutMain__right">
          <span className="AboutMain__badge AboutMain__reveal" style={{ "--i": 0 }}>
            <i className="AboutMain__badge-dot" />
            About Us
          </span>

          <h2 className="AboutMain__title" aria-label={TITLE}>
            {TITLE_LINES.map((line, li) => (
              <span className="AboutMain__line" key={li} aria-hidden="true">
                {line.split(" ").map((word, wi) => {
                  const idx = TITLE_LINES.slice(0, li).join(" ").split(" ").filter(Boolean).length + wi;
                  return (
                    <React.Fragment key={wi}>
                      <span className="AboutMain__word">
                        <span className="AboutMain__word-inner" style={{ "--w": idx }}>
                          {word}
                        </span>
                      </span>{" "}
                    </React.Fragment>
                  );
                })}
              </span>
            ))}
            <span className="AboutMain__underline" aria-hidden="true" />
          </h2>

          <p className="AboutMain__text AboutMain__reveal" style={{ "--i": 2 }}>
            Our pest control strategy is built on prevention first, ensuring
            that potential pest problems are addressed before they turn into
            serious infestations. Instead of simply reacting to visible issues,
            we take a proactive.
          </p>

          <div className="AboutMain__row">
            <div className="AboutMain__points">
              <div className="AboutMain__point AboutMain__reveal" style={{ "--i": 3 }}>
                <div className="AboutMain__point-icon">
                  <MissionIcon />
                </div>
                <div className="AboutMain__point-body">
                  <h3 className="AboutMain__point-title">Our Mission</h3>
                  <p className="AboutMain__point-text">
                    To empower organizations to unlock their greatest potential
                    by transforming their human
                  </p>
                </div>
              </div>

              <div className="AboutMain__point AboutMain__reveal" style={{ "--i": 4 }}>
                <div className="AboutMain__point-icon">
                  <VisionIcon />
                </div>
                <div className="AboutMain__point-body">
                  <h3 className="AboutMain__point-title">Our Vision</h3>
                  <p className="AboutMain__point-text">
                    To redefine the future of work by creating a world where
                    every organization recognizes
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="AboutMain__video AboutMain__reveal"
              style={{ "--i": 5 }}
              aria-label="Play video"
            >
              <img src={aboutImg3} alt="" className="AboutMain__video-img" />
              <span className="AboutMain__play">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>

          <div className="AboutMain__actions AboutMain__reveal" style={{ "--i": 6 }}>
            <a href="/about" className="AboutMain__btn">
              <span className="AboutMain__btn-text">Read More</span>
            </a>

            <span className="AboutMain__divider" />

            <a href="tel:+8801750050088" className="AboutMain__call">
              <span className="AboutMain__call-icon">
                <PhoneIcon />
              </span>
              <span className="AboutMain__call-info">
                <small className="AboutMain__call-label">Call Anytime</small>
                <strong className="AboutMain__call-number">+88 017 500 500 88</strong>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMain;