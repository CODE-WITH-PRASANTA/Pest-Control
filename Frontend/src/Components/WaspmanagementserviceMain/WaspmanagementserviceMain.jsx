
import React, { useEffect, useRef, useState } from "react";
import "./WaspmanagementserviceMain.css";

// Manually imported images
import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

// Wasp management services
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
      "Get rid of dangerous wasp nests with professional removal methods, protective equipment and carefully selected treatments.",
  },
  {
    title: "Hornet Control",
    heading: "Expert Hornet and Wasp Control Solutions",
    image: servicetwo,
    description:
      "Control aggressive hornets and wasp colonies with targeted pest management solutions for residential and commercial properties.",
  },
  {
    title: "Preventive Wasp Treatment",
    heading: "Long-Term Wasp Prevention and Protection",
    image: service,
    description:
      "Reduce the chances of recurring wasp infestations with preventive treatments and professional property recommendations.",
  },
  {
    title: "Commercial Wasp Management",
    heading: "Complete Wasp Management for Businesses",
    image: serviceone,
    description:
      "Protect schools, offices, warehouses, hotels and outdoor commercial spaces with customized wasp management services.",
  },
];

// Frequently asked questions
const faqs = [
  {
    question: "What is included in your wasp management service?",
    answer:
      "Our wasp management service includes property inspection, identification of wasp species, nest location, suitable treatment selection, professional nest removal where appropriate and preventive recommendations.",
  },
  {
    question: "Is professional wasp nest removal safe?",
    answer:
      "Yes. Our trained professionals use appropriate protective equipment and carefully selected treatment methods. Safety instructions are provided to help protect occupants, children and pets during the service.",
  },
  {
    question: "Do you provide emergency wasp nest removal?",
    answer:
      "We offer prompt wasp management assistance depending on technician availability and the location of the infestation. Contact our team to check same-day service availability.",
  },
  {
    question: "Which types of wasps do you control?",
    answer:
      "We provide management solutions for common wasps, paper wasps, hornets and mud daubers. Treatment methods are selected according to the species and nesting location.",
  },
  {
    question: "Do you provide wasp control in Bhubaneswar and Cuttack?",
    answer:
      "Yes. Nilachakra Pest Control provides wasp management services in Bhubaneswar, Cuttack, Puri and nearby areas across Odisha.",
  },
  {
    question: "Can wasps build nests inside buildings?",
    answer:
      "Yes. Wasps may build nests around roofs, wall cavities, balconies, window frames, sheds and other sheltered spaces. Professional inspection helps identify the nesting location.",
  },
  {
    question: "Do you provide wasp management for commercial properties?",
    answer:
      "Yes. We provide customized wasp management solutions for schools, offices, hotels, restaurants, warehouses, factories and other commercial properties.",
  },
  {
    question: "How can I prevent wasps from returning?",
    answer:
      "Keep outdoor food covered, seal suitable entry points, maintain gardens and remove potential nesting opportunities. Our technicians can also recommend preventive measures after inspection.",
  },
];

// Arrow icon
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

// Phone icon
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

// PDF icon
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

const WaspmanagementserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  // Scroll reveal animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(
      ".wasp-management-main-reveal"
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
      className="wasp-management-main"
      ref={rootRef}
    >
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
              <h2>
                Contact Us for Expert Wasp Management
              </h2>

              <a
                href="tel:+919876543210"
                className="wasp-management-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

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
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="wasp-management-main-content">

          {/* HERO SECTION */}
          <div
            className={`wasp-management-main-hero ${
              imageFailed ? "wasp-management-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
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

            <h2>
              Professional Wasp Management Service in Odisha
            </h2>

            <p>
              Wasp infestations can be dangerous and frightening.
              These aggressive insects often build nests in walls,
              roofs, gardens, balconies and near windows, posing a
              serious risk of painful stings, especially to children,
              elderly people and individuals with allergies.
            </p>

            <p>
              At Nilachakra Pest Control, we offer expert wasp
              management services in Odisha to safely manage wasp
              nests and help prevent future infestations. Our trained
              professionals use appropriate protective equipment and
              carefully selected insecticides to control wasp colonies
              while following necessary safety precautions.
            </p>

            <p>
              Whether you need wasp nest inspection, professional
              wasp removal, hornet control or preventive treatment,
              our customized solutions are designed for residential
              and commercial properties.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="wasp-management-main-comprehensive wasp-management-main-reveal">

            <span className="wasp-management-main-section-subtitle">
              ADVANCED WASP PROTECTION
            </span>

            <h2>
              Complete Wasp Control and Nest Removal Solutions
            </h2>

            <p>
              We provide customized wasp control solutions for homes,
              schools, offices, warehouses, hotels and outdoor areas.
              Whether you are dealing with paper wasps, hornets or
              mud daubers, our professional inspection and targeted
              treatment help manage the infestation effectively.
            </p>

            <div className="wasp-management-main-image-grid">

              <div className="wasp-management-main-image-card">
                <div className="wasp-management-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Professional wasp nest inspection"
                    loading="lazy"
                  />
                  <span className="wasp-management-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Wasp Nest Inspection</h3>

                <p>
                  Identify wasp nests, nesting locations and
                  infestation risks around your property.
                </p>
              </div>

              <div className="wasp-management-main-image-card">
                <div className="wasp-management-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional wasp nest removal treatment"
                    loading="lazy"
                  />
                  <span className="wasp-management-main-image-number">
                    02
                  </span>
                </div>

                <h3>Professional Wasp Nest Removal</h3>

                <p>
                  Control dangerous wasp colonies through
                  professional treatment and appropriate
                  nest removal procedures.
                </p>
              </div>

            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="wasp-management-main-overview wasp-management-main-reveal">

            <span className="wasp-management-main-section-subtitle">
              WHY CHOOSE NILACHAKRA
            </span>

            <h2>
              Trusted Wasp Management Experts Across Odisha
            </h2>

            <p>
              At Nilachakra Pest Control, we understand the risks
              associated with wasp infestations. Our team focuses
              on proper inspection, suitable treatment selection
              and safety-conscious nest management.
            </p>

            <div className="wasp-management-main-benefits">

              <div className="wasp-management-main-benefit">
                <span>✓</span>
                <p>Safe and controlled nest removal</p>
              </div>

              <div className="wasp-management-main-benefit">
                <span>✓</span>
                <p>Professional protective equipment</p>
              </div>

              <div className="wasp-management-main-benefit">
                <span>✓</span>
                <p>Carefully selected treatment methods</p>
              </div>

              <div className="wasp-management-main-benefit">
                <span>✓</span>
                <p>Customized residential and commercial solutions</p>
              </div>

              <div className="wasp-management-main-benefit">
                <span>✓</span>
                <p>Prompt service based on availability</p>
              </div>

              <div className="wasp-management-main-benefit">
                <span>✓</span>
                <p>Preventive guidance to reduce future infestations</p>
              </div>

            </div>
          </div>

          {/* SERVICE LOCATIONS / SEO CONTENT */}
          <div className="wasp-management-main-overview wasp-management-main-reveal">

            <span className="wasp-management-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>
              Wasp Management and Pest Control Services Near You
            </h2>

            <p>
              Nilachakra Pest Control provides professional pest
              control and wasp management services across Odisha.
              We serve customers in Bhubaneswar, Cuttack, Puri
              and nearby locations with solutions for residential,
              commercial and industrial properties.
            </p>

            <p>
              If you are searching for the best pest control
              services in Bhubaneswar, pest control in Puri,
              expert pest control near Cuttack Odisha, or
              professional pest control service providers in
              Cuttack, our team can help you choose a suitable
              pest management solution.
            </p>

            <p>
              We also provide expert pest and termite control
              across Cuttack, helping property owners find
              reliable pest control solutions in Cuttack with
              genuine rates and professional assistance.
            </p>

          </div>

          {/* FAQ SECTION */}
          <div className="wasp-management-main-faq wasp-management-main-reveal">

            <span className="wasp-management-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="wasp-management-main-faq-intro">
              Find answers to common questions about our wasp
              management, wasp nest removal and preventive
              pest control services.
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
                      setActiveFaq(
                        activeFaq === index ? -1 : index
                      )
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
                Don't risk painful wasp stings. Contact Nilachakra
                Pest Control for professional wasp nest inspection,
                removal and preventive assistance.
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
