
import React, { useEffect, useRef, useState } from "react";
import "./WeedcontrolMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Weed Inspection",
    heading: "Professional Weed Inspection Services",
    image: serviceone,
    description:
      "Our experts inspect lawns, gardens, agricultural fields and commercial properties to identify unwanted weeds and understand their growth patterns.",
  },
  {
    title: "Herbicide Application",
    heading: "Effective Herbicide Application Solutions",
    image: service,
    description:
      "We use suitable and approved herbicide treatments to control unwanted weeds while following recommended application and safety practices.",
  },
  {
    title: "Manual Weed Removal",
    heading: "Complete Manual & Mechanical Weed Removal",
    image: servicetwo,
    description:
      "Our team removes unwanted weeds from roots using appropriate manual and mechanical methods to help reduce regrowth.",
  },
  {
    title: "Preventive Weed Treatment",
    heading: "Advanced Weed Prevention & Management",
    image: serviceone,
    description:
      "Preventive weed management solutions help control early weed growth and reduce the chances of unwanted vegetation spreading.",
  },
  {
    title: "Commercial & Agricultural Weed Control",
    heading: "Customized Weed Control for Every Property",
    image: service,
    description:
      "We provide customized weed management plans for agricultural fields, gardens, lawns, industrial premises and commercial properties.",
  },
];

const faqs = [
  {
    question: "What is weed control treatment?",
    answer:
      "Weed control is a pest and vegetation management process that helps remove unwanted plants and prevent their regrowth. It includes inspection, suitable herbicide application, manual removal and preventive measures.",
  },
  {
    question: "Why is professional weed control important?",
    answer:
      "Uncontrolled weeds compete with useful plants and crops for water, sunlight and nutrients. Professional weed management helps maintain healthier soil, cleaner surroundings and better plant growth.",
  },
  {
    question: "Are herbicides used for weed control?",
    answer:
      "Yes. Suitable and approved herbicides may be used depending on the weed type and treatment location. Our team follows recommended application procedures and safety instructions.",
  },
  {
    question: "Do you provide weed control for gardens and agricultural fields?",
    answer:
      "Yes. Giridurga Pest Control provides customized weed management solutions for gardens, lawns, agricultural fields, industrial areas and commercial properties.",
  },
  {
    question: "How often should weed control treatment be done?",
    answer:
      "Treatment frequency depends on weed type, seasonal growth, property conditions and the selected treatment method. Our experts can recommend a suitable maintenance schedule after inspection.",
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

const WeedcontrolMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".weed-control-main-reveal");

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
    <section className="weed-control-main" ref={rootRef}>
      <div className="weed-control-main-glow weed-control-main-glow-one" />
      <div className="weed-control-main-glow weed-control-main-glow-two" />

      <div className="weed-control-main-container">

        {/* LEFT SIDEBAR */}
        <aside className="weed-control-main-sidebar">

          <div className="weed-control-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`weed-control-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="weed-control-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="weed-control-main-menu-title">
                  {srv.title}
                </span>

                <span className="weed-control-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="weed-control-main-contact-card">
            <div className="weed-control-main-contact-decoration weed-control-main-contact-decoration-one" />
            <div className="weed-control-main-contact-decoration weed-control-main-contact-decoration-two" />

            <div className="weed-control-main-contact-content">
              <h2>Contact Us for Expert Weed Control Advice</h2>

              <a
                href="tel:+919876543210"
                className="weed-control-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need professional assistance?</p>

              <a
                href="tel:+919876543210"
                className="weed-control-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="weed-control-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>

        </aside>

        {/* RIGHT CONTENT */}
        <main className="weed-control-main-content">

          {/* HERO SECTION */}
          <div
            className={`weed-control-main-hero ${
              imageFailed ? "weed-control-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="weed-control-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="weed-control-main-hero-overlay" />

            <span className="weed-control-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="weed-control-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="weed-control-main-hero-label">
                PROFESSIONAL WEED CONTROL SERVICES
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="weed-control-main-overview weed-control-main-reveal">
            <span className="weed-control-main-section-subtitle">
              ABOUT WEED CONTROL
            </span>

            <h2>Professional Weed Control Services in Odisha</h2>

            <p>
              Weeds not only affect the beauty of landscapes but also compete
              with crops, plants and lawns for essential nutrients, water and
              sunlight. If left unchecked, they can spread rapidly, reduce soil
              fertility and invite pests and diseases, leading to long-term
              damage in agricultural fields, gardens and commercial spaces.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we provide effective
              weed management solutions designed to control unwanted
              vegetation and maintain cleaner, healthier surroundings. Our
              trained team identifies weed types, understands their growth
              patterns and recommends suitable treatment methods according to
              the property and its requirements.
            </p>

            <p>
              From residential gardens and lawns to agricultural fields and
              industrial premises, we focus on customized weed management
              using appropriate treatment procedures and preventive care.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="weed-control-main-comprehensive weed-control-main-reveal">
            <span className="weed-control-main-section-subtitle">
              OUR WEED MANAGEMENT APPROACH
            </span>

            <h2>How Giridurga Pest Control Helps</h2>

            <p>
              We offer comprehensive weed management solutions using
              appropriate methods to control unwanted growth and help prevent
              future weed problems.
            </p>

            <div className="weed-control-main-image-grid">

              <div className="weed-control-main-image-card">
                <div className="weed-control-main-image-wrap">
                  <img src={serviceone} alt="Weed inspection services" />
                  <span className="weed-control-main-image-number">01</span>
                </div>

                <h3>Inspection & Identification</h3>

                <p>
                  Identifying different weed types and understanding their
                  growth patterns to select suitable treatment methods.
                </p>
              </div>

              <div className="weed-control-main-image-card">
                <div className="weed-control-main-image-wrap">
                  <img src={servicetwo} alt="Herbicide application" />
                  <span className="weed-control-main-image-number">02</span>
                </div>

                <h3>Herbicide Application</h3>

                <p>
                  Using suitable and approved herbicides to manage unwanted
                  weeds while following recommended safety procedures.
                </p>
              </div>

              <div className="weed-control-main-image-card">
                <div className="weed-control-main-image-wrap">
                  <img src={service} alt="Manual weed removal" />
                  <span className="weed-control-main-image-number">03</span>
                </div>

                <h3>Manual & Mechanical Removal</h3>

                <p>
                  Removing unwanted weeds from their roots using appropriate
                  manual and mechanical removal methods.
                </p>
              </div>

              <div className="weed-control-main-image-card">
                <div className="weed-control-main-image-wrap">
                  <img src={serviceone} alt="Preventive weed treatment" />
                  <span className="weed-control-main-image-number">04</span>
                </div>

                <h3>Preventive Measures</h3>

                <p>
                  Applying suitable preventive treatments to help reduce
                  unwanted weed growth before it spreads.
                </p>
              </div>

            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="weed-control-main-benefits weed-control-main-reveal">
            <span className="weed-control-main-section-subtitle">
              WHY CHOOSE GIRIDURGA
            </span>

            <h2>Reliable Weed Management Solutions</h2>

            <p>
              With appropriate treatment methods, advanced equipment and
              professional care, Giridurga Pest Control helps maintain
              healthier soil, stronger crops and cleaner surroundings.
            </p>

            <div className="weed-control-main-benefit-list">
              <div className="weed-control-main-benefit-item">
                <span>✓</span>
                <p>Professional weed inspection and identification</p>
              </div>

              <div className="weed-control-main-benefit-item">
                <span>✓</span>
                <p>Suitable and approved herbicide treatments</p>
              </div>

              <div className="weed-control-main-benefit-item">
                <span>✓</span>
                <p>Manual and mechanical weed removal solutions</p>
              </div>

              <div className="weed-control-main-benefit-item">
                <span>✓</span>
                <p>Customized plans for different property types</p>
              </div>

              <div className="weed-control-main-benefit-item">
                <span>✓</span>
                <p>Preventive measures to reduce weed regrowth</p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="weed-control-main-faq weed-control-main-reveal">
            <span className="weed-control-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="weed-control-main-faq-intro">
              Find answers to common questions about our professional weed
              inspection, treatment and prevention services.
            </p>

            <div className="weed-control-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`weed-control-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="weed-control-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="weed-control-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="weed-control-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="weed-control-main-bottom-cta weed-control-main-reveal">
            <div>
              <span>KEEP YOUR SURROUNDINGS CLEAN & HEALTHY</span>

              <h2>Need Professional Weed Control?</h2>

              <p>
                Get in touch with Giridurga Pest Control for effective and
                customized weed management solutions for your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="weed-control-main-cta-button"
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

export default WeedcontrolMain;
