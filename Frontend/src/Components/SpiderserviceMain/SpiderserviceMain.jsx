
import { useEffect, useRef, useState } from "react";
import "./SpiderserviceMain.css";

// Add your images manually
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
    image: service,
    description:
      "Customized spider management solutions for houses, apartments, kitchens, bedrooms and other residential spaces.",
  },
  {
    title: "Commercial Spider Control",
    heading: "Spider Management for Commercial Spaces",
    image: serviceone,
    description:
      "Reliable spider control services for offices, restaurants, hotels, warehouses, hospitals and industrial properties.",
  },
];

const faqs = [
  {
    question: "Why do spiders enter homes and commercial spaces?",
    answer:
      "Spiders generally enter properties in search of food, shelter and suitable hiding places. Insects, moisture, clutter and small openings can attract them indoors.",
  },
  {
    question: "What does your spider management service include?",
    answer:
      "Our service includes inspection, identification of spider hiding areas, removal of accessible webs and egg sacs, and targeted pest management treatments.",
  },
  {
    question: "Are spider control treatments safe for children and pets?",
    answer:
      "We select suitable treatment methods and provide clear safety instructions. Children and pets should remain away from treated areas until the technician confirms they are safe to re-enter.",
  },
  {
    question: "How can I prevent spiders from coming back?",
    answer:
      "Regular cleaning, removing webs, sealing wall cracks, reducing clutter and controlling other insects can help minimize spider activity.",
  },
  {
    question: "Do you provide spider control for commercial properties?",
    answer:
      "Yes. We provide customized spider management services for offices, hotels, restaurants, schools, hospitals, warehouses and other commercial properties.",
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

const SpiderserviceMain = () => {
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
      ".spider-service-main-reveal"
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
      className="spider-service-main"
      ref={rootRef}
    >
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
              <h2>Contact Us for Expert Spider Control</h2>

              <a
                href="tel:+919876543210"
                className="spider-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to our experts</p>

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
            <PdfIcon />
            <span>Download PDF File</span>
          </a>

        </aside>

        {/* RIGHT CONTENT */}
        <main className="spider-service-main-content">

          {/* HERO SECTION */}
          <div
            className={`spider-service-main-hero ${
              imageFailed ? "spider-service-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
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

          {/* SERVICE OVERVIEW */}
          <div className="spider-service-main-overview spider-service-main-reveal">

            <span className="spider-service-main-section-subtitle">
              ABOUT SPIDER MANAGEMENT
            </span>

            <h2>Spider Management Services in Odisha</h2>

            <p>
              Spiders are commonly found in homes, offices, warehouses,
              restaurants and commercial spaces. Although most spiders
              are harmless, their presence can cause fear, discomfort
              and hygiene concerns. Spider webs and egg sacs around
              ceilings, windows, corners and storage areas can also
              affect the appearance of your property.
            </p>

            <p>
              Giridurga Pest Control provides professional spider
              management services in Odisha. Our trained team identifies
              spider hiding places, removes accessible webs and applies
              appropriate targeted treatments to help control spider
              activity and reduce the chances of recurring infestations.
            </p>

            <p>
              We provide customized solutions for residential and
              commercial properties, including homes, apartments,
              hotels, restaurants, offices, schools and warehouses.
              Our focus is on effective pest management, responsible
              treatment practices and long-term prevention.
            </p>

          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="spider-service-main-comprehensive spider-service-main-reveal">

            <span className="spider-service-main-section-subtitle">
              COMPLETE SPIDER CONTROL SOLUTIONS
            </span>

            <h2>How Giridurga Pest Control Helps</h2>

            <p>
              Our spider management services are designed to control
              spider activity and maintain cleaner, more comfortable
              surroundings through a systematic approach.
            </p>

            <div className="spider-service-main-image-grid">

              <div className="spider-service-main-image-card">
                <div className="spider-service-main-image-wrap">
                  <img src={serviceone} alt="Spider inspection service" />
                  <span className="spider-service-main-image-number">01</span>
                </div>

                <h3>Inspection & Identification</h3>

                <p>
                  Identifying spider species, webs, egg sacs and common
                  hiding locations throughout your property.
                </p>
              </div>

              <div className="spider-service-main-image-card">
                <div className="spider-service-main-image-wrap">
                  <img src={servicetwo} alt="Spider control treatment" />
                  <span className="spider-service-main-image-number">02</span>
                </div>

                <h3>Targeted Treatment</h3>

                <p>
                  Applying appropriate pest control treatments to
                  spider-prone areas, cracks and crevices.
                </p>
              </div>

            </div>

            {/* BENEFITS */}
            <div className="spider-service-main-benefits">
              <h3>Why Choose Giridurga Pest Control?</h3>

              <ul>
                <li>Professional inspection and expert guidance</li>
                <li>Targeted spider and web management solutions</li>
                <li>Suitable treatment plans for homes and businesses</li>
                <li>Responsible treatment with clear safety instructions</li>
                <li>Preventive recommendations to reduce recurrence</li>
                <li>Reliable pest control support across Odisha</li>
              </ul>
            </div>

          </div>

          {/* FAQ SECTION */}
          <div className="spider-service-main-faq spider-service-main-reveal">

            <span className="spider-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="spider-service-main-faq-intro">
              Find answers to common questions about our spider
              inspection, removal and prevention services.
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
                Say goodbye to unwanted spiders and webs.
                Contact Giridurga Pest Control today for
                professional spider management solutions.
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
