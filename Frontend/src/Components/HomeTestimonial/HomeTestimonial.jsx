import React, { useState, useEffect, useRef } from "react";
import "./HomeTestimonial.css";
import testImg from "../../assets/testi1-1.jpg";
import logoImg from "../../assets/TeamMember-1.jpg";

const reviews = [
  {
    id: 1,
    text: "Our commercial property required urgent pest control, and this team responded immediately. They worked efficiently without disrupting our daily operations and ensured that every issue was handled thoroughly. What impressed us most was their preventive approach: they didn’t just fix the problem but helped us avoid future infestations as well. Truly reliable service.",
    name: "Robert J. Hare",
    role: "Customer",
  },
  {
    id: 2,
    text: "From the first inspection to the final treatment, the team was professional, punctual and respectful of our home. The pests were gone within days, and the follow-up visit gave us complete peace of mind. Highly recommended for any family.",
    name: "Sarah M. Collins",
    role: "Homeowner",
  },
  {
    id: 3,
    text: "We run a busy restaurant and cannot afford any pest issues. Their safe, eco-friendly treatments and regular monitoring keep our kitchen spotless and compliant. Excellent communication and outstanding results every time.",
    name: "David K. Miller",
    role: "Restaurant Owner",
  },
];

const TITLE = "What our clients love about our professional insect?";

const HomeTestimonial = () => {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  /* ---------- auto slide ---------- */
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  /* ---------- trigger animations when visible ---------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleDot = (index) => {
    setActive(index);
    startTimer();
  };

  /* ---------- letter by letter heading ---------- */
  const renderTitle = () => {
    let letterIndex = 0;
    return TITLE.split(" ").map((word, wIdx) => (
      <span className="HomeTestimonial-word" key={wIdx} aria-hidden="true">
        {word.split("").map((char, cIdx) => {
          const i = letterIndex++;
          return (
            <span
              className="HomeTestimonial-letter"
              key={cIdx}
              style={{ "--i": i }}
            >
              {char}
            </span>
          );
        })}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className={`HomeTestimonial ${inView ? "HomeTestimonial--visible" : ""}`}
    >
      <div className="HomeTestimonial-container">
        {/* LEFT */}
        <div className="HomeTestimonial-left">
          <div className="HomeTestimonial-imageWrap">
            <img
              src={testImg}
              alt="Professional pest control expert"
              className="HomeTestimonial-image"
            />
            <div className="HomeTestimonial-trust">
              <span className="HomeTestimonial-trustStar">★</span>
              <span className="HomeTestimonial-trustText">Trustpilot</span>
            </div>
          </div>

          <div className="HomeTestimonial-clientCard">
            <p className="HomeTestimonial-clientText">
              5m+ Trusted Global Clients
            </p>
            <span className="HomeTestimonial-clientLine"></span>
            <div className="HomeTestimonial-avatars">
              {[1, 2, 3].map((n) => (
                <img
                  key={n}
                  src={logoImg}
                  alt={`Client ${n}`}
                  className="HomeTestimonial-avatar"
                />
              ))}
              <span className="HomeTestimonial-avatarPlus">+</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="HomeTestimonial-right">
          <span className="HomeTestimonial-tag">
            <i className="HomeTestimonial-tagDot"></i>Testimonial
          </span>

          <h2 className="HomeTestimonial-title" aria-label={TITLE}>
            {renderTitle()}
          </h2>

          <div className="HomeTestimonial-divider"></div>

          <div className="HomeTestimonial-viewport">
            <div
              className="HomeTestimonial-track"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {reviews.map((r, idx) => (
                <div
                  className={`HomeTestimonial-slide ${
                    idx === active ? "HomeTestimonial-slide--active" : ""
                  }`}
                  key={r.id}
                >
                  <div className="HomeTestimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="HomeTestimonial-star"
                        style={{ "--s": i }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="HomeTestimonial-review">“{r.text}”</p>

                  <div className="HomeTestimonial-author">
                    <div className="HomeTestimonial-authorInfo">
                      <h4 className="HomeTestimonial-name">{r.name} /</h4>
                      <span className="HomeTestimonial-role">{r.role}</span>
                    </div>
                    <span className="HomeTestimonial-quote">“</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="HomeTestimonial-dots">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                type="button"
                aria-label={`Show review ${i + 1}`}
                className={`HomeTestimonial-dot ${
                  i === active ? "HomeTestimonial-dot--active" : ""
                }`}
                onClick={() => handleDot(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonial;