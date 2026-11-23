
import React, { useEffect, useRef, useState } from "react";
import "./CockroachmanagementserviceMain.css";

// Add your images manually in the assets folder
import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Cockroach Inspection",
    heading: "Professional Cockroach Inspection Services",
    image: serviceone,
    description:
      "Our pest control experts inspect kitchens, bathrooms, drains, cupboards and hidden corners to identify cockroach activity and infestation sources.",
  },
  {
    title: "Cockroach Gel Treatment",
    heading: "Advanced Cockroach Gel Baiting Solutions",
    image: service,
    description:
      "Targeted gel baiting treatment helps control cockroaches in cracks, corners, cabinets and other hiding places with minimal disruption.",
  },
  {
    title: "Cockroach Spray Treatment",
    heading: "Effective Cockroach Spray Treatment",
    image: servicetwo,
    description:
      "Professional cockroach spray treatments for suitable areas to help control visible cockroaches and reduce pest activity.",
  },
  {
    title: "Kitchen Cockroach Control",
    heading: "Complete Kitchen Cockroach Management",
    image: serviceone,
    description:
      "Specialized cockroach management for kitchens, restaurants, food preparation areas and other spaces where hygiene is essential.",
  },
  {
    title: "Residential & Commercial",
    heading: "Cockroach Control for Homes and Businesses",
    image: service,
    description:
      "Customized cockroach management solutions for houses, apartments, hotels, restaurants, offices, schools and commercial properties.",
  },
];

const faqs = [
  {
    question: "What is cockroach pest control service?",
    answer:
      "Cockroach pest control is a professional treatment designed to manage and reduce cockroach infestations. Depending on the infestation, technicians may use gel baiting, targeted spray applications and preventive pest management methods.",
  },
  {
    question: "Why are cockroaches dangerous?",
    answer:
      "Cockroaches can contaminate food, utensils and surfaces with bacteria and allergens. Their droppings, saliva and body particles may also trigger allergic reactions and asthma symptoms in sensitive individuals.",
  },
  {
    question: "How does professional cockroach treatment work?",
    answer:
      "Our technicians first inspect the property to identify cockroach hiding places and infestation sources. They then select suitable treatment methods, such as gel baiting or targeted spray applications, followed by preventive recommendations.",
  },
  {
    question: "Is cockroach gel treatment effective?",
    answer:
      "Gel baiting is an effective targeted treatment for many cockroach infestations. Cockroaches consume the bait and may transfer its effects within their hiding areas. The treatment's effectiveness depends on infestation severity and proper application.",
  },
  {
    question: "Is cockroach treatment safe for children and pets?",
    answer:
      "Treatment safety depends on the products and application methods used. Our technicians provide preparation, precaution and re-entry instructions. Children and pets should be kept away from treated areas as directed.",
  },
  {
    question: "How long does cockroach pest control take?",
    answer:
      "Treatment duration depends on property size, infestation severity and the selected treatment method. Some treatments provide initial results quickly, while complete control may require monitoring and follow-up treatment.",
  },
  {
    question: "Do I need to clean my kitchen before treatment?",
    answer:
      "Yes. Remove exposed food, cover utensils and clean accessible kitchen surfaces before treatment. Our technicians will explain the necessary preparation steps according to the selected treatment.",
  },
  {
    question: "Which locations do you serve in Odisha?",
    answer:
      "Giridhar Pest Control provides pest management services in Cuttack, Bhubaneswar, Puri and surrounding areas across Odisha. Contact our team to confirm service availability in your location.",
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

const CockroachmanagementserviceMain = () => {
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
      ".cockroach-service-main-reveal"
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
      className="cockroach-service-main"
      ref={rootRef}
    >
      <div className="cockroach-service-main-glow cockroach-service-main-glow-one" />
      <div className="cockroach-service-main-glow cockroach-service-main-glow-two" />

      <div className="cockroach-service-main-container">

        {/* LEFT SIDEBAR */}

        <aside className="cockroach-service-main-sidebar">

          <div className="cockroach-service-main-menu">
            {services.map((srv, index) => (
              <button
                key={srv.title}
                type="button"
                className={`cockroach-service-main-menu-item ${
                  activeService === index ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span className="cockroach-service-main-menu-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="cockroach-service-main-menu-title">
                  {srv.title}
                </span>

                <span className="cockroach-service-main-arrow">
                  <ArrowIcon />
                </span>
              </button>
            ))}
          </div>

          {/* CONTACT CARD */}

          <div className="cockroach-service-main-contact-card">

            <div className="cockroach-service-main-contact-decoration decoration-one" />
            <div className="cockroach-service-main-contact-decoration decoration-two" />

            <div className="cockroach-service-main-contact-content">

              <span className="cockroach-service-main-contact-label">
                NEED EXPERT HELP?
              </span>

              <h2>
                Contact Giridhar Pest Control
              </h2>

              <a
                href="tel:+919876543210"
                className="cockroach-service-main-contact-phone-icon"
                aria-label="Call Giridhar Pest Control"
              >
                <PhoneIcon />
              </a>

              <p>
                Speak with our pest control experts today.
              </p>

              <a
                href="tel:+919876543210"
                className="cockroach-service-main-contact-number"
              >
                +91 98765 43210
              </a>

            </div>
          </div>

          {/* DOWNLOAD BUTTON */}

          <a
            href="/service-brochure.pdf"
            download
            className="cockroach-service-main-download"
          >
            <PdfIcon />
            <span>Download PDF File</span>
          </a>

        </aside>

        {/* RIGHT CONTENT */}

        <main className="cockroach-service-main-content">

          {/* HERO SECTION */}

          <div
            className={`cockroach-service-main-hero ${
              imageFailed ? "cockroach-service-main-hero-fallback" : ""
            }`}
          >

            {!imageFailed && (
              <img
                key={`img-${activeService}`}
                src={currentService.image}
                alt={currentService.title}
                className="cockroach-service-main-hero-image"
                onError={() =>
                  setFailedImages((prev) => ({
                    ...prev,
                    [activeService]: true,
                  }))
                }
              />
            )}

            <div className="cockroach-service-main-hero-overlay" />

            <span className="cockroach-service-main-hero-counter">
              {String(activeService + 1).padStart(2, "0")}
              <i />
              {String(services.length).padStart(2, "0")}
            </span>

            <div
              className="cockroach-service-main-hero-text"
              key={`text-${activeService}`}
            >
              <span className="cockroach-service-main-hero-label">
                GIRIDHAR PEST CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>

          </div>

          {/* COCKROACH INTRODUCTION */}

          <div className="cockroach-service-main-overview cockroach-service-main-reveal">

            <span className="cockroach-service-main-section-subtitle">
              ABOUT OUR SERVICE
            </span>

            <h2>
              Cockroach Control Service in Odisha – Safe, Fast & Effective Solutions
            </h2>

            <p>
              Cockroach infestation is one of the most common and
              troublesome pest problems in homes, restaurants, hotels
              and offices across Odisha. These unwanted pests can
              contaminate food, utensils and household surfaces while
              spreading harmful bacteria and allergens.
            </p>

            <p>
              At <strong>Giridhar Pest Control</strong>, we provide
              professional cockroach management services in Odisha
              to help control infestations and maintain hygienic
              surroundings. Our trained technicians use suitable
              treatment methods, including advanced gel baiting,
              targeted spray applications and preventive pest
              management solutions.
            </p>

            <p>
              Whether you are dealing with cockroaches in your kitchen,
              bathroom, drainage areas, cupboards or commercial
              premises, our team assesses the infestation and
              recommends an appropriate treatment plan.
            </p>

            <p>
              Our goal is to provide reliable cockroach control
              solutions with responsible application, professional
              service and practical prevention guidance.
            </p>

          </div>

          {/* WHAT ARE COCKROACHES */}

          <div className="cockroach-service-main-danger cockroach-service-main-reveal">

            <span className="cockroach-service-main-section-subtitle">
              UNDERSTANDING THE PEST
            </span>

            <h2>
              What Are Cockroaches and Why Are They Dangerous?
            </h2>

            <p>
              Cockroaches are resilient, nocturnal insects commonly
              found in kitchens, bathrooms, storage areas and dark,
              moist corners of buildings. They can enter properties
              through drains, pipes, cracks, doors and small openings.
            </p>

            <p>
              These insects are difficult to eliminate once an
              infestation becomes established because they hide in
              inaccessible places and reproduce quickly. They feed
              on food waste, crumbs, grease and other organic matter.
            </p>

            <div className="cockroach-service-main-danger-grid">

              <div className="cockroach-service-main-danger-card">
                <span>01</span>
                <h3>Food Contamination</h3>
                <p>
                  Cockroaches can contaminate food, utensils and
                  kitchen surfaces while searching for food.
                </p>
              </div>

              <div className="cockroach-service-main-danger-card">
                <span>02</span>
                <h3>Allergies & Asthma</h3>
                <p>
                  Cockroach droppings, saliva and body particles
                  may trigger allergic reactions and asthma symptoms.
                </p>
              </div>

              <div className="cockroach-service-main-danger-card">
                <span>03</span>
                <h3>Bacteria & Germs</h3>
                <p>
                  Cockroaches can carry and spread microorganisms
                  onto food preparation surfaces and household items.
                </p>
              </div>

              <div className="cockroach-service-main-danger-card">
                <span>04</span>
                <h3>Rapid Infestation</h3>
                <p>
                  Cockroaches reproduce quickly and can spread
                  throughout a property if not managed properly.
                </p>
              </div>

            </div>

          </div>

          {/* WHY CHOOSE US */}

          <div className="cockroach-service-main-benefits cockroach-service-main-reveal">

            <span className="cockroach-service-main-section-subtitle">
              WHY CHOOSE US
            </span>

            <h2>
              Why Choose Giridhar Pest Control for Cockroach Control?
            </h2>

            <div className="cockroach-service-main-benefit-grid">

              <div className="cockroach-service-main-benefit-card">
                <span>✓</span>
                <h3>Experienced Technicians</h3>
                <p>
                  Trained pest control professionals who identify
                  infestation sources and recommend suitable treatments.
                </p>
              </div>

              <div className="cockroach-service-main-benefit-card">
                <span>✓</span>
                <h3>Advanced Gel Baiting</h3>
                <p>
                  Targeted gel bait applications for suitable
                  cockroach hiding areas and infestation points.
                </p>
              </div>

              <div className="cockroach-service-main-benefit-card">
                <span>✓</span>
                <h3>Professional Treatment</h3>
                <p>
                  Suitable pest control products and application
                  methods selected according to property requirements.
                </p>
              </div>

              <div className="cockroach-service-main-benefit-card">
                <span>✓</span>
                <h3>Customized Solutions</h3>
                <p>
                  Treatment recommendations for homes, kitchens,
                  hotels, restaurants and commercial properties.
                </p>
              </div>

            </div>

          </div>

          {/* TREATMENT PROCESS */}

          <div className="cockroach-service-main-comprehensive cockroach-service-main-reveal">

            <span className="cockroach-service-main-section-subtitle">
              OUR WORKING PROCESS
            </span>

            <h2>
              Our Professional Cockroach Control Treatment Process
            </h2>

            <p>
              At Giridhar Pest Control, we follow a systematic
              treatment process to identify, manage and help prevent
              cockroach infestations.
            </p>

            <div className="cockroach-service-main-image-grid">

              <div className="cockroach-service-main-image-card">

                <div className="cockroach-service-main-image-wrap">
                  <img
                    src={serviceone}
                    alt="Cockroach infestation inspection"
                  />
                  <span className="cockroach-service-main-image-number">
                    01
                  </span>
                </div>

                <h3>Detailed Property Inspection</h3>

                <p>
                  Our experts inspect kitchens, bathrooms, drains,
                  cupboards and hidden corners to identify cockroach
                  activity and infestation sources.
                </p>

              </div>

              <div className="cockroach-service-main-image-card">

                <div className="cockroach-service-main-image-wrap">
                  <img
                    src={servicetwo}
                    alt="Professional cockroach pest treatment"
                  />
                  <span className="cockroach-service-main-image-number">
                    02
                  </span>
                </div>

                <h3>Professional Treatment Application</h3>

                <p>
                  Suitable gel baiting and targeted spray treatments
                  are selected according to the infestation and
                  property conditions.
                </p>

              </div>

            </div>

            <div className="cockroach-service-main-process">

              <div>
                <span>03</span>
                <h3>Safety & Precautions</h3>
                <p>
                  We explain the necessary preparation, food
                  protection, treatment precautions and re-entry
                  instructions.
                </p>
              </div>

              <div>
                <span>04</span>
                <h3>Prevention & Follow-Up</h3>
                <p>
                  We provide practical recommendations to reduce
                  cockroach hiding places, food sources and recurring
                  infestation risks.
                </p>
              </div>

            </div>

          </div>

          {/* SERVICE AREAS */}

          <div className="cockroach-service-main-areas cockroach-service-main-reveal">

            <span className="cockroach-service-main-section-subtitle">
              OUR SERVICE LOCATIONS
            </span>

            <h2>
              Cockroach Control Services Across Odisha
            </h2>

            <p>
              Looking for reliable cockroach pest control in Cuttack?
              Giridhar Pest Control provides professional cockroach
              management services for residential and commercial
              properties with suitable treatment solutions.
            </p>

            <p>
              We serve customers searching for cockroach control in
              Bhubaneswar, professional pest control in Puri and
              reliable pest management services near Cuttack, Odisha.
            </p>

            <p>
              Contact Giridhar Pest Control to learn about our
              cockroach treatment services, pricing and availability
              in your area.
            </p>

            <div className="cockroach-service-main-city-list">
              <span>Cuttack</span>
              <span>Bhubaneswar</span>
              <span>Puri</span>
              <span>Across Odisha</span>
            </div>

          </div>

          {/* FAQ SECTION */}

          <div className="cockroach-service-main-faq cockroach-service-main-reveal">

            <span className="cockroach-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p className="cockroach-service-main-faq-intro">
              Find answers to common questions about cockroach
              infestation, treatment methods, safety and our
              professional pest control services.
            </p>

            <div className="cockroach-service-main-faq-list">

              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`cockroach-service-main-faq-item ${
                    activeFaq === index ? "faq-active" : ""
                  }`}
                >

                  <button
                    type="button"
                    className="cockroach-service-main-faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? -1 : index)
                    }
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>

                    <span className="cockroach-service-main-faq-toggle">
                      {activeFaq === index ? "−" : "+"}
                    </span>

                  </button>

                  <div className="cockroach-service-main-faq-answer">
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* BOTTOM CTA */}

          <div className="cockroach-service-main-bottom-cta cockroach-service-main-reveal">

            <div>

              <span>
                KEEP YOUR HOME & BUSINESS PEST-FREE
              </span>

              <h2>
                Need Professional Cockroach Control Service?
              </h2>

              <p>
                Get professional cockroach management assistance
                from Giridhar Pest Control. Contact our team today
                for customized pest control solutions.
              </p>

            </div>

            <a
              href="tel:+919876543210"
              className="cockroach-service-main-cta-button"
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

export default CockroachmanagementserviceMain;
