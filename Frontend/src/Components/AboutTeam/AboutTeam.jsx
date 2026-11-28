import React, { useEffect, useRef, useState } from "react";
import { API_BASE_URL, BACKEND_BASE_URL } from "../../config/api";
import "./AboutTeam.css";

const resolveAvatarUrl = (avatar) => {
  if (!avatar) return "";
  if (avatar.startsWith("http://") || avatar.startsWith("https://") || avatar.startsWith("data:")) {
    return avatar;
  }
  return `${BACKEND_BASE_URL}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

const HEADING_LINES = ["The team guiding your", "parenthood journey"];

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1a4.1 4.1 0 0 0 3.8 2.8A8.3 8.3 0 0 1 2 18.3 11.6 11.6 0 0 0 8.3 20c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const AboutTeam = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/teams`);
        const result = await res.json();
        if (!ignore && res.ok && result.success) {
          setTeam((result.data || []).slice(0, 4));
        }
      } catch {
        // Keep empty if backend is unreachable
      }
    };
    fetchTeam();
    return () => {
      ignore = true;
    };
  }, []);

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

  let letterIndex = 0;

  return (
    <section className={`AboutTeam ${inView ? "AboutTeam--active" : ""}`} ref={sectionRef}>
      <div className="AboutTeam__glow AboutTeam__glow--one" />
      <div className="AboutTeam__glow AboutTeam__glow--two" />

      <div className="AboutTeam__container">
        <div className="AboutTeam__head">
          <span className="AboutTeam__tag">
            <i className="AboutTeam__tagDot" />
            Team
          </span>

          <h2 className="AboutTeam__title" aria-label={HEADING_LINES.join(" ")}>
            {HEADING_LINES.map((line, li) => (
              <span className="AboutTeam__line" key={li}>
                {line.split(" ").map((word, wi) => (
                  <span className="AboutTeam__word" key={wi}>
                    {word.split("").map((ch) => {
                      const delay = letterIndex++ * 0.045;
                      return (
                        <span
                          className="AboutTeam__letter"
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

        <div className="AboutTeam__grid">
          {team.map((m, i) => {
            const avatarSrc = resolveAvatarUrl(m.avatar);
            return (
              <article
                className="AboutTeam__card"
                style={{ transitionDelay: `${0.8 + i * 0.15}s` }}
                key={m._id || m.id}
                tabIndex={0}
              >
                {avatarSrc ? (
                  <img className="AboutTeam__image" src={avatarSrc} alt={m.name} loading="lazy" />
                ) : (
                  <div
                    className="AboutTeam__image"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #0f5132, #2fb344)",
                      color: "#ffffff",
                      fontSize: "44px",
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(m.name)}
                  </div>
                )}
                <div className="AboutTeam__shade" />

                <div className="AboutTeam__info">
                  <h3 className="AboutTeam__name">{m.name}</h3>
                  <p className="AboutTeam__role">{m.role}</p>

                  <div className="AboutTeam__socials">
                    <div className="AboutTeam__socialsInner">
                      <div className="AboutTeam__socialsRow">
                        <a className="AboutTeam__social" href="#team" onClick={(e) => e.preventDefault()} aria-label={`${m.name} on Facebook`}>
                          <FacebookIcon />
                        </a>
                        <a className="AboutTeam__social" href="#team" onClick={(e) => e.preventDefault()} aria-label={`${m.name} on Twitter`}>
                          <TwitterIcon />
                        </a>
                        <a className="AboutTeam__social" href="#team" onClick={(e) => e.preventDefault()} aria-label={`${m.name} on Instagram`}>
                          <InstagramIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;