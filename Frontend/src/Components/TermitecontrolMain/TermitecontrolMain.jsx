
import React, { useEffect, useRef, useState } from "react";
import "./TermitecontrolMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Termite Inspection",
    heading: "Detailed Termite Inspection Services",
    image: serviceone,
    description:
      "Identify termite colonies, mud tubes, damaged wood and hidden infestation areas with a detailed inspection of your property.",
  },
  {
    title: "Anti-Termite Treatment",
    heading: "Professional Anti-Termite Treatment Solutions",
    image: service,
    description:
      "Protect your property with professional termite treatment solutions designed to control active infestations and reduce structural damage.",
  },
  {
    title: "Pre-Construction Treatment",
    heading: "Pre-Construction Termite Protection",
    image: servicetwo,
    description:
      "Create a protective barrier against termites during construction with carefully planned soil and foundation treatment.",
  },
  {
    title: "Post-Construction Treatment",
    heading: "Advanced Post-Construction Termite Control",
    image: service,
    description:
      "Protect existing buildings through targeted termite treatment around foundations, walls, wooden structures and affected areas.",
  },
  {
    title: "Preventive Termite Management",
    heading: "Long-Term Termite Prevention & Protection",
    image: serviceone,
    description:
      "Minimize future termite risks with preventive treatment recommendations, property monitoring and professional follow-up services.",
  },
];

const faqs = [
  {
    question: "What is included in your termite control service?",
    answer:
      "Our termite control service includes property inspection, identification of termite activity, assessment of affected areas, suitable treatment recommendations and preventive guidance.",
  },
  {
    question: "How do I know if my property has termites?",
    answer:
      "Common signs include mud tubes on walls, hollow-sounding wood, damaged wooden furniture, discarded wings and small piles of termite droppings. A professional inspection can help confirm termite activity.",
  },
  {
    question: "Do you provide pre-construction termite treatment?",
    answer:
      "Yes. We provide pre-construction anti-termite treatment to help protect building foundations and soil areas before construction is completed.",
  },
  {
    question: "Is termite treatment safe for children and pets?",
    answer:
      "Treatment methods are selected according to the property and infestation. We provide appropriate safety instructions, and occupants should follow all technician guidance during and after treatment.",
  },
  {
    question: "How long does termite treatment take?",
    answer:
      "Treatment duration depends on the property size, construction type and severity of infestation. Our technician will explain the expected service duration after inspection.",
  },
  {
    question: "Do you provide termite control for commercial properties?",
    answer:
      "Yes. We provide termite management solutions for houses, apartments, offices, hotels, restaurants, warehouses and other commercial properties.",
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

    const items = root.querySelectorAll(
      ".termite-control-main-reveal"
    );

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
    <section
      className="termite-control-main"
      ref={rootRef}
    >
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
              <h2>Contact with us for expert termite advice</h2>

              <a
                href="tel:+919876543210"
                className="termite-control-main-contact-phone-icon"
                aria-label="Call our support team"
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
                PROFESSIONAL TERMITE CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="termite-control-main-overview termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              ABOUT TERMITE CONTROL
            </span>

            <h2>Professional Termite Management Overview</h2>

            <p>
              Termites are destructive pests that can silently damage
              wooden furniture, doors, flooring, walls and building
              foundations. Since termite colonies often remain hidden
              underground or inside wooden structures, infestations
              may go unnoticed until significant damage occurs.
            </p>

            <p>
              Our termite control services focus on identifying
              infestation signs, locating affected areas and selecting
              suitable treatment methods. We provide solutions for
              residential, commercial and industrial properties to
              help protect your valuable structures.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="termite-control-main-comprehensive termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              ADVANCED TERMITE PROTECTION
            </span>

            <h2>Complete Termite Control Solutions</h2>

            <p>
              From preventive soil treatment to controlling active
              termite infestations, we provide professional solutions
              designed around your building structure and specific
              protection requirements.
            </p>

            <div className="termite-control-main-image-grid">

              <div className="termite-control-main-image-card">
                <div className="termite-control-main-image-wrap">
                  <img src={serviceone} alt="Termite inspection service" />
                  <span className="termite-control-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Termite Inspection</h3>

                <p>
                  Identify termite mud tubes, damaged wood,
                  hidden colonies and vulnerable structural areas.
                </p>
              </div>

              <div className="termite-control-main-image-card">
                <div className="termite-control-main-image-wrap">
                  <img src={servicetwo} alt="Professional anti termite treatment" />
                  <span className="termite-control-main-image-number">
                    02
                  </span>
                </div>

                <h3>Professional Termite Treatment</h3>

                <p>
                  Apply appropriate treatment methods to control
                  active termite infestations and protect structures.
                </p>
              </div>
            </div>
          </div>

          {/* WHY TERMITE CONTROL */}
          <div className="termite-control-main-overview termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              WHY CHOOSE PROFESSIONAL PROTECTION
            </span>

            <h2>Protect Your Property From Hidden Termite Damage</h2>

            <p>
              Professional termite management helps identify hidden
              infestation areas, reduce structural risks and prevent
              recurring termite problems. Regular inspections and
              suitable preventive measures are important for long-term
              property protection.
            </p>
          </div>

          {/* FAQ SECTION */}
          <div className="termite-control-main-faq termite-control-main-reveal">
            <span className="termite-control-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="termite-control-main-faq-intro">
              Find answers to common questions about our termite
              inspection, anti-termite treatment and prevention services.
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
              <span>PROTECT YOUR PROPERTY TODAY</span>

              <h2>Need Professional Termite Control?</h2>

              <p>
                Keep your home and business protected from termite
                damage. Contact our team for professional assistance.
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
