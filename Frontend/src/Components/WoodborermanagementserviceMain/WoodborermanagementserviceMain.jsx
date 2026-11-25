import { useEffect, useRef, useState } from "react";
import "./WoodborermanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Woodborer Inspection",
    subtitle: "EXIT HOLES & FRASS AUDIT",
    heading: "Detailed Woodborer Inspection Services in Odisha",
    image: serviceone,
    description:
      "Locate exit holes, fine wood dust (frass), internal larval tunnels, and weakened timber across furniture, doors, windows, and panels.",
  },
  {
    title: "Woodborer Treatment",
    subtitle: "ODORLESS & STAIN-FREE CARE",
    heading: "Woodborer Management Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control uses advanced injection techniques and odorless, government-approved wood treatment solutions to target woodborers at the larval stage.",
  },
  {
    title: "Furniture & Timber Care",
    subtitle: "CABINETS, DOORS & PANELS",
    heading: "Targeted Furniture & Structural Timber Care",
    image: servicetwo,
    description:
      "Safe, stain-free treatment for wooden furniture, wardrobes, wooden panels, storage units, and finishes with minimal disruption.",
  },
  {
    title: "Residential & Commercial Sites",
    subtitle: "HOMES, OFFICES & SHOWROOMS",
    heading: "Woodborer Control for Homes & Businesses",
    image: service,
    description:
      "Customized woodborer management plans for homes, offices, showrooms, institutions, and warehouses across Bhubaneswar, Cuttack, and Puri.",
  },
  {
    title: "Preventive Wood Protection",
    subtitle: "LONG-TERM TIMBER DEFENSE",
    heading: "Ongoing Woodborer Prevention & Care",
    image: serviceone,
    description:
      "Protect valuable wooden assets from future attacks with preventive barriers and expert pest and termite control across Cuttack and Odisha.",
  },
];

const faqs = [
  {
    question: "What does Giridurga Pest Control's woodborer management service include?",
    answer:
      "Our service includes inspecting wooden furniture, doors, windows, and panels for exit holes and wood dust, applying targeted injection and surface treatments with government-approved, eco-safe chemicals, and sharing preventive care tips.",
  },
  {
    question: "How do I know if woodborers are active in my furniture or woodwork?",
    answer:
      "Common signs include tiny round exit holes on wood surfaces, fine sawdust-like powder (frass) falling below furniture, hollow-sounding timber, or weakened wood edges.",
  },
  {
    question: "Are your woodborer treatments odorless, stain-free, and safe for pets?",
    answer:
      "Yes. Giridurga Pest Control uses odorless, stain-free, government-approved formulations that are safe for all types of wood finishes, families, and pets, accompanied by clear ventilation guidance.",
  },
  {
    question: "Which cities in Odisha do you serve for woodborer and pest control?",
    answer:
      "We serve Bhubaneswar, Cuttack, Puri, and nearby regions in Odisha with genuine rates, minimal disruption, and reliable woodborer, termite, and general pest control services.",
  },
  {
    question: "Do you treat both household furniture and commercial woodwork?",
    answer:
      "Yes. Whether it is your home, office, showroom, institution, or warehouse, we provide customized woodborer management solutions for all residential and commercial wooden assets.",
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

const WoodborermanagementserviceMain = () => {
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
      ".wood-borer-management-service-main-reveal"
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
    <section className="wood-borer-management-service-main" ref={rootRef}>
      <div className="wood-borer-management-service-main-glow wood-borer-management-service-main-glow-one" />
      <div className="wood-borer-management-service-main-glow wood-borer-management-service-main-glow-two" />

      <div className="wood-borer-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="wood-borer-management-service-main-sidebar">
          <div className="wood-borer-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`wood-borer-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="wood-borer-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="wood-borer-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="wood-borer-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="wood-borer-management-service-main-contact-card">
            <div className="wood-borer-management-service-main-contact-decoration wood-borer-management-service-main-contact-decoration-one" />
            <div className="wood-borer-management-service-main-contact-decoration wood-borer-management-service-main-contact-decoration-two" />

            <div className="wood-borer-management-service-main-contact-content">
              <h2>Contact Giridurga Pest Control for any advice</h2>

              <a
                href="tel:+919876543210"
                className="wood-borer-management-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="wood-borer-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="wood-borer-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="wood-borer-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`wood-borer-management-service-main-hero ${
              imageFailed
                ? "wood-borer-management-service-main-hero-fallback"
                : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="wood-borer-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="wood-borer-management-service-main-hero-overlay" />

            <span className="wood-borer-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="wood-borer-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="wood-borer-management-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="wood-borer-management-service-main-overview wood-borer-management-service-main-reveal">
            <span className="wood-borer-management-service-main-section-subtitle">
              GIRIDURGA PEST CONTROL • TIMBER &amp; FURNITURE EXPERTS
            </span>

            <h2>Woodborer Management Services in Odisha</h2>

            <p>
              Woodborers are silent destroyers that attack wooden furniture,
              doors, windows, and structural timber from within. These tiny
              pests lay eggs inside the wood, and their larvae bore deep
              tunnels, weakening the structure and reducing the lifespan of your
              valuable wooden assets.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we offer expert
              woodborer management services in Odisha to help homeowners,
              businesses, and institutions protect their wood from internal
              damage. Our team uses advanced injection techniques and odorless
              wood treatment solutions to control active infestations and help
              prevent future attacks.
            </p>

            <p>
              We inspect and treat infected areas in furniture, wooden panels,
              and storage units using government-approved, eco-safe chemicals.
              Our customized woodborer control solutions ensure minimal
              disruption, no staining, and dependable safety for your family
              and pets.
            </p>

            <p>
              Whether it's your home, office, showroom, or warehouse, we
              provide reliable and long-term protection across{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby regions.
            </p>

            <ul className="wood-borer-management-service-main-highlights">
              <li>
                <span className="wood-borer-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Targets woodborers at larval stage</span>
              </li>
              <li>
                <span className="wood-borer-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Odorless, stain-free &amp; long-lasting treatment</span>
              </li>
              <li>
                <span className="wood-borer-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Safe for all types of wood &amp; finishes</span>
              </li>
            </ul>

            <p className="wood-borer-management-service-main-tagline">
              Don’t wait until your woodwork is permanently damaged—act now with
              Giridurga Pest Control.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="wood-borer-management-service-main-comprehensive wood-borer-management-service-main-reveal">
            <span className="wood-borer-management-service-main-section-subtitle">
              TARGETED WOODBORER CONTROL
            </span>

            <h2>Woodborer Management Services in Odisha</h2>

            <p>
              Trusted among{" "}
              <strong>Pest Control Service Providers in Cuttack</strong> and
              known for the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, and{" "}
              <strong>expert pest and termite control across Cuttack</strong>,
              Giridurga Pest Control protects residential and commercial
              woodwork at genuine rates.
            </p>

            <div className="wood-borer-management-service-main-image-grid">
              <div className="wood-borer-management-service-main-image-card">
                <div className="wood-borer-management-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Woodborer inspection in Odisha"
                  />
                  <span className="wood-borer-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="wood-borer-management-service-main-card-subtitle">
                  EXIT HOLES &amp; FRASS CHECK
                </span>

                <h3>Detailed Wood Inspection</h3>

                <p>
                  Detailed inspection to spot exit holes, powdery wood dust,
                  and internal larval tunnels across furniture and timber.
                </p>
              </div>

              <div className="wood-borer-management-service-main-image-card">
                <div className="wood-borer-management-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Odorless woodborer injection treatment"
                  />
                  <span className="wood-borer-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="wood-borer-management-service-main-card-subtitle">
                  STAIN-FREE LARVAL TREATMENT
                </span>

                <h3>Advanced Injection Treatment</h3>

                <p>
                  Precision injection and surface care using odorless,
                  government-approved chemicals safe for all wood finishes.
                </p>
              </div>
            </div>

            {/* LOCAL SERVICE COVERAGE & KEYWORDS */}
            <div className="wood-borer-management-service-main-local-box">
              <span className="wood-borer-management-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Woodborer &amp; Pest Protection Across Odisha</h3>
              <p>
                Looking for{" "}
                <strong>Best Pest Control in Cuttack with genuine rates</strong>{" "}
                or dependable <strong>pest control near Cuttack, Odisha</strong>?
                Giridurga Pest Control delivers the{" "}
                <strong>best pest control services in Cuttack</strong> and
                comprehensive{" "}
                <strong>pest control solutions in Cuttack</strong>, Bhubaneswar,
                and Puri.
              </p>
              <div className="wood-borer-management-service-main-keyword-tags">
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
          <div className="wood-borer-management-service-main-faq wood-borer-management-service-main-reveal">
            <span className="wood-borer-management-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="wood-borer-management-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              woodborer inspection, odorless treatment, and prevention services.
            </p>

            <div className="wood-borer-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`wood-borer-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="wood-borer-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="wood-borer-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="wood-borer-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="wood-borer-management-service-main-bottom-cta wood-borer-management-service-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Woodborer Control?</h2>

              <p>
                Don’t wait until your woodwork is permanently damaged—contact
                Giridurga Pest Control today for genuine rates and stain-free
                protection.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="wood-borer-management-service-main-cta-button"
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

export default WoodborermanagementserviceMain;