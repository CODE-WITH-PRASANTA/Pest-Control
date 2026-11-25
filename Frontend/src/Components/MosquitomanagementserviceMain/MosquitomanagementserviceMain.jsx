import { useEffect, useRef, useState } from "react";
import "./MosquitomanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Mosquito Inspection",
    subtitle: "BREEDING & RESTING SITE AUDIT",
    heading: "Detailed Mosquito Inspection Services",
    image: serviceone,
    description:
      "Check stagnant water pockets, planters, coolers, drains and shaded resting areas to identify mosquito breeding sources and activity levels.",
  },
  {
    title: "Mosquito Treatment",
    subtitle: "INDOOR & OUTDOOR CONTROL",
    heading: "Professional Mosquito Treatment Solutions",
    image: service,
    description:
      "Reduce adult mosquito presence and larval activity with targeted indoor and outdoor treatment plans suited to your property.",
  },
  {
    title: "Larval & Drain Control",
    subtitle: "SOURCE & BREEDING REDUCTION",
    heading: "Targeted Larval & Stagnant Water Control",
    image: servicetwo,
    description:
      "Focused treatment for open drains, water sumps, terrace containers and damp corners where mosquitoes multiply rapidly.",
  },
  {
    title: "Residential & Commercial Control",
    subtitle: "HOMES, SOCIETIES & WORKPLACES",
    heading: "Mosquito Control for Homes & Businesses",
    image: service,
    description:
      "Customized mosquito management services for houses, housing societies, gardens, restaurants, offices, schools and commercial sites.",
  },
  {
    title: "Preventive Mosquito Care",
    subtitle: "SEASONAL & ONGOING PROTECTION",
    heading: "Ongoing Mosquito Prevention & Management",
    image: serviceone,
    description:
      "Keep mosquito pressure low with practical water-management guidance, screening tips and recommended follow-up schedules.",
  },
];

const faqs = [
  {
    question: "What does your mosquito management service include?",
    answer:
      "Our service includes inspection of breeding and resting spots, targeted mosquito fogging, larvicide application, eco-friendly repellents and practical advice to reduce recurring activity.",
  },
  {
    question: "Are mosquito treatments safe for children and pets?",
    answer:
      "Yes. We select appropriate odorless and safe mosquito spray treatments based on the indoor or outdoor area and provide clear safety instructions. Always follow your technician's re-entry guidance.",
  },
  {
    question: "How often should mosquito control be repeated?",
    answer:
      "Treatment frequency depends on weather, surrounding water sources, property size and mosquito pressure. Our technician can recommend a suitable schedule after inspection.",
  },
  {
    question: "How long does mosquito treatment take?",
    answer:
      "Service time depends on whether you need indoor rooms, balconies, gardens or commercial grounds treated. Your technician will share the expected duration upfront.",
  },
  {
    question: "Which cities do you cover for mosquito control in Odisha?",
    answer:
      "Giridurga Pest Control serves all major cities in Odisha, including Bhubaneswar, Cuttack, and Puri, for individual homes, apartments, residential societies, offices, and industrial premises.",
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

const MosquitomanagementserviceMain = () => {
  const rootRef = useRef(null);
  const sidebarRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const [stickyTop, setStickyTop] = useState(24);

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const updateStickyOffset = () => {
      if (!sidebarRef.current) return;
      if (window.innerWidth <= 860) {
        setStickyTop(0);
        return;
      }

      const sidebarHeight = sidebarRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const bottomGap = 24;

      if (sidebarHeight + 48 > viewportHeight) {
        setStickyTop(viewportHeight - sidebarHeight - bottomGap);
      } else {
        setStickyTop(24);
      }
    };

    updateStickyOffset();
    window.addEventListener("resize", updateStickyOffset);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && sidebarRef.current) {
      resizeObserver = new ResizeObserver(updateStickyOffset);
      resizeObserver.observe(sidebarRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateStickyOffset);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(
      ".mosquito-management-service-main-reveal"
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
      className="mosquito-management-service-main"
      ref={rootRef}
    >
      <div
        className="mosquito-management-service-main-bg-wrap"
        aria-hidden="true"
      >
        <div className="mosquito-management-service-main-glow mosquito-management-service-main-glow-one" />
        <div className="mosquito-management-service-main-glow mosquito-management-service-main-glow-two" />
      </div>

      <div className="mosquito-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside
          className="mosquito-management-service-main-sidebar"
          ref={sidebarRef}
          style={{ top: `${stickyTop}px` }}
        >
          <div className="mosquito-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`mosquito-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="mosquito-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mosquito-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="mosquito-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="mosquito-management-service-main-contact-card">
            <div className="mosquito-management-service-main-contact-decoration mosquito-management-service-main-contact-decoration-one" />
            <div className="mosquito-management-service-main-contact-decoration mosquito-management-service-main-contact-decoration-two" />

            <div className="mosquito-management-service-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="mosquito-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="mosquito-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="mosquito-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="mosquito-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`mosquito-management-service-main-hero ${
              imageFailed
                ? "mosquito-management-service-main-hero-fallback"
                : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="mosquito-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="mosquito-management-service-main-hero-overlay" />

            <span className="mosquito-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="mosquito-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="mosquito-management-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="mosquito-management-service-main-overview mosquito-management-service-main-reveal">
            <span className="mosquito-management-service-main-section-subtitle">
              MOSQUITO CONTROL STRATEGY
            </span>

            <h2>
              Mosquito Control &amp; Fogging Service in Odisha — Protect Your
              Family from Dengue
            </h2>

            <p>
              Mosquitoes are not just annoying—they are dangerous carriers of
              deadly diseases like dengue, malaria, and chikungunya. If you are
              facing frequent mosquito bites at home or workplace, it&apos;s
              time to take expert help for long-term relief.
            </p>

            <p>
              At Giridurga Pest Control, we offer advanced mosquito management
              services in Odisha for residential, commercial, and industrial
              properties. Our treatment includes targeted mosquito fogging,
              larvicide application, and eco-friendly repellents that eliminate
              both adult mosquitoes and their breeding sources.
            </p>
          </div>

          {/* WHY MOSQUITO CONTROL IS CRITICAL */}
          <div className="mosquito-management-service-main-overview mosquito-management-service-main-reveal">
            <span className="mosquito-management-service-main-section-subtitle">
              WHY MOSQUITO CONTROL MATTERS
            </span>

            <h2>Why Mosquito Control Is Critical in Odisha</h2>

            <p>
              Our trained professionals inspect your premises, identify
              high-risk areas like stagnant water and dark corners, and provide
              a customized mosquito control solution. We ensure that our
              treatments are safe for humans, pets, and the environment.
            </p>

            <p>
              We serve all major cities in Odisha, including Bhubaneswar,
              Cuttack, and Puri, with fast, reliable, and affordable service.
            </p>

            <ul className="mosquito-management-service-main-benefits">
              <li>✅ Kills mosquitoes and stops breeding</li>
              <li>✅ Odorless &amp; safe mosquito spray treatments</li>
              <li>✅ Expert support &amp; free inspection</li>
            </ul>

            <p className="mosquito-management-service-main-closing-note">
              Protect your family and workspace from mosquito-borne diseases
              with the help of Odisha’s trusted pest control experts at
              Giridurga Pest Control.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="mosquito-management-service-main-comprehensive mosquito-management-service-main-reveal">
            <span className="mosquito-management-service-main-section-subtitle">
              FIELD EXECUTION &amp; SOURCE CARE
            </span>

            <h2>Complete Mosquito Control Solutions</h2>

            <p>
              From residential homes and gardens to commercial properties, we
              provide practical mosquito management tailored to the site
              layout and infestation conditions.
            </p>

            <div className="mosquito-management-service-main-image-grid">
              <div className="mosquito-management-service-main-image-card">
                <div className="mosquito-management-service-main-image-wrap">
                  <img src={serviceone} alt="Mosquito inspection" />
                  <span className="mosquito-management-service-main-image-number">
                    01
                  </span>
                </div>

                <span className="mosquito-management-service-main-card-subtitle">
                  SITE &amp; BREEDING CHECK
                </span>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to locate breeding pockets, resting
                  zones and sources of mosquito activity.
                </p>
              </div>

              <div className="mosquito-management-service-main-image-card">
                <div className="mosquito-management-service-main-image-wrap">
                  <img src={servicetwo} alt="Mosquito treatment" />
                  <span className="mosquito-management-service-main-image-number">
                    02
                  </span>
                </div>

                <span className="mosquito-management-service-main-card-subtitle">
                  TARGETED APPLICATION
                </span>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted fogging and larvicide procedures designed to curb
                  mosquito activity effectively across key zones.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="mosquito-management-service-main-faq mosquito-management-service-main-reveal">
            <span className="mosquito-management-service-main-section-subtitle">
              SERVICE CLARIFICATIONS &amp; SAFETY
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="mosquito-management-service-main-faq-intro">
              Find answers to common questions about our mosquito inspection,
              fogging, treatment and prevention services.
            </p>

            <div className="mosquito-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`mosquito-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="mosquito-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="mosquito-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="mosquito-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="mosquito-management-service-main-bottom-cta mosquito-management-service-main-reveal">
            <div>
              <span>PROTECT YOUR SPACE FROM MOSQUITOES</span>

              <h2>Need Professional Mosquito Control?</h2>

              <p>
                Get in touch with Giridurga Pest Control and find the right
                solution for your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="mosquito-management-service-main-cta-button"
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

export default MosquitomanagementserviceMain;