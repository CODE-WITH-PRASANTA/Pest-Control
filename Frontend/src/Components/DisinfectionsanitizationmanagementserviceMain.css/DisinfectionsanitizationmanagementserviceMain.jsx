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
      "Assess high-touch surfaces, shared spaces, restrooms, workstations and ventilation touchpoints to plan thorough sanitization coverage across Odisha.",
  },
  {
    title: "Surface Disinfection",
    subtitle: "BROAD-SPECTRUM HYGIENE CARE",
    heading: "Disinfection & Sanitization Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control eliminates 99.9% of viruses, bacteria, and fungi across frequently touched surfaces using government-approved disinfectants.",
  },
  {
    title: "ULV Mist & Fog Sanitization",
    subtitle: "AIR & ENCLOSED SPACE COVERAGE",
    heading: "Advanced ULV Cold Fogging Sanitization",
    image: servicetwo,
    description:
      "Reach hard-to-wipe corners, seating areas, cabins, and enclosed rooms with certified ULV cold fogging machines for total indoor hygiene.",
  },
  {
    title: "Residential & Commercial Care",
    subtitle: "HOMES, OFFICES & FACILITIES",
    heading: "Sanitization Services for Homes & Businesses",
    image: service,
    description:
      "Customized disinfection and sanitization solutions for homes, offices, hospitals, schools, shops, and industrial facilities in Bhubaneswar, Cuttack, and Puri.",
  },
  {
    title: "Preventive Hygiene Plans",
    subtitle: "ROUTINE & ONGOING SANITATION",
    heading: "Ongoing Sanitization & Pest Management",
    image: serviceone,
    description:
      "Maintain a germ-free environment with scheduled sanitization follow-ups alongside expert pest and termite control across Cuttack, Bhubaneswar, and Puri.",
  },
];

const faqs = [
  {
    question: "What does Giridurga Pest Control's sanitization service include?",
    answer:
      "Our service includes evaluating high-touch surfaces and key zones, applying government-approved disinfectants and ULV cold fogging treatments, and sharing practical hygiene guidance.",
  },
  {
    question: "Are disinfection treatments safe for children, pets, and the environment?",
    answer:
      "Yes. We use government-approved, certified disinfectants that are safe for humans, pets, and the environment. Our trained technicians also provide clear re-entry and surface-drying guidance.",
  },
  {
    question: "Which cities in Odisha do you serve for sanitization and pest control?",
    answer:
      "Giridurga Pest Control serves Bhubaneswar, Cuttack, Puri, and surrounding cities in Odisha with affordable, fast, and reliable sanitization as well as pest and termite control services.",
  },
  {
    question: "How long does sanitization take and how effective is it?",
    answer:
      "Our certified disinfectants and advanced ULV fogging machines kill 99.9% of viruses, bacteria, and fungi. Duration depends on property size and room count, which our team confirms before starting.",
  },
  {
    question: "Do you provide sanitization for both homes and commercial spaces?",
    answer:
      "Yes. Whether it is your home, office, hospital, school, shop, or industrial facility, we offer customized disinfection and sanitization solutions tailored to your premises.",
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
              <h2>Contact Giridurga Pest Control for any advice</h2>

              <a
                href="tel:+919876543210"
                className="disinfection-sanitization-management-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
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
              GIRIDURGA PEST CONTROL • ODISHA HYGIENE EXPERTS
            </span>

            <h2>Disinfection &amp; Sanitization Services in Odisha</h2>

            <p>
              In today’s health-conscious world, maintaining hygiene in homes,
              offices, schools, and commercial spaces is more important than
              ever. Germs, viruses, and bacteria can spread quickly, leading to
              serious health risks for your family, staff, or customers.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we provide
              professional disinfection and sanitization services in Odisha to
              eliminate harmful microorganisms from surfaces and enclosed
              spaces. Our trained team uses government-approved disinfectants
              and ULV cold fogging technology to sanitize areas effectively and
              safely.
            </p>

            <p>
              Whether it's your home, office, hospital, school, shop, or
              industrial facility, we offer customized sanitization solutions
              that are safe for humans, pets, and the environment. Our team
              ensures deep cleaning of high-touch areas to minimize infection
              risk and ensure total hygiene.
            </p>

            <p>
              We serve <strong>Bhubaneswar, Cuttack, Puri</strong>, and
              surrounding cities in Odisha with affordable, fast, and reliable
              sanitization services. Recognized among trusted{" "}
              <strong>Pest Control Service Providers in Cuttack</strong> and
              offering the{" "}
              <strong>best pest control services in Bhubaneswar</strong> and{" "}
              <strong>pest control Puri</strong>, we deliver complete hygiene
              and <strong>pest control solutions in Cuttack</strong> and nearby
              regions.
            </p>

            <ul className="disinfection-sanitization-management-service-main-highlights">
              <li>
                <span className="disinfection-sanitization-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Certified disinfectants &amp; advanced fogging machines</span>
              </li>
              <li>
                <span className="disinfection-sanitization-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Kills 99.9% of viruses, bacteria &amp; fungi</span>
              </li>
              <li>
                <span className="disinfection-sanitization-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Trained professionals with safety gear</span>
              </li>
            </ul>

            <p className="disinfection-sanitization-management-service-main-tagline">
              Ensure a germ-free environment with Odisha’s trusted disinfection
              experts at Giridurga Pest Control.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="disinfection-sanitization-management-service-main-comprehensive disinfection-sanitization-management-service-main-reveal">
            <span className="disinfection-sanitization-management-service-main-section-subtitle">
              SURFACE &amp; SPACE COVERAGE
            </span>

            <h2>Disinfection &amp; Sanitization Services in Odisha</h2>

            <p>
              From residential apartments to hospitals and industrial units,
              Giridurga Pest Control provides the{" "}
              <strong>best pest control services in Cuttack</strong>,{" "}
              <strong>pest control Bhubaneswar</strong>, and{" "}
              <strong>pest control Puri</strong> alongside specialized ULV
              sanitization and{" "}
              <strong>expert pest and termite control across Cuttack</strong>.
            </p>

            <div className="disinfection-sanitization-management-service-main-image-grid">
              <div className="disinfection-sanitization-management-service-main-image-card">
                <div className="disinfection-sanitization-management-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Disinfection and hygiene inspection in Odisha"
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
                  Thorough site assessment to identify high-contact surfaces,
                  shared rooms, and priority sanitization zones for homes and
                  commercial facilities.
                </p>
              </div>

              <div className="disinfection-sanitization-management-service-main-image-card">
                <div className="disinfection-sanitization-management-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="ULV cold fogging sanitization treatment"
                  />
                  <span className="disinfection-sanitization-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="disinfection-sanitization-management-service-main-card-subtitle">
                  ULV COLD FOGGING TECHNOLOGY
                </span>

                <h3>Certified Sanitization Treatment</h3>

                <p>
                  Targeted application with government-approved disinfectants and
                  advanced fogging machines that eliminate 99.9% of viruses,
                  bacteria, and fungi.
                </p>
              </div>
            </div>

            {/* LOCAL SERVICE COVERAGE & KEYWORDS */}
            <div className="disinfection-sanitization-management-service-main-local-box">
              <span className="disinfection-sanitization-management-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Hygiene &amp; Pest Protection Across Odisha</h3>
              <p>
                Looking for{" "}
                <strong>Best Pest Control in Cuttack with genuine rates</strong>{" "}
                or dependable <strong>pest control near Cuttack, Odisha</strong>?
                Giridurga Pest Control combines hospital-grade sanitization with
                comprehensive pest management across Cuttack, Bhubaneswar, and
                Puri.
              </p>
              <div className="disinfection-sanitization-management-service-main-keyword-tags">
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
          <div className="disinfection-sanitization-management-service-main-faq disinfection-sanitization-management-service-main-reveal">
            <span className="disinfection-sanitization-management-service-main-section-subtitle">
              SAFETY &amp; SERVICE ANSWERS
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="disinfection-sanitization-management-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              disinfection, ULV fogging sanitization, and hygiene services in
              Odisha.
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
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Disinfection &amp; Sanitization?</h2>

              <p>
                Ensure a germ-free environment with Odisha’s trusted disinfection
                experts. Contact Giridurga Pest Control for genuine rates and
                fast service.
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