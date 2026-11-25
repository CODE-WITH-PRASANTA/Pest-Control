import React, { useEffect, useRef, useState } from "react";
import "./WaspmanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Wasp Nest Inspection",
    heading: "Professional Wasp Nest Inspection Services",
    image: serviceone,
    description:
      "Identify wasp nests, entry points and active colonies around your property with a detailed professional inspection.",
  },
  {
    title: "Wasp Nest Removal",
    heading: "Safe and Professional Wasp Nest Removal",
    image: service,
    description:
      "Control dangerous wasp nests with professional removal methods, protective equipment and carefully selected treatments.",
  },
  {
    title: "Hornet Control",
    heading: "Expert Hornet and Wasp Control Solutions",
    image: servicetwo,
    description:
      "Manage aggressive hornets and wasp colonies with targeted pest management solutions for residential and commercial properties.",
  },
  {
    title: "Preventive Wasp Treatment",
    heading: "Long-Term Wasp Prevention and Protection",
    image: serviceone,
    description:
      "Reduce the chances of recurring wasp infestations with preventive treatments and professional property recommendations.",
  },
  {
    title: "Commercial Wasp Management",
    heading: "Complete Wasp Management for Businesses",
    image: service,
    description:
      "Protect schools, offices, warehouses, hotels and outdoor commercial spaces with customized wasp management services.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Inspection & Nest Location",
    description:
      "Our experts thoroughly inspect eaves, balconies, wall cavities, gardens and rooftops to identify wasp species, nest size and entry points.",
    image: serviceone,
  },
  {
    number: "02",
    title: "Customized Treatment Plan",
    description:
      "Based on the nesting location and infestation severity, we select the safest, most effective wasp removal and control approach for your property.",
    image: servicetwo,
  },
  {
    number: "03",
    title: "Safe & Targeted Nest Removal",
    description:
      "Equipped with full protective gear and approved formulations, our technicians neutralize the colony and safely remove accessible nests.",
    image: service,
  },
  {
    number: "04",
    title: "Preventive Measures",
    description:
      "After removal, we seal potential entry gaps and share practical outdoor hygiene tips to discourage wasps from rebuilding nests.",
    image: serviceone,
  },
  {
    number: "05",
    title: "Follow-Up Support",
    description:
      "Scheduled checks and ongoing pest management support help verify colony clearance and keep your property protected.",
    image: servicetwo,
  },
];

const faqs = [
  {
    question: "What is included in Giridurga Pest Control's wasp management service?",
    answer:
      "Our wasp management service includes property inspection, identification of wasp species, nest location, suitable treatment selection, professional nest removal where appropriate and preventive recommendations.",
  },
  {
    question: "Is professional wasp nest removal safe?",
    answer:
      "Yes. Our trained professionals use appropriate protective equipment and carefully selected treatment methods. Clear safety instructions are provided to help protect occupants, children and pets during the service.",
  },
  {
    question: "Do you provide prompt wasp nest removal?",
    answer:
      "We offer prompt wasp management assistance depending on technician availability and the location of the infestation. Contact our team to check same-day service availability.",
  },
  {
    question: "Which types of wasps do you control?",
    answer:
      "We provide management solutions for common wasps, paper wasps, hornets and mud daubers. Treatment methods are selected according to the species and nesting location.",
  },
  {
    question: "Do you provide wasp control in Bhubaneswar, Cuttack and Puri?",
    answer:
      "Yes. Giridurga Pest Control provides wasp management services in Bhubaneswar, Cuttack, Puri and nearby areas across Odisha with genuine rates and timely support.",
  },
  {
    question: "Can wasps build nests inside buildings?",
    answer:
      "Yes. Wasps may build nests around roofs, wall cavities, balconies, window frames, sheds and other sheltered spaces. Professional inspection helps identify the exact nesting location.",
  },
  {
    question: "Do you provide wasp management for commercial properties?",
    answer:
      "Yes. We provide customized wasp management solutions for schools, offices, hotels, restaurants, warehouses, factories and other commercial properties.",
  },
  {
    question: "How can I prevent wasps from returning?",
    answer:
      "Keep outdoor food covered, seal suitable entry points, maintain gardens and remove potential nesting opportunities. Our technicians also recommend preventive measures after inspection.",
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

const WaspmanagementserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];

  // SCROLL REVEAL ANIMATION
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".wasp-management-main-reveal");

    if (typeof IntersectionObserver === "undefined") {
      items.forEach((item) => item.classList.add("is-visible"));
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

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="wasp-management-main" ref={rootRef}>
      <div className="wasp-management-main-glow wasp-management-main-glow-one" />
      <div className="wasp-management-main-glow wasp-management-main-glow-two" />

      <div className="wasp-management-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="wasp-management-main-sidebar">
          <div className="wasp-management-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`wasp-management-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="wasp-management-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="wasp-management-main-menu-title">
                  {srv.title}
                </span>

                <span className="wasp-management-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="wasp-management-main-contact-card">
            <div className="wasp-management-main-contact-decoration wasp-management-main-contact-decoration-one" />
            <div className="wasp-management-main-contact-decoration wasp-management-main-contact-decoration-two" />

            <div className="wasp-management-main-contact-content">
              <h2>Need Expert Wasp Management Assistance?</h2>

              <a
                href="tel:+919876543210"
                className="wasp-management-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Talk to our pest control experts</p>

              <a
                href="tel:+919876543210"
                className="wasp-management-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="wasp-management-main-download"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 2h8l5 5v14H6a2 2 0 01-2-2V4a2 2 0 012-2Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M14 2v5h5M8 16h2a1.5 1.5 0 000-3H8v5m5-5v5h1a2.5 2.5 0 000-5h-1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>

            <span>Download PDF File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="wasp-management-main-content">
          {/* HERO SECTION */}
          <div
            className={`wasp-management-main-hero ${
              failedImages[activeService]
                ? "wasp-management-main-hero-fallback"
                : ""
            }`}
          >
            {!failedImages[activeService] && (
              <img
                key={activeService}
                src={currentService.image}
                alt={currentService.title}
                className="wasp-management-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="wasp-management-main-hero-overlay" />

            <span className="wasp-management-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="wasp-management-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="wasp-management-main-hero-label">
                PROFESSIONAL WASP MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* WASP MANAGEMENT OVERVIEW */}
          <div className="wasp-management-main-overview wasp-management-main-reveal">
            <span className="wasp-management-main-section-subtitle">
              ABOUT WASP MANAGEMENT
            </span>

            <h2>Professional Wasp Management Service in Odisha</h2>

            <p>
              Wasp infestations can be dangerous and frightening. These
              aggressive insects often build nests in walls, roofs, gardens,
              balconies and near windows, posing a serious risk of painful
              stings, especially to children, elderly people and individuals
              with allergies.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we offer expert wasp
              management services in Odisha to safely manage wasp nests and help
              prevent future infestations. Our trained professionals use
              appropriate protective equipment and carefully selected
              insecticides to control wasp colonies while following necessary
              safety precautions.
            </p>

            <p>
              Whether you need wasp nest inspection, professional wasp removal,
              hornet control or preventive treatment across{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong> and nearby cities,
              our customized solutions are designed for residential and
              commercial properties.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="wasp-management-main-comprehensive wasp-management-main-reveal">
            <span className="wasp-management-main-section-subtitle">
              ADVANCED WASP PROTECTION
            </span>

            <h2>Complete Wasp Control and Nest Removal Solutions</h2>

            <p>
              We provide customized wasp control solutions for homes, schools,
              offices, warehouses, hotels and outdoor areas. Whether you are
              dealing with paper wasps, hornets or mud daubers, our professional
              inspection and targeted treatment help manage the infestation
              effectively.
            </p>

            <div className="wasp-management-main-image-grid">
              <div className="wasp-management-main-image-card">
                <div className="wasp-management-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Professional wasp nest inspection"
                    loading="lazy"
                  />
                  <span className="wasp-management-main-image-number">01</span>
                </div>

                <h3>Detailed Wasp Nest Inspection</h3>

                <p>
                  Identify wasp nests, nesting locations and infestation risks
                  around your property.
                </p>
              </div>

              <div className="wasp-management-main-image-card">
                <div className="wasp-management-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional wasp nest removal treatment"
                    loading="lazy"
                  />
                  <span className="wasp-management-main-image-number">02</span>
                </div>

                <h3>Professional Wasp Nest Removal</h3>

                <p>
                  Control dangerous wasp colonies through professional
                  treatment and appropriate nest removal procedures.
                </p>
              </div>
            </div>
          </div>

          {/* PROCESS AND METHODS */}
          <div className="wasp-management-main-process wasp-management-main-reveal">
            <span className="wasp-management-main-section-subtitle">
              OUR PROCESS &amp; METHODS
            </span>

            <h2>Our Wasp Control Treatment Process</h2>

            <p className="wasp-management-main-process-intro">
              We follow a structured, safety-first approach to locate, treat and
              remove wasp nests from your property.
            </p>

            <div className="wasp-management-main-process-list">
              {processSteps.map((step) => (
                <div
                  className="wasp-management-main-process-item"
                  key={step.number}
                >
                  <div className="wasp-management-main-process-image">
                    <img src={step.image} alt={step.title} loading="lazy" />
                    <span>{step.number}</span>
                  </div>

                  <div className="wasp-management-main-process-content">
                    <span>STEP {step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="wasp-management-main-overview wasp-management-main-reveal">
            <span className="wasp-management-main-section-subtitle">
              WHY CHOOSE GIRIDURGA PEST CONTROL
            </span>

            <h2>Trusted Wasp Management Experts Across Odisha</h2>

            <p>
              At <strong>Giridurga Pest Control</strong>, we understand the
              risks associated with wasp infestations. Our team focuses on
              proper inspection, suitable treatment selection and
              safety-conscious nest management.
            </p>

            <div className="wasp-management-main-benefits">
              <div>
                <span>✓</span>
                <p>Safe and controlled nest removal</p>
              </div>

              <div>
                <span>✓</span>
                <p>Professional protective equipment</p>
              </div>

              <div>
                <span>✓</span>
                <p>Carefully selected treatment methods</p>
              </div>

              <div>
                <span>✓</span>
                <p>Customized residential and commercial solutions</p>
              </div>

              <div>
                <span>✓</span>
                <p>Prompt service based on availability</p>
              </div>

              <div>
                <span>✓</span>
                <p>Preventive guidance to reduce future infestations</p>
              </div>
            </div>
          </div>

          {/* SERVICE LOCATIONS / SEO CONTENT */}
          <div className="wasp-management-main-location wasp-management-main-reveal">
            <span className="wasp-management-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Wasp Management and Pest Control Services Near You</h2>

            <p>
              <strong>Giridurga Pest Control</strong> provides professional pest
              control and wasp management services across Odisha. We serve
              customers in <strong>Bhubaneswar, Cuttack, Puri</strong> and
              nearby locations with solutions for residential, commercial and
              industrial properties.
            </p>

            <p>
              If you are searching for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>,{" "}
              <strong>pest control Bhubaneswar</strong>, the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, or{" "}
              <strong>pest control near Cuttack, Odisha</strong>, our team can
              help you choose a suitable pest management solution.
            </p>

            <p>
              Recognized among reliable{" "}
              <strong>Pest Control Service Providers in Cuttack</strong>, we
              also provide the{" "}
              <strong>best pest control services in Cuttack</strong>,{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>
              , and complete <strong>pest control solutions in Cuttack</strong>{" "}
              with genuine rates and professional assistance.
            </p>

            <div className="wasp-management-main-location-tags">
              <span>Bhubaneswar</span>
              <span>Cuttack</span>
              <span>Puri</span>
              <span>Odisha</span>
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

          {/* FAQ SECTION */}
          <div className="wasp-management-main-faq wasp-management-main-reveal">
            <span className="wasp-management-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="wasp-management-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              wasp management, wasp nest removal and preventive pest control
              services.
            </p>

            <div className="wasp-management-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`wasp-management-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="wasp-management-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="wasp-management-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="wasp-management-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="wasp-management-main-bottom-cta wasp-management-main-reveal">
            <div>
              <span>PROTECT YOUR PROPERTY TODAY</span>

              <h2>Need Professional Wasp Management?</h2>

              <p>
                Don&apos;t risk painful wasp stings. Contact Giridurga Pest
                Control for professional wasp nest inspection, removal and
                preventive assistance.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="wasp-management-main-cta-button"
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

export default WaspmanagementserviceMain;