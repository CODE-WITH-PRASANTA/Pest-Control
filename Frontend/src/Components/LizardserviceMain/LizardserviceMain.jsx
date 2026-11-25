import { useEffect, useRef, useState } from "react";
import "./LizardserviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Lizard Inspection",
    subtitle: "HIDING & BREEDING SPOT AUDIT",
    heading: "Detailed Lizard Inspection Services in Odisha",
    image: serviceone,
    description:
      "Inspect ceilings, wall cracks, kitchens, electrical boxes, and hidden corners to locate lizard hiding spots, breeding zones, and insect attractants.",
  },
  {
    title: "Lizard Control Treatment",
    subtitle: "ODORLESS & STAIN-FREE REPELLENT CARE",
    heading: "Lizard Management Services in Odisha",
    image: service,
    description:
      "Giridurga Pest Control uses advanced, odorless, and eco-friendly repellents and sprays that drive lizards away without stains, smell, or harm to the environment.",
  },
  {
    title: "Entry Point Management",
    subtitle: "GAP & RE-ENTRY PREVENTION",
    heading: "Prevent Lizards from Entering Your Property",
    image: servicetwo,
    description:
      "Identify and address entry points around doors, windows, wall cracks, and utility openings to discourage re-entry and nesting.",
  },
  {
    title: "Residential & Commercial Control",
    subtitle: "HOMES, HOTELS, SCHOOLS & OFFICES",
    heading: "Lizard Control for Homes & Businesses in Odisha",
    image: serviceone,
    description:
      "Customized lizard treatment plans for houses, apartments, restaurants, hotels, schools, and offices across Bhubaneswar, Cuttack, and Puri.",
  },
  {
    title: "Preventive Lizard Management",
    subtitle: "LONG-TERM HYGIENE & PROTECTION",
    heading: "Long-Term Lizard Prevention & Management",
    image: service,
    description:
      "Maintain a cleaner indoor space with insect-source reduction, entry guidance, and expert pest and termite control across Cuttack and Odisha.",
  },
];

const faqs = [
  {
    question: "Why do lizards enter homes and commercial properties?",
    answer:
      "Lizards generally enter buildings in search of insects, warmth, and shelter. Open windows, gaps around doors, wall cracks, electrical boxes, and indoor or outdoor lighting that attracts insects increase their presence.",
  },
  {
    question: "What does Giridurga Pest Control's lizard management service include?",
    answer:
      "Our service includes inspecting hiding and breeding spots such as ceilings, wall cracks, and electrical boxes, applying targeted odorless and eco-friendly repellents and sprays, and sharing prevention guidance.",
  },
  {
    question: "Are your lizard treatments safe for children and pets?",
    answer:
      "Yes. Giridurga Pest Control uses odorless, eco-safe, and stain-free formulations designed for homes, children, and pets, accompanied by clear precautions and re-entry instructions from our technicians.",
  },
  {
    question: "How can I prevent lizards from entering my home?",
    answer:
      "Keep doors and windows screened, seal wall cracks and gaps, reduce indoor insect activity, maintain kitchen cleanliness, and schedule periodic preventive checks.",
  },
  {
    question: "Do you provide lizard control for restaurants, hotels, schools, and offices?",
    answer:
      "Yes. Giridurga Pest Control provides customized lizard management solutions for homes, restaurants, hotels, schools, offices, and commercial properties across Odisha.",
  },
  {
    question: "Which areas do you serve in Odisha?",
    answer:
      "We serve Bhubaneswar, Cuttack, Puri, and surrounding cities across Odisha with trusted, on-time service and genuine rates.",
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

const LizardserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".lizard-service-main-reveal");

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
    <section className="lizard-service-main" ref={rootRef}>
      <div className="lizard-service-main-glow lizard-service-main-glow-one" />
      <div className="lizard-service-main-glow lizard-service-main-glow-two" />

      <div className="lizard-service-main-container">
        {/* LEFT SIDEBAR */}
        <aside className="lizard-service-main-sidebar">
          <div className="lizard-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`lizard-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="lizard-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="lizard-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="lizard-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="lizard-service-main-contact-card">
            <div className="lizard-service-main-contact-decoration lizard-service-main-contact-decoration-one" />
            <div className="lizard-service-main-contact-decoration lizard-service-main-contact-decoration-two" />

            <div className="lizard-service-main-contact-content">
              <h2>Contact Giridurga Pest Control</h2>

              <a
                href="tel:+919876543210"
                className="lizard-service-main-contact-phone-icon"
                aria-label="Call Giridurga Pest Control support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to our pest control experts.</p>

              <a
                href="tel:+919876543210"
                className="lizard-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="lizard-service-main-download"
          >
            <PdfIcon />
            <span>Download PDF File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="lizard-service-main-content">
          {/* HERO SECTION */}
          <div
            className={`lizard-service-main-hero ${
              imageFailed ? "lizard-service-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="lizard-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="lizard-service-main-hero-overlay" />

            <span className="lizard-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="lizard-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="lizard-service-main-hero-label">
                {currentService.subtitle}
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="lizard-service-main-overview lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              GIRIDURGA PEST CONTROL • ODORLESS &amp; ECO-SAFE CARE
            </span>

            <h2>Lizard Management Services in Odisha</h2>

            <p>
              Lizards often enter homes, offices, and commercial spaces in
              search of insects and warmth. While they are generally not harmful
              by nature, their presence can be unpleasant and
              unhygienic—especially in kitchens, bedrooms, and storage areas.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we offer professional
              lizard management services in Odisha using advanced, odorless, and
              eco-friendly solutions. Our team identifies hiding and breeding
              spots such as{" "}
              <strong>ceilings, wall cracks, and electrical boxes</strong>, and
              applies targeted repellents and sprays that drive lizards away
              without harming the environment.
            </p>

            <p>
              Our treatments are safe for children and pets, and leave no
              stains or smell behind. Whether you need lizard control for your
              home, restaurant, hotel, school, or office, we provide customized
              treatment plans with long-lasting results.
            </p>

            <p>
              We serve <strong>Bhubaneswar, Cuttack, Puri</strong>, and
              surrounding cities across Odisha with trusted, on-time service.
            </p>

            <ul className="lizard-service-main-highlights">
              <li>
                <span className="lizard-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Odorless &amp; eco-safe treatment</span>
              </li>
              <li>
                <span className="lizard-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Prevents re-entry and nesting</span>
              </li>
              <li>
                <span className="lizard-service-main-highlight-icon">
                  <CheckIcon />
                </span>
                <span>Affordable pricing with expert support</span>
              </li>
            </ul>

            <p className="lizard-service-main-tagline">
              Say goodbye to unwanted lizards in your living or work space with
              Giridurga Pest Control.
            </p>
          </div>

          {/* BENEFITS */}
          <div className="lizard-service-main-benefits lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              WHY CHOOSE GIRIDURGA PEST CONTROL
            </span>

            <h2>Professional Lizard Control You Can Trust</h2>

            <div className="lizard-service-main-benefit-grid">
              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Odorless &amp; Stain-Free</h3>
                <p>
                  Leaves no stains or unpleasant smell behind—safe for indoor
                  living areas, children, and pets.
                </p>
              </div>

              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Entry Point Prevention</h3>
                <p>
                  Identifies hiding and breeding spots across ceilings, wall
                  cracks, and electrical boxes to deter re-entry.
                </p>
              </div>

              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Expert Support</h3>
                <p>
                  Customized treatment plans and practical prevention guidance
                  for homes, hotels, restaurants, and offices.
                </p>
              </div>

              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Affordable Solutions</h3>
                <p>
                  Genuine rates with trusted, on-time service across
                  Bhubaneswar, Cuttack, Puri, and nearby Odisha cities.
                </p>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="lizard-service-main-comprehensive lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              OUR LIZARD MANAGEMENT SOLUTIONS
            </span>

            <h2>Lizard Management Services in Odisha</h2>

            <p>
              From residential properties to busy commercial spaces,{" "}
              <strong>Giridurga Pest Control</strong> offers professional lizard
              management solutions designed around your property’s needs.
            </p>

            <div className="lizard-service-main-image-grid">
              <div className="lizard-service-main-image-card">
                <div className="lizard-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Lizard hiding and breeding spot inspection"
                  />
                  <span className="lizard-service-main-image-number">01</span>
                </div>

                <span className="lizard-service-main-card-subtitle">
                  CEILINGS, CRACKS &amp; ELECTRICAL BOXES
                </span>

                <h3>Detailed Property Inspection</h3>

                <p>
                  Inspecting ceilings, wall cracks, kitchens, and electrical
                  boxes to identify lizard hiding spots and entry points.
                </p>
              </div>

              <div className="lizard-service-main-image-card">
                <div className="lizard-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Odorless and stain-free lizard repellent treatment"
                  />
                  <span className="lizard-service-main-image-number">02</span>
                </div>

                <span className="lizard-service-main-card-subtitle">
                  ODORLESS &amp; ECO-FRIENDLY
                </span>

                <h3>Targeted Lizard Management</h3>

                <p>
                  Targeted repellents and sprays that drive lizards away without
                  stains, smell, or harm to the environment.
                </p>
              </div>
            </div>
          </div>

          {/* SERVICE AREAS / SEO CONTENT */}
          <div className="lizard-service-main-areas lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Trusted Pest Control Services Across Odisha</h2>

            <p>
              Looking for the{" "}
              <strong>Best Pest Control in Cuttack with genuine rates</strong>?{" "}
              <strong>Giridurga Pest Control</strong> provides professional pest
              management and lizard control solutions for residential and
              commercial properties.
            </p>

            <p>
              We serve customers searching for{" "}
              <strong>pest control Bhubaneswar</strong>, the{" "}
              <strong>best pest control services in Bhubaneswar</strong>,{" "}
              <strong>pest control Puri</strong>, and{" "}
              <strong>pest control near Cuttack, Odisha</strong>. Our team also
              provides{" "}
              <strong>
                expert pest and termite control across Cuttack
              </strong>{" "}
              and nearby cities.
            </p>

            <p>
              If you are searching for reliable{" "}
              <strong>Pest Control Service Providers in Cuttack</strong>, the{" "}
              <strong>best pest control services in Cuttack</strong>, or
              effective <strong>pest control solutions in Cuttack</strong>,
              contact Giridurga Pest Control for service information, expert
              support, and pricing details.
            </p>

            <div className="lizard-service-main-city-list">
              <span>Cuttack</span>
              <span>Bhubaneswar</span>
              <span>Puri</span>
              <span>Across Odisha</span>
            </div>

            <div className="lizard-service-main-local-box">
              <span className="lizard-service-main-card-subtitle">
                SERVICE AREAS &amp; SPECIALTIES IN ODISHA
              </span>
              <h3>Complete Lizard &amp; Pest Protection Across Odisha</h3>
              <div className="lizard-service-main-keyword-tags">
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
          <div className="lizard-service-main-faq lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="lizard-service-main-faq-intro">
              Find answers to common questions about Giridurga Pest Control’s
              lizard inspection, odorless treatment, and prevention services.
            </p>

            <div className="lizard-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`lizard-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="lizard-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="lizard-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="lizard-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="lizard-service-main-bottom-cta lizard-service-main-reveal">
            <div>
              <span>GIRIDURGA PEST CONTROL • BHUBANESWAR • CUTTACK • PURI</span>

              <h2>Need Professional Lizard Control?</h2>

              <p>
                Say goodbye to unwanted lizards in your living or work space.
                Contact Giridurga Pest Control today for expert assistance and
                customized solutions.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="lizard-service-main-cta-button"
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

export default LizardserviceMain;