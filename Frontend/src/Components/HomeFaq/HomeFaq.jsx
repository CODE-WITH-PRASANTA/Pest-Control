import React, { useEffect, useRef, useState } from "react";
import "./HomeFaq.css";

// Update this path/extension to match your project
import faqImg from "../../assets/faq1-1.jpg";

const HEADING = ["Frequently Asked", "Questions"];

const FAQS = [
  {
    q: "How long does the treatment process take?",
    a: "Most treatments take between one and three hours, depending on the size of your property and the type of pest. We will give you a clear time estimate before we begin.",
  },
  {
    q: "How often should pest control services be scheduled?",
    a: "The ideal frequency for pest control services depends on the type of property, the level of infestation, and the surrounding environment.",
  },
  {
    q: "Do you offer emergency pest control services?",
    a: "Yes. We offer fast-response emergency visits for urgent infestations, so our technicians can reach you quickly when you need us most.",
  },
  {
    q: "Will I need to leave my home during treatment?",
    a: "In most cases you can stay at home. If a treatment needs you to step out, we will tell you how long and how to prepare.",
  },
  {
    q: "How soon will I see results after treatment?",
    a: "You will usually notice a clear drop in pest activity within a few days, with full results in one to two weeks depending on the pest.",
  },
];

const HomeFaq = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let counter = 0;

  return (
    <section ref={ref} className={`HomeFaq ${visible ? "HomeFaq--visible" : ""}`}>
      {/* clip path for the two-lobe image */}
      <svg width="0" height="0" className="HomeFaq__defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="HomeFaq-shape" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.3 C0.5,0.12 0.38,0 0.25,0 C0.11,0 0,0.22 0,0.5 C0,0.78 0.09,1 0.2,1 L0.8,1 C0.92,1 1,0.78 1,0.55 L1,0 L0.75,0 C0.62,0 0.5,0.12 0.5,0.3 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="HomeFaq__container">
        <span className="HomeFaq__divider" aria-hidden="true">
          <i className="HomeFaq__divider-fill" />
        </span>

        {/* ---------- LEFT ---------- */}
        <div className="HomeFaq__left">
          <span className="HomeFaq__badge">
            <i className="HomeFaq__badge-dot" />
            Faq
          </span>

          <h2 className="HomeFaq__title" aria-label={HEADING.join(" ")}>
            {HEADING.map((line, li) => (
              <span className="HomeFaq__line" key={li} aria-hidden="true">
                {line.split(" ").map((word, wi) => (
                  <React.Fragment key={wi}>
                    <span className="HomeFaq__word">
                      {word.split("").map((ch, ci) => {
                        const idx = counter++;
                        return (
                          <span
                            className="HomeFaq__letter"
                            style={{ "--l": idx }}
                            key={ci}
                          >
                            {ch}
                          </span>
                        );
                      })}
                    </span>{" "}
                  </React.Fragment>
                ))}
              </span>
            ))}
          </h2>

          <div className="HomeFaq__media">
            <span className="HomeFaq__glow" aria-hidden="true" />
            <div className="HomeFaq__shape">
              <img src={faqImg} alt="Technician fogging a garden for pest control" className="HomeFaq__img" />
            </div>
          </div>

          <div className="HomeFaq__ask">
            <p className="HomeFaq__ask-text">Have Any Question on Your Minds?</p>
            <a href="/contact" className="HomeFaq__btn">
              <span className="HomeFaq__btn-text">Get In Touch</span>
            </a>
          </div>
        </div>

        {/* ---------- RIGHT ---------- */}
        <div className="HomeFaq__right">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                className={`HomeFaq__item ${isOpen ? "HomeFaq__item--open" : ""}`}
                style={{ "--i": i }}
                key={item.q}
              >
                <button
                  type="button"
                  className="HomeFaq__question"
                  aria-expanded={isOpen}
                  aria-controls={`HomeFaq-panel-${i}`}
                  id={`HomeFaq-button-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="HomeFaq__question-text">{item.q}</span>
                  <span className="HomeFaq__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <div
                  className="HomeFaq__panel"
                  id={`HomeFaq-panel-${i}`}
                  role="region"
                  aria-labelledby={`HomeFaq-button-${i}`}
                >
                  <div className="HomeFaq__panel-inner">
                    <p className="HomeFaq__answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;