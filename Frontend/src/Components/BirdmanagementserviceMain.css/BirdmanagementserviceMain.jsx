
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
    heading: "Professional Bird Net Installation Services",
    image: serviceone,
    description:
      "Protect balconies, rooftops, windows and open spaces with professionally installed bird safety nets designed to prevent unwanted bird entry and nesting.",
  },
  {
    title: "Bird Spike Installation",
    heading: "Effective Bird Spike Installation Solutions",
    image: service,
    description:
      "Prevent pigeons and other birds from landing and roosting on ledges, parapets, window frames and building surfaces with suitable bird spikes.",
  },
  {
    title: "Pigeon Control",
    heading: "Expert Pigeon Management and Control Services",
    image: servicetwo,
    description:
      "Manage pigeon-related problems around homes, offices, apartments and commercial properties with customized, humane bird control methods.",
  },
  {
    title: "Bird Repellent Solutions",
    heading: "Advanced Bird Repellent and Prevention Solutions",
    image: service,
    description:
      "Discourage unwanted bird activity around rooftops, solar panels, balconies and commercial structures using suitable bird deterrent systems.",
  },
  {
    title: "Commercial Bird Management",
    heading: "Complete Bird Control for Commercial Properties",
    image: serviceone,
    description:
      "Protect factories, warehouses, industrial sheds, offices and commercial buildings with customized bird management and prevention solutions.",
  },
];

// Frequently asked questions
const faqs = [
  {
    question: "What is included in your bird management service?",
    answer:
      "Our bird management services include site inspection, identification of bird activity, assessment of nesting and roosting areas, selection of suitable bird deterrents and professional installation where required.",
  },
  {
    question: "Do you provide pigeon control services?",
    answer:
      "Yes. We provide pigeon management solutions for balconies, rooftops, windows, apartments, offices and commercial buildings using suitable bird netting, spikes and other deterrent systems.",
  },
  {
    question: "What are the different methods of bird control?",
    answer:
      "Depending on the property and bird activity, we offer bird nets, bird spikes, suitable bird repellents and other humane deterrent solutions to discourage unwanted nesting and roosting.",
  },
  {
    question: "Are your bird control methods safe for birds?",
    answer:
      "We prioritize humane bird management methods that discourage birds from landing or nesting without causing unnecessary harm. The appropriate solution depends on the site and bird species.",
  },
  {
    question: "Do you provide bird management in Bhubaneswar and Cuttack?",
    answer:
      "Yes. Nilachakra Pest Control provides bird management services in Bhubaneswar, Cuttack, Puri and nearby locations across Odisha.",
  },
  {
    question: "Can bird nets be installed on balconies and rooftops?",
    answer:
      "Yes. Bird nets can be installed in suitable balconies, windows, open areas, rooftops and other spaces to help prevent birds from entering and nesting.",
  },
  {
    question: "Do you provide bird control for industrial buildings?",
    answer:
      "Yes. We provide customized bird management solutions for industrial sheds, warehouses, factories, offices, hotels and other commercial properties.",
  },
  {
    question: "How can I prevent pigeons from returning?",
    answer:
      "Suitable bird netting, spikes and other deterrent systems can help reduce repeated roosting and nesting. Regular maintenance and professional recommendations also help maintain effective protection.",
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

    const items = root.querySelectorAll(
      ".bird-management-main-reveal"
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
      className="bird-management-main"
      ref={rootRef}
    >
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

              <h2>
                Contact Us for Expert Bird Management
              </h2>

              <a
                href="tel:+919876543210"
                className="bird-management-main-contact-phone-icon"
                aria-label="Call our support team"
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
                PROFESSIONAL BIRD MANAGEMENT
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* BIRD MANAGEMENT OVERVIEW */}
          <div className="bird-management-main-overview bird-management-main-reveal">

            <span className="bird-management-main-section-subtitle">
              ABOUT BIRD MANAGEMENT
            </span>

            <h2>
              Bird Management Service in Odisha
            </h2>

            <p>
              Bird infestations can cause serious issues for both
              homes and businesses in Odisha. From damaging rooftops
              and solar panels to creating mess with droppings and
              nests, birds like pigeons and crows can become a major
              problem if not managed properly.
            </p>

            <p>
              At Nilachakra Pest Control, we offer expert bird
              management services in Odisha that are safe, humane
              and designed for long-term prevention. We use suitable
              bird control methods such as bird nets, spikes,
              repellents and deterrent systems to discourage birds
              from nesting or roosting on your property without
              causing unnecessary harm.
            </p>

            <p>
              Our bird control solutions are customized according
              to the property structure, bird activity and specific
              requirements of each customer.
            </p>

          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="bird-management-main-comprehensive bird-management-main-reveal">

            <span className="bird-management-main-section-subtitle">
              ADVANCED BIRD PROTECTION
            </span>

            <h2>
              Expert Bird Control and Management Solutions
            </h2>

            <p>
              Whether you are dealing with birds in balconies,
              industrial sheds, commercial buildings, rooftops
              or solar panels, our trained team will inspect
              your site and recommend a customized bird control
              solution.
            </p>

            <div className="bird-management-main-image-grid">

              <div className="bird-management-main-image-card">

                <div className="bird-management-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Professional bird net installation service"
                    loading="lazy"
                  />

                  <span className="bird-management-main-image-number">
                    01
                  </span>
                </div>

                <h3>Bird Net Installation</h3>

                <p>
                  Install suitable bird safety nets on balconies,
                  windows, rooftops and open spaces to prevent
                  unwanted bird entry and nesting.
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

                <h3>Bird Spike Installation</h3>

                <p>
                  Use appropriate bird spikes and deterrent
                  systems to discourage pigeons and other birds
                  from landing on building surfaces.
                </p>

              </div>

            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="bird-management-main-overview bird-management-main-reveal">

            <span className="bird-management-main-section-subtitle">
              WHY CHOOSE NILACHAKRA
            </span>

            <h2>
              Trusted Bird Control Experts Across Odisha
            </h2>

            <p>
              As a trusted pest control company in Odisha,
              Nilachakra Pest Control provides customized
              bird management solutions for residential,
              commercial and industrial properties.
            </p>

            <p>
              Our team focuses on practical, humane and
              property-specific bird deterrent solutions
              to help protect your buildings from nesting,
              roosting and bird-related damage.
            </p>

            <div className="bird-management-main-benefits">

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Protect your property from bird damage</p>
              </div>

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Humane and eco-conscious bird control solutions</p>
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
                <p>Site inspection and expert support</p>
              </div>

              <div className="bird-management-main-benefit">
                <span>✓</span>
                <p>Solutions for balconies, rooftops and industrial sheds</p>
              </div>

            </div>

          </div>

          {/* SERVICE LOCATIONS / SEO CONTENT */}
          <div className="bird-management-main-overview bird-management-main-reveal">

            <span className="bird-management-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>
              Bird Management and Pest Control Services Near You
            </h2>

            <p>
              Nilachakra Pest Control provides professional bird
              management and pest control services across Odisha.
              We serve customers in Bhubaneswar, Cuttack, Puri
              and nearby locations with customized bird control
              solutions.
            </p>

            <p>
              If you are searching for the best pest control
              in Cuttack with genuine rates, pest control
              Bhubaneswar, best pest control services in
              Bhubaneswar or pest control in Puri, our team
              can help you find suitable property protection
              solutions.
            </p>

            <p>
              We also provide expert pest and termite control
              across Cuttack, professional pest control
              services near Cuttack Odisha and reliable pest
              control solutions for residential and commercial
              properties.
            </p>

          </div>

          {/* FAQ SECTION */}
          <div className="bird-management-main-faq bird-management-main-reveal">

            <span className="bird-management-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="bird-management-main-faq-intro">
              Find answers to common questions about our bird
              net installation, pigeon control, bird spikes
              and professional bird management services.
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
                      setActiveFaq(
                        activeFaq === index ? -1 : index
                      )
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
              <span>PROTECT YOUR PROPERTY TODAY</span>

              <h2>
                Need Professional Bird Management?
              </h2>

              <p>
                Protect your home and business from unwanted
                bird nesting and roosting. Contact Nilachakra
                Pest Control for professional bird control
                and prevention solutions.
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
