import React, { useEffect, useRef, useState } from "react";
import "./HomeWhyChoose.css";

// Update these paths/extensions to match your project
import mainImg from "../../assets/home-why-1.jpg"; // person image (arch shape)
import tankImg from "../../assets/home-why-2.jpg"; // sprayer tank (transparent png)
import insectImg from "../../assets/home-why-3.png"; // bottom insect (transparent png)

const HEADING = ["Why choose our pest control", "services"];

const TEXT =
  "Our team consists of highly experienced and certified technicians who specialize.";

const ITEMS = [
  {
    title: "Experienced Technicians",
    text: TEXT,
    icon: (
      <>
        <circle cx="32" cy="14" r="8" />
        <path d="M32 9v10M28 11l8 6M36 11l-8 6" />
        <circle cx="14" cy="38" r="5" />
        <circle cx="50" cy="38" r="5" />
        <circle cx="32" cy="42" r="5" />
        <path d="M6 56v-6a8 8 0 0 1 16 0v6M42 56v-6a8 8 0 0 1 16 0v6M24 60v-6a8 8 0 0 1 16 0v6" />
      </>
    ),
  },
  {
    title: "Safe & Eco-Friendly",
    text: TEXT,
    icon: (
      <>
        <path d="M5 30 32 8l27 22M11 26v30h42V26" />
        <circle cx="32" cy="40" r="11" />
        <ellipse cx="32" cy="42" rx="4" ry="5.5" />
        <path d="M32 36v12M28 39l-4-2M36 39l4-2M28 44l-4 2M36 44l4 2" />
      </>
    ),
  },
  {
    title: "Comprehensive Solutions",
    text: TEXT,
    icon: (
      <>
        <rect x="16" y="14" width="34" height="44" rx="8" />
        <path d="M24 14v-6h18v6M8 22v28M4 26h8" />
        <circle cx="33" cy="36" r="9" />
        <ellipse cx="33" cy="38" rx="3.2" ry="4.4" />
        <path d="M33 33v10M29 36l-3-2M37 36l3-2M29 40l-3 2M37 40l3 2" />
      </>
    ),
  },
  {
    title: "Residential & Commercial",
    text: TEXT,
    icon: (
      <>
        <circle cx="12" cy="10" r="5" />
        <path d="M8 58V30a4 4 0 0 1 8 0v28M16 34l18 10M34 44l8 4M26 58l8-10" />
        <path d="M44 54v-8M50 54v-12M56 54v-8M42 54h16" />
        <path d="M46 40c0-4 2-6 4-6s4 2 4 6" />
      </>
    ),
  },
];

const HomeWhyChoose = () => {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let counter = 0;

  return (
    <section
      ref={ref}
      className={`HomeWhyChoose ${visible ? "HomeWhyChoose--visible" : ""}`}
    >
      {/* decorative beetle outline */}
      <svg className="HomeWhyChoose__beetle" viewBox="0 0 140 220" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
        <ellipse cx="70" cy="132" rx="38" ry="64" />
        <path d="M70 70v126" />
        <ellipse cx="70" cy="48" rx="20" ry="22" />
        <path d="M60 30 46 6M80 30 94 6" />
        <path d="M34 110 8 98M32 140 4 142M38 170 16 192M106 110l26-12M108 140l28 2M102 170l22 22" />
      </svg>

      {/* clip path for the arch image */}
      <svg width="0" height="0" className="HomeWhyChoose__defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="HomeWhyChoose-arch" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.5 C0,0.22 0.2,0 0.5,0 C0.8,0 1,0.22 1,0.52 C1,0.8 0.86,1 0.68,1 C0.56,1 0.5,0.88 0.5,0.7 C0.5,0.9 0.42,1 0.3,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="HomeWhyChoose__container">
        {/* ---------- Header ---------- */}
        <div className="HomeWhyChoose__head">
          <div className="HomeWhyChoose__head-left">
            <span className="HomeWhyChoose__badge">
              <i className="HomeWhyChoose__badge-dot" />
              Why Choose Us
            </span>

            <h2 className="HomeWhyChoose__title" aria-label={HEADING.join(" ")}>
              {HEADING.map((line, li) => (
                <span className="HomeWhyChoose__line" key={li} aria-hidden="true">
                  {line.split(" ").map((word, wi) => (
                    <React.Fragment key={wi}>
                      <span className="HomeWhyChoose__word">
                        {word.split("").map((ch, ci) => {
                          const idx = counter++;
                          return (
                            <span
                              className="HomeWhyChoose__letter"
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

          <p className="HomeWhyChoose__intro HomeWhyChoose__reveal" style={{ "--i": 0 }}>
            We combine advanced pest management techniques with eco-friendly
            treatments to effectively eliminate pests while ensuring the safety
            of your family, employees, and pets. Our team of certified
          </p>
        </div>

        {/* ---------- Body ---------- */}
        <div className="HomeWhyChoose__body">
          {/* left: image + tank */}
          <div className="HomeWhyChoose__left">
            <div className="HomeWhyChoose__media">
              <div className="HomeWhyChoose__arch">
                <img src={mainImg} alt="Pest control technician in protective suit" className="HomeWhyChoose__img" />
              </div>

              <div className="HomeWhyChoose__tank" aria-hidden="true">
                <img src={tankImg} alt="" className="HomeWhyChoose__tank-img" />
              </div>
            </div>
          </div>

          {/* right: list */}
          <div className="HomeWhyChoose__right">
            <div className="HomeWhyChoose__card">
              {ITEMS.map((item, i) => (
                <div
                  className="HomeWhyChoose__item HomeWhyChoose__reveal"
                  style={{ "--i": i + 1 }}
                  key={item.title}
                  tabIndex={0}
                >
                  <span className="HomeWhyChoose__icon">
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </span>
                  <div className="HomeWhyChoose__item-body">
                    <h3 className="HomeWhyChoose__item-title">{item.title}</h3>
                    <p className="HomeWhyChoose__item-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom insect: moves forward and backward in place */}
      <div className="HomeWhyChoose__insect" aria-hidden="true">
        <img src={insectImg} alt="" className="HomeWhyChoose__insect-img" />
      </div>
    </section>
  );
};

export default HomeWhyChoose;