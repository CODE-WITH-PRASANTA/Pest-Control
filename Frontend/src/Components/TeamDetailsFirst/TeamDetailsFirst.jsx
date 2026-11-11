import React from "react";
import DetailCard from '../../assets/team-details.jpg'
import "./TeamDetailsFirst.css";

const TeamDetailsFirst = () => {
  const member = {
    name: "Rajesh Kumar",
    role: "Senior Pest Control Specialist",
    description:
      "I help my clients enjoy healthier, safer spaces by keeping unwanted pests away with smart and reliable pest control solutions.",
    email: "contact@insectra.com",
    phone: "+91 98765 43210",
    website: "www.insectra.com",
    image:
      DetailCard,
  };

  const socials = [
    {
      name: "Twitter",
      url: "https://twitter.com/",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M22 5.92a8.2 8.2 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.22 8.22 0 0 1-2.6.99 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.4 4.75a4.1 4.1 0 0 0 1.27 5.48 4.08 4.08 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.61 11.61 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.68l-.01-.53A8.34 8.34 0 0 0 22 5.92Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com/",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M13.5 21v-8.2h2.76l.41-3.2H13.5V7.56c0-.93.26-1.56 1.6-1.56h1.7V3.14c-.3-.04-1.32-.14-2.5-.14-2.48 0-4.18 1.51-4.18 4.29V9.6H7.3v3.2h2.82V21h3.38Z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      url: "https://pinterest.com/",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-3.64 19.32c-.09-.83-.17-2.1.03-3.01l1.28-5.43s-.33-.66-.33-1.64c0-1.53.89-2.67 1.99-2.67.94 0 1.4.7 1.4 1.55 0 .95-.6 2.38-.91 3.7-.26 1.1.55 2 1.64 2 1.97 0 3.49-2.08 3.49-5.08 0-2.66-1.91-4.52-4.64-4.52-3.16 0-5.01 2.37-5.01 4.81 0 .95.37 1.98.83 2.54.09.11.1.21.08.33l-.31 1.27c-.05.2-.16.25-.36.15-1.38-.64-2.24-2.65-2.24-4.27 0-3.48 2.53-6.68 7.29-6.68 3.83 0 6.81 2.73 6.81 6.38 0 3.81-2.4 6.88-5.74 6.88-1.12 0-2.18-.58-2.54-1.27l-.69 2.64c-.25.96-.93 2.16-1.38 2.9A10 10 0 1 0 12 2Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com/",
      icon: (
        <svg viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.5" cy="6.8" r="1.2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="insectra-team-details">
      <div className="insectra-team-details__container">

        {/* LEFT IMAGE */}
        <div className="insectra-team-details__visual">
          <div className="insectra-team-details__image-box">
            <img
              src={member.image}
              alt="Insectra pest control professional"
              className="insectra-team-details__image"
            />

            <div className="insectra-team-details__image-shade" />

            <div className="insectra-team-details__image-label">
              <span className="insectra-team-details__status-dot" />
              Professional Pest Care
            </div>
          </div>

          <div className="insectra-team-details__visual-decoration" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="insectra-team-details__content">

          <div className="insectra-team-details__intro">
            <span className="insectra-team-details__eyebrow">
              MEET OUR EXPERT
            </span>

            <h1>{member.name}</h1>

            <p className="insectra-team-details__role">
              {member.role}
            </p>

            <div className="insectra-team-details__accent-line">
              <span />
            </div>
          </div>

          <p className="insectra-team-details__description">
            {member.description}
          </p>

          {/* CONTACT DETAILS */}
          <div className="insectra-team-details__contact">

            <div className="insectra-team-details__contact-item">
              <h3>Email Address</h3>
              <a href={`mailto:${member.email}`}>
                {member.email}
              </a>
            </div>

            <div className="insectra-team-details__contact-item">
              <h3>Phone Number</h3>
              <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
                {member.phone}
              </a>
            </div>

            <div className="insectra-team-details__contact-item">
              <h3>Web Address</h3>
              <a
                href={`https://${member.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {member.website}
              </a>
            </div>

          </div>

          {/* SOCIAL LINKS */}
          <div className="insectra-team-details__socials">
            {socials.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="insectra-team-details__social-link"
                style={{ "--social-index": index }}
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>
      </div>

      <div className="insectra-team-details__bottom-line" />
    </section>
  );
};

export default TeamDetailsFirst;