import { useEffect, useRef, useState } from "react";
import "./FoggingserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Fogging Inspection",
    subtitle: "PROPERTY & COVERAGE AUDIT",
    heading: "Detailed Fogging Inspection Services in Odisha",
    image: serviceone,
    description:
      "Inspect your property, identify flying insect activity, and evaluate indoor and outdoor zones requiring targeted fogging coverage.",
  },
  {
    title: "Indoor Fogging",
    subtitle: "FOGAIR & FINE MIST COVERAGE",
    heading: "Professional Fogging Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control uses modern fogging equipment, including FogAir machines, and approved products to reach difficult corners and surfaces.",
  },
  {
    title: "Outdoor Fogging",
    subtitle: "GARDENS, COMPOUNDS & PERIMETERS",
    heading: "Effective Outdoor Fogging Treatment",
    image: servicetwo,
    description:
      "Targeted outdoor fogging for gardens, open areas, drains, and building perimeters where mosquitoes and flying insects gather.",
  },
  {
    title: "Residential & Commercial Fogging",
    subtitle: "HOMES, HOTELS, SCHOOLS & OFFICES",
    heading: "Fogging Services for Homes & Businesses in Odisha",
    image: serviceone,
    description:
      "Customized fogging services for houses, apartments, hotels, restaurants, schools, offices, and commercial properties across Bhubaneswar, Cuttack, and Puri.",
  },
  {
    title: "Preventive Fogging",
    subtitle: "SCHEDULED PEST PREVENTION",
    heading: "Planned Fogging and Pest Prevention",
    image: service,
    description:
      "Scheduled fogging recommendations and preventive pest management support alongside expert pest and termite control across Cuttack and Odisha.",
  },
];

const faqs = [
  {
    question: "What is fogging service in pest control?",
    answer:
      "Fogging is a pest management technique that releases a fine mist or aerosol to cover suitable areas—including hard-to-reach corners—and help control targeted adult flying insects. The treatment method depends on the property, pest concern, and product used.",
  },
  {
    question: "How does Giridurga Pest Control perform professional fogging?",
    answer:
      "Our trained technicians first inspect the property to identify the areas requiring coverage. Modern fogging equipment, including FogAir machines, and approved products are then selected and applied according to the product label and site requirements.",
  },
  {
    question: "Is fogging suitable for both homes and commercial properties?",
    answer:
      "Yes. Giridurga Pest Control provides customized fogging services for houses, apartments, hotels, restaurants, schools, offices, and commercial buildings across Odisha after an initial assessment.",
  },
  {
    question: "How long should occupants stay away during fogging?",
    answer:
      "The required evacuation and re-entry window depends on the formulation used, application method, and ventilation conditions. Our technicians provide clear preparation, evacuation, and safe re-entry instructions before starting.",
  },
  {
    question: "Does fogging help control mosquitoes and flying insects?",
    answer:
      "Fogging helps knock down targeted adult mosquitoes and flying insects in treated areas. For sustained control, we also recommend eliminating stagnant water and addressing breeding sites.",
  },
  {
    question: "Which locations in Odisha do you serve for fogging and pest control?",
    answer:
      "Giridurga Pest Control serves Cuttack, Bhubaneswar, Puri, and surrounding cities across Odisha with genuine rates, on-time scheduling, and reliable fogging, termite, and general pest control services.",
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

const FoggingserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".fogging-service-main-reveal");

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
    <section className="fogging-service-main" ref={rootRef}>
      <div className="fogging-service-main-glow fogging-service-main-glow-one" />
      <div className="fogging-service-main-glow fogging-service-main-glow-two" />

      <div className="fogging-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="fogging-service-main-sidebar">
          <div className="fogging-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`fogging-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="fogging-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="fogging-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="fogging-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="fogging-service-main-contact-card">
            <div className="fogging-service-main-contact-decoration fogging-service-main-contact-decoration-one" />
            <div className="fogging-service-main-contact-decoration fogging-service-main-contact-decoration-two" />

            <div className="fogging-service-main-contact-content">
              <h2>Contact Giridurga Pest Control</h2>

              <a
                href="tel:+919876543210"
                className="fogging-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to our pest control experts.</p>

              <a
                href="tel:+919876543210"
                className="fogging-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="fogging-service-main-download"
          >
            <PdfIcon />
            <span>Download PDF File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="fogging-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`fogging-service-main-hero ${
              imageFailed ? "fogging-service-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="fogging-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="fogging-service-main-hero-overlay" />

            <span className="fogging-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="fogging-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="fogging-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* FOGGING OVERVIEW */}
          <div className="fogging-service-main-overview fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              GIRIDURGA PEST CONTROL • FOGAIR &amp; MIST SOLUTIONS
            </span>

            <h2>Professional Fogging Service in Odisha</h2>

            <p>
              Fogging is a fast and effective pest control method that releases a
              fine mist to cover suitable areas, including difficult-to-reach
              corners and surfaces. It is commonly used to help control targeted
              flying insects and improve pest management in residential and
              commercial spaces.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we provide
              professional fogging services in Odisha using modern fogging
              equipment, including <strong>FogAir machines</strong>, and
              approved pest control products. Our trained experts assess your
              property and select an appropriate treatment approach according to
              the pest problem and site requirements.
            </p>

            <p>
              Every treatment is carefully planned, beginning with a detailed
              inspection, followed by targeted fogging application and
              practical preventive recommendations. Whether you require fogging
              for your home, apartment, hotel, restaurant, school, office, or
              commercial property across{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby cities,
              our team delivers customized solutions at genuine rates.
            </p>

            <ul className="fogging-service-main-highlights">
              <li>
                <span className="fogging-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Modern FogAir &amp; ULV fogging equipment for thorough mist
                  coverage
                </span>
              </li>
              <li>
                <span className="fogging-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Targeted control for mosquitoes &amp; flying insects indoors
                  and outdoors
                </span>
              </li>
              <li>
                <span className="fogging-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>
                  Trained technicians with clear safety &amp; re-entry guidance
                </span>
              </li>
            </ul>
          </div>

          {/* WHY CHOOSE US */}
          <div className="fogging-service-main-benefits fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              WHY CHOOSE GIRIDURGA PEST CONTROL
            </span>

            <h2>Why Choose Giridurga Pest Control for Fogging?</h2>

            <div className="fogging-service-main-benefit-grid">
              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Modern Fogging Equipment</h3>
                <p>
                  Professional fogging equipment, including FogAir machines,
                  selected according to treatment requirements.
                </p>
              </div>

              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Trained Experts</h3>
                <p>
                  Experienced technicians who assess the property and apply
                  suitable treatments with care.
                </p>
              </div>

              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Planned Treatment</h3>
                <p>
                  Inspection, targeted application, and preventive
                  recommendations for better pest management.
                </p>
              </div>

              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Customized Solutions</h3>
                <p>
                  Fogging service recommendations based on your property, pest
                  concerns, and treatment requirements.
                </p>
              </div>
            </div>
          </div>

          {/* HOW FOGGING WORKS */}
          <div className="fogging-service-main-comprehensive fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              OUR WORKING PROCESS
            </span>

            <h2>How Giridurga Pest Control Does Fogging</h2>

            <p>
              We follow a structured 4-step process so each fogging treatment is
              carried out with suitable equipment, approved products, and
              proper safety precautions.
            </p>

            <div className="fogging-service-main-image-grid">
              <div className="fogging-service-main-image-card">
                <div className="fogging-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Fogging property inspection in Odisha"
                  />
                  <span className="fogging-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="fogging-service-main-card-subtitle">
                  SITE &amp; PEST EVALUATION
                </span>

                <h3>Detailed Property Inspection</h3>

                <p>
                  Our experts inspect the property, understand the pest problem,
                  and identify areas requiring fogging treatment.
                </p>
              </div>

              <div className="fogging-service-main-image-card">
                <div className="fogging-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional FogAir fogging application"
                  />
                  <span className="fogging-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="fogging-service-main-card-subtitle">
                  FOGAIR &amp; FINE MIST TREATMENT
                </span>

                <h3>Professional Fogging Application</h3>

                <p>
                  Our trained technicians use suitable fogging equipment and
                  products to apply treatment according to the recommended
                  procedure.
                </p>
              </div>
            </div>

            <div className="fogging-service-main-process">
              <div>
                <span>03</span>
                <h3>Safety &amp; Precautions</h3>
                <p>
                  We provide instructions regarding preparation, evacuation, and
                  safe re-entry after treatment.
                </p>
              </div>

              <div>
                <span>04</span>
                <h3>Preventive Guidance</h3>
                <p>
                  We recommend practical steps to help reduce recurring pest
                  activity and maintain hygienic surroundings.
                </p>
              </div>
            </div>
          </div>

          {/* SERVICE AREAS */}
          <div className="fogging-service-main-areas fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Fogging and Pest Control Services Across Odisha</h2>

            <p>
              Looking for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>?{" "}
              <strong>Giridurga Pest Control</strong> offers professional pest
              management and fogging services for residential and commercial
              properties.
            </p>

            <p>
              We serve customers searching for{" "}
              <strong>pest control Bhubaneswar</strong>, the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, and{" "}
              <strong>pest control near Cuttack, Odisha</strong>. Our team also
              provides{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>{" "}
              and nearby cities.
            </p>

            <p>
              If you are searching for reliable{" "}
              <strong>Pest Control Service Providers in Cuttack</strong>, the{" "}
              <strong>best pest control services in Cuttack</strong>, or
              professional <strong>pest control solutions in Cuttack</strong>,
              contact Giridurga Pest Control for service information and pricing
              details.
            </p>

            <div className="fogging-service-main-city-list">
              <span>Cuttack</span>
              <span>Bhubaneswar</span>
              <span>Puri</span>
              <span>Across Odisha</span>
            </div>

            <div className="fogging-service-main-local-box">
              <span className="fogging-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Fogging &amp; Pest Protection Across Odisha</h3>
              <div className="fogging-service-main-keyword-tags">
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
          <div className="fogging-service-main-faq fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="fogging-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              fogging procedures, equipment, safety, and pest management
              services.
            </p>

            <div className="fogging-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`fogging-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="fogging-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="fogging-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="fogging-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="fogging-service-main-bottom-cta fogging-service-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Fogging Service?</h2>

              <p>
                Get professional fogging assistance from Giridurga Pest Control.
                Contact our team today for customized pest management solutions
                at genuine rates.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="fogging-service-main-cta-button"
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

export default FoggingserviceMain;