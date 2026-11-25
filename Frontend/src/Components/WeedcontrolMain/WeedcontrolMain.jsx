import React, { useEffect, useRef, useState } from "react";
import "./WeedcontrolMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Weed Inspection",
    subtitle: "LAWN, GARDEN & FIELD AUDIT",
    heading: "Professional Weed Inspection Services in Odisha",
    image: serviceone,
    description:
      "Our experts inspect lawns, gardens, agricultural fields, and commercial properties to identify unwanted weeds and understand their growth patterns.",
  },
  {
    title: "Herbicide Application",
    subtitle: "APPROVED VEGETATION CONTROL",
    heading: "Professional Weed Control Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control uses suitable, approved herbicide treatments to control unwanted weeds while following recommended application and safety practices.",
  },
  {
    title: "Manual Weed Removal",
    subtitle: "ROOT-LEVEL EXTRACTION CARE",
    heading: "Complete Manual & Mechanical Weed Removal",
    image: servicetwo,
    description:
      "Our team removes unwanted weeds from their roots using appropriate manual and mechanical methods to help reduce regrowth.",
  },
  {
    title: "Preventive Weed Treatment",
    subtitle: "PRE-EMERGENCE & SPREAD PREVENTION",
    heading: "Advanced Weed Prevention & Management",
    image: serviceone,
    description:
      "Preventive weed management solutions help control early weed growth and reduce the chances of unwanted vegetation spreading across your property.",
  },
  {
    title: "Commercial & Agricultural Weed Control",
    subtitle: "FIELDS, LAWNS & INDUSTRIAL PREMISES",
    heading: "Customized Weed Control for Every Property in Odisha",
    image: service,
    description:
      "Customized weed management plans for agricultural fields, gardens, lawns, industrial premises, and commercial properties across Bhubaneswar, Cuttack, and Puri.",
  },
];

const faqs = [
  {
    question: "What is weed control treatment?",
    answer:
      "Weed control is a vegetation management process that removes unwanted plants and helps prevent their regrowth. It includes inspection & identification, suitable herbicide application, manual & mechanical removal, and preventive measures.",
  },
  {
    question: "Why is professional weed control important?",
    answer:
      "Uncontrolled weeds compete with crops, plants, and lawns for water, sunlight, and nutrients while inviting pests and diseases. Professional weed management helps maintain healthier soil, stronger crops, and cleaner surroundings.",
  },
  {
    question: "Are approved herbicides used for weed control?",
    answer:
      "Yes. Giridurga Pest Control selects suitable and approved herbicides depending on the weed type and treatment location, following recommended application procedures and safety instructions.",
  },
  {
    question: "Do you provide weed control for gardens, lawns, and agricultural fields?",
    answer:
      "Yes. Giridurga Pest Control provides customized weed management plans for residential gardens, lawns, agricultural fields, industrial premises, and commercial properties across Odisha.",
  },
  {
    question: "Which cities in Odisha do you serve for weed and pest control?",
    answer:
      "Giridurga Pest Control serves Cuttack, Bhubaneswar, Puri, and nearby areas across Odisha with genuine rates, on-time service, and comprehensive weed, termite, and general pest control solutions.",
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
              <h2>Contact Giridurga Pest Control for Weed Advice</h2>

              <a
                href="tel:+919876543210"
                className="weed-control-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
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
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="weed-control-main-overview weed-control-main-reveal">
            <span className="weed-control-main-section-subtitle">
              GIRIDURGA PEST CONTROL • VEGETATION &amp; LANDSCAPE CARE
            </span>

            <h2>Professional Weed Control Services in Odisha</h2>

            <p>
              Weeds not only affect the beauty of landscapes but also compete
              with crops, plants, and lawns for essential nutrients, water, and
              sunlight. If left unchecked, they can spread rapidly, reduce soil
              fertility, and invite pests and diseases, leading to long-term
              damage in agricultural fields, gardens, and commercial spaces.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we provide effective
              weed management solutions designed to control unwanted
              vegetation and maintain cleaner, healthier surroundings. Our
              trained team identifies weed types, understands their growth
              patterns, and recommends suitable treatment methods according to
              the property and its requirements.
            </p>

            <p>
              From residential gardens and lawns to agricultural fields and
              industrial premises across{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby regions,
              we focus on customized weed management using appropriate
              treatment procedures and preventive care.
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
                  <img
                    src={serviceone}
                    alt="Weed inspection and identification in Odisha"
                  />
                  <span className="weed-control-main-image-number">01</span>
                </div>

                <span className="weed-control-main-card-subtitle">
                  SPECIES &amp; GROWTH AUDIT
                </span>

                <h3>Inspection &amp; Identification</h3>

                <p>
                  Identifying different weed types and understanding their
                  growth patterns to select suitable treatment methods.
                </p>
              </div>

              <div className="weed-control-main-image-card">
                <div className="weed-control-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Approved herbicide application"
                  />
                  <span className="weed-control-main-image-number">02</span>
                </div>

                <span className="weed-control-main-card-subtitle">
                  APPROVED FORMULATION CARE
                </span>

                <h3>Herbicide Application</h3>

                <p>
                  Using suitable and approved herbicides to manage unwanted
                  weeds while following recommended safety procedures.
                </p>
              </div>

              <div className="weed-control-main-image-card">
                <div className="weed-control-main-image-wrap">
                  <img
                    src={service}
                    alt="Manual and mechanical weed removal"
                  />
                  <span className="weed-control-main-image-number">03</span>
                </div>

                <span className="weed-control-main-card-subtitle">
                  ROOT-LEVEL EXTRACTION
                </span>

                <h3>Manual &amp; Mechanical Removal</h3>

                <p>
                  Removing unwanted weeds from their roots using appropriate
                  manual and mechanical removal methods.
                </p>
              </div>

              <div className="weed-control-main-image-card">
                <div className="weed-control-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Preventive weed treatment"
                  />
                  <span className="weed-control-main-image-number">04</span>
                </div>

                <span className="weed-control-main-card-subtitle">
                  LONG-TERM SPREAD CONTROL
                </span>

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
              WHY CHOOSE GIRIDURGA PEST CONTROL
            </span>

            <h2>Reliable Weed Management Solutions</h2>

            <p>
              With appropriate treatment methods, modern equipment, and
              professional care, <strong>Giridurga Pest Control</strong> helps
              maintain healthier soil, stronger crops, and cleaner
              surroundings.
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

          {/* SERVICE AREAS / SEO KEYWORDS */}
          <div className="weed-control-main-areas weed-control-main-reveal">
            <span className="weed-control-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Trusted Weed &amp; Pest Control Services Across Odisha</h2>

            <p>
              Looking for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>?{" "}
              <strong>Giridurga Pest Control</strong> provides professional
              weed control and comprehensive pest management for residential,
              agricultural, and commercial properties.
            </p>

            <p>
              We serve customers searching for{" "}
              <strong>pest control Bhubaneswar</strong>, the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, and{" "}
              <strong>pest control near Cuttack, Odisha</strong>. Recognized
              among reliable{" "}
              <strong>Pest Control Service Providers in Cuttack</strong>, we
              also deliver the{" "}
              <strong>best pest control services in Cuttack</strong>,{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>
              , and complete <strong>pest control solutions in Cuttack</strong>.
            </p>

            <div className="weed-control-main-local-box">
              <span className="weed-control-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Weed &amp; Pest Protection Across Odisha</h3>
              <div className="weed-control-main-keyword-tags">
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
          <div className="weed-control-main-faq weed-control-main-reveal">
            <span className="weed-control-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="weed-control-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              professional weed inspection, treatment, and prevention services.
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
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Weed Control?</h2>

              <p>
                Get in touch with Giridurga Pest Control for effective and
                customized weed management solutions at genuine rates.
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