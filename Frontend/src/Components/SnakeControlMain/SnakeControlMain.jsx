import { useEffect, useRef, useState } from "react";
import "./SnakeControlMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Inspection & Habitat Check",
    subtitle: "ENTRY POINTS & RODENT AUDIT",
    heading: "Detailed Snake Inspection & Habitat Check",
    image: serviceone,
    description:
      "Identifying entry points, hiding spots, overgrown vegetation, and food sources like rodents around residential and commercial buildings.",
  },
  {
    title: "Trapping & Removal",
    subtitle: "SAFE & HUMANE RELOCATION",
    heading: "Safe & Effective Snake Control Services",
    image: service,
    description:
      "Giridurga Pest Control uses safe, humane methods to capture and relocate snakes away from your premises with trained experts.",
  },
  {
    title: "Exclusion Measures",
    subtitle: "CRACK & GAP SEALING CARE",
    heading: "Targeted Snake Entry Exclusion Measures",
    image: servicetwo,
    description:
      "Sealing cracks, gaps, drainage openings, and structural entryways to help block snake access around homes and compounds.",
  },
  {
    title: "Environmental Management",
    subtitle: "YARD & RODENT CONTROL",
    heading: "Habitat & Environmental Management",
    image: service,
    description:
      "Advising on vegetation control, debris clearance, and rodent management to make surroundings snake-unfriendly across Odisha.",
  },
  {
    title: "Preventive Solutions",
    subtitle: "LONG-TERM SITE PROTECTION",
    heading: "Long-Term Preventive Snake Solutions",
    image: serviceone,
    description:
      "Providing long-term strategies to reduce the chances of snakes returning across Bhubaneswar, Cuttack, Puri, and nearby areas.",
  },
];

const helpItems = [
  {
    title: "Inspection & Habitat Check",
    detail:
      "Identifying entry points, hiding spots, and food sources like rodents.",
  },
  {
    title: "Trapping & Removal",
    detail:
      "Using safe, humane methods to capture and relocate snakes away from your premises.",
  },
  {
    title: "Exclusion Measures",
    detail:
      "Sealing cracks, gaps, and openings to block snake entry.",
  },
  {
    title: "Environmental Management",
    detail:
      "Advising on vegetation control, debris clearance, and rodent management to make surroundings snake-unfriendly.",
  },
  {
    title: "Preventive Solutions",
    detail:
      "Providing long-term strategies to reduce the chances of snakes returning.",
  },
];

const faqs = [
  {
    question: "What does Giridurga Pest Control's snake control service include?",
    answer:
      "Our service includes Inspection & Habitat Check, humane Trapping & Removal, Exclusion Measures to seal entry points, Environmental Management guidance, and long-term Preventive Solutions.",
  },
  {
    question: "What should I do if I spot a snake on my property?",
    answer:
      "Keep a safe distance, keep children and pets indoors or away from the area, avoid trying to handle or provoke the snake, and contact Giridurga Pest Control immediately for trained assistance.",
  },
  {
    question: "Why do snakes enter residential or commercial properties?",
    answer:
      "Snakes typically enter buildings and compounds in search of food, water, or cool shelter—often attracted by overgrown vegetation, debris, rodent activity, or open cracks and gaps.",
  },
  {
    question: "How can I make my property less attractive to snakes?",
    answer:
      "Sealing cracks and gaps around doors and pipes, trimming overgrown grass and bushes, clearing woodpiles or debris, and controlling rodents significantly reduce snake shelter and food sources.",
  },
  {
    question: "Which locations in Odisha do you serve for snake and pest control?",
    answer:
      "Giridurga Pest Control serves Bhubaneswar, Cuttack, Puri, and surrounding areas in Odisha for residential homes, apartments, offices, warehouses, and commercial properties.",
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

const SnakeControlMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".snake-control-main-reveal");

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
    <section className="snake-control-main" ref={rootRef}>
      <div className="snake-control-main-glow snake-control-main-glow-one" />
      <div className="snake-control-main-glow snake-control-main-glow-two" />

      <div className="snake-control-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="snake-control-main-sidebar">
          <div className="snake-control-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`snake-control-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="snake-control-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="snake-control-main-menu-title">
                  {srv.title}
                </span>

                <span className="snake-control-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="snake-control-main-contact-card">
            <div className="snake-control-main-contact-decoration snake-control-main-contact-decoration-one" />
            <div className="snake-control-main-contact-decoration snake-control-main-contact-decoration-two" />

            <div className="snake-control-main-contact-content">
              <h2>Contact Giridurga Pest Control for any advice</h2>

              <a
                href="tel:+919876543210"
                className="snake-control-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="snake-control-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="snake-control-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="snake-control-main-content">
          {/* HERO SECTION */}
          <div
            className={`snake-control-main-hero ${
              imageFailed ? "snake-control-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="snake-control-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="snake-control-main-hero-overlay" />

            <span className="snake-control-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="snake-control-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="snake-control-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SNAKE CONTROL OVERVIEW */}
          <div className="snake-control-main-overview snake-control-main-reveal">
            <span className="snake-control-main-section-subtitle">
              GIRIDURGA PEST CONTROL • SAFE &amp; HUMANE PROTECTION
            </span>

            <h2>Snake Control</h2>

            <p>
              Snakes often enter residential and commercial areas in search of
              food, water, or shelter. While not all snakes are venomous, their
              presence causes fear, health risks, and safety concerns. Snake
              infestations are usually linked to overgrown vegetation, rodent
              activity, or open entry points around buildings.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we serve{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and surrounding areas
              in Odisha with prompt habitat inspections and humane exclusion
              solutions. Trusted among{" "}
              <strong>Pest Control Service Providers in Cuttack</strong> and
              known for the{" "}
              <strong>best pest control services in Bhubaneswar</strong> and{" "}
              <strong>pest control Puri</strong>, our team helps keep your
              property protected and secure.
            </p>
          </div>

          {/* HOW GIRIDURGA PEST CONTROL HELPS */}
          <div className="snake-control-main-overview snake-control-main-reveal">
            <span className="snake-control-main-section-subtitle">
              HABITAT CHECK, REMOVAL &amp; EXCLUSION
            </span>

            <h2>How Giridurga Pest Control Helps</h2>

            <p>
              <strong>Giridurga Pest Control</strong> provides safe and
              effective snake control services through:
            </p>

            <ul className="snake-control-main-highlights">
              {helpItems.map((item) => (
                <li key={item.title}>
                  <span className="snake-control-main-highlight-icon">
                    <CheckIcon />
                  </span>
                  <span>
                    <strong>{item.title}</strong> – {item.detail}
                  </span>
                </li>
              ))}
            </ul>

            <p className="snake-control-main-tagline">
              With trained experts, eco-safe techniques, and years of
              experience, <strong>Giridurga Pest Control</strong> helps your
              home or business stay safe &amp; secure.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="snake-control-main-comprehensive snake-control-main-reveal">
            <span className="snake-control-main-section-subtitle">
              TARGETED SNAKE CONTROL
            </span>

            <h2>Complete Snake Control Solutions</h2>

            <p>
              From residential homes and gardens to commercial compounds,
              Giridurga Pest Control offers the{" "}
              <strong>best pest control services in Cuttack</strong>,{" "}
              <strong>pest control Bhubaneswar</strong>, and{" "}
              <strong>pest control Puri</strong> along with{" "}
              <strong>expert pest and termite control across Cuttack</strong>{" "}
              and rodent management to eliminate snake attractants.
            </p>

            <div className="snake-control-main-image-grid">
              <div className="snake-control-main-image-card">
                <div className="snake-control-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Snake inspection and habitat check"
                  />
                  <span className="snake-control-main-image-number">01</span>
                </div>

                <span className="snake-control-main-card-subtitle">
                  HABITAT &amp; ENTRY AUDIT
                </span>

                <h3>Inspection &amp; Habitat Check</h3>

                <p>
                  Detailed inspection to identify entry points, hiding spots,
                  and food sources like rodents around your property.
                </p>
              </div>

              <div className="snake-control-main-image-card">
                <div className="snake-control-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Humane snake trapping and exclusion measures"
                  />
                  <span className="snake-control-main-image-number">02</span>
                </div>

                <span className="snake-control-main-card-subtitle">
                  HUMANE REMOVAL &amp; EXCLUSION
                </span>

                <h3>Trapping &amp; Exclusion Measures</h3>

                <p>
                  Safe, humane relocation paired with sealing cracks, gaps, and
                  openings to block future snake entry.
                </p>
              </div>
            </div>

            {/* LOCAL SERVICE COVERAGE & KEYWORDS */}
            <div className="snake-control-main-local-box">
              <span className="snake-control-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Trusted Snake &amp; Pest Control Across Odisha</h3>
              <p>
                Looking for{" "}
                <strong>Best Pest Control in Cuttack with genuine rates</strong>{" "}
                or dependable <strong>pest control near Cuttack, Odisha</strong>?
                Giridurga Pest Control provides comprehensive{" "}
                <strong>pest control solutions in Cuttack</strong>, Bhubaneswar,
                and Puri for residential and commercial sites.
              </p>
              <div className="snake-control-main-keyword-tags">
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
          <div className="snake-control-main-faq snake-control-main-reveal">
            <span className="snake-control-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="snake-control-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              snake inspection, humane removal, and prevention services.
            </p>

            <div className="snake-control-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`snake-control-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="snake-control-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="snake-control-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="snake-control-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="snake-control-main-bottom-cta snake-control-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Snake Control?</h2>

              <p>
                Keep your home or business safe and secure. Contact Giridurga
                Pest Control for trained, eco-safe assistance at genuine rates.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="snake-control-main-cta-button"
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

export default SnakeControlMain;