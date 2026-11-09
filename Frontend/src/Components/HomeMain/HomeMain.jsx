import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlus, FaShieldAlt, FaCheck } from "react-icons/fa";

import "./HomeMain.css";
import homeImage from "../../assets/homemain.png";

const FEATURES = ["Expert Technicians", "Safe Solutions", "Trusted Service"];
const STAT_TARGET = 4; // shows as 4K+

const HomeMain = () => {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  // Premium running counter: 0.0K -> 4K
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(STAT_TARGET);
      setDone(true);
      return;
    }

    const duration = 2800;
    const delay = 1000;
    let raf;
    let start;

    const timer = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
        setValue(eased * STAT_TARGET);
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const display = done ? String(STAT_TARGET) : Math.min(value, STAT_TARGET - 0.1).toFixed(1);

  return (
    <section className="homemain-section">
      {/* Background */}
      <div
        className="homemain-bg"
        style={{ backgroundImage: `url(${homeImage})` }}
        aria-hidden="true"
      />
      <div className="homemain-overlay" aria-hidden="true" />
      <div className="homemain-glow homemain-glow-one" aria-hidden="true" />
      <div className="homemain-glow homemain-glow-two" aria-hidden="true" />
      <div className="homemain-decoration homemain-decoration-one" aria-hidden="true" />
      <div className="homemain-decoration homemain-decoration-two" aria-hidden="true" />

      <div className="homemain-container">
        {/* Left Content */}
        <div className="homemain-content">
          <div className="homemain-tag">
            <span className="homemain-tag-icon">
              <FaShieldAlt />
            </span>
            <span>Professional Pest Control Services</span>
            <span className="homemain-tag-dot" />
          </div>

          <h1 className="homemain-title" aria-label="Insect Control">
            <span className="homemain-line" aria-hidden="true">
              <span className="homemain-line-inner homemain-line-first">INSECT</span>
            </span>
            <span className="homemain-line homemain-line-second" aria-hidden="true">
              <span className="homemain-line-inner homemain-gradient">CONTROL</span>
              <span className="homemain-title-mark">▼</span>
            </span>
          </h1>

          <p className="homemain-description">
            Our trained technicians conduct thorough inspections to identify
            problem areas, entry points and breeding sites before applying safe
            and effective pest control solutions.
          </p>

          <ul className="homemain-features">
            {FEATURES.map((item, i) => (
              <li className="homemain-feature" style={{ "--i": i }} key={item}>
                <span className="homemain-feature-icon">
                  <FaCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="homemain-right-content">
          <div className="homemain-stat-card">
            <div
              className={`homemain-stat-number ${done ? "homemain-stat-done" : ""}`}
              aria-label="4K plus happy clients"
            >
              <span className="homemain-stat-value">{display}</span>
              <span className="homemain-stat-k">K</span>
              <span className="homemain-stat-plus">+</span>
            </div>

            <div className="homemain-client-info">
              <div className="homemain-avatars">
                <div className="homemain-avatar homemain-avatar-one">AK</div>
                <div className="homemain-avatar homemain-avatar-two">JD</div>
                <div className="homemain-avatar homemain-avatar-three">
                  <FaPlus />
                </div>
              </div>

              <p>
                Happy clients love our <strong>Biggest Pest Control</strong>{" "}
                services.
              </p>
            </div>

            <Link to="/contact" className="homemain-button">
              <span className="homemain-button-text">Book Services Now</span>
              <span className="homemain-button-icon">
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="homemain-scroll">
          <span className="homemain-scroll-circle" />
          <p>Scroll to explore</p>
        </div>

        {/* Bottom Label */}
        <div className="homemain-bottom-label">
          <span className="homemain-bottom-brand">INSECTRA</span>
          <span className="homemain-bottom-line" />
          <span>Your trusted pest control partner</span>
        </div>
      </div>
    </section>
  );
};

export default HomeMain;