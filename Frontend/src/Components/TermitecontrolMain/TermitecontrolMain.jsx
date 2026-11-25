import React, { useEffect, useRef, useState } from "react";
import "./TermitecontrolMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Inspection & Detection",
    subtitle: "COLONY & ENTRY POINT AUDIT",
    heading: "Detailed Termite Inspection & Detection",
    image: serviceone,
    description:
      "Identifying termite colonies, mud tubes, entry points, and the extent of infestation across wooden structures and foundations.",
  },
  {
    title: "Soil & Wood Treatment",
    subtitle: "ECO-FRIENDLY PROTECTIVE BARRIERS",
    heading: "Professional Termite Control Services",
    image: service,
    description:
      "Giridhar Pest Control uses eco-friendly chemicals to create reliable barriers and protect wooden structures from silent termite damage.",
  },
  {
    title: "Drilling & Injection Method",
    subtitle: "DEEP WALL & FLOOR TREATMENT",
    heading: "Precision Drilling & Injection Termite Control",
    image: servicetwo,
    description:
      "Applying termiticides directly into walls, floors, and affected areas for deep colony control with minimal disruption.",
  },
  {
    title: "Baiting Systems",
    subtitle: "COLONY MONITORING & CONTROL",
    heading: "Targeted Termite Baiting Systems",
    image: service,
    description:
      "Installing strategic bait stations to monitor activity and eradicate termite colonies across residential and commercial properties.",
  },
  {
    title: "Preventive Care",
    subtitle: "NEW & EXISTING BUILDING PROTECTION",
    heading: "Long-Term Preventive Termite Care",
    image: serviceone,
    description:
      "Offering long-term protection plans to safeguard new and existing buildings in Bhubaneswar, Cuttack, Puri, and across Odisha.",
  },
];

const helpItems = [
  {
    title: "Inspection & Detection",
    detail:
      "Identifying termite colonies, entry points, and the extent of infestation.",
  },
  {
    title: "Soil & Wood Treatment",
    detail:
      "Using eco-friendly chemicals to create barriers and protect wooden structures.",
  },
  {
    title: "Drilling & Injection Method",
    detail:
      "Applying termiticides directly into walls, floors, and affected areas for deep elimination.",
  },
  {
    title: "Baiting Systems",
    detail:
      "Installing bait stations to monitor and eradicate termite colonies.",
  },
  {
    title: "Preventive Care",
    detail:
      "Offering long-term protection plans to safeguard new and existing buildings.",
  },
];

const faqs = [
  {
    question: "What is included in Giridhar Pest Control's termite service?",
    answer:
      "Our termite control service includes Inspection & Detection, Soil & Wood Treatment, the Drilling & Injection Method, Baiting Systems, and long-term Preventive Care tailored to your property.",
  },
  {
    question: "How do I know if my property has termites?",
    answer:
      "Common signs include mud tubes on walls, hollow-sounding wood, damaged wooden furniture, discarded wings, and small piles of droppings. Our inspection & detection service identifies hidden colonies and entry points early.",
  },
  {
    question: "Do you provide termite protection for both new and existing buildings?",
    answer:
      "Yes. Giridhar Pest Control offers soil and wood barriers for new construction as well as drilling & injection and baiting systems to safeguard existing homes and commercial buildings.",
  },
  {
    question: "Are your termite control chemicals safe for children and pets?",
    answer:
      "We use eco-friendly, approved chemicals applied with controlled techniques. Our technicians share clear safety and re-entry instructions suited to your home or workplace.",
  },
  {
    question: "Which locations in Odisha do you serve for termite and pest control?",
    answer:
      "Giridhar Pest Control serves Bhubaneswar, Cuttack, Puri, and surrounding cities in Odisha with genuine rates, fast scheduling, and expert termite and pest control services.",
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

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TermitecontrolMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".termite-control-main-reveal");

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
    <section className="termite-control-main" ref={rootRef}>
      <div className="termite-control-main-glow termite-control-main-glow-one" />
      <div className="termite-control-main-glow termite-control-main-glow-two" />

      <div className="termite-control-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="termite-control-main-sidebar">
          <div className="termite-control-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`termite-control-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="termite-control-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="termite-control-main-menu-title">
                  {srv.title}
                </span>

                <span className="termite-control-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="termite-control-main-contact-card">
            <div className="termite-control-main-contact-decoration termite-control-main-contact-decoration-one" />
            <div className="termite-control-main-contact-decoration termite-control-main-contact-decoration-two" />

            <div className="termite-control-main-contact-content">
              <h2>Contact Giridhar Pest Control for expert termite advice</h2>

              <a
                href="tel:+919876543210"
                className="termite-control-main-contact-phone-icon"
                aria-label="Call Giridhar Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="termite-control-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="termite-control-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="termite-control-main-content">
          {/* HERO SECTION */}
          <div
            className={`termite-control-main-hero ${
              imageFailed ? "termite-control-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="termite-control-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="termite-control-main-hero-overlay" />

            <span className="termite-control-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="termite-control-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="termite-control-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* TERMITE CONTROL OVERVIEW */}
          <div className="termite-control-main-overview termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              GIRIDHAR PEST CONTROL • PROFESSIONAL TERMITE PROTECTION
            </span>

            <h2>Termite Control</h2>

            <p>
              Termites are silent destroyers that feed on wood, paper, and
              other cellulose materials, causing severe structural damage if
              left untreated. They often go unnoticed until the damage becomes
              extensive, making professional termite control essential to
              protect your property.
            </p>

            <p>
              At <strong>Giridhar Pest Control</strong>, we serve{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and surrounding areas
              in Odisha with reliable inspections and targeted treatments.
              Recognized among trusted{" "}
              <strong>Pest Control Service Providers in Cuttack</strong> and
              delivering the{" "}
              <strong>best pest control services in Bhubaneswar</strong> and{" "}
              <strong>pest control Puri</strong>, we help protect residential
              and commercial buildings from costly structural repairs.
            </p>
          </div>

          {/* HOW GIRIDHAR PEST CONTROL HELPS */}
          <div className="termite-control-main-overview termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              ADVANCED TREATMENT &amp; PREVENTION
            </span>

            <h2>How Giridhar Pest Control Helps</h2>

            <p>
              <strong>Giridhar Pest Control</strong> provides advanced termite
              treatment and prevention services, including:
            </p>

            <ul className="termite-control-main-highlights">
              {helpItems.map((item) => (
                <li key={item.title}>
                  <span className="termite-control-main-highlight-icon">
                    <CheckIcon />
                  </span>
                  <span>
                    <strong>{item.title}</strong> – {item.detail}
                  </span>
                </li>
              ))}
            </ul>

            <p className="termite-control-main-tagline">
              With expert techniques, safe chemicals, and proven methods,{" "}
              <strong>Giridhar Pest Control</strong> helps safeguard your
              property from termites, saving you from costly repairs and
              damage.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="termite-control-main-comprehensive termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              ADVANCED TERMITE PROTECTION
            </span>

            <h2>Complete Termite Control Solutions</h2>

            <p>
              From preventive soil barriers to deep drilling &amp; injection
              and baiting systems, Giridhar Pest Control provides{" "}
              <strong>expert pest and termite control across Cuttack</strong>,{" "}
              <strong>pest control Bhubaneswar</strong>, and{" "}
              <strong>pest control Puri</strong> tailored to your building
              structure.
            </p>

            <div className="termite-control-main-image-grid">
              <div className="termite-control-main-image-card">
                <div className="termite-control-main-image-wrap">
                  <img src={serviceone} alt="Termite inspection and detection" />
                  <span className="termite-control-main-image-number">
                    01
                  </span>
                </div>

                <span className="termite-control-main-card-subtitle">
                  COLONY &amp; ENTRY POINT AUDIT
                </span>

                <h3>Inspection &amp; Detection</h3>

                <p>
                  Identifying termite colonies, mud tubes, entry points, and
                  the extent of infestation across wood and masonry.
                </p>
              </div>

              <div className="termite-control-main-image-card">
                <div className="termite-control-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Drilling and injection anti-termite treatment"
                  />
                  <span className="termite-control-main-image-number">
                    02
                  </span>
                </div>

                <span className="termite-control-main-card-subtitle">
                  BARRIER &amp; BAITING CARE
                </span>

                <h3>Targeted Termite Treatment</h3>

                <p>
                  Combining soil &amp; wood barriers, drilling &amp; injection,
                  and baiting systems for long-term property protection.
                </p>
              </div>
            </div>

            {/* LOCAL SERVICE COVERAGE & KEYWORDS */}
            <div className="termite-control-main-local-box">
              <span className="termite-control-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Trusted Termite &amp; Pest Control Across Odisha</h3>
              <p>
                Looking for{" "}
                <strong>Best Pest Control in Cuttack with genuine rates</strong>{" "}
                or dependable <strong>pest control near Cuttack, Odisha</strong>?
                Giridhar Pest Control offers the{" "}
                <strong>best pest control services in Cuttack</strong> and
                complete <strong>pest control solutions in Cuttack</strong>,
                Bhubaneswar, and Puri.
              </p>
              <div className="termite-control-main-keyword-tags">
                <span>Best Pest Control in Cuttack with genuine rates</span>
                <span>Pest Control Bhubaneswar</span>
                <span>Best Pest Control Services in Bhubaneswar</span>
                <span>Pest Control Puri</span>
                <span>Pest Control near Cuttack, Odisha</span>
                <span>Best Pest Control Services in Cuttack</span>
                <span>Pest Control Service Providers in Cuttack</span>
                <span>Expert Pest and Termite Control across Cuttack</span>
                <span>Pest Control Solutions in Cuttack</span>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="termite-control-main-faq termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="termite-control-main-faq-intro">
              Find answers to common questions about Giridhar Pest Control’s
              termite inspection, anti-termite treatment, and prevention
              services.
            </p>

            <div className="termite-control-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`termite-control-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="termite-control-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="termite-control-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="termite-control-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="termite-control-main-bottom-cta termite-control-main-reveal">
            <div>
              <span>GIRIDHAR PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Termite Control?</h2>

              <p>
                Keep your home and business protected from termite damage.
                Contact Giridhar Pest Control for expert assistance at genuine
                rates.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="termite-control-main-cta-button"
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

export default TermitecontrolMain;