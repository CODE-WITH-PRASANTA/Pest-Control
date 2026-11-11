import React, { useEffect, useRef } from "react";
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

const HomePageFour = () => {
  const sectionRef = useRef(null);

  /* One observer: anything marked data-reveal fades in once when it enters the screen */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = root.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="HomePageFour" ref={sectionRef}>
      <div className="HomePageFour__container">
        {/* Heading */}
        <header className="HomePageFour__head" data-reveal>
          <span className="HomePageFour__badge">
            <i className="HomePageFour__badge-dot" />
            Service Area
          </span>
          <h2 className="HomePageFour__title">
            Expert pest control services
            <br />
            designed to solve
          </h2>
        </header>

        {/* Services */}
        <div className="HomePageFour__list">
          {SERVICES.map((item, i) => (
            <article className="HomePageFour__row" key={item.title}>
              {/* left */}
              <div className="HomePageFour__info" data-reveal>
                <div className="HomePageFour__info-top">
                  <span className="HomePageFour__icon">
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </svg>
                  </span>
                  <span className="HomePageFour__number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="HomePageFour__service-title">{item.title}</h3>
              </div>

              {/* middle image */}
              <div className="HomePageFour__media" data-reveal>
                <div className="HomePageFour__frame">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="HomePageFour__img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* right */}
              <div className="HomePageFour__content" data-reveal>
                <p className="HomePageFour__text">{item.text}</p>
                <a href="/services" className="HomePageFour__link">
                  <span>View Details</span>
                  <b className="HomePageFour__link-arrow" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </b>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageFour;