import React, { useEffect, useRef, useState } from "react";
import "./HomeSaftey.css";

// Update these paths/extensions to match your project
import pest1 from "../../assets/feature1-1.png"; // cockroach
import pest2 from "../../assets/feature1-2.png"; // scarab beetle
import pest3 from "../../assets/feature1-3.png"; // bed bug
import pest4 from "../../assets/feature1-4.png"; // spider
import insect from "../../assets/shape-12.png"; // bottom insect (transparent png)

const HEADING = ["Ensuring safety for your", "home and family"];

const TEXT = "Cockroaches are common, resilient pests that can spread.";

const PESTS = [
  { title: "Cockroaches", text: TEXT, image: pest1 },
  { title: "scarab beetle", text: TEXT, image: pest2 },
  { title: "Bed Bugs", text: TEXT, image: pest3 },
  { title: "Spiders", text: TEXT, image: pest4 },
];

const HomeSaftey = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
    <section
      ref={ref}
      className={`HomeSaftey ${visible ? "HomeSaftey--visible" : ""}`}
    >
      {/* decorative bee outline */}
      <svg className="HomeSaftey__bee" viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
        <ellipse cx="60" cy="86" rx="22" ry="32" />
        <path d="M40 76h40M39 90h42M42 104h36" />
        <circle cx="60" cy="42" r="14" />
        <path d="M52 30 44 12M68 30l8-18" />
        <path d="M40 66C20 62 4 48 8 34c4-12 30-10 42 8M80 66c20-4 36-18 32-32-4-12-30-10-42 8" />
        <path d="M40 98 24 114M80 98l16 16M38 86 18 96M82 86l20 10" />
      </svg>

      <div className="HomeSaftey__container">
        {/* ---------- Heading ---------- */}
        <div className="HomeSaftey__head">
          <span className="HomeSaftey__badge">
            <i className="HomeSaftey__badge-dot" />
            Protected / Safety
          </span>

          <h2 className="HomeSaftey__title" aria-label={HEADING.join(" ")}>
            {HEADING.map((line, li) => (
              <span className="HomeSaftey__line" key={li} aria-hidden="true">
                {line.split(" ").map((word, wi) => (
                  <React.Fragment key={wi}>
                    <span className="HomeSaftey__word">
                      {word.split("").map((ch, ci) => {
                        const idx = counter++;
                        return (
                          <span
                            className="HomeSaftey__letter"
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
        </div>

        {/* ---------- Cards ---------- */}
        <div className="HomeSaftey__grid">
          {PESTS.map((p, i) => (
            <article
              className="HomeSaftey__card"
              style={{ "--i": i }}
              key={p.title}
              tabIndex={0}
            >
              <div className="HomeSaftey__circle">
                <div className="HomeSaftey__figure">
                  <img src={p.image} alt={p.title} className="HomeSaftey__img" loading="lazy" />
                </div>
                <span className="HomeSaftey__strike" aria-hidden="true" />
              </div>

              <h3 className="HomeSaftey__card-title">{p.title}</h3>
              <p className="HomeSaftey__card-text">{p.text}</p>
            </article>
          ))}
        </div>
      </div>

      {/* bottom insect: walks in, then moves forward and backward in place */}
      <div className="HomeSaftey__insect" aria-hidden="true">
        <img src={insect} alt="" className="HomeSaftey__insect-img" />
      </div>
    </section>
  );
};

export default HomeSaftey;