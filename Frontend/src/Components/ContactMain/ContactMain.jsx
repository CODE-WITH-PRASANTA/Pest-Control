import React, { useEffect, useRef, useState } from "react";
import "./ContactMain.css";

const HEADING_TEXT = "Feel free to write";
const MAX_MESSAGE = 500;

const initialForm = {
  name: "",
  email: "",
  subject: "",
  phone: "",
  message: "",
};

const FieldIcons = {
  name: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  subject: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      <path d="M8.5 11h7M8.5 14h4" />
    </svg>
  ),
};

const ArrowIcon = () => (
  <svg className="contact-main-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const ContactMain = () => {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = root.querySelectorAll(".contact-main-reveal");

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));

    const heroIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          heroIo.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const section = root.querySelector(".contact-main-section");
    if (section) heroIo.observe(section);

    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    // Replace this timeout with your real API call
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData(initialForm);
    }, 900);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setSubmitted(false);
  };

  const renderField = (name, type, label, extra = {}) => (
    <div className="contact-main-field">
      <span className="contact-main-field-icon">{FieldIcons[name]}</span>
      <input
        id={`contact-main-${name}`}
        type={type}
        name={name}
        placeholder=" "
        value={formData[name]}
        onChange={handleChange}
        required
        {...extra}
      />
      <label htmlFor={`contact-main-${name}`}>{label}</label>
      <span className="contact-main-field-line" />
    </div>
  );

  let letterIndex = 0;

  return (
    <main
      className={`contact-main ${inView ? "contact-main-active" : ""}`}
      ref={rootRef}
    >
      {/* Contact Main Section */}
      <section className="contact-main-section">
        <div className="contact-main-glow contact-main-glow-one" />
        <div className="contact-main-glow contact-main-glow-two" />

        <div className="contact-main-wrapper">
          {/* LEFT SIDE - CONTACT FORM */}
          <div className="contact-main-form-area">
            <div className="contact-main-section-heading">
              <span className="contact-main-subtitle">
                <i className="contact-main-subtitle-dot" />
                GET IN TOUCH
              </span>

              <h1 aria-label={HEADING_TEXT}>
                {HEADING_TEXT.split(" ").map((word, wi) => (
                  <span className="contact-main-word" key={wi}>
                    {word.split("").map((ch) => {
                      const delay = letterIndex++ * 0.05;
                      return (
                        <span
                          className="contact-main-letter"
                          style={{ animationDelay: `${delay}s` }}
                          key={letterIndex}
                          aria-hidden="true"
                        >
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h1>
            </div>

            <form className="contact-main-form" onSubmit={handleSubmit}>
              <div className="contact-main-input-grid">
                {renderField("name", "text", "Enter Name", { autoComplete: "name" })}
                {renderField("email", "email", "Enter Email", { autoComplete: "email" })}
                {renderField("subject", "text", "Enter Subject")}
                {renderField("phone", "tel", "Enter Phone", {
                  autoComplete: "tel",
                  pattern: "[0-9+\\-\\s()]{7,20}",
                  title: "Please enter a valid phone number",
                })}
              </div>

              <div className="contact-main-field contact-main-message-field">
                <span className="contact-main-field-icon">{FieldIcons.message}</span>
                <textarea
                  id="contact-main-message"
                  name="message"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label htmlFor="contact-main-message">Enter Message</label>
                <span className="contact-main-field-line" />
                <span className="contact-main-counter">
                  {formData.message.length}/{MAX_MESSAGE}
                </span>
              </div>

              <div className="contact-main-form-actions">
                <button
                  type="submit"
                  className="contact-main-submit-btn"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <i className="contact-main-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowIcon />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="contact-main-reset-btn"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <div
                  className="contact-main-success-message"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-main-success-icon">✓</div>

                  <div>
                    <h4>Message submitted successfully!</h4>
                    <p>Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT SIDE - CONTACT INFORMATION */}
          <div className="contact-main-details-area contact-main-reveal">
            <div className="contact-main-details-heading">
              <span className="contact-main-subtitle">
                <i className="contact-main-subtitle-dot" />
                WE ARE HERE TO HELP
              </span>

              <h2>Get in touch with us</h2>

              <p>
                Lorem ipsum is simply free text available dolor sit amet
                consectetur notted adipisicing elit sed do eiusmod tempor
                incididunt simply dolore magna.
              </p>
            </div>

            {/* Phone Information */}
            <a className="contact-main-detail-item" href="tel:+9280209850">
              <div className="contact-main-detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.08 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.36 1.84.6 2.8.72a2 2 0 0 1 1.74 2.01z" />
                </svg>
              </div>

              <div className="contact-main-detail-text">
                <h4>Have any question?</h4>
                <span>Free +92 (020)-9850</span>
              </div>

              <span className="contact-main-detail-go">
                <ArrowIcon />
              </span>
            </a>

            {/* Email Information */}
            <a className="contact-main-detail-item" href="mailto:needhelp@company.com">
              <div className="contact-main-detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 7L2 7" />
                </svg>
              </div>

              <div className="contact-main-detail-text">
                <h4>Write email</h4>
                <span>needhelp@company.com</span>
              </div>

              <span className="contact-main-detail-go">
                <ArrowIcon />
              </span>
            </a>

            {/* Address Information */}
            <a
              className="contact-main-detail-item"
              href="https://www.google.com/maps/search/?api=1&query=66+Brooklyn+Golden+Street+New+York"
              target="_blank"
              rel="noreferrer"
            >
              <div className="contact-main-detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <div className="contact-main-detail-text">
                <h4>Visit anytime</h4>
                <span>66 brooklyn golden street, New York</span>
              </div>

              <span className="contact-main-detail-go">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* GOOGLE MAP SECTION */}
      <section className="contact-main-map-section">
        <div className="contact-main-map-heading contact-main-reveal">
          <span className="contact-main-subtitle">
            <i className="contact-main-subtitle-dot" />
            FIND OUR LOCATION
          </span>

          <h2>Visit Us Anytime</h2>
        </div>

        <div className="contact-main-map-container contact-main-reveal">
          <iframe
            title="Insectra Location Map"
            src="https://maps.google.com/maps?q=66%20Brooklyn%20Golden%20Street%2C%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="contact-main-map-card">
            <span className="contact-main-map-pin">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div>
              <h4>Insectra Pest Control</h4>
              <p>66 brooklyn golden street, New York</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=66+Brooklyn+Golden+Street+New+York"
              target="_blank"
              rel="noreferrer"
              className="contact-main-map-btn"
            >
              Get Directions
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactMain;