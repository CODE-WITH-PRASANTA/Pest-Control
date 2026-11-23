
import React, { useEffect, useRef, useState } from "react";
import "./RodentmanagementerviceMain.css";

import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Rodent Inspection",
    heading: "Professional Rodent Inspection Services",
    image: serviceone,
    description:
      "Identify rat and mouse activity, nesting areas, droppings and entry points through a detailed property inspection.",
  },
  {
    title: "Rat & Mouse Control",
    heading: "Advanced Rat and Mouse Control Solutions",
    image: service,
    description:
      "Control rodent infestations with professional baiting, trapping and targeted treatment methods for residential and commercial properties.",
  },
  {
    title: "Rodent Baiting Treatment",
    heading: "Effective Rodent Baiting Solutions",
    image: servicetwo,
    description:
      "Use carefully selected rodent baiting methods to control rat and mouse populations and reduce recurring infestation risks.",
  },
  {
    title: "Rodent Trapping",
    heading: "Professional Rodent Trapping Services",
    image: serviceone,
    description:
      "Our experts use suitable trapping techniques to manage rodent activity in homes, offices, restaurants and warehouses.",
  },
  {
    title: "Rodent Prevention",
    heading: "Long-Term Rodent Prevention & Protection",
    image: service,
    description:
      "Identify possible entry points and recommend preventive measures to protect your property from future rodent infestations.",
  },
];

const faqs = [
  {
    question: "What is included in your rodent management service?",
    answer:
      "Our rodent management service includes property inspection, identification of rodent activity, locating nesting areas and entry points, suitable baiting or trapping treatments and preventive recommendations.",
  },
  {
    question: "How can I identify a rat or mouse infestation?",
    answer:
      "Common signs include rodent droppings, scratching sounds, gnaw marks on furniture or electrical wires, damaged food packaging, unpleasant smells and nesting materials.",
  },
  {
    question: "Are your rodent control treatments safe for children and pets?",
    answer:
      "We select appropriate rodent management methods according to the property and infestation. Our technicians provide safety instructions, and all treatment recommendations should be followed carefully.",
  },
  {
    question: "Do you provide rodent control for commercial properties?",
    answer:
      "Yes. We provide rodent management solutions for houses, apartments, offices, hotels, restaurants, warehouses, factories and other commercial properties.",
  },
  {
    question: "How long does rodent control treatment take?",
    answer:
      "The treatment duration depends on property size, rodent activity and infestation severity. Our technician will explain the expected treatment schedule after inspection.",
  },
  {
    question: "Which areas do you cover for rodent control?",
    answer:
      "Nilachakra Pest Control provides rodent management services across Bhubaneswar, Cuttack, Puri and nearby areas of Odisha.",
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
      d="M14 2v5h5M8 16h2a1.5 1.5 0 000-3H8v5m5-5v5h1a2.5 2.5 0 000-5h-1"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RodentmanagementerviceMain = () => {
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
      ".rodent-management-main-reveal"
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
      className="rodent-management-main"
      ref={rootRef}
    >
      <div className="rodent-management-main-glow rodent-management-main-glow-one" />
      <div className="rodent-management-main-glow rodent-management-main-glow-two" />

      <div className="rodent-management-main-container">

        {/* LEFT SIDEBAR */}
        <aside className="rodent-management-main-sidebar">

          <div className="rodent-management-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`rodent-management-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="rodent-management-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rodent-management-main-menu-title">
                  {srv.title}
                </span>

                <span className="rodent-management-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="rodent-management-main-contact-card">
            <div className="rodent-management-main-contact-decoration rodent-management-main-contact-decoration-one" />
            <div className="rodent-management-main-contact-decoration rodent-management-main-contact-decoration-two" />

            <div className="rodent-management-main-contact-content">
              <h2>
                Contact Us for Expert Rodent Control Advice
              </h2>

              <a
                href="tel:+919876543210"
                className="rodent-management-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to an expert</p>

              <a
                href="tel:+919876543210"
                className="rodent-management-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="rodent-management-main-download"
          >
            <PdfIcon />
            <span>Download Pdf File</span>
          </a>

        </aside>

        {/* RIGHT CONTENT */}
        <main className="rodent-management-main-content">

          {/* HERO SECTION */}
          <div
            className={`rodent-management-main-hero ${
              imageFailed ? "rodent-management-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="rodent-management-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="rodent-management-main-hero-overlay" />

            <span className="rodent-management-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="rodent-management-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="rodent-management-main-hero-label">
                PROFESSIONAL RODENT CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="rodent-management-main-overview rodent-management-main-reveal">

            <span className="rodent-management-main-section-subtitle">
              ABOUT RODENT MANAGEMENT
            </span>

            <h2>
              Professional Rodent Management Services in Odisha
            </h2>

            <p>
              Rodents like rats and mice are not only destructive
              but also pose serious health risks. They contaminate
              food, chew electrical wires, damage property and can
              spread diseases such as leptospirosis and salmonella.
              Quick and professional rodent control is essential
              to keep your space safe and hygienic.
            </p>

            <p>
              At Nilachakra Pest Control, we provide expert rodent
              management services in Odisha using safe, proven
              techniques. Our trained team conducts a detailed
              site inspection to identify entry points, nests and
              movement areas. We use a combination of baiting,
              trapping and suitable rodent control treatments
              tailored to your property.
            </p>

            <p>
              Whether it is a home, warehouse, office or restaurant,
              we offer customized rodent control solutions for
              long-term protection. We serve Bhubaneswar, Cuttack,
              Puri and nearby areas.
            </p>

            <ul className="rodent-management-main-benefits">
              <li>✓ Destroys nests and helps block entry points</li>
              <li>✓ Effective and affordable rodent treatments</li>
              <li>✓ Professional inspection and expert consultation</li>
            </ul>

          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="rodent-management-main-comprehensive rodent-management-main-reveal">

            <span className="rodent-management-main-section-subtitle">
              ADVANCED RODENT PROTECTION
            </span>

            <h2>Complete Rodent Control Solutions</h2>

            <p>
              From identifying rodent entry points to controlling
              active rat and mouse infestations, we provide
              professional rodent management solutions designed
              around your property and protection requirements.
            </p>

            <div className="rodent-management-main-image-grid">

              <div className="rodent-management-main-image-card">
                <div className="rodent-management-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Professional rat and mouse inspection in Odisha"
                  />
                  <span className="rodent-management-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Rodent Inspection</h3>

                <p>
                  Identify rat droppings, nesting locations,
                  gnaw marks and possible rodent entry points.
                </p>
              </div>

              <div className="rodent-management-main-image-card">
                <div className="rodent-management-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional rodent baiting and trapping treatment"
                  />
                  <span className="rodent-management-main-image-number">
                    02
                  </span>
                </div>

                <h3>Professional Rodent Treatment</h3>

                <p>
                  Use appropriate baiting, trapping and
                  preventive techniques to manage rodent activity.
                </p>
              </div>

            </div>
          </div>

          {/* PROCESS AND METHODS */}
          <div className="rodent-management-main-overview rodent-management-main-reveal">

            <span className="rodent-management-main-section-subtitle">
              OUR WORKING PROCESS
            </span>

            <h2>Rodent Control Process & Methods</h2>

            <div className="rodent-management-main-process-list">

              <div className="rodent-management-main-process-item">
                <span>01</span>
                <div>
                  <h3>Inspection & Assessment</h3>
                  <p>
                    Our experts inspect your premises to identify
                    rodent activity, nesting areas, entry points
                    and the level of infestation.
                  </p>
                </div>
              </div>

              <div className="rodent-management-main-process-item">
                <span>02</span>
                <div>
                  <h3>Customized Treatment Plan</h3>
                  <p>
                    Based on the inspection, we prepare a suitable
                    rodent management plan according to your
                    property and specific requirements.
                  </p>
                </div>
              </div>

              <div className="rodent-management-main-process-item">
                <span>03</span>
                <div>
                  <h3>Safe & Targeted Treatment</h3>
                  <p>
                    Our technicians use suitable baiting, trapping
                    and other targeted control methods while
                    providing necessary safety instructions.
                  </p>
                </div>
              </div>

              <div className="rodent-management-main-process-item">
                <span>04</span>
                <div>
                  <h3>Preventive Measures</h3>
                  <p>
                    We recommend sealing entry points, maintaining
                    cleanliness and following proper food storage
                    practices to reduce future rodent activity.
                  </p>
                </div>
              </div>

              <div className="rodent-management-main-process-item">
                <span>05</span>
                <div>
                  <h3>Follow-Up Services</h3>
                  <p>
                    Monitoring and follow-up recommendations
                    help assess treatment effectiveness and
                    minimize recurring infestations.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="rodent-management-main-overview rodent-management-main-reveal">

            <span className="rodent-management-main-section-subtitle">
              WHY CHOOSE NILACHAKRA
            </span>

            <h2>
              Trusted Rodent Control Services in Bhubaneswar,
              Cuttack & Puri
            </h2>

            <p>
              Nilachakra Pest Control provides professional rodent
              management solutions for residential, commercial and
              industrial properties across Odisha. Our team focuses
              on identifying the root cause of rodent infestations
              and recommending effective treatment and prevention
              methods.
            </p>

            <p>
              If you are searching for the best pest control in
              Cuttack, pest control Bhubaneswar, pest control Puri
              or expert pest control services in Odisha, contact
              our team for professional assistance.
            </p>

          </div>

          {/* FAQ SECTION */}
          <div className="rodent-management-main-faq rodent-management-main-reveal">

            <span className="rodent-management-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="rodent-management-main-faq-intro">
              Find answers to common questions about our
              professional rat control, mouse control and
              rodent management services.
            </p>

            <div className="rodent-management-main-faq-list">

              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`rodent-management-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="rodent-management-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="rodent-management-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="rodent-management-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* SEO KEYWORDS */}
          <div className="rodent-management-main-keywords rodent-management-main-reveal">
            <h2>Our Rodent Control Service Areas</h2>

            <p>
              Rodent Management Services in Odisha | Rat Control
              Services in Cuttack | Mouse Control in Bhubaneswar |
              Best Pest Control Services in Cuttack | Pest Control
              Near Cuttack Odisha | Pest Control Puri | Professional
              Rodent Control Company in Odisha | Commercial Rodent
              Management | Residential Rat Control Services.
            </p>
          </div>

          {/* BOTTOM CTA */}
          <div className="rodent-management-main-bottom-cta rodent-management-main-reveal">

            <div>
              <span>PROTECT YOUR PROPERTY TODAY</span>

              <h2>Need Professional Rodent Control?</h2>

              <p>
                Keep your home and business protected from rats
                and mice. Contact Nilachakra Pest Control for
                professional rodent management assistance.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="rodent-management-main-cta-button"
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

export default RodentmanagementerviceMain;
