import { useEffect, useRef, useState } from "react";
import "./ServiceDetailsMain.css";
import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

/*
  Every service now uses an imported image, so the hero image always shows.
  When you have more photos, import them above and replace the `image` values.
*/
const services = [
  {
    title: "Termite Control",
    heading: "Advanced Termite Control Solutions",
    image: serviceone,
    description:
      "Protect your home and property from destructive termites with our professional inspection and treatment solutions.",
  },
  {
    title: "Mosquito Control",
    heading: "Professional Mosquito Control Services",
    image: service,
    description:
      "Enjoy a healthier environment with effective mosquito prevention and treatment designed for homes and businesses.",
  },
  {
    title: "Ant & Insect Control",
    heading: "Complete Ant & Insect Protection",
    image: servicetwo,
    description:
      "Our experienced technicians identify insect activity and provide targeted solutions to keep your surroundings protected.",
  },
  {
    title: "Residential & Commercial",
    heading: "Residential & Commercial Pest Solutions",
    image: service,
    description:
      "Customized pest management programs for residential buildings, offices, commercial spaces and industries.",
  },
  {
    title: "Bed Bug Treatment",
    heading: "Effective Bed Bug Treatment",
    image: serviceone,
    description:
      "Restore comfort to your sleeping environment with professional bed bug inspection and treatment services.",
  },
];

const faqs = [
  {
    question: "What types of pest control treatments do you offer?",
    answer:
      "We provide termite control, mosquito management, ant and insect treatment, rodent control, bed bug treatment and customized commercial pest management solutions.",
  },
  {
    question: "Are your treatments safe for children and pets?",
    answer:
      "We use professionally selected treatment methods and provide safety instructions according to the products and treatment procedures used. Always follow the technician's re-entry guidance.",
  },
  {
    question: "How often should pest control be performed?",
    answer:
      "The frequency depends on the type of pest, property conditions and infestation level. Our experts can recommend a suitable maintenance schedule after inspection.",
  },
  {
    question: "How long does a pest control treatment take?",
    answer:
      "Treatment time depends on the property size and pest problem. Our technician will explain the expected duration before starting the service.",
  },
  {
    question: "Do you provide residential and commercial services?",
    answer:
      "Yes. We offer customized pest control services for houses, apartments, offices, restaurants, warehouses and commercial properties.",
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

const ServiceDetailsMain = () => {
  const rootRef = useRef(null);
  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  // scroll reveal for the content blocks
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = root.querySelectorAll(".service-details-main-reveal");

    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="service-details-main" ref={rootRef}>
      <div className="service-details-main-glow service-details-main-glow-one" />
      <div className="service-details-main-glow service-details-main-glow-two" />

      <div className="service-details-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="service-details-main-sidebar">
          <div className="service-details-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`service-details-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="service-details-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-details-main-menu-title">
                  {srv.title}
                </span>
                <span className="service-details-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="service-details-main-contact-card">
            <div className="service-details-main-contact-decoration service-details-main-contact-decoration-one"></div>
            <div className="service-details-main-contact-decoration service-details-main-contact-decoration-two"></div>

            <div className="service-details-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="service-details-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="service-details-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="service-details-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="service-details-main-content">
          {/* HERO */}
          <div
            className={`service-details-main-hero ${
              imageFailed ? "service-details-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="service-details-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [activeService]: true }))
                }
              />
            )}

            <div className="service-details-main-hero-overlay"></div>

            <span className="service-details-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i /> {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="service-details-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="service-details-main-hero-label">
                PROFESSIONAL PEST MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>
              <p>{currentService.description}</p>
            </div>
          </div>

          {/* OVERVIEW */}
          <div className="service-details-main-overview service-details-main-reveal">
            <span className="service-details-main-section-subtitle">
              ABOUT OUR SERVICES
            </span>

            <h2>Service Overview</h2>

            <p>
              We provide comprehensive pest control solutions designed to protect
              your home, workplace and surroundings from unwanted pests. Our
              experienced professionals use systematic inspection and targeted
              treatment methods to deliver reliable pest management.
            </p>

            <p>
              Every property has different pest control requirements. That's why
              we focus on identifying the source of infestation and recommending
              appropriate treatment solutions for long-term protection.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="service-details-main-comprehensive service-details-main-reveal">
            <span className="service-details-main-section-subtitle">
              COMPLETE PROTECTION
            </span>

            <h2>Comprehensive Pest Control Solutions</h2>

            <p>
              From residential pest problems to large commercial requirements,
              we deliver customized pest management solutions with professional
              care.
            </p>

            <div className="service-details-main-image-grid">
              <div className="service-details-main-image-card">
                <div className="service-details-main-image-wrap">
                  <img src={serviceone} alt="Professional pest inspection" />
                  <span className="service-details-main-image-number">01</span>
                </div>

                <h3>Professional Inspection</h3>

                <p>
                  Detailed inspection to identify pest activity and understand
                  the source of infestation.
                </p>
              </div>

              <div className="service-details-main-image-card">
                <div className="service-details-main-image-wrap">
                  <img src={servicetwo} alt="Professional pest treatment" />
                  <span className="service-details-main-image-number">02</span>
                </div>

                <h3>Advanced Treatment</h3>

                <p>
                  Targeted treatment procedures designed to manage pest
                  problems effectively.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="service-details-main-faq service-details-main-reveal">
            <span className="service-details-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="service-details-main-faq-intro">
              Find answers to common questions about our professional pest control
              services.
            </p>

            <div className="service-details-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`service-details-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="service-details-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="service-details-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="service-details-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="service-details-main-bottom-cta service-details-main-reveal">
            <div>
              <span>LET'S PROTECT YOUR PROPERTY</span>
              <h2>Need Professional Pest Control?</h2>
              <p>
                Get in touch with our team and find the right solution for your
                property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="service-details-main-cta-button"
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

export default ServiceDetailsMain;