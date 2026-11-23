import { useEffect, useRef, useState } from "react";
import "./AntmanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Ant Trail Inspection",
    subtitle: "TRAIL & NESTING SOURCE AUDIT",
    heading: "Detailed Ant Inspection Services",
    image: serviceone,
    description:
      "Trace ant trails, entry points, wall gaps, skirting boards and outdoor nesting spots to pinpoint where ant activity originates.",
  },
  {
    title: "Ant Control Treatment",
    subtitle: "INDOOR & PERIMETER CONTROL",
    heading: "Professional Ant Management Solutions",
    image: service,
    description:
      "Reduce ant activity across kitchens, pantries, balconies, walls and entry points with structured treatment suited to your space.",
  },
  {
    title: "Kitchen & Entry Point Care",
    subtitle: "FOOD ZONES & CRACK SEALING CARE",
    heading: "Targeted Kitchen & Entry Point Ant Control",
    image: servicetwo,
    description:
      "Focused attention around kitchen counters, cabinets, sinks, window frames and gaps where ants forage and enter.",
  },
  {
    title: "Residential & Commercial Control",
    subtitle: "HOMES, OFFICES & FOOD SPACES",
    heading: "Ant Control for Homes & Businesses",
    image: service,
    description:
      "Practical ant management services for houses, flats, cafes, restaurants, offices, storage rooms and commercial sites.",
  },
  {
    title: "Preventive Ant Management",
    subtitle: "ONGOING TRAIL & SOURCE CARE",
    heading: "Ongoing Ant Prevention & Management",
    image: serviceone,
    description:
      "Keep ant trails down with practical food-storage and entry-point guidance along with recommended follow-up checks.",
  },
];

const faqs = [
  {
    question: "What does your ant management service include?",
    answer:
      "Our service includes inspecting ant trails and potential entry or nesting spots, applying targeted control measures, and sharing practical prevention tips.",
  },
  {
    question: "Are ant treatments safe for children and pets?",
    answer:
      "We select appropriate treatment methods based on the area and share clear safety instructions. Always follow your technician's re-entry and kitchen safety guidance.",
  },
  {
    question: "How often should ant treatment be repeated?",
    answer:
      "Frequency depends on ant activity levels, surrounding greenery or cracks and the treatment approach used. Our technician can suggest a suitable follow-up schedule after inspection.",
  },
  {
    question: "How long does ant treatment take?",
    answer:
      "Service time varies with property size and affected zones. Your technician will let you know the expected duration before starting.",
  },
  {
    question: "Do you provide ant control for homes and commercial spaces?",
    answer:
      "Yes. We provide ant management solutions for individual homes, apartments, offices, cafes, shops and commercial premises.",
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

const AntmanagementserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".ant-management-service-main-reveal");

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
    <section className="ant-management-service-main" ref={rootRef}>
      <div className="ant-management-service-main-glow ant-management-service-main-glow-one" />
      <div className="ant-management-service-main-glow ant-management-service-main-glow-two" />

      <div className="ant-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="ant-management-service-main-sidebar">
          <div className="ant-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`ant-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="ant-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="ant-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="ant-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="ant-management-service-main-contact-card">
            <div className="ant-management-service-main-contact-decoration ant-management-service-main-contact-decoration-one" />
            <div className="ant-management-service-main-contact-decoration ant-management-service-main-contact-decoration-two" />

            <div className="ant-management-service-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="ant-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="ant-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="ant-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="ant-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`ant-management-service-main-hero ${
              imageFailed ? "ant-management-service-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="ant-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="ant-management-service-main-hero-overlay" />

            <span className="ant-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="ant-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="ant-management-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="ant-management-service-main-overview ant-management-service-main-reveal">
            <span className="ant-management-service-main-section-subtitle">
              ANT CONTROL STRATEGY
            </span>

            <h2>Ant Management Overview</h2>

            <p>
              Ants quickly follow food trails, moisture spots, wall gaps and
              entry points, making short-term surface wiping only a temporary
              fix. Our team inspects trails and common access areas to recommend
              targeted ant management for your property.
            </p>

            <p>
              Every space has different activity patterns. We assess indoor
              foraging zones, wall crevices and outdoor entry routes before
              suggesting a practical treatment and prevention plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="ant-management-service-main-comprehensive ant-management-service-main-reveal">
            <span className="ant-management-service-main-section-subtitle">
              TRAIL &amp; ENTRY POINT CARE
            </span>

            <h2>Complete Ant Control Solutions</h2>

            <p>
              From home kitchens to commercial spaces, we provide practical ant
              management tailored to the affected areas and activity levels.
            </p>

            <div className="ant-management-service-main-image-grid">
              <div className="ant-management-service-main-image-card">
                <div className="ant-management-service-main-image-wrap">
                  <img src={serviceone} alt="Ant trail inspection" />
                  <span className="ant-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="ant-management-service-main-card-subtitle">
                  TRAIL &amp; ACCESS CHECK
                </span>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to trace ant trails, entry gaps and
                  active nesting zones.
                </p>
              </div>

              <div className="ant-management-service-main-image-card">
                <div className="ant-management-service-main-image-wrap">
                  <img src={servicetwo} alt="Ant control treatment" />
                  <span className="ant-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="ant-management-service-main-card-subtitle">
                  TARGETED APPLICATION
                </span>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted treatment procedures designed to curb ant activity
                  effectively across key spots.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="ant-management-service-main-faq ant-management-service-main-reveal">
            <span className="ant-management-service-main-section-subtitle">
              SERVICE CLARIFICATIONS &amp; SAFETY
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="ant-management-service-main-faq-intro">
              Find answers to common questions about our ant inspection,
              treatment and prevention services.
            </p>

            <div className="ant-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`ant-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="ant-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="ant-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="ant-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="ant-management-service-main-bottom-cta ant-management-service-main-reveal">
            <div>
              <span>KEEP YOUR PROPERTY ANT-FREE</span>

              <h2>Need Professional Ant Control?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="ant-management-service-main-cta-button"
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

export default AntmanagementserviceMain;