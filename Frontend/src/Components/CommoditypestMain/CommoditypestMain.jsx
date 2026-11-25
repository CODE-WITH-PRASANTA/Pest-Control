import { useEffect, useRef, useState } from "react";
import "./CommoditypestMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Commodity Inspection",
    subtitle: "STORED GRAIN & WAREHOUSE AUDIT",
    heading: "Professional Commodity Pest Inspection in Odisha",
    image: serviceone,
    description:
      "Detailed inspection of stored grains, pulses, packaged foods, and warehouse spaces to identify pest activity and infestation risks early.",
  },
  {
    title: "Warehouse Pest Control",
    subtitle: "GODOWNS & COMMERCIAL STORAGE",
    heading: "Commodity Pest Management in Odisha",
    image: service,
    description:
      "Giridurga Pest Control protects valuable stock in warehouses, godowns, processing units, and transport containers using targeted fumigation, fogging, and residual care.",
  },
  {
    title: "Commodity Fumigation",
    subtitle: "CONTROLLED STOCK FUMIGATION",
    heading: "Effective Commodity Fumigation Services",
    image: servicetwo,
    description:
      "Professional fumigation solutions designed to manage weevils, beetles, and moths affecting stored commodities while following strict safety precautions.",
  },
  {
    title: "Grain & Food Protection",
    subtitle: "STORAGE & TRANSIT HYGIENE",
    heading: "Reliable Grain and Food Storage Protection",
    image: serviceone,
    description:
      "Specialized pest management for rice, wheat, pulses, cereals, and packaged foods to safeguard stock quality during storage and transportation.",
  },
  {
    title: "Preventive Pest Management",
    subtitle: "ONGOING STOCK & FACILITY CARE",
    heading: "Long-Term Commodity Pest Prevention",
    image: service,
    description:
      "Customized preventive plans across Bhubaneswar, Cuttack, and Puri alongside expert pest and termite control across Cuttack and nearby regions.",
  },
];

const faqs = [
  {
    question: "What is commodity pest management?",
    answer:
      "Commodity pest management involves inspecting and controlling pests such as weevils, beetles, moths, and rodents that damage stored grains, pulses, and packaged food products during storage and transit.",
  },
  {
    question: "Which commodities require pest control?",
    answer:
      "Stored grains, rice, wheat, pulses, cereals, spices, packaged food products, and other agricultural commodities benefit from regular pest inspection and preventive management.",
  },
  {
    question: "Do you provide warehouse and godown pest control?",
    answer:
      "Yes. Giridurga Pest Control provides customized commodity pest management solutions for warehouses, godowns, food processing units, transport containers, and commercial storage facilities.",
  },
  {
    question: "Do you provide commodity fumigation services?",
    answer:
      "Yes. We provide professional fumigation, fogging, and residual pest control based on commodity type, infestation level, and site requirements using approved procedures and safety precautions.",
  },
  {
    question: "Which locations in Odisha do you serve?",
    answer:
      "Giridurga Pest Control serves Bhubaneswar, Cuttack, Puri, and surrounding cities across Odisha with genuine rates, timely service, and reliable commodity and general pest control.",
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

const CommoditypestMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".commodity-pest-main-reveal");

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
    <section className="commodity-pest-main" ref={rootRef}>
      <div className="commodity-pest-main-glow commodity-pest-main-glow-one" />
      <div className="commodity-pest-main-glow commodity-pest-main-glow-two" />

      <div className="commodity-pest-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="commodity-pest-main-sidebar">
          <div className="commodity-pest-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`commodity-pest-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="commodity-pest-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="commodity-pest-main-menu-title">
                  {srv.title}
                </span>

                <span className="commodity-pest-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="commodity-pest-main-contact-card">
            <div className="commodity-pest-main-contact-decoration commodity-pest-main-contact-decoration-one" />
            <div className="commodity-pest-main-contact-decoration commodity-pest-main-contact-decoration-two" />

            <div className="commodity-pest-main-contact-content">
              <h2>Contact Giridurga Pest Control For Advice</h2>

              <a
                href="tel:+919876543210"
                className="commodity-pest-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to our experts</p>

              <a
                href="tel:+919876543210"
                className="commodity-pest-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="commodity-pest-main-download"
          >
            <PdfIcon />
            <span>Download PDF File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="commodity-pest-main-content">
          {/* HERO SECTION */}
          <div
            className={`commodity-pest-main-hero ${
              imageFailed ? "commodity-pest-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="commodity-pest-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="commodity-pest-main-hero-overlay" />

            <span className="commodity-pest-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="commodity-pest-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="commodity-pest-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="commodity-pest-main-overview commodity-pest-main-reveal">
            <span className="commodity-pest-main-section-subtitle">
              GIRIDURGA PEST CONTROL • WAREHOUSE &amp; GRAIN STORAGE CARE
            </span>

            <h2>Commodity Pest Management in Odisha</h2>

            <p>
              Stored products like grains, pulses, and packaged foods are
              highly vulnerable to pest infestations. Pests such as{" "}
              <strong>weevils, beetles, moths, and rodents</strong> can cause
              significant damage to commodities during storage and
              transportation, resulting in financial losses and hygiene risks.
            </p>

            <p>
              <strong>Giridurga Pest Control</strong> provides professional
              commodity pest management services in Odisha to protect valuable
              stock in warehouses, godowns, processing units, and transport
              containers. Our treatment solutions include suitable{" "}
              <strong>
                fumigation, fogging, and residual pest control methods
              </strong>{" "}
              based on inspection and site requirements.
            </p>

            <p>
              We follow appropriate safety procedures and industry-relevant
              practices to help keep stored commodities protected across{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby areas. Our
              experts provide customized pest management plans for traders, food
              processors, warehouse operators, and commercial businesses.
            </p>

            <ul className="commodity-pest-main-highlights">
              <li>
                <span className="commodity-pest-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Protects grains, pulses &amp; packaged foods from weevils,
                  beetles, moths &amp; rodents
                </span>
              </li>
              <li>
                <span className="commodity-pest-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Controlled fumigation, fogging &amp; residual warehouse care
                </span>
              </li>
              <li>
                <span className="commodity-pest-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Customized protection plans for godowns, mills &amp; transit
                  containers
                </span>
              </li>
            </ul>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="commodity-pest-main-comprehensive commodity-pest-main-reveal">
            <span className="commodity-pest-main-section-subtitle">
              OUR COMMODITY PEST CONTROL SOLUTIONS
            </span>

            <h2>Complete Commodity Pest Management Solutions</h2>

            <p>
              From grain storage facilities to large commercial warehouses,{" "}
              <strong>Giridurga Pest Control</strong> offers reliable pest
              management solutions designed around your storage conditions and
              commodity protection needs.
            </p>

            <div className="commodity-pest-main-image-grid">
              <div className="commodity-pest-main-image-card">
                <div className="commodity-pest-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Commodity and warehouse pest inspection in Odisha"
                    loading="lazy"
                  />

                  <span className="commodity-pest-main-image-number">
                    01
                  </span>
                </div>

                <span className="commodity-pest-main-card-subtitle">
                  STOCK &amp; GODOWN AUDIT
                </span>

                <h3>Detailed Commodity Inspection</h3>

                <p>
                  Identifying pest activity, infestation sources, and
                  vulnerable storage areas to recommend suitable control
                  measures.
                </p>
              </div>

              <div className="commodity-pest-main-image-card">
                <div className="commodity-pest-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional commodity fumigation in Odisha"
                    loading="lazy"
                  />

                  <span className="commodity-pest-main-image-number">
                    02
                  </span>
                </div>

                <span className="commodity-pest-main-card-subtitle">
                  APPROVED FUMIGATION &amp; RESIDUAL CARE
                </span>

                <h3>Professional Fumigation</h3>

                <p>
                  Appropriate fumigation solutions for stored commodities and
                  storage facilities, following required safety precautions.
                </p>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="commodity-pest-main-benefits commodity-pest-main-reveal">
            <span className="commodity-pest-main-section-subtitle">
              WHY CHOOSE GIRIDURGA PEST CONTROL
            </span>

            <h2>Why Choose Giridurga Pest Control?</h2>

            <div className="commodity-pest-main-benefit-grid">
              <div className="commodity-pest-main-benefit-card">
                <span>01</span>
                <h3>Expert Professionals</h3>
                <p>
                  Experienced pest management professionals with a focus on
                  effective commodity protection.
                </p>
              </div>

              <div className="commodity-pest-main-benefit-card">
                <span>02</span>
                <h3>Suitable Treatment Methods</h3>
                <p>
                  Customized inspection and treatment plans according to
                  commodity and storage conditions.
                </p>
              </div>

              <div className="commodity-pest-main-benefit-card">
                <span>03</span>
                <h3>Genuine &amp; Affordable Rates</h3>
                <p>
                  Practical pest management services designed to meet
                  different business and storage requirements.
                </p>
              </div>

              <div className="commodity-pest-main-benefit-card">
                <span>04</span>
                <h3>Odisha-Wide Service</h3>
                <p>
                  Service coverage across Bhubaneswar, Cuttack, Puri, and
                  surrounding locations.
                </p>
              </div>
            </div>
          </div>

          {/* SERVICE AREAS / SEO KEYWORDS */}
          <div className="commodity-pest-main-areas commodity-pest-main-reveal">
            <span className="commodity-pest-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Trusted Commodity &amp; Pest Control Across Odisha</h2>

            <p>
              Looking for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>?{" "}
              <strong>Giridurga Pest Control</strong> provides professional
              commodity pest management, warehouse fumigation, and commercial
              pest control across Odisha.
            </p>

            <p>
              We serve businesses and property owners searching for{" "}
              <strong>pest control Bhubaneswar</strong>, the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, and{" "}
              <strong>pest control near Cuttack, Odisha</strong>. Recognized
              among reliable{" "}
              <strong>Pest Control Service Providers in Cuttack</strong>, we
              also deliver the{" "}
              <strong>best pest control services in Cuttack</strong>,{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>
              , and complete <strong>pest control solutions in Cuttack</strong>.
            </p>

            <div className="commodity-pest-main-local-box">
              <span className="commodity-pest-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Commodity &amp; Pest Protection Across Odisha</h3>
              <div className="commodity-pest-main-keyword-tags">
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
          <div className="commodity-pest-main-faq commodity-pest-main-reveal">
            <span className="commodity-pest-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="commodity-pest-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              commodity pest inspection, fumigation, and warehouse pest
              management services.
            </p>

            <div className="commodity-pest-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`commodity-pest-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="commodity-pest-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="commodity-pest-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="commodity-pest-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="commodity-pest-main-bottom-cta commodity-pest-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Commodity Pest Control?</h2>

              <p>
                Protect your valuable stock from unwanted pests. Contact
                Giridurga Pest Control for professional commodity pest
                management in Odisha at genuine rates.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="commodity-pest-main-cta-button"
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

export default CommoditypestMain;