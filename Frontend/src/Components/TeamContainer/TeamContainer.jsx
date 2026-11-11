import React, { useEffect, useRef, useState } from "react";
import Card1 from "../../assets/team1-1.jpg";
import Card2 from "../../assets/team1-2.jpg";
import Card3 from "../../assets/team1-3.jpg";
import Card4 from "../../assets/team1-4.jpg";
import Card5 from "../../assets/TeamMember-1.jpg";
import Card6 from "../../assets/TeamMember-2.jpg";
import "./TeamContainer.css";

const teamMembers = [
  { id: 1, name: "Michael Turner", role: "Pest Trainer", image: Card1 },
  { id: 2, name: "Shakti Prasad", role: "Pest Control Officer", image: Card2 },
  { id: 3, name: "Cody Fisher", role: "Pest Trainer", image: Card3 },
  { id: 4, name: "Sadie Sink", role: "Pest Control Officer", image: Card4 },
  { id: 5, name: "Marry Buttler", role: "Pest Trainer", image: Card5 },
  { id: 6, name: "Jessica Brown", role: "Pest Control Officer", image: Card6 },
];

const TeamContainerSocialIcon = ({ type, name }) => {
  const icons = {
    facebook: (
      <path
        d="M13.6 21v-7.9h2.7l.4-3.1h-3.1V8.1c0-.9.3-1.5 1.600-1.500h1.700V3.800c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.400-4 4.100V10H7.700v3.100h2.800V21h3.100Z"
        fill="currentColor"
      />
    ),
    twitter: (
      <path
        d="M17.8 3.500h3l-6.500 7.500 7.700 10h-6l-4.700-6.100-5.400 6.100h-3l7-8L2.500 3.500h6.200l4.200 5.600 4.900-5.600Zm-1 16.100h1.700L7.300 5.200H5.500l11.300 14.400Z"
        fill="currentColor"
      />
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.500" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="3.600" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="17.200" cy="6.800" r="1.100" fill="currentColor" />
      </>
    ),
  };

  return (
    <a
      href="#team-container"
      className="team-container-social-link"
      aria-label={`${name} on ${type}`}
      onClick={(e) => e.preventDefault()}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {icons[type]}
      </svg>
    </a>
  );
};

const TeamContainer = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={`team-container-section ${inView ? "team-container-active" : ""}`}
      id="team-container"
      ref={sectionRef}
    >
      <div className="team-container-glow team-container-glow-one" />
      <div className="team-container-glow team-container-glow-two" />

      <div className="team-container-wrapper">
        <div className="team-container-grid">
          {teamMembers.map((member, index) => (
            <article
              className="team-container-card"
              key={member.id}
              style={{ "--card-index": index }}
              tabIndex={0}
            >
              <img
                src={member.image}
                alt={member.name}
                className="team-container-image"
                loading="lazy"
              />
              <div className="team-container-shade" />
              <span className="team-container-shine" />

              <div className="team-container-overlay">
                <div className="team-container-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>

                <div className="team-container-socials-wrap">
                  <div className="team-container-socials-inner">
                    <div className="team-container-socials">
                      <TeamContainerSocialIcon type="facebook" name={member.name} />
                      <TeamContainerSocialIcon type="twitter" name={member.name} />
                      <TeamContainerSocialIcon type="instagram" name={member.name} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamContainer;