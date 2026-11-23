
import { useEffect, useRef, useState } from "react";
import "./LizardserviceMain.css";

// Add your images manually in the assets folder
import service from "../../assets/service-details.jpg";
import serviceone from "../../assets/service-d1.jpg";
import servicetwo from "../../assets/service-d2.jpg";

const services = [
  {
    title: "Lizard Inspection",
    heading: "Professional Lizard Inspection Services",
    image: serviceone,
    description:
      "Our team inspects ceilings, wall cracks, kitchens, electrical boxes and hidden corners to identify lizard entry points and activity.",
  },
  {
    title: "Lizard Control Treatment",
    heading: "Advanced Lizard Control Treatment Solutions",
    image: service,
    description:
      "Effective and targeted lizard management solutions designed to discourage unwanted lizard activity in residential and commercial properties.",
  },
  {
    title: "Entry Point Management",
    heading: "Prevent Lizards from Entering Your Property",
    image: servicetwo,
    description:
      "We identify possible entry points around doors, windows, wall gaps and other openings and recommend suitable preventive measures.",
  },
  {
    title: "Residential & Commercial Control",
    heading: "Lizard Control for Homes and Businesses",
    image: serviceone,
    description:
      "Customized lizard management services for houses, apartments, hotels, restaurants, schools, offices and commercial properties.",
  },
  {
    title: "Preventive Lizard Management",
    heading: "Long-Term Lizard Prevention and Management",
    image: service,
    description:
      "Practical prevention strategies, follow-up guidance and property recommendations to help reduce recurring lizard problems.",
  },
];

const faqs = [
  {
    question: "Why do lizards enter homes and commercial properties?",
    answer:
      "Lizards generally enter buildings in search of insects, warmth and shelter. Open windows, gaps around doors, wall cracks and outdoor lighting that attracts insects can increase their presence.",
  },
  {
    question: "What does your lizard management service include?",
    answer:
      "Our service includes inspecting affected areas, identifying possible entry points and hiding places, applying suitable targeted management solutions and providing prevention guidance.",
  },
  {
    question: "Are your lizard treatments safe for children and pets?",
    answer:
      "Treatment methods are selected according to the property and the affected areas. Our technicians provide the necessary precautions and re-entry instructions. Always follow the product label and technician's safety guidance.",
  },
  {
    question: "How can I prevent lizards from entering my home?",
    answer:
      "Keep doors and windows screened, seal suitable gaps and cracks, reduce insect activity, maintain cleanliness and avoid leaving unnecessary food waste exposed.",
  },
  {
    question: "Do you provide lizard control for hotels and restaurants?",
    answer:
      "Yes. Giridurga Pest Control provides customized lizard management solutions for homes, restaurants, hotels, offices, schools, warehouses and other commercial properties.",
  },
  {
    question: "Which areas do you serve in Odisha?",
    answer:
      "We provide pest management services in Cuttack, Bhubaneswar, Puri and surrounding areas across Odisha. Contact our team to confirm service availability at your location.",
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
                aria-label="Call our support team"
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
                GIRIDURGA PEST CONTROL
              </span>

              <h1>{currentService.heading}</h1>

              <p>{currentService.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="lizard-service-main-overview lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              ABOUT OUR SERVICE
            </span>

            <h2>Lizard Management Services in Odisha</h2>

            <p>
              Lizards often enter homes, offices and commercial spaces in
              search of insects and warmth. While they are generally not
              harmful by nature, their presence can be unpleasant and
              unhygienic, especially in kitchens, bedrooms, restaurants
              and storage areas.
            </p>

            <p>
              At <strong>Giridurga Pest Control</strong>, we offer
              professional lizard management services in Odisha using
              suitable targeted treatment methods and preventive solutions.
              Our team identifies hiding and entry points such as ceilings,
              wall cracks, windows, doors and electrical boxes before
              recommending an appropriate management plan.
            </p>

            <p>
              Our treatments are selected according to the property and
              treatment requirements. We provide clear safety instructions
              and practical recommendations to help reduce unwanted lizard
              activity without unnecessary disruption to your daily routine.
            </p>

            <p>
              Whether you need lizard control for your home, restaurant,
              hotel, school or office, our team provides customized
              solutions with a focus on effective management and
              long-term prevention.
            </p>
          </div>

          {/* BENEFITS */}
          <div className="lizard-service-main-benefits lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              WHY CHOOSE US
            </span>

            <h2>Professional Lizard Control You Can Trust</h2>

            <div className="lizard-service-main-benefit-grid">
              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Odor-Conscious Solutions</h3>
                <p>
                  Suitable treatment options selected according to the
                  property and service requirements.
                </p>
              </div>

              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Entry Point Prevention</h3>
                <p>
                  Identification of gaps, cracks and other possible lizard
                  entry points.
                </p>
              </div>

              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Expert Support</h3>
                <p>
                  Professional guidance and customized management plans
                  for different properties.
                </p>
              </div>

              <div className="lizard-service-main-benefit-card">
                <span>✓</span>
                <h3>Affordable Solutions</h3>
                <p>
                  Practical service recommendations based on your
                  property's specific requirements.
                </p>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE SOLUTIONS */}
          <div className="lizard-service-main-comprehensive lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              OUR LIZARD MANAGEMENT SOLUTIONS
            </span>

            <h2>Complete Lizard Control Solutions</h2>

            <p>
              From residential properties to busy commercial spaces,
              Giridurga Pest Control offers professional lizard management
              solutions designed around your property's needs.
            </p>

            <div className="lizard-service-main-image-grid">
              <div className="lizard-service-main-image-card">
                <div className="lizard-service-main-image-wrap">
                  <img src={serviceone} alt="Lizard inspection service" />
                  <span className="lizard-service-main-image-number">01</span>
                </div>

                <h3>Detailed Property Inspection</h3>

                <p>
                  Inspecting walls, ceilings, kitchens and hidden spaces
                  to identify lizard activity and possible entry points.
                </p>
              </div>

              <div className="lizard-service-main-image-card">
                <div className="lizard-service-main-image-wrap">
                  <img src={servicetwo} alt="Professional lizard control" />
                  <span className="lizard-service-main-image-number">02</span>
                </div>

                <h3>Targeted Lizard Management</h3>

                <p>
                  Suitable treatment and preventive methods to manage
                  unwanted lizard activity in your property.
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
              Looking for the best pest control in Cuttack with genuine
              rates? Giridurga Pest Control provides professional pest
              management and lizard control solutions for residential
              and commercial properties.
            </p>

            <p>
              We serve customers searching for pest control in Bhubaneswar,
              the best pest control services in Bhubaneswar, pest control
              in Puri and pest control near Cuttack, Odisha. Our team also
              provides expert pest and termite control across Cuttack,
              subject to service availability.
            </p>

            <p>
              If you are searching for reliable pest control service
              providers in Cuttack or effective pest control solutions
              in Cuttack, contact Giridurga Pest Control for service
              information, expert support and pricing details.
            </p>

            <div className="lizard-service-main-city-list">
              <span>Cuttack</span>
              <span>Bhubaneswar</span>
              <span>Puri</span>
              <span>Across Odisha</span>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="lizard-service-main-faq lizard-service-main-reveal">
            <span className="lizard-service-main-section-subtitle">
              HAVE QUESTIONS?
            </span>

            <h2>Frequently Asked Questions</h2>

            <p className="lizard-service-main-faq-intro">
              Find answers to common questions about our lizard inspection,
              treatment and prevention services.
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
              <span>KEEP YOUR PROPERTY LIZARD-FREE</span>

              <h2>Need Professional Lizard Control?</h2>

              <p>
                Say goodbye to unwanted lizards in your living or working
                space. Contact Giridurga Pest Control today for expert
                assistance and customized solutions.
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
