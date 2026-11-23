import { useEffect, useRef, useState } from "react";
import "./BedbugmanagementserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Bed Bug Inspection",
    heading: "Detailed Bed Bug Inspection Services",
    image: serviceone,
    description:
      "Check mattresses, headboards, seams, baseboards and furniture joints to spot bed bug hiding spots and infestation levels.",
  },
  {
    title: "Bed Bug Treatment",
    heading: "Professional Bed Bug Treatment Solutions",
    image: service,
    description:
      "Target bed bug activity in bedrooms, guest rooms and upholstery with structured treatment methods tailored to the room.",
  },
  {
    title: "Mattress & Seam Treatment",
    heading: "Targeted Mattress, Seam & Crevice Treatment",
    image: servicetwo,
    description:
      "Focused attention on mattress piping, bed frames, skirting boards and tight cracks where bed bugs settle and lay eggs.",
  },
  {
    title: "Residential & Hospitality Control",
    heading: "Bed Bug Control for Homes & Hospitality",
    image: service,
    description:
      "Practical bed bug management solutions for houses, apartments, hotels, hostels, guesthouses and commercial properties.",
  },
  {
    title: "Preventive Bed Bug Care",
    heading: "Ongoing Bed Bug Prevention & Management",
    image: serviceone,
    description:
      "Reduce the chances of recurring bed bug problems with practical room-care guidance and recommended follow-up checks.",
  },
];

const faqs = [
  {
    question: "What does your bed bug management service include?",
    answer:
      "Our service includes inspection of sleeping and seating areas, identifying bed bug hiding spots, targeted treatment and practical advice to help prevent recurring activity.",
  },
  {
    question: "Are bed bug treatments safe for children and pets?",
    answer:
      "We choose appropriate treatment methods and share clear safety instructions based on the procedures used. Always follow your technician's re-entry and bedding care instructions.",
  },
  {
    question: "How often should bed bug treatment be repeated?",
    answer:
      "Follow-up needs depend on how severe the infestation is, room clutter and the treatment plan used. Our technician can recommend a suitable follow-up schedule after inspection.",
  },
  {
    question: "How long does bed bug treatment take?",
    answer:
      "Treatment time varies with room count, furniture layout and infestation severity. Our technician will let you know the expected duration before starting.",
  },
  {
    question: "Do you provide bed bug control for homes and hotels?",
    answer:
      "Yes. We provide bed bug management solutions for homes, flats, hotels, hostels, serviced apartments and commercial spaces.",
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

const BedbugmanagementserviceMain = () => {
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
      ".bedbug-management-service-main-reveal"
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
      className="bedbug-management-service-main"
      ref={rootRef}
    >
      <div className="bedbug-management-service-main-glow bedbug-management-service-main-glow-one" />
      <div className="bedbug-management-service-main-glow bedbug-management-service-main-glow-two" />

      <div className="bedbug-management-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="bedbug-management-service-main-sidebar">
          <div className="bedbug-management-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`bedbug-management-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="bedbug-management-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="bedbug-management-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="bedbug-management-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="bedbug-management-service-main-contact-card">
            <div className="bedbug-management-service-main-contact-decoration bedbug-management-service-main-contact-decoration-one" />
            <div className="bedbug-management-service-main-contact-decoration bedbug-management-service-main-contact-decoration-two" />

            <div className="bedbug-management-service-main-contact-content">
              <h2>Contact with us for any advice</h2>

              <a
                href="tel:+919876543210"
                className="bedbug-management-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="bedbug-management-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="bedbug-management-service-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="bedbug-management-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`bedbug-management-service-main-hero ${
              imageFailed
                ? "bedbug-management-service-main-hero-fallback"
                : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="bedbug-management-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="bedbug-management-service-main-hero-overlay" />

            <span className="bedbug-management-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="bedbug-management-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="bedbug-management-service-main-hero-label">
                PROFESSIONAL BED BUG MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="bedbug-management-service-main-overview bedbug-management-service-main-reveal">
            <span className="bedbug-management-service-main-section-subtitle">
              ABOUT BED BUG MANAGEMENT
            </span>

            <h2>Bed Bug Management Overview</h2>

            <p>
              Bed bugs hide in tight seams, mattresses, bed frames, sofas and
              wall crevices, making them hard to eliminate with casual spot
              sprays. Our team inspects affected rooms, locates harbourage
              points and recommends targeted bed bug control for your property.
            </p>

            <p>
              Every room setup is different. We assess furniture layout,
              signs of bed bug presence and room usage before suggesting a
              practical treatment and prevention plan.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="bedbug-management-service-main-comprehensive bedbug-management-service-main-reveal">
            <span className="bedbug-management-service-main-section-subtitle">
              TARGETED BED BUG CONTROL
            </span>

            <h2>Complete Bed Bug Control Solutions</h2>

            <p>
              From home bedrooms to busy hospitality spaces, we provide
              practical bed bug management based on the affected areas and
              infestation conditions.
            </p>

            <div className="bedbug-management-service-main-image-grid">
              <div className="bedbug-management-service-main-image-card">
                <div className="bedbug-management-service-main-image-wrap">
                  <img src={serviceone} alt="Bed bug inspection" />
                  <span className="bedbug-management-service-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Inspection</h3>

                <p>
                  Detailed inspection to locate bed bug hiding spots and assess
                  infestation spread.
                </p>
              </div>

              <div className="bedbug-management-service-main-image-card">
                <div className="bedbug-management-service-main-image-wrap">
                  <img src={servicetwo} alt="Bed bug treatment" />
                  <span className="bedbug-management-service-main-image-number">
                    02
                  </span>
                </div>

                <h3>Targeted Treatment</h3>

                <p>
                  Targeted treatment procedures designed to address bed bug
                  activity effectively.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="bedbug-management-service-main-faq bedbug-management-service-main-reveal">
            <span className="bedbug-management-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="bedbug-management-service-main-faq-intro">
              Find answers to common questions about our bed bug inspection,
              treatment and prevention services.
            </p>

            <div className="bedbug-management-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`bedbug-management-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="bedbug-management-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="bedbug-management-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="bedbug-management-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="bedbug-management-service-main-bottom-cta bedbug-management-service-main-reveal">
            <div>
              <span>KEEP YOUR PROPERTY BED BUG-FREE</span>

              <h2>Need Professional Bed Bug Control?</h2>

              <p>
                Get in touch with our team and find the right solution for
                your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="bedbug-management-service-main-cta-button"
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

export default BedbugmanagementserviceMain;