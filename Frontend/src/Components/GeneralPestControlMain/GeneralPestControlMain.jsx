
import React, { useEffect, useRef, useState } from "react";
import "./GeneralPestControlMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Pest Inspection",
    heading: "Professional General Pest Inspection Services",
    image: serviceone,
    description:
      "Our experts inspect your property to identify common household and workplace pests, their hiding spots and infestation levels.",
  },
  {
    title: "Cockroach & Ant Control",
    heading: "Advanced Cockroach & Ant Control Solutions",
    image: service,
    description:
      "Control unwanted cockroaches and ants with targeted treatments designed to eliminate infestations and prevent recurring pest problems.",
  },
  {
    title: "Mosquito & Fly Control",
    heading: "Effective Mosquito & Fly Management",
    image: servicetwo,
    description:
      "Maintain a hygienic environment with professional mosquito and fly control treatments for residential and commercial properties.",
  },
  {
    title: "Spider & Lizard Control",
    heading: "Reliable Spider & Lizard Control Services",
    image: serviceone,
    description:
      "Protect your indoor spaces through suitable pest management methods that help control spiders, lizards and other unwanted pests.",
  },
  {
    title: "Preventive Pest Management",
    heading: "Long-Term General Pest Prevention",
    image: service,
    description:
      "Prevent future pest infestations with regular monitoring, preventive treatments and expert hygiene recommendations.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Inspection & Assessment",
    description:
      "Our experts thoroughly inspect your premises to identify the type of pests, their hiding spots and the level of infestation.",
    image: serviceone,
  },
  {
    number: "02",
    title: "Customized Treatment Plan",
    description:
      "Based on the inspection findings, we design a treatment plan tailored to your specific property and pest control requirements.",
    image: servicetwo,
  },
  {
    number: "03",
    title: "Safe & Targeted Treatment",
    description:
      "Using suitable government-approved chemicals, gels, sprays or fogging methods, we target pests at their source while following appropriate safety precautions.",
    image: service,
  },
  {
    number: "04",
    title: "Preventive Measures",
    description:
      "After treatment, we guide you with preventive steps and hygiene practices to reduce the chances of pests returning.",
    image: serviceone,
  },
  {
    number: "05",
    title: "Follow-Up Services",
    description:
      "Regular monitoring and follow-up visits help us assess treatment effectiveness and support long-term pest management.",
    image: servicetwo,
  },
];

const faqs = [
  {
    question: "What is included in general pest control services?",
    answer:
      "Our general pest control services include property inspection, pest identification, customized treatment planning, targeted pest treatment, preventive recommendations and follow-up support.",
  },
  {
    question: "Which pests are covered under general pest control?",
    answer:
      "General pest control covers common pests such as cockroaches, ants, spiders, lizards, flies, mosquitoes, bed bugs and rodents.",
  },
  {
    question: "Are general pest control treatments safe for children and pets?",
    answer:
      "We select suitable treatment methods according to your property and pest infestation. Our technicians provide necessary safety instructions, and children and pets should be kept away from treated areas as advised.",
  },
  {
    question: "How often should general pest control be done?",
    answer:
      "The frequency depends on the type of pests, property conditions and infestation level. Our experts can recommend a suitable treatment and monitoring schedule after inspection.",
  },
  {
    question: "Do you provide pest control for homes and offices?",
    answer:
      "Yes. General pest control solutions can be arranged for houses, apartments, offices, shops, hotels, restaurants, warehouses and other commercial properties.",
  },
  {
    question: "How long does a general pest control treatment take?",
    answer:
      "Treatment duration depends on property size, pest type, infestation level and selected treatment method. Our technician can explain the expected duration after inspection.",
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

const GeneralPestControlMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];

  // SCROLL REVEAL ANIMATION
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(
      ".general-pest-control-main-reveal"
    );

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
    <section
      className="general-pest-control-main"
      ref={rootRef}
    >
      <div className="general-pest-control-main-glow general-pest-control-main-glow-one" />
      <div className="general-pest-control-main-glow general-pest-control-main-glow-two" />

      <div className="general-pest-control-main-container">

        {/* LEFT SIDEBAR */}

        <aside className="general-pest-control-main-sidebar">

          <div className="general-pest-control-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`general-pest-control-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="general-pest-control-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="general-pest-control-main-menu-title">
                  {srv.title}
                </span>

                <span className="general-pest-control-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}

          <div className="general-pest-control-main-contact-card">

            <div className="general-pest-control-main-contact-decoration general-pest-control-main-contact-decoration-one" />
            <div className="general-pest-control-main-contact-decoration general-pest-control-main-contact-decoration-two" />

            <div className="general-pest-control-main-contact-content">

              <h2>
                Need Professional Pest Control Assistance?
              </h2>

              <a
                href="tel:+919876543210"
                className="general-pest-control-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Talk to our pest control experts</p>

              <a
                href="tel:+919876543210"
                className="general-pest-control-main-contact-number"
              >
                +91 98765 43210
              </a>

            </div>
          </div>

          {/* DOWNLOAD BUTTON */}

          <a
            href="/service-brochure.pdf"
            download
            className="general-pest-control-main-download"
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

        <main className="general-pest-control-main-content">

          {/* HERO SECTION */}

          <div
            className={`general-pest-control-main-hero ${
              failedImages[activeService]
                ? "general-pest-control-main-hero-fallback"
                : ""
            }`}
          >
            {!failedImages[activeService] && (
              <img
                key={activeService}
                src={currentService.image}
                alt={currentService.title}
                className="general-pest-control-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="general-pest-control-main-hero-overlay" />

            <span className="general-pest-control-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="general-pest-control-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="general-pest-control-main-hero-label">
                PROFESSIONAL GENERAL PEST CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* OVERVIEW */}

          <div className="general-pest-control-main-overview general-pest-control-main-reveal">

            <span className="general-pest-control-main-section-subtitle">
              ABOUT GENERAL PEST CONTROL
            </span>

            <h2>
              Professional General Pest Control Services
            </h2>

            <p>
              General pest control refers to the treatment and prevention
              of common household and workplace pests such as cockroaches,
              ants, spiders, lizards, flies, mosquitoes, bed bugs and
              rodents. These pests can affect hygiene, damage property
              and create an uncomfortable living or working environment.
            </p>

            <p>
              The service involves the use of suitable chemicals, sprays,
              gels and other treatment methods to eliminate pests and
              prevent them from returning. It generally includes detailed
              inspection, targeted treatment and follow-up services to
              maintain a clean, hygienic and pest-free environment.
            </p>

            <p>
              At Nilachakra Pest Control, we provide professional pest
              control solutions for residential and commercial properties.
              Our approach focuses on protecting health, preventing
              property damage and maintaining overall hygiene.
            </p>

          </div>

          {/* COMPREHENSIVE SOLUTIONS */}

          <div className="general-pest-control-main-comprehensive general-pest-control-main-reveal">

            <span className="general-pest-control-main-section-subtitle">
              OUR PROFESSIONAL APPROACH
            </span>

            <h2>
              Complete General Pest Control Solutions
            </h2>

            <p>
              From identifying pest infestation sources to applying
              suitable treatment methods, our experts follow a structured
              pest management process to provide effective and reliable
              solutions.
            </p>

            <div className="general-pest-control-main-image-grid">

              <div className="general-pest-control-main-image-card">
                <div className="general-pest-control-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Professional pest inspection"
                    loading="lazy"
                  />

                  <span className="general-pest-control-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Pest Inspection</h3>

                <p>
                  Identify pest types, hiding spots and infestation
                  areas through professional property inspection.
                </p>
              </div>

              <div className="general-pest-control-main-image-card">
                <div className="general-pest-control-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional general pest treatment"
                    loading="lazy"
                  />

                  <span className="general-pest-control-main-image-number">
                    02
                  </span>
                </div>

                <h3>Targeted Pest Treatment</h3>

                <p>
                  Apply suitable treatment methods to control common
                  household and commercial pest infestations.
                </p>
              </div>

            </div>
          </div>

          {/* PROCESS AND METHODS */}

          <div className="general-pest-control-main-process general-pest-control-main-reveal">

            <span className="general-pest-control-main-section-subtitle">
              OUR PROCESS & METHODS
            </span>

            <h2>
              Our General Pest Control Treatment Process
            </h2>

            <p className="general-pest-control-main-process-intro">
              We follow a systematic approach to identify, treat and
              prevent common pest infestations in your property.
            </p>

            <div className="general-pest-control-main-process-list">

              {processSteps.map((step) => (
                <div
                  className="general-pest-control-main-process-item"
                  key={step.number}
                >
                  <div className="general-pest-control-main-process-image">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                    />

                    <span>{step.number}</span>
                  </div>

                  <div className="general-pest-control-main-process-content">
                    <span>STEP {step.number}</span>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* WHY CHOOSE US */}

          <div className="general-pest-control-main-overview general-pest-control-main-reveal">

            <span className="general-pest-control-main-section-subtitle">
              WHY CHOOSE NILACHAKRA PEST CONTROL
            </span>

            <h2>
              Reliable Pest Management for a Cleaner Environment
            </h2>

            <p>
              Professional general pest control helps reduce pest-related
              health risks, prevent property damage and maintain better
              hygiene. Our customized treatment approach considers the
              type of pest, infestation level and property requirements.
            </p>

            <p>
              We provide pest management solutions for residential and
              commercial spaces, helping property owners manage common
              pests through inspection, targeted treatments, preventive
              recommendations and follow-up support.
            </p>

            <div className="general-pest-control-main-benefits">

              <div>
                <span>✓</span>
                <p>Customized pest treatment plans</p>
              </div>

              <div>
                <span>✓</span>
                <p>Suitable and targeted treatment methods</p>
              </div>

              <div>
                <span>✓</span>
                <p>Residential and commercial pest control</p>
              </div>

              <div>
                <span>✓</span>
                <p>Preventive guidance and follow-up support</p>
              </div>

            </div>
          </div>

          {/* SERVICE LOCATIONS */}

          <div className="general-pest-control-main-location general-pest-control-main-reveal">

            <span className="general-pest-control-main-section-subtitle">
              OUR SERVICE AREAS
            </span>

            <h2>
              General Pest Control Services Across Odisha
            </h2>

            <p>
              Nilachakra Pest Control provides professional pest
              management solutions for residential and commercial
              properties in Bhubaneswar, Cuttack, Puri and nearby areas.
              Contact our team for suitable pest control solutions
              based on your property requirements.
            </p>

            <div className="general-pest-control-main-location-tags">
              <span>Bhubaneswar</span>
              <span>Cuttack</span>
              <span>Puri</span>
              <span>Odisha</span>
            </div>

          </div>

          {/* FAQ SECTION */}

          <div className="general-pest-control-main-faq general-pest-control-main-reveal">

            <span className="general-pest-control-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="general-pest-control-main-faq-intro">
              Find answers to common questions about our general pest
              control treatments and professional pest management services.
            </p>

            <div className="general-pest-control-main-faq-list">

              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`general-pest-control-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="general-pest-control-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="general-pest-control-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="general-pest-control-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* BOTTOM CTA */}

          <div className="general-pest-control-main-bottom-cta general-pest-control-main-reveal">

            <div>
              <span>PROTECT YOUR PROPERTY TODAY</span>

              <h2>
                Need Professional General Pest Control?
              </h2>

              <p>
                Keep your home and workplace clean, hygienic and protected
                from unwanted pests. Contact Nilachakra Pest Control today.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="general-pest-control-main-cta-button"
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

export default GeneralPestControlMain;
