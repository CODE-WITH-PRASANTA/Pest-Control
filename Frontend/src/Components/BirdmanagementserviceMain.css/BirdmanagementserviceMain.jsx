import React, { useEffect, useRef, useState } from "react";
import "./BirdmanagementserviceMain.css";

// Manually imported images
import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

// Bird management services
const services = [
  {
    title: "Bird Net Installation",
    subtitle: "BALCONIES, ROOFTOPS & OPEN SPACES",
    heading: "Professional Bird Net Installation Services",
    image: serviceone,
    description:
      "Protect balconies, rooftops, windows, and open spaces with professionally installed bird safety nets designed to prevent unwanted bird entry and nesting.",
  },
  {
    title: "Bird Spike Installation",
    subtitle: "HUMANE LEDGE & PARAPET CARE",
    heading: "Bird Management Service in Odisha",
    image: service,
    description:
      "Giridurga Pest Control offers safe, humane, and long-lasting bird control using eco-friendly bird nets, spikes, repellents, and trapping systems.",
  },
  {
    title: "Pigeon Control",
    subtitle: "HOMES, APARTMENTS & OFFICES",
    heading: "Expert Pigeon Management and Control Services",
    image: servicetwo,
    description:
      "Manage pigeon and crow infestations around homes, offices, apartments, and commercial properties with customized, humane bird control methods.",
  },
  {
    title: "Bird Repellent Solutions",
    subtitle: "ROOFTOPS & SOLAR PANEL PROTECTION",
    heading: "Advanced Bird Repellent and Prevention Solutions",
    image: service,
    description:
      "Discourage unwanted bird activity around rooftops, solar panels, balconies, and commercial structures without harming them.",
  },
  {
    title: "Commercial Bird Management",
    subtitle: "SHEDS, WAREHOUSES & FACTORIES",
    heading: "Complete Bird Control for Commercial Properties",
    image: serviceone,
    description:
      "Protect factories, warehouses, industrial sheds, offices, and commercial buildings across Bhubaneswar, Cuttack, and Puri.",
  },
];

// Frequently asked questions
const faqs = [
  {
    question: "What is included in your bird management service?",
    answer:
      "Our bird management services include a free site inspection, identification of bird activity, assessment of nesting and roosting areas, selection of suitable eco-friendly bird deterrents, and professional installation.",
  },
  {
    question: "Do you provide pigeon control services?",
    answer:
      "Yes. Giridurga Pest Control provides pigeon and crow management solutions for balconies, rooftops, solar panels, windows, apartments, offices, and commercial buildings using bird netting, spikes, and humane deterrent systems.",
  },
  {
    question: "What are the different methods of bird control?",
    answer:
      "Depending on the property and bird activity, we offer bird nets, bird spikes, eco-friendly bird repellents, and humane trapping systems to prevent birds from nesting or roosting on your property without harming them.",
  },
  {
    question: "Are your bird control methods safe for birds?",
    answer:
      "Yes. We use safe, humane, and eco-friendly bird control methods that discourage birds from landing, nesting, or roosting without harming them.",
  },
  {
    question: "Do you provide bird management in Bhubaneswar, Cuttack, and Puri?",
    answer:
      "Yes. Giridurga Pest Control provides bird management services in Bhubaneswar, Cuttack, Puri, and nearby areas across Odisha with genuine rates and expert support.",
  },
  {
    question: "Can bird nets be installed on balconies and rooftops?",
    answer:
      "Yes. Bird nets can be installed across balconies, windows, open areas, rooftops, and solar panel zones to prevent birds from entering and nesting.",
  },
  {
    question: "Do you provide bird control for industrial buildings?",
    answer:
      "Yes. We provide customized bird management solutions for industrial sheds, warehouses, factories, offices, hotels, and other commercial properties.",
  },
  {
    question: "How can I prevent pigeons from returning?",
    answer:
      "Professionally installed bird netting, spikes, and deterrent systems discourage repeated roosting and nesting. Our team also provides free site inspection and maintenance guidance.",
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

// Check icon
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BirdmanagementserviceMain = () => {
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

    const items = root.querySelectorAll(".bird-management-main-reveal");

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
    <section className="bird-management-main" ref={rootRef}>
      <div className="bird-management-main-glow bird-management-main-glow-one" />
      <div className="bird-management-main-glow bird-management-main-glow-two" />

      <div className="bird-management-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="bird-management-main-sidebar">
          <div className="bird-management-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`bird-management-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="bird-management-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="bird-management-main-menu-title">
                  {srv.title}
                </span>

                <span className="bird-management-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="bird-management-main-contact-card">
            <div className="bird-management-main-contact-decoration bird-management-main-contact-decoration-one" />
            <div className="bird-management-main-contact-decoration bird-management-main-contact-decoration-two" />

            <div className="bird-management-main-contact-content">
              <h2>Contact Giridurga Pest Control for Bird Management</h2>

              <a
                href="tel:+919876543210"
                className="bird-management-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="bird-management-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="bird-management-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="bird-management-main-content">
          {/* HERO SECTION */}
          <div
            className={`bird-management-main-hero ${
              imageFailed ? "bird-management-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="bird-management-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="bird-management-main-hero-overlay" />

            <span className="bird-management-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="bird-management-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="bird-management-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* BIRD MANAGEMENT OVERVIEW */}
          <div className="bird-management-main-overview bird-management-main-reveal">
            <span className="bird-management-main-section-subtitle">
              GIRIDURGA PEST CONTROL • SAFE &amp; HUMANE BIRD CONTROL
            </span>

            <h2>Bird Management Service in Odisha</h2>

            <p>
              Bird infestations can cause serious issues for both homes and
              businesses in Odisha. From damaging rooftops and solar panels to
              creating mess with droppings and nests, birds like pigeons and
              crows can become a major problem if not controlled properly.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we offer expert bird
              management services in Odisha that are safe, humane, and
              long-lasting. We use eco-friendly bird control methods such as{" "}
              <strong>
                bird nets, spikes, repellents, and trapping systems
              </strong>{" "}
              to prevent birds from nesting or roosting on your property—without
              harming them.
            </p>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="bird-management-main-comprehensive bird-management-main-reveal">
            <span className="bird-management-main-section-subtitle">
              ADVANCED BIRD PROTECTION
            </span>

            <h2>Expert Bird Control &amp; Management Services in Odisha</h2>

            <p>
              Whether you’re dealing with birds in balconies, industrial sheds,
              commercial buildings, or rooftops, our trained team will inspect
              your site and provide a customized bird control solution.
            </p>

            <p>
              As a trusted pest control company in Odisha,{" "}
              <strong>Giridurga Pest Control</strong> serves{" "}
              <strong>Bhubaneswar, Cuttack, Puri</strong>, and nearby areas with
              reliable results and affordable pricing.
            </p>

            <ul className="bird-management-main-highlights">
              <li>
                <span className="bird-management-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Protect your property from bird damage</span>
              </li>
              <li>
                <span className="bird-management-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Safe, humane, and eco-friendly bird control solutions</span>
              </li>
              <li>
                <span className="bird-management-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Free inspection and expert support</span>
              </li>
            </ul>

            <p className="bird-management-main-tagline">
              Don’t wait until it becomes a health hazard—call{" "}
              <strong>Giridurga Pest Control</strong> today!
            </p>

            <div className="bird-management-main-image-grid">
              <div className="bird-management-main-image-card">
                <div className="bird-management-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Professional bird net installation service in Odisha"
                    loading="lazy"
                  />

                  <span className="bird-management-main-image-number">
                    01
                  </span>
                </div>

                <span className="bird-management-main-card-subtitle">
                  BALCONIES &amp; ROOFTOPS
                </span>

                <h3>Bird Net Installation</h3>

                <p>
                  Install durable bird safety nets on balconies, windows,
                  rooftops, and open spaces to prevent unwanted bird entry and
                  nesting.
                </p>
              </div>

              <div className="bird-management-main-image-card">
                <div className="bird-management-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional bird spike and deterrent installation"
                    loading="lazy"
                  />

                  <span className="bird-management-main-image-number">
                    02
                  </span>
                </div>

                <span className="bird-management-main-card-subtitle">
                  LEDGES &amp; SOLAR PANELS
                </span>

                <h3>Bird Spike &amp; Repellent Solutions</h3>

                <p>
                  Use appropriate bird spikes, repellents, and humane trapping
                  systems to discourage pigeons and crows from roosting on
                  building surfaces.
                </p>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="bird-management-main-overview bird-management-main-reveal">
            <span className="bird-management-main-section-subtitle">
              WHY CHOOSE GIRIDURGA PEST CONTROL
            </span>

            <h2>Trusted Bird Control Experts Across Odisha</h2>

            <p>
              As a trusted pest control company in Odisha,{" "}
              <strong>Giridurga Pest Control</strong> provides customized bird
              management solutions for residential, commercial, and industrial
              properties.
            </p>

            <div className="bird-management-main-benefits">
              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Protect your property from bird damage</p>
              </div>

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Safe, humane &amp; eco-friendly bird control solutions</p>
              </div>

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Professional bird net and spike installation</p>
              </div>

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Customized residential and commercial services</p>
              </div>

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Free site inspection and expert support</p>
              </div>

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Solutions for balconies, rooftops, solar panels &amp; sheds</p>
              </div>
            </div>
          </div>

          {/* SERVICE LOCATIONS / SEO CONTENT */}
          <div className="bird-management-main-overview bird-management-main-reveal">
            <span className="bird-management-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Bird Management and Pest Control Services Near You</h2>

            <p>
              <strong>Giridurga Pest Control</strong> provides professional bird
              management and pest control services across Odisha. We serve
              customers in <strong>Bhubaneswar, Cuttack, Puri</strong>, and
              nearby locations with customized bird control solutions.
            </p>

            <p>
              If you are searching for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>,{" "}
              <strong>pest control Bhubaneswar</strong>,{" "}
              <strong>best pest control services in Bhubaneswar</strong>, or{" "}
              <strong>pest control Puri</strong>, our team can help you find
              suitable property protection solutions.
            </p>

            <p>
              We also provide{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>
              , dependable <strong>pest control near Cuttack, Odisha</strong>,
              and complete <strong>pest control solutions in Cuttack</strong>{" "}
              for residential and commercial properties.
            </p>

            <div className="bird-management-main-local-box">
              <span className="bird-management-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Bird &amp; Pest Protection Across Odisha</h3>
              <div className="bird-management-main-keyword-tags">
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
          <div className="bird-management-main-faq bird-management-main-reveal">
            <span className="bird-management-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="bird-management-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              bird net installation, pigeon control, bird spikes, and
              professional bird management services.
            </p>

            <div className="bird-management-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`bird-management-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="bird-management-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="bird-management-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="bird-management-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="bird-management-main-bottom-cta bird-management-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Bird Management?</h2>

              <p>
                Don’t wait until it becomes a health hazard—call Giridurga Pest
                Control today for a free inspection and humane bird control
                solutions!
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="bird-management-main-cta-button"
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

export default BirdmanagementserviceMain;