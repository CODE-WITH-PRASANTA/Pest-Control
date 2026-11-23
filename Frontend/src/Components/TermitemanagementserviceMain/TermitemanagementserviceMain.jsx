import { useEffect, useRef, useState } from "react";
import "./TermitemanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Termite Inspection",
    heading: "Detailed Termite Inspection Services",
    image: serviceone,
    description:
      "Locate mud tubes, hollow timber, wood damage and moisture zones with a thorough inspection of your property.",
  },
  {
    title: "Termite Treatment",
    heading: "Professional Termite Treatment Solutions",
    image: service,
    description:
      "Bring subterranean and drywood termite activity under control with targeted soil barriers, baiting and tailored treatment.",
  },
  {
    title: "Pre & Post-Construction Control",
    heading: "Pre & Post-Construction Termite Protection",
    image: servicetwo,
    description:
      "Focused protection across foundations, plinths, slab joints, utility conduits and existing structures where termites enter.",
  },
  {
    title: "Residential & Commercial Control",
    heading: "Termite Control for Homes & Businesses",
    image: service,
    description:
      "Customized termite management plans for houses, apartments, offices, warehouses, schools and commercial facilities.",
  },
  {
    title: "Preventive Termite Management",
    heading: "Ongoing Termite Prevention & Monitoring",
    image: serviceone,
    description:
      "Minimize the risk of repeat termite infestations with moisture control advice, structural checks and scheduled follow-ups.",
  },
];

const faqs = [
  {
    question: "What does your termite management service include?",
    answer:
      "Our service includes property inspection, identifying mud tubes and vulnerable structural zones, targeted termite treatment and practical recommendations to reduce future infestation risks.",
  },
  {
    question: "Are termite treatments safe for children and pets?",
    answer:
      "We select suitable treatment methods and apply them according to site conditions and safety guidelines. Always follow your technician's instructions regarding treated areas and re-entry times.",
  },
  {
    question: "How often should termite control be inspected or repeated?",
    answer:
      "Inspection and maintenance intervals depend on soil conditions, treatment type, building structure and local termite pressure. Our technician will advise on a suitable monitoring or warranty schedule.",
  },
  {
    question: "How long does a termite treatment take?",
    answer:
      "Service time depends on property size, foundation layout and the extent of termite activity. Your technician will let you know the estimated duration before starting.",
  },
  {
    question: "Do you provide termite control for both homes and commercial spaces?",
    answer:
      "Yes. We provide termite management solutions for residential homes, apartments, offices, storage spaces and commercial buildings.",
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

const TermitemanagementserviceMain = () => {
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
      ".termite-management-service-main-reveal"
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
      className="termite-management-service-main"
      ref={rootRef}
    >
      <div className="termite-management-service-main-glow termite-management-service-main-glow-one" />
      <div className="termite-management-service-main-glow termite-management-service-main-glow-two" />

      <div className="termite-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="termite-management-service-main-sidebar">
          <div className="termite-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`termite-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="termite-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="termite-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="termite-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="termite-management-service-main-contact-card">
            <div className="termite-management-service-main-contact-decoration termite-management-service-main-contact-decoration-one" />
            <div className="termite-management-service-main-contact-decoration termite-management-service-main-contact-decoration-two" />

            <div className="termite-management-service-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="termite-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="termite-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="termite-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="termite-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`termite-management-service-main-hero ${
              imageFailed
                ? "termite-management-service-main-hero-fallback"
                : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="termite-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="termite-management-service-main-hero-overlay" />

            <span className="termite-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="termite-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="termite-management-service-main-hero-label">
                PROFESSIONAL TERMITE MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="termite-management-service-main-overview termite-management-service-main-reveal">
            <span className="termite-management-service-main-section-subtitle">
              ABOUT TERMITE MANAGEMENT
            </span>

            <h2>Termite Management Overview</h2>

            <p>
              Termites often work silently behind walls, under flooring and
              around foundations, weakening wood framing, cabinetry, doors and
              stored materials before visible damage appears. Our team inspects
              high-risk areas, spots early signs of activity and recommends
              targeted termite control for your property.
            </p>

            <p>
              Every structure has different vulnerability points. We evaluate
              building layout, soil and moisture conditions, and signs of
              termite presence before recommending an effective treatment and
              prevention plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="termite-management-service-main-comprehensive termite-management-service-main-reveal">
            <span className="termite-management-service-main-section-subtitle">
              TARGETED TERMITE CONTROL
            </span>

            <h2>Complete Termite Control Solutions</h2>

            <p>
              From residential homes to commercial buildings, we offer practical
              termite management tailored to structural conditions and
              infestation levels.
            </p>

            <div className="termite-management-service-main-image-grid">
              <div className="termite-management-service-main-image-card">
                <div className="termite-management-service-main-image-wrap">
                  <img src={serviceone} alt="Termite inspection" />
                  <span className="termite-management-service-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to spot mud tubes, wood damage and
                  high-risk moisture zones.
                </p>
              </div>

              <div className="termite-management-service-main-image-card">
                <div className="termite-management-service-main-image-wrap">
                  <img src={servicetwo} alt="Termite treatment" />
                  <span className="termite-management-service-main-image-number">
                    02
                  </span>
                </div>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted control measures designed to manage termite activity
                  reliably and safely.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="termite-management-service-main-faq termite-management-service-main-reveal">
            <span className="termite-management-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="termite-management-service-main-faq-intro">
              Find answers to common questions about our termite inspection,
              treatment and prevention services.
            </p>

            <div className="termite-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`termite-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="termite-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="termite-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="termite-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="termite-management-service-main-bottom-cta termite-management-service-main-reveal">
            <div>
              <span>KEEP YOUR PROPERTY TERMITE-FREE</span>

              <h2>Need Professional Termite Control?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="termite-management-service-main-cta-button"
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

export default TermitemanagementserviceMain;