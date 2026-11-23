import { useEffect, useRef, useState } from "react";
import "./FlymanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Fly Inspection",
    heading: "Detailed Fly Inspection Services",
    image: serviceone,
    description:
      "Identify breeding sites, entry points, waste zones and high-activity areas around your property with a thorough inspection.",
  },
  {
    title: "Fly Treatment",
    heading: "Professional Fly Control Solutions",
    image: service,
    description:
      "Bring housefly, fruit fly and drain fly activity under control with targeted larvicides, residual sprays, baits and traps.",
  },
  {
    title: "Breeding & Drain Control",
    heading: "Targeted Breeding Site & Drain Control",
    image: servicetwo,
    description:
      "Focused treatment around garbage areas, floor drains, grease traps, compost zones and damp organic buildup where flies breed.",
  },
  {
    title: "Residential & Commercial Sites",
    heading: "Fly Control for Homes & Businesses",
    image: service,
    description:
      "Customized fly management plans for homes, kitchens, restaurants, cafes, food processing units, hospitals and offices.",
  },
  {
    title: "Preventive Fly Management",
    heading: "Ongoing Fly Prevention & Hygiene Support",
    image: serviceone,
    description:
      "Minimize repeat fly infestations with UV fly catcher placement, sanitation guidance, screening advice and scheduled follow-ups.",
  },
];

const faqs = [
  {
    question: "What does your fly management service include?",
    answer:
      "Our service includes site inspection, locating breeding sources and entry points, targeted adult and larval control measures, and practical sanitation and exclusion advice to prevent future fly problems.",
  },
  {
    question: "What types of flies do you control?",
    answer:
      "We manage common nuisance and hygiene-risk species including houseflies, fruit flies, drain flies, blowflies and cluster flies across indoor and outdoor areas.",
  },
  {
    question: "Are fly control treatments safe for kitchens, children and pets?",
    answer:
      "We select food-safe and environment-appropriate methods such as targeted baits, UV traps and approved formulations, along with clear safety and preparation instructions for sensitive areas.",
  },
  {
    question: "How quickly will I see results after fly treatment?",
    answer:
      "Adult fly activity typically drops noticeably shortly after treatment, while addressing drains and breeding sites stops new flies from emerging over the following days.",
  },
  {
    question: "Do you provide fly control for restaurants and commercial spaces?",
    answer:
      "Yes. We provide tailored fly management programs for restaurants, commercial kitchens, food facilities, warehouses, retail stores and residential properties.",
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

    const items = root.querySelectorAll(
      ".fly-management-service-main-reveal"
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
      className="fly-management-service-main"
      ref={rootRef}
    >
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
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="fly-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
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
              imageFailed
                ? "fly-management-service-main-hero-fallback"
                : ""
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
                PROFESSIONAL FLY MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="fly-management-service-main-overview fly-management-service-main-reveal">
            <span className="fly-management-service-main-section-subtitle">
              ABOUT FLY MANAGEMENT
            </span>

            <h2>Fly Management Overview</h2>

            <p>
              Flies multiply rapidly around organic waste, drains, kitchens and
              outdoor refuse areas, spreading bacteria and creating serious
              hygiene concerns for homes and businesses. Our team inspects
              breeding zones, identifies entry points and delivers targeted fly
              control for your property.
            </p>

            <p>
              Every facility has different hygiene and structural pressures. We
              assess waste handling, drainage, airflow and fly species before
              recommending an effective control and prevention plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="fly-management-service-main-comprehensive fly-management-service-main-reveal">
            <span className="fly-management-service-main-section-subtitle">
              TARGETED FLY CONTROL
            </span>

            <h2>Complete Fly Control Solutions</h2>

            <p>
              From residential kitchens to high-traffic hospitality and food
              facilities, we offer practical fly management tailored to your
              site conditions.
            </p>

            <div className="fly-management-service-main-image-grid">
              <div className="fly-management-service-main-image-card">
                <div className="fly-management-service-main-image-wrap">
                  <img src={serviceone} alt="Fly inspection" />
                  <span className="fly-management-service-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to pinpoint breeding grounds, drain
                  hotspots and entry points.
                </p>
              </div>

              <div className="fly-management-service-main-image-card">
                <div className="fly-management-service-main-image-wrap">
                  <img src={servicetwo} alt="Fly treatment" />
                  <span className="fly-management-service-main-image-number">
                    02
                  </span>
                </div>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted control measures designed to eliminate adult flies
                  and disrupt breeding cycles safely.
                </p>
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
              Find answers to common questions about our fly inspection,
              control and prevention services.
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
              <span>KEEP YOUR PROPERTY FLY-FREE</span>

              <h2>Need Professional Fly Control?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
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