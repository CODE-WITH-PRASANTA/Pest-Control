
import { useEffect, useRef, useState } from "react";
import "./FoggingserviceMain.css";

// Add your images manually in the assets folder
import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Fogging Inspection",
    heading: "Professional Fogging Inspection Services",
    image: serviceone,
    description:
      "Our team inspects your property, identifies pest activity and evaluates the areas requiring fogging treatment for effective coverage.",
  },
  {
    title: "Indoor Fogging",
    heading: "Advanced Indoor Fogging Solutions",
    image: service,
    description:
      "Targeted indoor fogging solutions for suitable residential and commercial spaces to help manage flying insects and unwanted pests.",
  },
  {
    title: "Outdoor Fogging",
    heading: "Effective Outdoor Fogging Treatment",
    image: servicetwo,
    description:
      "Professional outdoor fogging for suitable open areas, gardens, surroundings and other locations where flying insect activity is a concern.",
  },
  {
    title: "Residential & Commercial Fogging",
    heading: "Fogging Services for Homes and Businesses",
    image: serviceone,
    description:
      "Customized fogging services for houses, apartments, hotels, restaurants, schools, offices and commercial properties.",
  },
  {
    title: "Preventive Fogging",
    heading: "Planned Fogging and Pest Prevention",
    image: service,
    description:
      "Scheduled fogging recommendations and preventive pest management support to help maintain cleaner and more comfortable surroundings.",
  },
];

const faqs = [
  {
    question: "What is fogging service in pest control?",
    answer:
      "Fogging is a pest management technique that releases a fine mist or aerosol to cover suitable areas and help control targeted pests, especially flying insects. The treatment method depends on the property, pest problem and product used.",
  },
  {
    question: "How does professional fogging work?",
    answer:
      "Our trained technicians first inspect the property and identify the areas requiring treatment. Suitable fogging equipment and approved products are then selected and applied according to the product label and treatment requirements.",
  },
  {
    question: "Is fogging suitable for homes and commercial properties?",
    answer:
      "Yes. Fogging can be considered for suitable residential and commercial spaces, including homes, apartments, hotels, restaurants, offices, schools and other properties after an assessment.",
  },
  {
    question: "How long should I stay away during fogging?",
    answer:
      "The required evacuation and re-entry time depends on the chemical product, application method and property conditions. Our technicians will provide specific safety and re-entry instructions before treatment.",
  },
  {
    question: "Does fogging help control mosquitoes and flying insects?",
    answer:
      "Fogging can help control targeted adult flying insects in treated areas. However, it does not necessarily eliminate breeding sources. Removing stagnant water and following suitable preventive measures are also important.",
  },
  {
    question: "Which locations do you serve in Odisha?",
    answer:
      "Giridurga Pest Control provides pest management services in Cuttack, Bhubaneswar, Puri and surrounding areas across Odisha. Contact us to confirm service availability in your location.",
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

const FoggingserviceMain = () => {
  const rootRef = useRef(null);

  const [activeService, setActiveService] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const currentService = services[activeService];
  const imageFailed = failedImages[activeService];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".fogging-service-main-reveal");

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
    <section className="fogging-service-main" ref={rootRef}>
      <div className="fogging-service-main-glow fogging-service-main-glow-one" />
      <div className="fogging-service-main-glow fogging-service-main-glow-two" />

      <div className="fogging-service-main-container">

        {/* LEFT SIDEBAR */}
        <aside className="fogging-service-main-sidebar">
          <div className="fogging-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`fogging-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="fogging-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="fogging-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="fogging-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}
          <div className="fogging-service-main-contact-card">
            <div className="fogging-service-main-contact-decoration fogging-service-main-contact-decoration-one" />
            <div className="fogging-service-main-contact-decoration fogging-service-main-contact-decoration-two" />

            <div className="fogging-service-main-contact-content">
              <h2>Contact Giridurga Pest Control</h2>

              <a
                href="tel:+919876543210"
                className="fogging-service-main-contact-phone-icon"
                aria-label="Call our support team"
              >
                <PhoneIcon />
              </a>

              <p>Need help? Talk to our pest control experts.</p>

              <a
                href="tel:+919876543210"
                className="fogging-service-main-contact-number"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/service-brochure.pdf"
            download
            className="fogging-service-main-download"
          >
            <PdfIcon />
            <span>Download PDF File</span>
          </a>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="fogging-service-main-content">

          {/* HERO SECTION */}
          <div
            className={`fogging-service-main-hero ${
              imageFailed ? "fogging-service-main-hero-fallback" : ""
            }`}
          >
            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="fogging-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="fogging-service-main-hero-overlay" />

            <span className="fogging-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="fogging-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="fogging-service-main-hero-label">
                GIRIDURGA PEST CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* FOGGING OVERVIEW */}
          <div className="fogging-service-main-overview fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              ABOUT OUR SERVICE
            </span>

            <h2>Professional Fogging Service</h2>

            <p>
              Fogging is a fast and effective pest control method that
              releases a fine mist to cover suitable areas, including
              difficult-to-reach corners and surfaces. It is commonly
              used to help control targeted flying insects and improve
              pest management in residential and commercial spaces.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we provide
              professional fogging services using modern fogging
              equipment, including FogAir machines, and suitable
              pest control products. Our trained experts assess your
              property and select an appropriate treatment approach
              according to the pest problem and site requirements.
            </p>

            <p>
              Every treatment is carefully planned, beginning with a
              detailed inspection, followed by appropriate fogging
              application and practical preventive recommendations.
              We focus on effective coverage, responsible application
              and clear safety instructions.
            </p>

            <p>
              Whether you require fogging for your home, apartment,
              hotel, restaurant, school, office or commercial property,
              our team provides customized pest management solutions
              based on your requirements.
            </p>
          </div>

          {/* WHY CHOOSE US */}
          <div className="fogging-service-main-benefits fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              WHY CHOOSE US
            </span>

            <h2>Why Choose Giridurga Pest Control for Fogging?</h2>

            <div className="fogging-service-main-benefit-grid">
              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Modern Fogging Equipment</h3>
                <p>
                  Professional fogging equipment, including FogAir
                  machines, selected according to treatment requirements.
                </p>
              </div>

              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Trained Experts</h3>
                <p>
                  Experienced technicians who assess the property and
                  apply suitable treatments with care.
                </p>
              </div>

              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Planned Treatment</h3>
                <p>
                  Inspection, targeted application and preventive
                  recommendations for better pest management.
                </p>
              </div>

              <div className="fogging-service-main-benefit-card">
                <span>✓</span>
                <h3>Customized Solutions</h3>
                <p>
                  Fogging service recommendations based on your property,
                  pest concerns and treatment requirements.
                </p>
              </div>
            </div>
          </div>

          {/* HOW FOGGING WORKS */}
          <div className="fogging-service-main-comprehensive fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              OUR WORKING PROCESS
            </span>

            <h2>How Giridurga Pest Control Does Fogging</h2>

            <p>
              We follow a planned process to ensure that each fogging
              treatment is carried out with suitable equipment,
              appropriate products and proper safety precautions.
            </p>

            <div className="fogging-service-main-image-grid">
              <div className="fogging-service-main-image-card">
                <div className="fogging-service-main-image-wrap">
                  <img src={serviceone} alt="Fogging property inspection" />
                  <span className="fogging-service-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Property Inspection</h3>

                <p>
                  Our experts inspect the property, understand the pest
                  problem and identify areas requiring fogging treatment.
                </p>
              </div>

              <div className="fogging-service-main-image-card">
                <div className="fogging-service-main-image-wrap">
                  <img src={servicetwo} alt="Professional fogging application" />
                  <span className="fogging-service-main-image-number">
                    02
                  </span>
                </div>

                <h3>Professional Fogging Application</h3>

                <p>
                  Our trained technicians use suitable fogging equipment
                  and products to apply treatment according to the
                  recommended procedure.
                </p>
              </div>
            </div>

            <div className="fogging-service-main-process">
              <div>
                <span>03</span>
                <h3>Safety & Precautions</h3>
                <p>
                  We provide instructions regarding preparation,
                  evacuation and safe re-entry after treatment.
                </p>
              </div>

              <div>
                <span>04</span>
                <h3>Preventive Guidance</h3>
                <p>
                  We recommend practical steps to help reduce recurring
                  pest activity and maintain hygienic surroundings.
                </p>
              </div>
            </div>
          </div>

          {/* SERVICE AREAS */}
          <div className="fogging-service-main-areas fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>Fogging and Pest Control Services Across Odisha</h2>

            <p>
              Looking for the best pest control in Cuttack with genuine
              rates? Giridurga Pest Control offers professional pest
              management and fogging services for residential and
              commercial properties.
            </p>

            <p>
              We serve customers searching for pest control in
              Bhubaneswar, the best pest control services in Bhubaneswar,
              pest control in Puri and pest control near Cuttack, Odisha.
              Our team also provides expert pest and termite control
              across Cuttack, subject to service availability.
            </p>

            <p>
              If you are searching for reliable pest control service
              providers in Cuttack or professional pest control solutions
              in Cuttack, contact Giridurga Pest Control for service
              information and pricing details.
            </p>

            <div className="fogging-service-main-city-list">
              <span>Cuttack</span>
              <span>Bhubaneswar</span>
              <span>Puri</span>
              <span>Across Odisha</span>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="fogging-service-main-faq fogging-service-main-reveal">
            <span className="fogging-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="fogging-service-main-faq-intro">
              Find answers to common questions about our fogging
              procedures, equipment, safety and pest management services.
            </p>

            <div className="fogging-service-main-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`fogging-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="fogging-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="fogging-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="fogging-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="fogging-service-main-bottom-cta fogging-service-main-reveal">
            <div>
              <span>KEEP YOUR SURROUNDINGS PEST-FREE</span>

              <h2>Need Professional Fogging Service?</h2>

              <p>
                Get professional fogging assistance from Giridurga Pest
                Control. Contact our team today for customized pest
                management solutions for your property.
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="fogging-service-main-cta-button"
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

export default FoggingserviceMain;
