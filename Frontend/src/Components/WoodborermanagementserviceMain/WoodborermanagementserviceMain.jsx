import { useEffect, useRef, useState } from "react";
import "./WoodborermanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Wood Borer Inspection",
    heading: "Detailed Wood Borer Inspection Services",
    image: serviceone,
    description:
      "Locate exit holes, fine wood dust (frass), tunneling and weakened timber across furniture, beams, doors and flooring.",
  },
  {
    title: "Wood Borer Treatment",
    heading: "Professional Wood Borer Treatment Solutions",
    image: service,
    description:
      "Bring powderpost beetle and wood-boring insect activity under control with targeted injection, surface and tailored treatments.",
  },
  {
    title: "Furniture & Timber Care",
    heading: "Targeted Furniture & Structural Timber Care",
    image: servicetwo,
    description:
      "Focused treatment for wooden cabinets, wardrobes, paneling, rafters, staircases and decorative wood fixtures.",
  },
  {
    title: "Residential & Commercial Sites",
    heading: "Wood Borer Control for Homes & Businesses",
    image: service,
    description:
      "Customized wood borer management plans for homes, apartments, showrooms, offices, hotels and commercial spaces.",
  },
  {
    title: "Preventive Wood Protection",
    heading: "Ongoing Wood Borer Prevention & Care",
    image: serviceone,
    description:
      "Minimize the risk of repeat wood borer damage with seasoned timber guidance, humidity control tips and scheduled follow-ups.",
  },
];

const faqs = [
  {
    question: "What does your wood borer management service include?",
    answer:
      "Our service includes inspecting wooden items and structural timber, identifying active exit holes and wood dust, applying targeted treatment and sharing practical care tips to help prevent re-infestation.",
  },
  {
    question: "How do I know if wood borers are active in my furniture?",
    answer:
      "Common signs include small round exit holes in wood surfaces, fine sawdust-like powder (frass) below or around furniture, clicking sounds or soft, crumbling wood.",
  },
  {
    question: "Are wood borer treatments safe for homes, children and pets?",
    answer:
      "We select appropriate treatment methods for indoor wood and living spaces and share clear safety guidance. Always follow your technician's instructions on ventilation and contact after treatment.",
  },
  {
    question: "How long does a wood borer treatment take?",
    answer:
      "Service time depends on the number of affected pieces or structural areas and how thoroughly they need to be treated. Your technician will let you know the expected time before starting.",
  },
  {
    question: "Do you treat both household furniture and commercial woodwork?",
    answer:
      "Yes. We provide wood borer control for residential furniture, doors and cabinetry as well as offices, showrooms, hospitality spaces and commercial buildings.",
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
    <section
      className="wood-borer-management-service-main"
      ref={rootRef}
    >
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
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="wood-borer-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
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
                PROFESSIONAL WOOD BORER MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="wood-borer-management-service-main-overview wood-borer-management-service-main-reveal">
            <span className="wood-borer-management-service-main-section-subtitle">
              ABOUT WOOD BORER MANAGEMENT
            </span>

            <h2>Wood Borer Management Overview</h2>

            <p>
              Wood-boring insects tunnel through seasoned and structural timber,
              leaving tiny exit holes and powdery frass while gradually
              weakening furniture, doors, cabinetry and woodwork from the
              inside out. Our team inspects affected wood, identifies active
              zones and recommends targeted wood borer control for your
              property.
            </p>

            <p>
              Every piece of wood and building layout has different needs. We
              examine wood condition, moisture exposure and signs of borer
              activity before suggesting an effective treatment and prevention
              plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="wood-borer-management-service-main-comprehensive wood-borer-management-service-main-reveal">
            <span className="wood-borer-management-service-main-section-subtitle">
              TARGETED WOOD BORER CONTROL
            </span>

            <h2>Complete Wood Borer Control Solutions</h2>

            <p>
              From household furniture to commercial interiors, we offer
              practical wood borer management tailored to the timber type and
              infestation conditions.
            </p>

            <div className="wood-borer-management-service-main-image-grid">
              <div className="wood-borer-management-service-main-image-card">
                <div className="wood-borer-management-service-main-image-wrap">
                  <img src={serviceone} alt="Wood borer inspection" />
                  <span className="wood-borer-management-service-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to spot exit holes, wood dust and
                  affected timber zones.
                </p>
              </div>

              <div className="wood-borer-management-service-main-image-card">
                <div className="wood-borer-management-service-main-image-wrap">
                  <img src={servicetwo} alt="Wood borer treatment" />
                  <span className="wood-borer-management-service-main-image-number">
                    02
                  </span>
                </div>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted control measures designed to manage wood borer
                  activity reliably and safely.
                </p>
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
              Find answers to common questions about our wood borer inspection,
              treatment and prevention services.
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
              <span>PROTECT YOUR WOODWORK & PROPERTY</span>

              <h2>Need Professional Wood Borer Control?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
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