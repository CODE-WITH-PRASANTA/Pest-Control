import React, { useEffect, useRef, useState } from "react";
import "./TeamDetailsThird.css";

const HEADING_LINES = ["Feel Free to Write Our", "Technology Experts"];
const MAX_MESSAGE = 500;

const initialForm = {
  name: "",
  email: "",
  subject: "",
  phone: "",
  message: "",
};

const Icons = {
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
  <svg className="team-details-third__button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const TeamDetailsThird = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    // Replace this timeout with your real API call
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
  };

  const handleReset = () => setFormData(initialForm);

  const handleSendAnother = () => {
    setSubmitted(false);
    handleReset();
  };

  let letterIndex = 0;

  const renderField = (name, type, label, extra = {}) => (
    <div className="team-details-third__field">
      <span className="team-details-third__field-icon">{Icons[name]}</span>
      <input
        id={`team-details-third-${name}`}
        type={type}
        name={name}
        placeholder=" "
        value={formData[name]}
        onChange={handleChange}
        required
        {...extra}
      />
      <label htmlFor={`team-details-third-${name}`}>{label}</label>
      <span className="team-details-third__field-line" />
    </div>
  );

  return (
    <section
      className={`team-details-third ${inView ? "team-details-third--active" : ""}`}
      ref={sectionRef}
    >
      <div className="team-details-third__blob team-details-third__blob--one" />
      <div className="team-details-third__blob team-details-third__blob--two" />
      <div className="team-details-third__dots" />

      <div className="team-details-third__container">
        {!submitted ? (
          <div className="team-details-third__content">
            <div className="team-details-third__heading">
              <span className="team-details-third__tag">
                <i className="team-details-third__tag-dot" />
                Get In Touch
              </span>

              <h2 aria-label={HEADING_LINES.join(" ")}>
                {HEADING_LINES.map((line, li) => (
                  <span className="team-details-third__line" key={li}>
                    {line.split(" ").map((word, wi) => (
                      <span className="team-details-third__word" key={wi}>
                        {word.split("").map((ch) => {
                          const delay = letterIndex++ * 0.04;
                          return (
                            <span
                              className="team-details-third__letter"
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
                  </span>
                ))}
              </h2>
            </div>

            <form className="team-details-third__form" onSubmit={handleSubmit}>
              <div className="team-details-third__grid">
                {renderField("name", "text", "Enter Name", { autoComplete: "name" })}
                {renderField("email", "email", "Enter Email", { autoComplete: "email" })}
                {renderField("subject", "text", "Enter Subject")}
                {renderField("phone", "tel", "Enter Phone", {
                  autoComplete: "tel",
                  pattern: "[0-9+\\-\\s()]{7,20}",
                  title: "Please enter a valid phone number",
                })}

                <div className="team-details-third__field team-details-third__field--message">
                  <span className="team-details-third__field-icon">{Icons.message}</span>
                  <textarea
                    id="team-details-third-message"
                    name="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="team-details-third-message">Enter Message</label>
                  <span className="team-details-third__field-line" />
                  <span className="team-details-third__counter">
                    {formData.message.length}/{MAX_MESSAGE}
                  </span>
                </div>
              </div>

              <div className="team-details-third__actions">
                <button
                  type="submit"
                  disabled={sending}
                  className={`team-details-third__button team-details-third__button--send ${
                    sending ? "team-details-third__button--loading" : ""
                  }`}
                >
                  {sending ? (
                    <>
                      <i className="team-details-third__spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowIcon />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="team-details-third__button team-details-third__button--reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="team-details-third__success">
            <div className="team-details-third__success-icon">
              <span className="team-details-third__success-pulse" />
              <svg viewBox="0 0 52 52">
                <circle className="team-details-third__success-circle" cx="26" cy="26" r="24" fill="none" />
                <path className="team-details-third__success-check" fill="none" d="M14 27 L22 35 L39 17" />
              </svg>
            </div>

            <span className="team-details-third__success-label">MESSAGE RECEIVED</span>

            <h2>
              Thank You for
              <span>Reaching Out!</span>
            </h2>

            <p>
              Your message has been successfully received. We appreciate your
              interest and look forward to connecting with you.
            </p>

            <button
              type="button"
              onClick={handleSendAnother}
              className="team-details-third__button team-details-third__button--send"
            >
              <span>Send Another Message</span>
              <ArrowIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamDetailsThird;