import React, { useState } from "react";
import "./ContactMain.css";

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    });

    setSubmitted(false);
  };

  return (
    <main className="contact-main">

      {/* Contact Main Section */}
      <section className="contact-main-section">

        <div className="contact-main-wrapper">

          {/* LEFT SIDE - CONTACT FORM */}
          <div className="contact-main-form-area">

            <div className="contact-main-section-heading">
              <span className="contact-main-subtitle">
                GET IN TOUCH
              </span>

              <h1>Feel free to write</h1>
            </div>

            <form
              className="contact-main-form"
              onSubmit={handleSubmit}
            >

              <div className="contact-main-input-grid">

                <div className="contact-main-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-main-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-main-field">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-main-field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="contact-main-field contact-main-message-field">
                <textarea
                  name="message"
                  placeholder="Enter Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="contact-main-form-actions">

                <button
                  type="submit"
                  className="contact-main-submit-btn"
                >
                  Send Message
                  <span>→</span>
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
                  <div className="contact-main-success-icon">
                    ✓
                  </div>

                  <div>
                    <h4>Message submitted successfully!</h4>
                    <p>
                      Thank you for contacting us.
                      We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

            </form>

          </div>


          {/* RIGHT SIDE - CONTACT INFORMATION */}
          <div className="contact-main-details-area">

            <div className="contact-main-details-heading">

              <span className="contact-main-subtitle">
                WE ARE HERE TO HELP
              </span>

              <h2>Get in touch with us</h2>

              <p>
                Lorem ipsum is simply free text available dolor
                sit amet consectetur notted adipisicing elit sed
                do eiusmod tempor incididunt simply dolore magna.
              </p>

            </div>


            {/* Phone Information */}
            <div className="contact-main-detail-item">

              <div className="contact-main-detail-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.08 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.36 1.84.6 2.8.72a2 2 0 0 1 1.74 2.01z" />
                </svg>

              </div>

              <div className="contact-main-detail-text">
                <h4>Have any question?</h4>
                <a href="tel:+9280209850">
                  Free +92 (020)-9850
                </a>
              </div>

            </div>


            {/* Email Information */}
            <div className="contact-main-detail-item">

              <div className="contact-main-detail-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 7L2 7" />
                </svg>

              </div>

              <div className="contact-main-detail-text">
                <h4>Write email</h4>
                <a href="mailto:needhelp@company.com">
                  needhelp@company.com
                </a>
              </div>

            </div>


            {/* Address Information */}
            <div className="contact-main-detail-item">

              <div className="contact-main-detail-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

              </div>

              <div className="contact-main-detail-text">
                <h4>Visit anytime</h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=66+Brooklyn+Golden+Street+New+York"
                  target="_blank"
                  rel="noreferrer"
                >
                  66 brooklyn golden street, New York
                </a>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* GOOGLE MAP SECTION */}
      <section className="contact-main-map-section">

        <div className="contact-main-map-heading">
          <span className="contact-main-subtitle">
            FIND OUR LOCATION
          </span>

          <h2>Visit Us Anytime</h2>
        </div>

        <div className="contact-main-map-container">

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

        </div>

      </section>

    </main>
  );
};

export default ContactMain;