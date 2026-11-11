import React, { useEffect, useRef, useState } from "react";
import "./ServiceMain.css";

import serviceone from "../../assets/service2-1.jpg";
import servicetwo from "../../assets/service2-2.jpg";
import servicethree from "../../assets/service2-3.jpg";
import servicefour from "../../assets/service2-4.jpg";
import servicefive from "../../assets/service2-5.jpg";
import servicesix from "../../assets/service2-3.jpg"; // change to your 6th image if you have one

import {
  House,
  Monitor,
  ShieldCheck,
  Leaf,
  SprayCan,
  Building2,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Wasp Removal Services",
    icon: House,
    image: serviceone,
    backImage: serviceone,
  },
  {
    id: 2,
    title: "Termite Treatment Solutions",
    icon: SprayCan,
    image: servicetwo,
    backImage: servicetwo,
  },
  {
    id: 3,
    title: "Mosquito Control Services",
    icon: Monitor,
    image: servicethree,
    backImage: servicethree,
  },
  {
    id: 4,
    title: "Mobility Assistance Services",
    icon: Leaf,
    image: servicefour,
    backImage: servicefour,
  },
  {
    id: 5,
    title: "Commercial Pest Solutions",
    icon: Building2,
    image: servicefive,
    backImage: servicefive,
  },
  {
    id: 6,
    title: "Residential Pest Treatment",
    icon: ShieldCheck,
    image: servicesix,
    backImage: servicesix,
  },
];

const HEADING_WORDS = [
  { text: "Our", accent: false },
  { text: "Professional", accent: false },
  { text: "Services", accent: true },
];

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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let letterIndex = 0;

  return (
    <section
      className={`service-main ${inView ? "service-main-active" : ""}`}
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
                  word.accent ? "service-main-word-accent" : ""
                }`}
                key={wi}
              >
                {word.text.split("").map((ch) => {
                  const delay = letterIndex++ * 0.05;
                  return (
                    <span
                      className="service-main-letter"
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
          </h2>

          <p>
            Discover our professional pest control solutions designed to keep
            your home and workplace safe.
          </p>
        </div>

        {/* SIX SERVICE CARDS */}
        <div className="service-main-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                className="service-main-card"
                key={service.id}
                tabIndex={0}
                style={{ "--card-index": index }}
              >
                <span className="service-main-number">
                  {String(service.id).padStart(2, "0")}
                </span>

                {/* ICON */}
                <div className="service-main-icon">
                  <Icon size={42} strokeWidth={1.5} />
                </div>

                {/* TITLE */}
                <h3>{service.title}</h3>

                {/* CLOVER IMAGE FRAME */}
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

                {/* LEARN MORE */}
                <a
                  href="#service-main"
                  className="service-main-link"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`Learn more about ${service.title}`}
                >
                  <span>Learn More</span>
                  <ArrowUpRight size={18} strokeWidth={2.2} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceMain;