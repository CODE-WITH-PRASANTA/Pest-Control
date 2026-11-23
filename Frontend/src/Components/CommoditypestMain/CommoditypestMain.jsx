
import { useEffect, useRef, useState } from "react";
import "./CommoditypestMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Commodity Inspection",
    heading: "Professional Commodity Pest Inspection",
    image: serviceone,
    description:
      "Detailed inspection of stored grains, pulses, packaged foods and warehouse spaces to identify pest activity and potential infestation risks.",
  },
  {
    title: "Warehouse Pest Control",
    heading: "Advanced Warehouse Pest Management",
    image: service,
    description:
      "Comprehensive pest management solutions for warehouses, godowns, storage facilities and commercial stock areas.",
  },
  {
    title: "Commodity Fumigation",
    heading: "Effective Commodity Fumigation Services",
    image: servicetwo,
    description:
      "Professional fumigation solutions designed to control insects and pests affecting stored commodities, subject to product and site safety requirements.",
  },
  {
    title: "Grain & Food Protection",
    heading: "Reliable Grain and Food Storage Protection",
    image: serviceone,
    description:
      "Specialized pest management for grains, pulses and packaged food products to help protect stock quality during storage and transportation.",
  },
  {
    title: "Preventive Pest Management",
    heading: "Long-Term Commodity Pest Prevention",
    image: service,
    description:
      "Customized preventive pest management plans to reduce infestation risks and maintain cleaner, safer storage environments.",
  },
];

const faqs = [
  {
    question: "What is commodity pest management?",
    answer:
      "Commodity pest management involves inspecting and controlling pests such as weevils, beetles, moths and rodents that damage stored grains, pulses and packaged food products.",
  },
  {
    question: "Which commodities require pest control?",
    answer:
      "Stored grains, rice, wheat, pulses, cereals, packaged food products and other agricultural commodities may require regular pest inspection and management.",
  },
  {
    question: "Do you provide warehouse and godown pest control?",
    answer:
      "Yes. Giridurga Pest Control provides customized commodity pest management solutions for warehouses, godowns, food processing units, storage facilities and commercial properties.",
  },
  {
    question: "Do you provide fumigation services?",
    answer:
      "Yes. We provide professional fumigation services based on commodity type, infestation level and site requirements. Treatments are carried out using suitable approved procedures and safety precautions.",
  },
  {
    question: "Which locations do you serve in Odisha?",
    answer:
      "We provide pest management services in Bhubaneswar, Cuttack, Puri and surrounding areas across Odisha, subject to service availability.",
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

const CommoditypestMain = () => {
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
      ".commodity-pest-main-reveal"
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
      className="commodity-pest-main"
      ref={rootRef}
    >
      <div className="commodity-pest-main-glow commodity-pest-main-glow-one" />
      <div className="commodity-pest-main-glow commodity-pest-main-glow-two" />

      <div className="commodity-pest-main-container">

        {/* LEFT SIDEBAR */}
        <aside className="commodity-pest-main-sidebar">

          <div className="commodity-pest-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`commodity-pest-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="commodity-pest-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="commodity-pest-main-menu-title">
                  {srv.title}
                </span>

                <span className="commodity-pest-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="commodity-pest-main-contact-card">

            <div className="commodity-pest-main-contact-decoration commodity-pest-main-contact-decoration-one" />
            <div className="commodity-pest-main-contact-decoration commodity-pest-main-contact-decoration-two" />

            <div className="commodity-pest-main-contact-content">

              <h2>Contact Us For Expert Pest Control Advice</h2>

              <a
                href="tel:+919876543210"
                className="commodity-pest-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to our experts</p>

              <a
                href="tel:+919876543210"
                className="commodity-pest-main-contact-number"
              >
                +91 98765 43210
              </a>

            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="commodity-pest-main-download"
          >
            <PdfIcon />
            <span>Download PDF File</span>
          </a>

        </aside>

        {/* RIGHT CONTENT */}
        <main className="commodity-pest-main-content">

          {/* HERO SECTION */}
          <div
            className={`commodity-pest-main-hero ${
              imageFailed
                ? "commodity-pest-main-hero-fallback"
                : ""
            }`}
          >

            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="commodity-pest-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="commodity-pest-main-hero-overlay" />

            <span className="commodity-pest-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="commodity-pest-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="commodity-pest-main-hero-label">
                GIRIDURGA PEST CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>

          </div>

          {/* SERVICE OVERVIEW */}
          <div className="commodity-pest-main-overview commodity-pest-main-reveal">

            <span className="commodity-pest-main-section-subtitle">
              ABOUT COMMODITY PEST MANAGEMENT
            </span>

            <h2>Commodity Pest Management in Odisha</h2>

            <p>
              Stored products like grains, pulses and packaged foods
              are highly vulnerable to pest infestations. Pests such
              as weevils, beetles, moths and rodents can cause
              significant damage to commodities during storage and
              transportation, resulting in financial losses and
              potential health risks.
            </p>

            <p>
              Giridurga Pest Control provides professional commodity
              pest management services in Odisha to protect valuable
              stock in warehouses, godowns, processing units and
              transport containers. Our treatment solutions include
              suitable fumigation, fogging and residual pest control
              methods based on inspection and site requirements.
            </p>

            <p>
              We follow appropriate safety procedures and
              industry-relevant practices to help keep stored
              commodities protected. Our experts provide customized
              pest management plans for traders, food processors,
              warehouse operators and commercial businesses.
            </p>

          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="commodity-pest-main-comprehensive commodity-pest-main-reveal">

            <span className="commodity-pest-main-section-subtitle">
              OUR COMMODITY PEST CONTROL SOLUTIONS
            </span>

            <h2>Complete Commodity Pest Management Solutions</h2>

            <p>
              From grain storage facilities to large commercial
              warehouses, we offer reliable pest management
              solutions designed around your storage conditions
              and commodity protection needs.
            </p>

            <div className="commodity-pest-main-image-grid">

              <div className="commodity-pest-main-image-card">

                <div className="commodity-pest-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Commodity and warehouse pest inspection"
                    loading="lazy"
                  />

                  <span className="commodity-pest-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Commodity Inspection</h3>

                <p>
                  Identifying pest activity, infestation sources
                  and vulnerable storage areas to recommend
                  suitable control measures.
                </p>

              </div>

              <div className="commodity-pest-main-image-card">

                <div className="commodity-pest-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional commodity fumigation"
                    loading="lazy"
                  />

                  <span className="commodity-pest-main-image-number">
                    02
                  </span>
                </div>

                <h3>Professional Fumigation</h3>

                <p>
                  Appropriate fumigation solutions for stored
                  commodities and storage facilities, following
                  required safety precautions.
                </p>

              </div>

            </div>

          </div>

          {/* WHY CHOOSE US */}
          <div className="commodity-pest-main-benefits commodity-pest-main-reveal">

            <span className="commodity-pest-main-section-subtitle">
              WHY CHOOSE GIRIDURGA
            </span>

            <h2>Why Choose Giridurga Pest Control?</h2>

            <div className="commodity-pest-main-benefit-grid">

              <div className="commodity-pest-main-benefit-card">
                <span>01</span>
                <h3>Expert Professionals</h3>
                <p>
                  Experienced pest management professionals
                  with a focus on effective commodity protection.
                </p>
              </div>

              <div className="commodity-pest-main-benefit-card">
                <span>02</span>
                <h3>Suitable Treatment Methods</h3>
                <p>
                  Customized inspection and treatment plans
                  according to commodity and storage conditions.
                </p>
              </div>

              <div className="commodity-pest-main-benefit-card">
                <span>03</span>
                <h3>Affordable Solutions</h3>
                <p>
                  Practical pest management services designed
                  to meet different business requirements.
                </p>
              </div>

              <div className="commodity-pest-main-benefit-card">
                <span>04</span>
                <h3>Odisha-Wide Service</h3>
                <p>
                  Service coverage across Bhubaneswar, Cuttack,
                  Puri and surrounding locations.
                </p>
              </div>

            </div>

          </div>

          {/* FAQ SECTION */}
          <div className="commodity-pest-main-faq commodity-pest-main-reveal">

            <span className="commodity-pest-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="commodity-pest-main-faq-intro">
              Find answers to common questions about our
              commodity pest inspection, fumigation and
              warehouse pest management services.
            </p>

            <div className="commodity-pest-main-faq-list">

              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`commodity-pest-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >

                  <button
                    type="button"
                    className="commodity-pest-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="commodity-pest-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="commodity-pest-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* BOTTOM CTA */}
          <div className="commodity-pest-main-bottom-cta commodity-pest-main-reveal">

            <div>
              <span>PROTECT YOUR STORED COMMODITIES</span>

              <h2>Need Professional Commodity Pest Control?</h2>

              <p>
                Protect your valuable stock from unwanted pests.
                Contact Giridurga Pest Control for professional
                commodity pest management in Odisha.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="commodity-pest-main-cta-button"
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

export default CommoditypestMain;
