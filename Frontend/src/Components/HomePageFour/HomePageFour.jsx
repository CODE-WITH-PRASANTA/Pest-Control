import React, { useEffect, useRef, useState } from "react";
import "./HomePageFour.css";

import service1 from "../../assets/Home-service -1.jpg";
import service2 from "../../assets/Home-service -2.jpg";
import service3 from "../../assets/Home-service -3.jpg";
import service4 from "../../assets/Home-service -4.jpg";

const TEXT =
  "Pest Control service provide comprehensive protection against common household and commercial pests. From ants.";

const SERVICES = [
  {
    title: "General Pest Control",
    text: TEXT,
    image: service1,
    icon: (
      <>
        <circle cx="30" cy="30" r="25" />
        <ellipse cx="30" cy="34" rx="6.5" ry="9" />
        <circle cx="30" cy="22" r="3.6" />
        <path d="M24 30h-8M24 36h-8M36 30h8M36 36h8M26 26l-5-4M34 26l5-4" />
        <path d="m48 48 12 12M52 44l4 4" />
      </>
    ),
  },
  {
    title: "Stored Product Pest Control",
    text: TEXT,
    image: service2,
    icon: (
      <>
        <rect x="8" y="30" width="26" height="30" rx="4" />
        <path d="M14 30v-9h14v9M28 21h12l4-5M44 16l4 2" />
        <circle cx="46" cy="46" r="13" />
        <ellipse cx="46" cy="48" rx="3.6" ry="5" />
        <path d="M46 43v10M42 46l-3-2M50 46l3-2M42 50l-3 2M50 50l3 2" />
      </>
    ),
  },
  {
    title: "Restaurant Pest Solutions",
    text: TEXT,
    image: service3,
    icon: (
      <>
        <path d="M4 32 32 8l28 24M10 28v30h44V28" />
        <circle cx="32" cy="40" r="11" />
        <ellipse cx="32" cy="42" rx="4" ry="5.5" />
        <path d="M32 36v12M28 39l-4-2M36 39l4-2M28 44l-4 2M36 44l4 2" />
      </>
    ),
  },
  {
    title: "Industrial Pest Control",
    text: TEXT,
    image: service4,
    icon: (
      <>
        <circle cx="32" cy="32" r="27" />
        <path d="M13 51 51 13" />
        <ellipse cx="32" cy="36" rx="6.5" ry="9" />
        <circle cx="32" cy="24" r="3.6" />
        <path d="M26 32h-8M26 38h-8M38 32h8M38 38h8M28 28l-5-4M36 28l5-4" />
      </>
    ),
  },
];

const HEADING = ["Expert pest control services", "designed to solve"];

/* Letters drop in one after another */
const DropText = () => {
  let counter = 0;
  return (
    <h2 className="HomePageFour__title" aria-label={HEADING.join(" ")}>
      {HEADING.map((line, li) => (
        <span className="HomePageFour__line" key={li} aria-hidden="true">
          {line.split(" ").map((word, wi) => (
            <React.Fragment key={wi}>
              <span className="HomePageFour__word">
                {word.split("").map((ch, ci) => {
                  const idx = counter++;
                  return (
                    <span
                      className="HomePageFour__letter"
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
  );
};

const HomePageFour = () => {
  const headRef = useRef(null);
  const rowRefs = useRef([]);
  const [headVisible, setHeadVisible] = useState(false);
  const [rowsVisible, setRowsVisible] = useState(() => SERVICES.map(() => false));

  /* heading entrance */
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setHeadVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* row entrance (right content animates in when a row enters the screen) */
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!("IntersectionObserver" in window)) {
      setRowsVisible(SERVICES.map(() => true));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.dataset.index);
            setRowsVisible((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    rows.forEach((row) => obs.observe(row));
    return () => obs.disconnect();
  }, []);

  /* stacking effect: previous row shrinks and dims while the next one covers it */
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const rows = rowRefs.current.filter(Boolean);
      rows.forEach((row, i) => {
        const next = rows[i + 1];
        const isSticky = getComputedStyle(row).position === "sticky";
        if (!next || !isSticky) {
          row.style.setProperty("--p", 0);
          return;
        }
        const stuckTop = parseFloat(getComputedStyle(row).top) || 0;
        const nextTop = next.getBoundingClientRect().top;
        const p = Math.min(Math.max(1 - (nextTop - stuckTop) / row.offsetHeight, 0), 1);
        row.style.setProperty("--p", p.toFixed(3));
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="HomePageFour">
      <div className="HomePageFour__container">
        {/* Heading */}
        <div
          ref={headRef}
          className={`HomePageFour__head ${headVisible ? "HomePageFour__head--visible" : ""}`}
        >
          <span className="HomePageFour__badge">
            <i className="HomePageFour__badge-dot" />
            Service Area
          </span>
          <DropText />
        </div>

        {/* Services */}
        <div className="HomePageFour__list">
          {SERVICES.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => (rowRefs.current[i] = el)}
              data-index={i}
              className={`HomePageFour__row ${rowsVisible[i] ? "HomePageFour__row--in" : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <div className="HomePageFour__row-inner">
                {/* left */}
                <div className="HomePageFour__info">
                  <span className="HomePageFour__icon">
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </span>
                  <h3 className="HomePageFour__service-title">{item.title}</h3>
                </div>

                {/* middle image (side-scrolls on hover) */}
                <div className="HomePageFour__media">
                  <div className="HomePageFour__frame">
                    <img src={item.image} alt={item.title} className="HomePageFour__img" loading="lazy" />
                    <span className="HomePageFour__shine" aria-hidden="true" />
                  </div>
                  <span className="HomePageFour__number">
                    {String(i + 1).padStart(2, "0")}
                    <i className="HomePageFour__number-dot">.</i>
                  </span>
                </div>

                {/* right */}
                <div className="HomePageFour__content">
                  <p className="HomePageFour__text">{item.text}</p>
                  <a href="/services" className="HomePageFour__link">
                    <span className="HomePageFour__link-text">View Details</span>
                    <svg className="HomePageFour__link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageFour;