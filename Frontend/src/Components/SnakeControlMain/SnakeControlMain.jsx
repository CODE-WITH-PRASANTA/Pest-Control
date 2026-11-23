import { useEffect, useRef, useState } from "react";
import "./SnakeControlMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Snake Inspection",
    heading: "Detailed Snake Inspection Services",
    image: serviceone,
    description:
      "Identify sheltering spots, entry gaps, shed skins, burrows and attraction zones around your property with a thorough inspection.",
  },
  {
    title: "Snake Removal & Control",
    heading: "Safe & Professional Snake Control Solutions",
    image: service,
    description:
      "Manage snake sightings and presence around homes and compounds with careful response, exclusion measures and tailored control.",
  },
  {
    title: "Perimeter & Entry Exclusion",
    heading: "Targeted Perimeter & Entry Exclusion",
    image: servicetwo,
    description:
      "Address gaps under doors, drainage lines, utility openings, garden walls, woodpiles and dense vegetation where snakes move.",
  },
  {
    title: "Residential & Commercial Sites",
    heading: "Snake Control for Homes & Businesses",
    image: service,
    description:
      "Customized snake management plans for houses, farmhouses, apartments, warehouses, factories and commercial grounds.",
  },
  {
    title: "Preventive Snake Management",
    heading: "Ongoing Snake Prevention & Site Readiness",
    image: serviceone,
    description:
      "Reduce repeat snake visits with practical yard and storage guidance, rodent reduction tips and scheduled follow-up checks.",
  },
];

const faqs = [
  {
    question: "What does your snake control service include?",
    answer:
      "Our service includes property inspection, identifying likely hiding and entry points, targeted control or exclusion measures and practical advice to make your surroundings less inviting to snakes.",
  },
  {
    question: "What should I do if I spot a snake on my property?",
    answer:
      "Keep a safe distance, keep children and pets indoors or away from the area, avoid trying to handle or provoke the snake, and contact our team or local wildlife/rescue support as appropriate.",
  },
  {
    question: "How can I prevent snakes from entering my home or yard?",
    answer:
      "Sealing gaps around doors and pipes, trimming overgrown grass and bushes, clearing debris or woodpiles near walls, and controlling rodents all help reduce snake shelter and food sources.",
  },
  {
    question: "How long does a snake inspection and control visit take?",
    answer:
      "Visit duration depends on property size, outdoor landscaping and whether immediate response or perimeter exclusion planning is needed. Your technician will give you an estimated time on site.",
  },
  {
    question: "Do you provide snake control for both homes and commercial properties?",
    answer:
      "Yes. We support residential homes, compounds, offices, warehouses, construction sites and commercial facilities.",
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 3h4l2 5-3 2a16 16 0 006 6l2-3 5 2v4c0 1-1 2-2 2C10 20 4 14 3 5c0-1 1-2 2-2Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PdfIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 2h8l5 5v14H6a2 2 0 01-2-2V4a2 2 0 012-2Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M14 2v5h5M8 16h2a1.5 1.5 0 000-3H8v5m5-5v5h1a2.5 2.5 0 000-5h-1m5 0h3m-3 0v5m0-2h2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SnakeControlMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".snake-control-main-reveal");

    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="snake-control-main" ref={rootRef}>
      <div className="snake-control-main-glow snake-control-main-glow-one" />
      <div className="snake-control-main-glow snake-control-main-glow-two" />

      <div className="snake-control-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="snake-control-main-sidebar">
          <div className="snake-control-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`snake-control-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="snake-control-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="snake-control-main-menu-title">
                  {srv.title}
                </span>

                <span className="snake-control-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="snake-control-main-contact-card">
            <div className="snake-control-main-contact-decoration snake-control-main-contact-decoration-one" />
            <div className="snake-control-main-contact-decoration snake-control-main-contact-decoration-two" />

            <div className="snake-control-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="snake-control-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="snake-control-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="snake-control-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="snake-control-main-content">
          {/* HERO SECTION */}
          <div
            className={`snake-control-main-hero ${
              imageFailed ? "snake-control-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="snake-control-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="snake-control-main-hero-overlay" />

            <span className="snake-control-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="snake-control-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="snake-control-main-hero-label">
                PROFESSIONAL SNAKE CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="snake-control-main-overview snake-control-main-reveal">
            <span className="snake-control-main-section-subtitle">
              ABOUT SNAKE CONTROL
            </span>

            <h2>Snake Control Overview</h2>

            <p>
              Snakes often seek cool, shaded shelter or prey such as rodents
              around yards, drains, stored materials, utility openings and
              ground-level structures. Our team inspects vulnerable zones,
              identifies entry pathways and helps put practical snake control
              and exclusion measures in place.
            </p>

            <p>
              Every property has different surrounding conditions. We evaluate
              landscaping, structural gaps, moisture areas and attractants
              before recommending a tailored prevention plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="snake-control-main-comprehensive snake-control-main-reveal">
            <span className="snake-control-main-section-subtitle">
              TARGETED SNAKE CONTROL
            </span>

            <h2>Complete Snake Control Solutions</h2>

            <p>
              From residential homes and gardens to commercial compounds, we
              offer practical snake control tailored to site conditions and
              safety requirements.
            </p>

            <div className="snake-control-main-image-grid">
              <div className="snake-control-main-image-card">
                <div className="snake-control-main-image-wrap">
                  <img src={serviceone} alt="Snake inspection" />
                  <span className="snake-control-main-image-number">01</span>
                </div>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to spot shelter zones, entry gaps and
                  potential attractants around your property.
                </p>
              </div>

              <div className="snake-control-main-image-card">
                <div className="snake-control-main-image-wrap">
                  <img src={servicetwo} alt="Snake control and exclusion" />
                  <span className="snake-control-main-image-number">02</span>
                </div>

                <h3>Targeted Control</h3>

                <p>
                  Targeted control and exclusion measures designed to reduce
                  intrusion risks safely and effectively.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="snake-control-main-faq snake-control-main-reveal">
            <span className="snake-control-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="snake-control-main-faq-intro">
              Find answers to common questions about our snake inspection,
              control and prevention services.
            </p>

            <div className="snake-control-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`snake-control-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="snake-control-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="snake-control-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="snake-control-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="snake-control-main-bottom-cta snake-control-main-reveal">
            <div>
              <span>KEEP YOUR PROPERTY SAFER</span>

              <h2>Need Professional Snake Control?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="snake-control-main-cta-button"
            >
              Contact Us
              <ArrowIcon />
            </a>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SnakeControlMain;