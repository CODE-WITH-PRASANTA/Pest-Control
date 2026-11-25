import { useEffect, useRef, useState } from "react";
import "./TermitemanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Termite Inspection",
    subtitle: "MUD TUBES & MOISTURE ZONE AUDIT",
    heading: "Detailed Termite Inspection Services in Odisha",
    image: serviceone,
    description:
      "Locate mud tubes, hollow timber, wood damage, and moisture-prone zones across residential flats, offices, shops, and hotels.",
  },
  {
    title: "Termite Treatment",
    subtitle: "ODORLESS ANTI-TERMITE BARRIER",
    heading: "Post-Construction Termite Management Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control uses government-approved, odorless, and eco-safe chemicals to create a protective anti-termite barrier that keeps termites away for years.",
  },
  {
    title: "Drill-Fill-Seal Protection",
    subtitle: "WALL-FLOOR & PLUMBING CARE",
    heading: "Precision Drill & Inject Anti-Termite Solutions",
    image: servicetwo,
    description:
      "Targeted drilling and injection into wall-floor junctions, wooden fixtures, and plumbing areas with zero disturbance to your daily routine.",
  },
  {
    title: "Residential & Commercial Control",
    subtitle: "FLATS, OFFICES, SHOPS & HOTELS",
    heading: "Termite Control for Homes & Businesses in Odisha",
    image: service,
    description:
      "Customized termite management plans across Bhubaneswar, Cuttack, Puri, and nearby areas with genuine rates and certified technicians.",
  },
  {
    title: "Preventive Termite Management",
    subtitle: "ONGOING STRUCTURAL PROTECTION",
    heading: "Long-Lasting Termite Prevention & Monitoring",
    image: serviceone,
    description:
      "Protect your property from hidden structural damage with scheduled monitoring and expert pest and termite control across Cuttack and Odisha.",
  },
];

const faqs = [
  {
    question: "What does Giridurga Pest Control's post-construction termite service include?",
    answer:
      "Our service includes inspecting moisture-prone areas and mud tubes, precision drilling and injecting government-approved, odorless anti-termite chemicals into wall-floor junctions, wooden fixtures, and plumbing zones, and sealing treated points cleanly.",
  },
  {
    question: "Are your termite treatments safe and odor-free for children and pets?",
    answer:
      "Yes. Giridurga Pest Control uses government-approved, odorless, and eco-safe formulations applied by certified pest control technicians with zero disturbance to your routine.",
  },
  {
    question: "Which areas in Odisha do you serve for termite and pest control?",
    answer:
      "We serve Bhubaneswar, Cuttack, Puri, and nearby areas across Odisha with genuine rates, fast response, and dependable post-construction termite and general pest control services.",
  },
  {
    question: "How long does post-construction termite protection last?",
    answer:
      "Our drill-and-inject anti-termite chemical barrier is designed to keep termites away for years, depending on soil moisture and building structure. Our technician will advise on warranty and follow-up checks during inspection.",
  },
  {
    question: "Do you provide termite control for flats, offices, shops, and hotels?",
    answer:
      "Yes. Whether it is a residential flat, independent house, office building, shop, or hotel, we offer customized termite control plans tailored to your property.",
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
    <section className="termite-management-service-main" ref={rootRef}>
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
              <h2>Contact Giridurga Pest Control for any advice</h2>

              <a
                href="tel:+919876543210"
                className="termite-management-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
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
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="termite-management-service-main-overview termite-management-service-main-reveal">
            <span className="termite-management-service-main-section-subtitle">
              GIRIDURGA PEST CONTROL • TERMITE PROTECTION EXPERTS
            </span>

            <h2>Post-Construction Termite Management Services in Odisha</h2>

            <p>
              Termites can silently destroy your property from the inside out,
              causing severe structural damage and financial loss. Even after
              construction is complete, homes and commercial buildings in
              Odisha remain vulnerable to termite attacks—especially in
              moisture-prone areas.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we provide reliable
              and effective post-construction termite management services in
              Odisha using government-approved, odorless, and eco-safe
              chemicals. Our team drills and injects anti-termite solutions
              into key points like{" "}
              <strong>
                wall-floor junctions, wooden fixtures, and plumbing areas
              </strong>{" "}
              to create a protective barrier that keeps termites away for
              years.
            </p>

            <p>
              Whether it’s a residential flat, office building, shop, or hotel,
              we offer customized termite control plans with long-lasting
              results and zero disturbance to your routine. Serving{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby areas, we
              are trusted for our quality service, expert staff, and affordable
              pricing.
            </p>

            <ul className="termite-management-service-main-highlights">
              <li>
                <span className="termite-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Safe, odor-free &amp; eco-friendly anti-termite treatment</span>
              </li>
              <li>
                <span className="termite-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Prevents termite infestation and structural wood damage</span>
              </li>
              <li>
                <span className="termite-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Certified pest control technicians with precision tools</span>
              </li>
            </ul>

            <p className="termite-management-service-main-tagline">
              Secure your property from hidden termite threats with Odisha’s
              trusted pest control experts at Giridurga Pest Control.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="termite-management-service-main-comprehensive termite-management-service-main-reveal">
            <span className="termite-management-service-main-section-subtitle">
              TARGETED TERMITE CONTROL
            </span>

            <h2>Post-Construction Termite Management Services in Odisha</h2>

            <p>
              Known for{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>
              , <strong>pest control Bhubaneswar</strong>, and{" "}
              <strong>pest control Puri</strong>, Giridurga Pest Control
              delivers the{" "}
              <strong>best pest control services in Cuttack</strong> and nearby
              cities with thorough structural protection.
            </p>

            <div className="termite-management-service-main-image-grid">
              <div className="termite-management-service-main-image-card">
                <div className="termite-management-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Post-construction termite inspection in Odisha"
                  />
                  <span className="termite-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="termite-management-service-main-card-subtitle">
                  MOISTURE &amp; MUD TUBE AUDIT
                </span>

                <h3>Detailed Structural Inspection</h3>

                <p>
                  Detailed inspection to spot mud tubes, hollow woodwork,
                  plumbing seepage, and high-risk moisture zones before
                  treatment.
                </p>
              </div>

              <div className="termite-management-service-main-image-card">
                <div className="termite-management-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Drill and inject anti-termite barrier treatment"
                  />
                  <span className="termite-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="termite-management-service-main-card-subtitle">
                  DRILL, INJECT &amp; SEAL BARRIER
                </span>

                <h3>Targeted Anti-Termite Treatment</h3>

                <p>
                  Precision drilling and injection of odorless,
                  government-approved chemicals along wall-floor junctions and
                  wooden fixtures.
                </p>
              </div>
            </div>

            {/* LOCAL SERVICE COVERAGE & KEYWORDS */}
            <div className="termite-management-service-main-local-box">
              <span className="termite-management-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Leading Termite &amp; Pest Control Across Odisha</h3>
              <p>
                Searching for{" "}
                <strong>
                  Best Pest Control in Cuttack with genuine rates
                </strong>{" "}
                or dependable{" "}
                <strong>pest control near Cuttack, Odisha</strong>? Giridurga
                Pest Control is counted among top{" "}
                <strong>Pest Control Service Providers in Cuttack</strong>,
                offering the{" "}
                <strong>best pest control services in Bhubaneswar</strong> and
                comprehensive{" "}
                <strong>pest control solutions in Cuttack</strong>, Puri, and
                surrounding areas.
              </p>
              <div className="termite-management-service-main-keyword-tags">
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
          <div className="termite-management-service-main-faq termite-management-service-main-reveal">
            <span className="termite-management-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="termite-management-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              post-construction termite inspection, treatment, and prevention
              services in Odisha.
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
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Post-Construction Termite Control?</h2>

              <p>
                Secure your property from hidden termite threats with
                Giridurga Pest Control at genuine rates.
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