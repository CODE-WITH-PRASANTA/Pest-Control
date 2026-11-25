import React, { useEffect, useRef, useState } from "react";
import "./SpiderserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Spider Inspection",
    heading: "Detailed Spider Inspection Services",
    image: serviceone,
    description:
      "Our experts inspect ceilings, corners, wall cracks, storage spaces and other hidden areas to identify spider activity and nesting spots.",
  },
  {
    title: "Spider Removal",
    heading: "Professional Spider Removal Solutions",
    image: service,
    description:
      "Effective spider removal solutions designed to eliminate unwanted spiders and restore a clean, comfortable environment.",
  },
  {
    title: "Web & Egg Sac Removal",
    heading: "Complete Spider Web & Egg Sac Removal",
    image: servicetwo,
    description:
      "We target spider webs, egg sacs and common hiding places to reduce spider activity and help prevent future infestations.",
  },
  {
    title: "Residential Spider Control",
    heading: "Spider Control for Homes & Apartments",
    image: serviceone,
    description:
      "Customized spider management solutions for houses, apartments, kitchens, bedrooms and other residential spaces.",
  },
  {
    title: "Commercial Spider Control",
    heading: "Spider Management for Commercial Spaces",
    image: service,
    description:
      "Reliable spider control services for offices, restaurants, hotels, warehouses, hospitals and industrial properties.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Inspection & Identification",
    description:
      "Our experts thoroughly inspect ceilings, corners, wall cracks and storage areas to identify spider species, webs, egg sacs and hiding spots.",
    image: serviceone,
  },
  {
    number: "02",
    title: "Customized Treatment Plan",
    description:
      "Based on the inspection findings, we design a spider management plan tailored to your property type and infestation level.",
    image: servicetwo,
  },
  {
    number: "03",
    title: "Web Clearance & Targeted Treatment",
    description:
      "We remove accessible webs and egg sacs and apply suitable targeted treatments to spider-prone cracks and crevices while following safety precautions.",
    image: service,
  },
  {
    number: "04",
    title: "Preventive Measures",
    description:
      "After treatment, we guide you with practical sealing, clutter-reduction and insect-control steps to reduce the chances of spiders returning.",
    image: serviceone,
  },
  {
    number: "05",
    title: "Follow-Up Services",
    description:
      "Scheduled monitoring and follow-up visits help verify treatment effectiveness and maintain spider-free surroundings.",
    image: servicetwo,
  },
];

const faqs = [
  {
    question: "Why do spiders enter homes and commercial spaces?",
    answer:
      "Spiders generally enter properties in search of food, shelter and suitable hiding places. Insects, moisture, clutter and small openings can attract them indoors.",
  },
  {
    question: "What does Giridurga Pest Control's spider management service include?",
    answer:
      "Our service includes property inspection, identification of spider hiding areas, removal of accessible webs and egg sacs, targeted pest management treatments and preventive recommendations.",
  },
  {
    question: "Are spider control treatments safe for children and pets?",
    answer:
      "We select suitable treatment methods according to your property and provide clear safety instructions. Children and pets should remain away from treated areas until the technician confirms they are safe to re-enter.",
  },
  {
    question: "How can I prevent spiders from coming back?",
    answer:
      "Regular cleaning, removing webs, sealing wall cracks, reducing clutter and controlling other insects can help minimize spider activity.",
  },
  {
    question: "Do you provide spider control for homes and commercial properties?",
    answer:
      "Yes. Giridurga Pest Control provides customized spider management services for houses, apartments, offices, hotels, restaurants, schools, hospitals, warehouses and commercial properties across Odisha.",
  },
  {
    question: "Which areas in Odisha do you serve?",
    answer:
      "We provide spider and general pest control services in Bhubaneswar, Cuttack, Puri and surrounding areas across Odisha with genuine rates and timely support.",
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

const SpiderserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];

  // SCROLL REVEAL ANIMATION
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".spider-service-main-reveal");

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
    <section className="spider-service-main" ref={rootRef}>
      <div className="spider-service-main-glow spider-service-main-glow-one" />
      <div className="spider-service-main-glow spider-service-main-glow-two" />

      <div className="spider-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="spider-service-main-sidebar">
          <div className="spider-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`spider-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="spider-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="spider-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="spider-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="spider-service-main-contact-card">
            <div className="spider-service-main-contact-decoration spider-service-main-contact-decoration-one" />
            <div className="spider-service-main-contact-decoration spider-service-main-contact-decoration-two" />

            <div className="spider-service-main-contact-content">
              <h2>Need Expert Spider Control Assistance?</h2>

              <a
                href="tel:+919876543210"
                className="spider-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Talk to our pest control experts</p>

              <a
                href="tel:+919876543210"
                className="spider-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="spider-service-main-download"
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
        <main className="spider-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`spider-service-main-hero ${
              failedImages[activeService]
                ? "spider-service-main-hero-fallback"
                : ""
            }`}
          >
            {!failedImages[activeService] && (
              <img
                key={activeService}
                src={currentService.image}
                alt={currentService.title}
                className="spider-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="spider-service-main-hero-overlay" />

            <span className="spider-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="spider-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="spider-service-main-hero-label">
                PROFESSIONAL SPIDER MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* OVERVIEW */}
          <div className="spider-service-main-overview spider-service-main-reveal">
            <span className="spider-service-main-section-subtitle">
              ABOUT SPIDER MANAGEMENT
            </span>

            <h2>Spider Management Services in Odisha</h2>

            <p>
              Spiders are commonly found in homes, offices, warehouses,
              restaurants and commercial spaces. Although most spiders are
              harmless, their presence can cause fear, discomfort and hygiene
              concerns. Spider webs and egg sacs around ceilings, windows,
              corners and storage areas can also affect the appearance of your
              property.
            </p>

            <p>
              <strong>Giridurga Pest Control</strong> provides professional
              spider management services in Odisha. Our trained team identifies
              spider hiding places, removes accessible webs and applies
              appropriate targeted treatments to help control spider activity
              and reduce the chances of recurring infestations.
            </p>

            <p>
              We provide customized solutions for residential and commercial
              properties across <strong>Bhubaneswar, Cuttack, Puri</strong> and
              nearby areas, including homes, apartments, hotels, restaurants,
              offices, schools and warehouses.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="spider-service-main-comprehensive spider-service-main-reveal">
            <span className="spider-service-main-section-subtitle">
              COMPLETE SPIDER CONTROL SOLUTIONS
            </span>

            <h2>How Giridurga Pest Control Helps</h2>

            <p>
              Our spider management services are designed to control spider
              activity and maintain cleaner, more comfortable surroundings
              through a systematic approach.
            </p>

            <div className="spider-service-main-image-grid">
              <div className="spider-service-main-image-card">
                <div className="spider-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Spider inspection service"
                    loading="lazy"
                  />

                  <span className="spider-service-main-image-number">01</span>
                </div>

                <h3>Inspection &amp; Identification</h3>

                <p>
                  Identifying spider species, webs, egg sacs and common hiding
                  locations throughout your property.
                </p>
              </div>

              <div className="spider-service-main-image-card">
                <div className="spider-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Spider control treatment"
                    loading="lazy"
                  />

                  <span className="spider-service-main-image-number">02</span>
                </div>

                <h3>Targeted Treatment</h3>

                <p>
                  Applying appropriate pest control treatments to spider-prone
                  areas, cracks and crevices.
                </p>
              </div>
            </div>
          </div>

          {/* PROCESS AND METHODS */}
          <div className="spider-service-main-process spider-service-main-reveal">
            <span className="spider-service-main-section-subtitle">
              OUR PROCESS &amp; METHODS
            </span>

            <h2>Our Spider Control Treatment Process</h2>

            <p className="spider-service-main-process-intro">
              We follow a systematic approach to identify, remove and prevent
              spider infestations in your property.
            </p>

            <div className="spider-service-main-process-list">
              {processSteps.map((step) => (
                <div
                  className="spider-service-main-process-item"
                  key={step.number}
                >
                  <div className="spider-service-main-process-image">
                    <img src={step.image} alt={step.title} loading="lazy" />

                    <span>{step.number}</span>
                  </div>

                  <div className="spider-service-main-process-content">
                    <span>STEP {step.number}</span>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="spider-service-main-overview spider-service-main-reveal">
            <span className="spider-service-main-section-subtitle">
              WHY CHOOSE GIRIDURGA PEST CONTROL
            </span>

            <h2>Reliable Spider Management for a Cleaner Environment</h2>

            <p>
              Professional spider control helps eliminate unsightly webs,
              reduce indoor insect attractants and maintain better hygiene. Our
              customized treatment approach considers the spider activity level,
              hiding zones and property requirements.
            </p>

            <p>
              We provide spider and general pest management solutions for
              residential and commercial spaces through detailed inspection,
              targeted treatments, preventive guidance and follow-up support.
            </p>

            <div className="spider-service-main-benefits">
              <div>
                <span>✓</span>
                <p>Customized spider &amp; web treatment plans</p>
              </div>

              <div>
                <span>✓</span>
                <p>Targeted crack, crevice &amp; ceiling care</p>
              </div>

              <div>
                <span>✓</span>
                <p>Residential and commercial spider control</p>
              </div>

              <div>
                <span>✓</span>
                <p>Preventive guidance and follow-up support</p>
              </div>
            </div>
          </div>

          {/* SERVICE LOCATIONS */}
          <div className="spider-service-main-location spider-service-main-reveal">
            <span className="spider-service-main-section-subtitle">
              OUR SERVICE AREAS
            </span>

            <h2>Spider &amp; Pest Control Services Across Odisha</h2>

            <p>
              <strong>Giridurga Pest Control</strong> provides professional
              spider management and general pest solutions for residential and
              commercial properties in <strong>Bhubaneswar, Cuttack, Puri</strong>{" "}
              and nearby areas. Whether you are looking for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>,{" "}
              <strong>pest control Bhubaneswar</strong>, the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, or{" "}
              <strong>pest control near Cuttack, Odisha</strong>, our team
              delivers dependable service.
            </p>

            <p>
              Recognized among trusted{" "}
              <strong>Pest Control Service Providers in Cuttack</strong>, we
              also offer the{" "}
              <strong>best pest control services in Cuttack</strong>,{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>
              , and complete <strong>pest control solutions in Cuttack</strong>.
            </p>

            <div className="spider-service-main-location-tags">
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
          <div className="spider-service-main-faq spider-service-main-reveal">
            <span className="spider-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="spider-service-main-faq-intro">
              Find answers to common questions about our spider inspection,
              removal and prevention services.
            </p>

            <div className="spider-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`spider-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="spider-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="spider-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="spider-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="spider-service-main-bottom-cta spider-service-main-reveal">
            <div>
              <span>KEEP YOUR PROPERTY SPIDER-FREE</span>

              <h2>Need Professional Spider Control?</h2>

              <p>
                Say goodbye to unwanted spiders and webs. Contact Giridurga
                Pest Control today for professional spider management solutions.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="spider-service-main-cta-button"
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

export default SpiderserviceMain;