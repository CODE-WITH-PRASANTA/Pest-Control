import React, { useEffect, useRef, useState } from "react";
import "./LarvicidetritmentMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Larvae Inspection",
    subtitle: "STAGNANT WATER & DRAIN AUDIT",
    heading: "Professional Larval Breeding Site Inspection in Odisha",
    image: serviceone,
    description:
      "Inspect stagnant water, drains, damp corners, and potential breeding grounds across homes and commercial sites to identify mosquito and insect larvae early.",
  },
  {
    title: "Mosquito Larvicide Treatment",
    subtitle: "STAGE-TARGETED LARVAL CONTROL",
    heading: "Effective Mosquito Larvicide Treatment in Odisha",
    image: service,
    description:
      "Giridurga Pest Control targets mosquito and fly larvae at their breeding stage with approved larvicide formulations before they develop into biting adults.",
  },
  {
    title: "Drainage Treatment",
    subtitle: "DRAIN & WATERLOGGED ZONE CARE",
    heading: "Specialized Drainage & Stagnant Water Treatment",
    image: servicetwo,
    description:
      "Identify and treat breeding locations in open drains, waterlogged spots, and damp surroundings to break the insect life cycle cleanly.",
  },
  {
    title: "Commercial Larvicide Control",
    subtitle: "HOTELS, HOSPITALS, SCHOOLS & OFFICES",
    heading: "Larvicide Solutions for Commercial Properties in Odisha",
    image: service,
    description:
      "Customized larvicide management for hotels, restaurants, schools, offices, hospitals, and commercial complexes across Bhubaneswar, Cuttack, and Puri.",
  },
  {
    title: "Preventive Larvicide Care",
    subtitle: "ONGOING BREEDING PREVENTION",
    heading: "Long-Term Larval Prevention & Management",
    image: serviceone,
    description:
      "Regular monitoring and preventive recommendations alongside expert pest and termite control across Cuttack, Bhubaneswar, and Puri.",
  },
];

const faqs = [
  {
    question: "What is larvicide treatment?",
    answer:
      "Larvicide treatment is a preventive pest management method that targets insects during their larval stage before they develop into adults. It is commonly used to control mosquito and fly breeding in stagnant water and damp areas.",
  },
  {
    question: "Which pests can be controlled through larvicide treatment?",
    answer:
      "Larvicide treatment is primarily used to control mosquito larvae and can also target fly and certain other insect larvae depending on the approved formulation and site conditions.",
  },
  {
    question: "Where is larvicide treatment applied?",
    answer:
      "Treatment is applied to identified breeding locations such as stagnant water, drains, damp corners, and surrounding water-collection points in accordance with product safety instructions.",
  },
  {
    question: "Is larvicide treatment suitable for residential properties?",
    answer:
      "Yes. Giridurga Pest Control plans larvicide treatments for residential houses, apartments, gardens, and surrounding compounds after inspecting potential breeding sites.",
  },
  {
    question: "How often should larvicide treatment be done?",
    answer:
      "Treatment frequency depends on local breeding conditions, rainfall, water accumulation, and the formulation used. Our technicians recommend a practical schedule after inspecting your property.",
  },
  {
    question: "Which cities in Odisha do you serve for larvicide and pest control?",
    answer:
      "Giridurga Pest Control serves Cuttack, Bhubaneswar, Puri, and nearby areas across Odisha for residential and commercial properties with genuine rates.",
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

const LarvicidetritmentMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(
      ".larvicide-treatment-service-main-reveal"
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
      className="larvicide-treatment-service-main"
      ref={rootRef}
    >
      <div className="larvicide-treatment-service-main-glow larvicide-treatment-service-main-glow-one" />
      <div className="larvicide-treatment-service-main-glow larvicide-treatment-service-main-glow-two" />

      <div className="larvicide-treatment-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="larvicide-treatment-service-main-sidebar">
          <div className="larvicide-treatment-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`larvicide-treatment-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="larvicide-treatment-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="larvicide-treatment-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="larvicide-treatment-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="larvicide-treatment-service-main-contact-card">
            <div className="larvicide-treatment-service-main-contact-decoration larvicide-treatment-service-main-contact-decoration-one" />
            <div className="larvicide-treatment-service-main-contact-decoration larvicide-treatment-service-main-contact-decoration-two" />

            <div className="larvicide-treatment-service-main-contact-content">
              <h2>Contact Giridurga Pest Control</h2>

              <a
                href="tel:+919876543210"
                className="larvicide-treatment-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Talk to our pest control experts</p>

              <a
                href="tel:+919876543210"
                className="larvicide-treatment-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="larvicide-treatment-service-main-download"
          >
            <PdfIcon />
            <span>Download PDF File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="larvicide-treatment-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`larvicide-treatment-service-main-hero ${
              failedImages[activeService]
                ? "larvicide-treatment-service-main-hero-fallback"
                : ""
            }`}
          >
            {!failedImages[activeService] && (
              <img
                key={activeService}
                src={currentService.image}
                alt={currentService.title}
                className="larvicide-treatment-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="larvicide-treatment-service-main-hero-overlay" />

            <span className="larvicide-treatment-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="larvicide-treatment-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="larvicide-treatment-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="larvicide-treatment-service-main-overview larvicide-treatment-service-main-reveal">
            <span className="larvicide-treatment-service-main-section-subtitle">
              GIRIDURGA PEST CONTROL • BREEDING SOURCE PREVENTION
            </span>

            <h2>Larvicide Treatment Services in Odisha</h2>

            <p>
              Larvicide control is a preventive pest management method aimed at
              destroying pests at their larval stage before they grow into
              adults. It is especially effective against mosquitoes, flies, and
              other insects that breed in stagnant water or damp areas.
            </p>

            <p>
              By targeting larvae early, this method helps break the life cycle
              of pests, reducing future infestations and supporting a cleaner,
              healthier, and more hygienic environment for homes and businesses
              across <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby
              regions.
            </p>
          </div>

          {/* HOW WE WORK */}
          <div className="larvicide-treatment-service-main-how larvicide-treatment-service-main-reveal">
            <span className="larvicide-treatment-service-main-section-subtitle">
              OUR PROFESSIONAL APPROACH
            </span>

            <h2>How Giridurga Pest Control Does It</h2>

            <p>
              <strong>Giridurga Pest Control</strong> uses suitable approved
              larvicide products and professional application equipment to
              manage insect breeding sites effectively.
            </p>

            <p>
              Our trained professionals carefully identify problem areas such
              as drains, stagnant water, and damp corners. We inspect the
              property, select appropriate treatment methods, and apply
              larvicides according to product instructions and site
              requirements.
            </p>

            <p>
              With our professional approach, modern equipment, and preventive
              recommendations, we help minimize pest populations and maintain a
              cleaner, healthier environment.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="larvicide-treatment-service-main-comprehensive larvicide-treatment-service-main-reveal">
            <span className="larvicide-treatment-service-main-section-subtitle">
              COMPLETE LARVICIDE SOLUTIONS
            </span>

            <h2>Our Larvicide Treatment Process</h2>

            <p>
              Our treatment process focuses on identifying breeding locations,
              applying suitable larvicide solutions, and recommending preventive
              measures.
            </p>

            <div className="larvicide-treatment-service-main-image-grid">
              <div className="larvicide-treatment-service-main-image-card">
                <div className="larvicide-treatment-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Larval breeding site inspection in Odisha"
                  />
                  <span className="larvicide-treatment-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="larvicide-treatment-service-main-card-subtitle">
                  STAGNANT WATER &amp; DRAIN CHECK
                </span>

                <h3>Breeding Site Inspection</h3>

                <p>
                  Identify stagnant water, drains, and other potential insect
                  breeding locations across your property.
                </p>
              </div>

              <div className="larvicide-treatment-service-main-image-card">
                <div className="larvicide-treatment-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional larvicide application"
                  />
                  <span className="larvicide-treatment-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="larvicide-treatment-service-main-card-subtitle">
                  APPROVED STAGE-TARGETED CARE
                </span>

                <h3>Professional Treatment</h3>

                <p>
                  Apply suitable approved larvicide products to identified
                  breeding areas to break the pest life cycle early.
                </p>
              </div>
            </div>
          </div>

          {/* BENEFITS */}
          <div className="larvicide-treatment-service-main-benefits larvicide-treatment-service-main-reveal">
            <span className="larvicide-treatment-service-main-section-subtitle">
              WHY CHOOSE OUR SERVICE
            </span>

            <h2>Benefits of Professional Larvicide Treatment</h2>

            <div className="larvicide-treatment-service-main-benefit-grid">
              {[
                "Targets pests at the larval stage",
                "Helps reduce mosquito and fly breeding",
                "Professional inspection and application",
                "Suitable solutions for residential and commercial properties",
                "Preventive recommendations for long-term management",
                "Trained pest control professionals",
              ].map((benefit, index) => (
                <div
                  className="larvicide-treatment-service-main-benefit-item"
                  key={index}
                >
                  <span>✓</span>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICE AREAS / SEO KEYWORDS */}
          <div className="larvicide-treatment-service-main-areas larvicide-treatment-service-main-reveal">
            <span className="larvicide-treatment-service-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Trusted Larvicide &amp; Pest Control Across Odisha</h2>

            <p>
              Looking for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>?{" "}
              <strong>Giridurga Pest Control</strong> provides professional
              larvicide treatment and preventive pest management across Odisha.
            </p>

            <p>
              We serve customers searching for{" "}
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

            <div className="larvicide-treatment-service-main-local-box">
              <span className="larvicide-treatment-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Larvicide &amp; Pest Protection Across Odisha</h3>
              <div className="larvicide-treatment-service-main-keyword-tags">
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
          <div className="larvicide-treatment-service-main-faq larvicide-treatment-service-main-reveal">
            <span className="larvicide-treatment-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="larvicide-treatment-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              larvicide treatment, mosquito breeding control, and preventive
              services.
            </p>

            <div className="larvicide-treatment-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`larvicide-treatment-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="larvicide-treatment-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="larvicide-treatment-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="larvicide-treatment-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="larvicide-treatment-service-main-bottom-cta larvicide-treatment-service-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Larvicide Treatment?</h2>

              <p>
                Contact Giridurga Pest Control today for professional
                larvicide treatment and preventive pest management solutions at
                genuine rates.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="larvicide-treatment-service-main-cta-button"
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

export default LarvicidetritmentMain;