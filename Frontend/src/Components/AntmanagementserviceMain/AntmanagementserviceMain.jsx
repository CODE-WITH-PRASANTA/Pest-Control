import { useEffect, useRef, useState } from "react";
import "./AntmanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Ant Trail Inspection",
    subtitle: "TRAIL & NESTING SOURCE AUDIT",
    heading: "Detailed Ant Colony & Entry Inspection",
    image: serviceone,
    description:
      "Trace sugar ant, carpenter ant, and red ant trails, wall gaps, electrical points, and outdoor nesting spots to target colonies at the source.",
  },
  {
    title: "Ant Control Treatment",
    subtitle: "INDOOR & PERIMETER CONTROL",
    heading: "Ant Control Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control uses eco-friendly, targeted treatments to eliminate ant colonies at the source across kitchens, pantries, balconies, and offices.",
  },
  {
    title: "Kitchen & Wiring Protection",
    subtitle: "FOOD ZONES & ELECTRICAL SAFETY",
    heading: "Targeted Kitchen & Entry Point Ant Control",
    image: servicetwo,
    description:
      "Protect food counters, cabinets, sinks, and electrical wiring from contamination and damage with precision gel and barrier care.",
  },
  {
    title: "Residential & Commercial Control",
    subtitle: "HOMES, OFFICES & FOOD SPACES",
    heading: "Ant Control for Homes & Businesses in Odisha",
    image: service,
    description:
      "Practical ant management solutions for houses, flats, cafes, restaurants, offices, and commercial premises across Bhubaneswar, Cuttack, and Puri.",
  },
  {
    title: "Preventive Ant Management",
    subtitle: "ONGOING TRAIL & SOURCE CARE",
    heading: "Ongoing Ant Prevention & Pest Management",
    image: serviceone,
    description:
      "Keep ant trails away with entry-point guidance and scheduled follow-ups alongside expert pest and termite control across Cuttack and nearby cities.",
  },
];

const faqs = [
  {
    question: "What does Giridurga Pest Control's ant management service include?",
    answer:
      "Our service includes inspecting ant trails and nesting spots, applying eco-friendly colony-targeted treatments for sugar ants, carpenter ants, and red ants, and sharing prevention tips.",
  },
  {
    question: "Are your ant control treatments safe for children, pets, and kitchens?",
    answer:
      "Yes. Giridurga Pest Control uses eco-friendly, odorless, and targeted formulations designed for residential kitchens, offices, and food spaces, accompanied by clear safety guidance.",
  },
  {
    question: "Which cities in Odisha do you serve for ant and pest control?",
    answer:
      "We serve Bhubaneswar, Cuttack, Puri, and surrounding cities in Odisha with genuine rates, fast response, and reliable ant, termite, and general pest control services.",
  },
  {
    question: "Why do ants keep returning after regular spray or wiping?",
    answer:
      "Surface sprays only affect visible worker ants while leaving the hidden queen and colony intact. Our targeted treatments eliminate the ant colony at its source to stop recurring trails.",
  },
  {
    question: "Do you provide ant control for both homes and commercial spaces?",
    answer:
      "Yes. We provide customized ant management solutions for individual homes, apartments, offices, cafes, hospitals, shops, and commercial buildings across Odisha.",
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
              <h2>Contact Giridurga Pest Control for any advice</h2>

              <a
                href="tel:+919876543210"
                className="ant-management-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
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
              GIRIDURGA PEST CONTROL • ANT CONTROL STRATEGY
            </span>

            <h2>Ant Control Services in Odisha</h2>

            <p>
              Are ants invading your home or office in Odisha? Don’t let these
              tiny pests become a big problem. At{" "}
              <strong>Giridurga Pest Control</strong>, we offer professional ant
              management services in Odisha to keep your space clean, safe, and
              pest-free.
            </p>

            <p>
              Ants can cause more damage than you might think. From
              contaminating food to damaging electrical wiring, they’re more than
              just a nuisance. Our trained experts use eco-friendly and
              effective solutions to eliminate ant colonies at the source — not
              just the surface. Whether you're dealing with{" "}
              <strong>sugar ants, carpenter ants, or red ants</strong>, we have
              targeted treatments to remove them completely.
            </p>

            <p>
              Serving <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby
              areas, Giridurga Pest Control is recognized among reliable{" "}
              <strong>Pest Control Service Providers in Cuttack</strong> and
              delivers the{" "}
              <strong>best pest control services in Bhubaneswar</strong> and{" "}
              <strong>pest control Puri</strong> with safe, long-lasting
              results.
            </p>

            <ul className="ant-management-service-main-highlights">
              <li>
                <span className="ant-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Eliminates ant colonies at the source — not just surface
                  trails
                </span>
              </li>
              <li>
                <span className="ant-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Targeted care for sugar ants, carpenter ants &amp; red ants
                </span>
              </li>
              <li>
                <span className="ant-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Eco-friendly, safe &amp; odorless solutions for homes and
                  offices
                </span>
              </li>
            </ul>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="ant-management-service-main-comprehensive ant-management-service-main-reveal">
            <span className="ant-management-service-main-section-subtitle">
              TRAIL &amp; ENTRY POINT CARE
            </span>

            <h2>Complete Ant Control Solutions</h2>

            <p>
              From home kitchens to commercial spaces, Giridurga Pest Control
              provides the <strong>best pest control services in Cuttack</strong>
              , <strong>pest control Bhubaneswar</strong>, and{" "}
              <strong>pest control Puri</strong> alongside specialized ant
              management and{" "}
              <strong>expert pest and termite control across Cuttack</strong>.
            </p>

            <div className="ant-management-service-main-image-grid">
              <div className="ant-management-service-main-image-card">
                <div className="ant-management-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Ant trail and colony inspection in Odisha"
                  />
                  <span className="ant-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="ant-management-service-main-card-subtitle">
                  TRAIL &amp; ACCESS CHECK
                </span>

                <h3>Detailed Colony Inspection</h3>

                <p>
                  Detailed inspection to trace ant trails, entry gaps,
                  electrical conduits, and active nesting zones in homes and
                  offices.
                </p>
              </div>

              <div className="ant-management-service-main-image-card">
                <div className="ant-management-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Targeted eco-friendly ant control treatment"
                  />
                  <span className="ant-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="ant-management-service-main-card-subtitle">
                  COLONY-LEVEL APPLICATION
                </span>

                <h3>Targeted Eco-Friendly Treatment</h3>

                <p>
                  Targeted gel and perimeter treatments designed to eliminate
                  sugar ants, carpenter ants, and red ants right at the colony
                  source.
                </p>
              </div>
            </div>

            {/* LOCAL SERVICE COVERAGE & KEYWORDS */}
            <div className="ant-management-service-main-local-box">
              <span className="ant-management-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Trusted Ant &amp; Pest Control Across Odisha</h3>
              <p>
                Looking for{" "}
                <strong>Best Pest Control in Cuttack with genuine rates</strong>{" "}
                or dependable <strong>pest control near Cuttack, Odisha</strong>?
                Giridurga Pest Control delivers complete{" "}
                <strong>pest control solutions in Cuttack</strong>, Bhubaneswar,
                and Puri for residential and commercial properties.
              </p>
              <div className="ant-management-service-main-keyword-tags">
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
          <div className="ant-management-service-main-faq ant-management-service-main-reveal">
            <span className="ant-management-service-main-section-subtitle">
              SERVICE CLARIFICATIONS &amp; SAFETY
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="ant-management-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              ant inspection, colony treatment, and prevention services in
              Odisha.
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
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Ant Control in Odisha?</h2>

              <p>
                Get in touch with Giridurga Pest Control for eco-friendly ant
                colony removal at genuine rates.
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