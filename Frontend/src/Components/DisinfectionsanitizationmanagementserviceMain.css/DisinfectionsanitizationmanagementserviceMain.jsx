import { useEffect, useRef, useState } from "react";
import "./DisinfectionsanitizationmanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Hygiene & Surface Audit",
    subtitle: "HIGH-TOUCH & RISK ZONE AUDIT",
    heading: "Detailed Disinfection & Sanitization Inspection",
    image: serviceone,
    description:
      "Assess high-touch surfaces, shared spaces, restrooms, workstations and ventilation touchpoints to plan thorough sanitization coverage.",
  },
  {
    title: "Surface Disinfection",
    subtitle: "BROAD-SPECTRUM HYGIENE CARE",
    heading: "Professional Disinfection & Sanitization Solutions",
    image: service,
    description:
      "Reduce bacteria, viruses and surface contaminants across frequently touched points and rooms with structured disinfection procedures.",
  },
  {
    title: "Mist & Fog Sanitization",
    subtitle: "AIR & ENCLOSED SPACE COVERAGE",
    heading: "Targeted Mist & Fogging Sanitization",
    image: servicetwo,
    description:
      "Reach hard-to-wipe corners, seating areas, cabins and enclosed rooms with controlled misting and sanitization application.",
  },
  {
    title: "Residential & Commercial Care",
    subtitle: "HOMES, OFFICES & FACILITIES",
    heading: "Sanitization Services for Homes & Businesses",
    image: service,
    description:
      "Tailored disinfection and sanitization plans for apartments, houses, offices, clinics, schools, retail outlets and commercial premises.",
  },
  {
    title: "Preventive Hygiene Plans",
    subtitle: "ROUTINE & ONGOING SANITATION",
    heading: "Ongoing Sanitization & Hygiene Management",
    image: serviceone,
    description:
      "Maintain a cleaner, safer environment with practical hygiene routines, high-touch checklists and scheduled sanitization follow-ups.",
  },
];

const faqs = [
  {
    question: "What does your disinfection and sanitization service include?",
    answer:
      "Our service includes evaluating high-touch surfaces and key zones, applying targeted disinfection and sanitization treatments, and sharing practical hygiene guidance.",
  },
  {
    question: "Are disinfection treatments safe for children and pets?",
    answer:
      "We select appropriate sanitization methods for the space and provide clear safety instructions. Always follow your technician's re-entry and surface-drying guidance.",
  },
  {
    question: "How often should sanitization be repeated?",
    answer:
      "Frequency depends on footfall, shared usage, room type and hygiene requirements. Our team can recommend a suitable routine or periodic schedule after assessment.",
  },
  {
    question: "How long does sanitization take?",
    answer:
      "Duration depends on property size, room count and the treatment method used. Your technician will inform you of the expected time before starting.",
  },
  {
    question: "Do you provide sanitization for both homes and commercial spaces?",
    answer:
      "Yes. We offer disinfection and sanitization services for residences, offices, clinics, hospitality spaces, warehouses and commercial buildings.",
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

const DisinfectionsanitizationmanagementserviceMain = () => {
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
      ".disinfection-sanitization-management-service-main-reveal"
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
      className="disinfection-sanitization-management-service-main"
      ref={rootRef}
    >
      <div className="disinfection-sanitization-management-service-main-glow disinfection-sanitization-management-service-main-glow-one" />
      <div className="disinfection-sanitization-management-service-main-glow disinfection-sanitization-management-service-main-glow-two" />

      <div className="disinfection-sanitization-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="disinfection-sanitization-management-service-main-sidebar">
          <div className="disinfection-sanitization-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`disinfection-sanitization-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="disinfection-sanitization-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="disinfection-sanitization-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="disinfection-sanitization-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="disinfection-sanitization-management-service-main-contact-card">
            <div className="disinfection-sanitization-management-service-main-contact-decoration disinfection-sanitization-management-service-main-contact-decoration-one" />
            <div className="disinfection-sanitization-management-service-main-contact-decoration disinfection-sanitization-management-service-main-contact-decoration-two" />

            <div className="disinfection-sanitization-management-service-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="disinfection-sanitization-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="disinfection-sanitization-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="disinfection-sanitization-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="disinfection-sanitization-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`disinfection-sanitization-management-service-main-hero ${
              imageFailed
                ? "disinfection-sanitization-management-service-main-hero-fallback"
                : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="disinfection-sanitization-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="disinfection-sanitization-management-service-main-hero-overlay" />

            <span className="disinfection-sanitization-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="disinfection-sanitization-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="disinfection-sanitization-management-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="disinfection-sanitization-management-service-main-overview disinfection-sanitization-management-service-main-reveal">
            <span className="disinfection-sanitization-management-service-main-section-subtitle">
              HYGIENE &amp; SANITIZATION STRATEGY
            </span>

            <h2>Disinfection &amp; Sanitization Overview</h2>

            <p>
              Door handles, switches, desks, counters and shared rooms pick up
              daily contact germs and microbes quickly. Our team evaluates
              high-exposure areas and applies targeted disinfection and
              sanitization to keep your space hygienic.
            </p>

            <p>
              Every property has different traffic and usage patterns. We
              consider room layout, occupancy and high-contact surfaces before
              recommending an appropriate sanitization and maintenance plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="disinfection-sanitization-management-service-main-comprehensive disinfection-sanitization-management-service-main-reveal">
            <span className="disinfection-sanitization-management-service-main-section-subtitle">
              SURFACE &amp; SPACE COVERAGE
            </span>

            <h2>Complete Disinfection &amp; Sanitization Solutions</h2>

            <p>
              From home interiors to busy commercial premises, we provide
              practical sanitization tailored to the space and hygiene needs.
            </p>

            <div className="disinfection-sanitization-management-service-main-image-grid">
              <div className="disinfection-sanitization-management-service-main-image-card">
                <div className="disinfection-sanitization-management-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Disinfection and hygiene inspection"
                  />
                  <span className="disinfection-sanitization-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="disinfection-sanitization-management-service-main-card-subtitle">
                  HIGH-TOUCH ZONE CHECK
                </span>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to identify high-contact surfaces and
                  priority sanitization zones.
                </p>
              </div>

              <div className="disinfection-sanitization-management-service-main-image-card">
                <div className="disinfection-sanitization-management-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Sanitization treatment application"
                  />
                  <span className="disinfection-sanitization-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="disinfection-sanitization-management-service-main-card-subtitle">
                  TARGETED APPLICATION
                </span>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted sanitization procedures designed to maintain clean,
                  hygienic indoor surfaces.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="disinfection-sanitization-management-service-main-faq disinfection-sanitization-management-service-main-reveal">
            <span className="disinfection-sanitization-management-service-main-section-subtitle">
              SAFETY &amp; SERVICE ANSWERS
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="disinfection-sanitization-management-service-main-faq-intro">
              Find answers to common questions about our disinfection,
              sanitization and hygiene services.
            </p>

            <div className="disinfection-sanitization-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`disinfection-sanitization-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="disinfection-sanitization-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="disinfection-sanitization-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="disinfection-sanitization-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="disinfection-sanitization-management-service-main-bottom-cta disinfection-sanitization-management-service-main-reveal">
            <div>
              <span>KEEP YOUR PROPERTY CLEAN &amp; SANITIZED</span>

              <h2>Need Professional Disinfection &amp; Sanitization?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="disinfection-sanitization-management-service-main-cta-button"
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

export default DisinfectionsanitizationmanagementserviceMain;