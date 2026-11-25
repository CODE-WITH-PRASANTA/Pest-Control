import { useEffect, useRef, useState } from "react";
import "./FlymanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Fly Inspection",
    subtitle: "BREEDING SITE & HYGIENE AUDIT",
    heading: "Detailed Fly Inspection Services in Odisha",
    image: serviceone,
    description:
      "Identify breeding sites, drain hotspots, waste zones, and entry points across homes, restaurants, hotels, hospitals, and food units.",
  },
  {
    title: "Fly Treatment",
    subtitle: "RESIDUAL SPRAYS, TRAPS & BIO-CONTROL",
    heading: "Fly Management Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control targets breeding areas with eco-friendly residual sprays, fly traps, and biological controls to manage houseflies, drain flies, and fruit flies.",
  },
  {
    title: "Breeding & Drain Control",
    subtitle: "LARVAL & ORGANIC BUILDUP CARE",
    heading: "Targeted Breeding Site & Drain Fly Control",
    image: servicetwo,
    description:
      "Focused treatment around garbage areas, floor drains, grease traps, and damp organic buildup to break fly breeding cycles effectively.",
  },
  {
    title: "Residential & Commercial Sites",
    subtitle: "HOMES, HOTELS, HOSPITALS & FOOD UNITS",
    heading: "Fly Control for Homes & Businesses in Odisha",
    image: service,
    description:
      "Customized fly control plans across Bhubaneswar, Cuttack, Puri, and nearby cities with fast response and genuine rates.",
  },
  {
    title: "Preventive Fly Management",
    subtitle: "ONGOING HYGIENE & EXCLUSION CARE",
    heading: "Long-Lasting Fly Prevention & Hygiene Support",
    image: serviceone,
    description:
      "Protect your space from disease-carrying flies with UV trap placement, sanitation guidance, and expert pest and termite control across Cuttack and Odisha.",
  },
];

const faqs = [
  {
    question: "What does Giridurga Pest Control's fly management service include?",
    answer:
      "Our service includes a thorough inspection of breeding areas and entry points, eco-friendly adult and larval treatments such as residual sprays, fly traps, and biological controls, plus customized sanitation guidance.",
  },
  {
    question: "What types of flies do you control?",
    answer:
      "We control houseflies, drain flies, fruit flies, blowflies, and other nuisance or disease-carrying flies across indoor and outdoor residential and commercial areas.",
  },
  {
    question: "Are fly control treatments safe for families, pets, and food areas?",
    answer:
      "Yes. Giridurga Pest Control uses eco-friendly, scientifically proven treatments selected specifically for kitchens, food processing areas, homes, and sensitive commercial spaces, along with clear safety instructions.",
  },
  {
    question: "Which cities in Odisha do you serve for fly and pest control?",
    answer:
      "We serve Bhubaneswar, Cuttack, Puri, and nearby cities in Odisha with fast response, genuine rates, and reliable fly, termite, and general pest control services.",
  },
  {
    question: "Do you provide fly control for restaurants, hotels, hospitals, and food units?",
    answer:
      "Yes. Whether it is your home, restaurant, hotel, hospital, or food processing unit, our trained team conducts a thorough inspection and provides a customized fly control plan.",
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

const FlymanagementserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".fly-management-service-main-reveal");

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
    <section className="fly-management-service-main" ref={rootRef}>
      <div className="fly-management-service-main-glow fly-management-service-main-glow-one" />
      <div className="fly-management-service-main-glow fly-management-service-main-glow-two" />

      <div className="fly-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="fly-management-service-main-sidebar">
          <div className="fly-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`fly-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="fly-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="fly-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="fly-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="fly-management-service-main-contact-card">
            <div className="fly-management-service-main-contact-decoration fly-management-service-main-contact-decoration-one" />
            <div className="fly-management-service-main-contact-decoration fly-management-service-main-contact-decoration-two" />

            <div className="fly-management-service-main-contact-content">
              <h2>Contact Giridurga Pest Control for any advice</h2>

              <a
                href="tel:+919876543210"
                className="fly-management-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="fly-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="fly-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="fly-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`fly-management-service-main-hero ${
              imageFailed ? "fly-management-service-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="fly-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="fly-management-service-main-hero-overlay" />

            <span className="fly-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="fly-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="fly-management-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="fly-management-service-main-overview fly-management-service-main-reveal">
            <span className="fly-management-service-main-section-subtitle">
              GIRIDURGA PEST CONTROL • HYGIENE &amp; FLY CONTROL EXPERTS
            </span>

            <h2>Fly Management Services in Odisha</h2>

            <p>
              Flies are more than just a nuisance—they are known carriers of
              harmful bacteria and viruses that can contaminate food, spread
              diseases, and impact hygiene in homes and commercial spaces. If
              you’re facing a fly infestation, it’s time to act fast with expert
              help.
            </p>

            <p>
              <strong>Giridurga Pest Control</strong> offers professional and
              affordable fly management services in Odisha, using safe and
              scientifically proven techniques to control and prevent fly
              infestations. We target breeding areas and apply eco-friendly
              treatments like{" "}
              <strong>
                residual sprays, fly traps, and biological controls
              </strong>{" "}
              to reduce fly populations quickly and effectively.
            </p>

            <p>
              Whether it's your home, restaurant, hotel, hospital, or food
              processing unit, our trained team conducts a thorough inspection
              and provides a customized fly control plan to suit your property.
              We serve <strong>Bhubaneswar, Cuttack, Puri</strong>, and other
              nearby cities with fast response and dependable results.
            </p>

            <ul className="fly-management-service-main-highlights">
              <li>
                <span className="fly-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Controls houseflies, drain flies, and fruit flies</span>
              </li>
              <li>
                <span className="fly-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Safe for families, pets &amp; sensitive food preparation areas
                </span>
              </li>
              <li>
                <span className="fly-management-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Affordable, effective &amp; long-lasting protection</span>
              </li>
            </ul>

            <p className="fly-management-service-main-tagline">
              Protect your space from disease-carrying flies with Odisha’s
              trusted pest control experts at Giridurga Pest Control.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="fly-management-service-main-comprehensive fly-management-service-main-reveal">
            <span className="fly-management-service-main-section-subtitle">
              TARGETED FLY CONTROL
            </span>

            <h2>Fly Management Services in Odisha</h2>

            <p>
              Trusted among{" "}
              <strong>Pest Control Service Providers in Cuttack</strong> and
              known for the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, and{" "}
              <strong>expert pest and termite control across Cuttack</strong>,
              Giridurga Pest Control delivers tailored fly control for
              residential and commercial facilities.
            </p>

            <div className="fly-management-service-main-image-grid">
              <div className="fly-management-service-main-image-card">
                <div className="fly-management-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Fly breeding site and drain inspection in Odisha"
                  />
                  <span className="fly-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="fly-management-service-main-card-subtitle">
                  BREEDING &amp; ENTRY POINT AUDIT
                </span>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to pinpoint breeding grounds, drain
                  hotspots, waste zones, and entry points across your property.
                </p>
              </div>

              <div className="fly-management-service-main-image-card">
                <div className="fly-management-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Eco-friendly fly treatment and trapping"
                  />
                  <span className="fly-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="fly-management-service-main-card-subtitle">
                  TRAPS, SPRAYS &amp; BIO-CONTROL
                </span>

                <h3>Targeted Eco-Friendly Treatment</h3>

                <p>
                  Targeted residual sprays, fly traps, and biological controls
                  designed to curb houseflies, drain flies, and fruit flies
                  safely.
                </p>
              </div>
            </div>

            {/* LOCAL SERVICE COVERAGE & KEYWORDS */}
            <div className="fly-management-service-main-local-box">
              <span className="fly-management-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Trusted Fly &amp; Pest Control Across Odisha</h3>
              <p>
                Looking for{" "}
                <strong>Best Pest Control in Cuttack with genuine rates</strong>{" "}
                or dependable <strong>pest control near Cuttack, Odisha</strong>?
                Giridurga Pest Control offers the{" "}
                <strong>best pest control services in Cuttack</strong> and
                complete <strong>pest control solutions in Cuttack</strong>,
                Bhubaneswar, and Puri.
              </p>
              <div className="fly-management-service-main-keyword-tags">
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
          <div className="fly-management-service-main-faq fly-management-service-main-reveal">
            <span className="fly-management-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="fly-management-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              fly inspection, control, and prevention services in Odisha.
            </p>

            <div className="fly-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`fly-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="fly-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="fly-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="fly-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="fly-management-service-main-bottom-cta fly-management-service-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Fly Control in Odisha?</h2>

              <p>
                Protect your space from disease-carrying flies with Giridurga
                Pest Control’s affordable, eco-safe solutions.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="fly-management-service-main-cta-button"
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

export default FlymanagementserviceMain;