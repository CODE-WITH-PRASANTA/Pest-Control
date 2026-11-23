import { useEffect, useRef, useState } from "react";
import "./MosquitomanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Mosquito Inspection",
    subtitle: "BREEDING & RESTING SITE AUDIT",
    heading: "Detailed Mosquito Inspection Services",
    image: serviceone,
    description:
      "Check stagnant water pockets, planters, coolers, drains and shaded resting areas to identify mosquito breeding sources and activity levels.",
  },
  {
    title: "Mosquito Treatment",
    subtitle: "INDOOR & OUTDOOR CONTROL",
    heading: "Professional Mosquito Treatment Solutions",
    image: service,
    description:
      "Reduce adult mosquito presence and larval activity with targeted indoor and outdoor treatment plans suited to your property.",
  },
  {
    title: "Larval & Drain Control",
    subtitle: "SOURCE & BREEDING REDUCTION",
    heading: "Targeted Larval & Stagnant Water Control",
    image: servicetwo,
    description:
      "Focused treatment for open drains, water sumps, terrace containers and damp corners where mosquitoes multiply rapidly.",
  },
  {
    title: "Residential & Commercial Control",
    subtitle: "HOMES, SOCIETIES & WORKPLACES",
    heading: "Mosquito Control for Homes & Businesses",
    image: service,
    description:
      "Customized mosquito management services for houses, housing societies, gardens, restaurants, offices, schools and commercial sites.",
  },
  {
    title: "Preventive Mosquito Care",
    subtitle: "SEASONAL & ONGOING PROTECTION",
    heading: "Ongoing Mosquito Prevention & Management",
    image: serviceone,
    description:
      "Keep mosquito pressure low with practical water-management guidance, screening tips and recommended follow-up schedules.",
  },
];

const faqs = [
  {
    question: "What does your mosquito management service include?",
    answer:
      "Our service includes inspection of breeding and resting spots, targeted control measures for larvae and adult mosquitoes, and practical advice to reduce recurring activity.",
  },
  {
    question: "Are mosquito treatments safe for children and pets?",
    answer:
      "We select appropriate treatment methods based on the indoor or outdoor area and provide clear safety instructions. Always follow your technician's re-entry guidance.",
  },
  {
    question: "How often should mosquito control be repeated?",
    answer:
      "Treatment frequency depends on weather, surrounding water sources, property size and mosquito pressure. Our technician can recommend a suitable schedule after inspection.",
  },
  {
    question: "How long does mosquito treatment take?",
    answer:
      "Service time depends on whether you need indoor rooms, balconies, gardens or commercial grounds treated. Your technician will share the expected duration upfront.",
  },
  {
    question: "Do you provide mosquito control for homes and commercial spaces?",
    answer:
      "Yes. We provide mosquito management solutions for individual homes, apartments, residential societies, cafes, offices and commercial premises.",
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

const MosquitomanagementserviceMain = () => {
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
      ".mosquito-management-service-main-reveal"
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
      className="mosquito-management-service-main"
      ref={rootRef}
    >
      <div className="mosquito-management-service-main-glow mosquito-management-service-main-glow-one" />
      <div className="mosquito-management-service-main-glow mosquito-management-service-main-glow-two" />

      <div className="mosquito-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="mosquito-management-service-main-sidebar">
          <div className="mosquito-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`mosquito-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="mosquito-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mosquito-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="mosquito-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="mosquito-management-service-main-contact-card">
            <div className="mosquito-management-service-main-contact-decoration mosquito-management-service-main-contact-decoration-one" />
            <div className="mosquito-management-service-main-contact-decoration mosquito-management-service-main-contact-decoration-two" />

            <div className="mosquito-management-service-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="mosquito-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="mosquito-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="mosquito-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="mosquito-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`mosquito-management-service-main-hero ${
              imageFailed
                ? "mosquito-management-service-main-hero-fallback"
                : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="mosquito-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="mosquito-management-service-main-hero-overlay" />

            <span className="mosquito-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="mosquito-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="mosquito-management-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="mosquito-management-service-main-overview mosquito-management-service-main-reveal">
            <span className="mosquito-management-service-main-section-subtitle">
              MOSQUITO CONTROL STRATEGY
            </span>

            <h2>Mosquito Management Overview</h2>

            <p>
              Mosquitoes thrive near standing water, shaded greenery,
              balconies and damp corners, making lasting relief difficult
              without addressing both breeding sources and active adults. Our
              team inspects high-risk spots and recommends targeted mosquito
              control for your property.
            </p>

            <p>
              Every space has different exposure levels. We assess outdoor
              surroundings, indoor resting areas and seasonal conditions
              before recommending a practical control and prevention plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="mosquito-management-service-main-comprehensive mosquito-management-service-main-reveal">
            <span className="mosquito-management-service-main-section-subtitle">
              FIELD EXECUTION &amp; SOURCE CARE
            </span>

            <h2>Complete Mosquito Control Solutions</h2>

            <p>
              From residential homes and gardens to commercial properties, we
              provide practical mosquito management tailored to the site
              layout and infestation conditions.
            </p>

            <div className="mosquito-management-service-main-image-grid">
              <div className="mosquito-management-service-main-image-card">
                <div className="mosquito-management-service-main-image-wrap">
                  <img src={serviceone} alt="Mosquito inspection" />
                  <span className="mosquito-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="mosquito-management-service-main-card-subtitle">
                  SITE &amp; BREEDING CHECK
                </span>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to locate breeding pockets, resting
                  zones and sources of mosquito activity.
                </p>
              </div>

              <div className="mosquito-management-service-main-image-card">
                <div className="mosquito-management-service-main-image-wrap">
                  <img src={servicetwo} alt="Mosquito treatment" />
                  <span className="mosquito-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="mosquito-management-service-main-card-subtitle">
                  TARGETED APPLICATION
                </span>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted treatment procedures designed to curb mosquito
                  activity effectively across key zones.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="mosquito-management-service-main-faq mosquito-management-service-main-reveal">
            <span className="mosquito-management-service-main-section-subtitle">
              SERVICE CLARIFICATIONS &amp; SAFETY
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="mosquito-management-service-main-faq-intro">
              Find answers to common questions about our mosquito inspection,
              treatment and prevention services.
            </p>

            <div className="mosquito-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`mosquito-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="mosquito-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="mosquito-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="mosquito-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="mosquito-management-service-main-bottom-cta mosquito-management-service-main-reveal">
            <div>
              <span>PROTECT YOUR SPACE FROM MOSQUITOES</span>

              <h2>Need Professional Mosquito Control?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="mosquito-management-service-main-cta-button"
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

export default MosquitomanagementserviceMain;