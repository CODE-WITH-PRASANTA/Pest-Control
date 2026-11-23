
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ServiceMain.css";

/* ================= IMAGES ================= */

import img01 from "../../assets/service2-1.jpg";
import img02 from "../../assets/service2-2.jpg";
import img03 from "../../assets/service2-3.jpg";
import img04 from "../../assets/service2-4.jpg";
import img05 from "../../assets/service2-5.jpg";
import img06 from "../../assets/service2-6.webp";
import img07 from "../../assets/service2-7.webp";
import img08 from "../../assets/service2-8.webp";
import img09 from "../../assets/service2-9.webp";
import img10 from "../../assets/service2-10.webp";
import img11 from "../../assets/service2-11.webp";
import img12 from "../../assets/service2-12.webp";
import img13 from "../../assets/service2-13.webp";
import img14 from "../../assets/service2-14.webp";
import img15 from "../../assets/service2-15.webp";
import img16 from "../../assets/service2-16.webp";
import img17 from "../../assets/service2-17.webp";
import img18 from "../../assets/service2-18.webp";
import img19 from "../../assets/service2-19.webp";
import img20 from "../../assets/service2-20.webp";

/* ================= ICONS ================= */

import {
  Bug,
  Rat,
  BedDouble,
  Bird,
  Worm,
  Droplets,
  SprayCan,
  ShieldCheck,
  Sprout,
  Wind,
  Package,
  Hammer,
  TreePine,
  Home,
  Building2,
  ArrowUpRight,
} from "lucide-react";

/* ================= SERVICES ================= */

const services = [
  {
    title: "General Pest Control",
    path: "/general-pest-control",
    icon: ShieldCheck,
    image: img01,
  },
  {
    title: "Cockroach Management Service (CMS)",
    path: "/cockroach-management-service",
    icon: Bug,
    image: img02,
  },
  {
    title: "Rodent Management Service (RMS)",
    path: "/rodent-management-service",
    icon: Rat,
    image: img03,
  },
  {
    title: "Bedbug Management Service (BMS)",
    path: "/bedbug-management-service",
    icon: BedDouble,
    image: img04,
  },
  {
    title: "Mosquito Management Service (MMS)",
    path: "/mosquito-management-service",
    icon: Bug,
    image: img05,
  },
  {
    title: "Disinfection Sanitization Management Service (DSMS)",
    path: "/disinfection-sanitization-management-service",
    icon: SprayCan,
    image: img06,
  },
  {
    title: "Ant Management Service (AMS)",
    path: "/ant-management-service",
    icon: Bug,
    image: img07,
  },
  {
    title: "Termite Management Service (Post Construction)",
    path: "/termite-post-construction",
    icon: Home,
    image: img08,
  },
  {
    title: "Termite Control",
    path: "/termite-control",
    icon: Building2,
    image: img09,
  },
  {
    title: "Snake Control",
    path: "/snake-control",
    icon: Worm,
    image: img10,
  },
  {
    title: "Woodborer Management Service (WMS)",
    path: "/woodborer-management-service",
    icon: Hammer,
    image: img11,
  },
  {
    title: "Fly Management Service (FMS)",
    path: "/fly-management-service",
    icon: Bug,
    image: img12,
  },
  {
    title: "Bird Management Service (BMS)",
    path: "/bird-management-service",
    icon: Bird,
    image: img13,
  },
  {
    title: "Lizard Management Service (LMS)",
    path: "/lizard-management-service",
    icon: Worm,
    image: img14,
  },
  {
    title: "Fogging Service",
    path: "/fogging-service",
    icon: Wind,
    image: img15,
  },
  {
    title: "Larvicide Treatment",
    path: "/larvicide-treatment",
    icon: Droplets,
    image: img16,
  },
  {
    title: "Weed Control",
    path: "/weed-control",
    icon: Sprout,
    image: img17,
  },
  {
    title: "Commodity Pest Management Services (CPMS)",
    path: "/commodity-pest-management-services",
    icon: Package,
    image: img18,
  },
  {
    title: "Spider Management Service (SMS)",
    path: "/spider-management-service",
    icon: TreePine,
    image: img19,
  },
  {
    title: "Wasp Management Service",
    path: "/wasp-management-service",
    icon: Bug,
    image: img20,
  },
].map((s, i) => ({
  ...s,
  id: i + 1,
  backImage: s.backImage || s.image,
}));

/* ================= HEADING ================= */

const HEADING_WORDS = [
  { text: "Our", accent: false },
  { text: "Professional", accent: false },
  { text: "Services", accent: true },
];

/* ================= COMPONENT ================= */

const ServiceMain = () => {
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
      { threshold: 0.05 }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  let letterIndex = 0;

  return (
    <section
      className={`service-main ${
        inView ? "service-main-active" : ""
      }`}
      ref={sectionRef}
    >
      <div className="service-main-glow service-main-glow-one" />
      <div className="service-main-glow service-main-glow-two" />

      <div className="service-main-container">

        {/* SECTION HEADING */}

        <div className="service-main-heading">
          <span className="service-main-subtitle">
            <i className="service-main-subtitle-dot" />
            WHAT WE OFFER
          </span>

          <h2 aria-label="Our Professional Services">
            {HEADING_WORDS.map((word, wi) => (
              <span
                className={`service-main-word ${
                  word.accent
                    ? "service-main-word-accent"
                    : ""
                }`}
                key={wi}
              >
                {word.text.split("").map((ch, ci) => {
                  const delay = letterIndex++ * 0.05;

                  return (
                    <span
                      className="service-main-letter"
                      style={{
                        animationDelay: `${delay}s`,
                      }}
                      key={`${wi}-${ci}`}
                      aria-hidden="true"
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>

          <p>
            Discover our professional pest control solutions
            designed to keep your home and workplace safe.
          </p>
        </div>

        {/* SERVICE CARDS */}

        <div className="service-main-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                className="service-main-card"
                key={service.id}
                tabIndex={0}
                style={{
                  "--card-index": index % 4,
                }}
              >
                {/* NUMBER */}

                <span className="service-main-number">
                  {String(service.id).padStart(2, "0")}
                </span>

                {/* ICON */}

                <div className="service-main-icon">
                  <Icon size={36} strokeWidth={1.5} />
                </div>

                {/* TITLE */}

                <h3>{service.title}</h3>

                {/* IMAGE */}

                <div className="service-main-image-wrapper">
                  <div className="service-main-image-ring" />

                  <div className="service-main-image-inner">

                    <div className="service-main-image-front">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                      />
                    </div>

                    <div className="service-main-image-back">
                      <img
                        src={service.backImage}
                        alt={`${service.title} alternate view`}
                        loading="lazy"
                      />
                    </div>

                  </div>
                </div>

                {/* LEARN MORE - INDIVIDUAL PATH */}

                <Link
                  to={service.path}
                  className="service-main-link"
                  aria-label={`Learn more about ${service.title}`}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "instant",
                    })
                  }
                >
                  <span>Learn More</span>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.2}
                  />
                </Link>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServiceMain;
