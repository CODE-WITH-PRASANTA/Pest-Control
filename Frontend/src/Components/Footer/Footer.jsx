import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/main-logo.png';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed successfully with: ${email}`);
      setEmail('');
    }
  };

  const aboutLinks = [
    { name: 'About', path: '/about' },
    { name: 'Our Mission', path: '/mission' },
    { name: 'Our Blogs', path: '/blogs' },
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Termite Control', path: '/services/termite' },
    { name: 'Bed Bug Treatment', path: '/services/bed-bug' },
    { name: 'Mosquito Control', path: '/services/mosquito' },
    { name: 'Cockroach Removal', path: '/services/cockroach' },
    { name: 'Ant & Insect Control', path: '/services/ant-insect' },
  ];

  return (
    <footer className="footer-section">
      {/* Decorative Botanical Elements & Background Accents */}
      <div className="footer-leaf footer-leaf-top-left" aria-hidden="true"></div>
      <div className="footer-leaf footer-leaf-bottom-left" aria-hidden="true"></div>
      <div className="footer-watermark-insect" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <ellipse cx="100" cy="100" rx="16" ry="32" strokeWidth="2.5" />
          <circle cx="100" cy="62" r="12" strokeWidth="2.5" />
          <path d="M94 52 Q82 32 68 28M106 52 Q118 32 132 28" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M84 95 C40 80 15 105 30 135 C42 160 86 120 86 120" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M116 95 C160 80 185 105 170 135 C158 160 114 120 114 120" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M86 85 C55 60 40 85 55 105 C70 120 88 100 88 100" strokeWidth="2" />
          <path d="M114 85 C145 60 160 85 145 105 C130 120 112 100 112 100" strokeWidth="2" />
          <line x1="88" y1="108" x2="112" y2="108" strokeWidth="2" />
          <line x1="86" y1="118" x2="114" y2="118" strokeWidth="2" />
          <line x1="90" y1="128" x2="110" y2="128" strokeWidth="2" />
        </svg>
      </div>

      <div className="footer-container">
        {/* Top 4-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & CTA */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand">
              <div className="footer-brand-logo-wrapper">
                <img
                  src={mainLogo}
                  alt="Insectra Logo"
                  className="footer-brand-logo"
                />
              </div>
              <span className="footer-brand-title">Insectra</span>
            </Link>

            <p className="footer-brand-desc">
              Insectra services are dedicated to delivering high-quality, personalized
              care with compassion and eco-friendly methods.
            </p>

            <Link to="/contact" className="footer-btn-appointment">
              <span>Get Appointment</span>
              <span className="footer-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Column 2: About Company */}
          <div className="footer-col">
            <h3 className="footer-heading">About Company</h3>
            <ul className="footer-links-list">
              {aboutLinks.map((item) => (
                <li key={item.name} className="footer-link-item">
                  <Link to={item.path} className="footer-link">
                    <span className="footer-arrow">→</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links-list">
              {serviceLinks.map((item) => (
                <li key={item.name} className="footer-link-item">
                  <Link to={item.path} className="footer-link">
                    <span className="footer-arrow">→</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Address & Contact Details */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-heading">Address</h3>
            <div className="footer-info-row footer-info-address">
              <span className="footer-info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
              </span>
              <p className="footer-address-text">
                1901 Thornridge Cir. Shiloh <br /> Hawaii 81063
              </p>
            </div>

            <div className="footer-address-divider"></div>

            <div className="footer-info-block">
              <span className="footer-subheading">Phone</span>
              <a href="tel:+8801750050088" className="footer-info-link">
                <span className="footer-info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.2 2.52.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
                  </svg>
                </span>
                <span>+8801750050088</span>
              </a>

              <a href="mailto:demo@example.com" className="footer-info-link">
                <span className="footer-info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <span>demo@example.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Banner: Socials + Newsletter Subscription */}
        <div className="footer-newsletter-box">
          <div className="footer-social-section">
            <span className="footer-social-label">Follow Us On:</span>
            <div className="footer-social-icons">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42a2.5 2.5 0 00-1.76 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 001.76-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 100-3.28 1.64 1.64 0 000 3.28m1.4 9.74V10.13H5.06v8.37h2.8z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-newsletter-divider"></div>

          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <div className="footer-newsletter-title-wrap">
              <span className="footer-newsletter-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </span>
              <span className="footer-newsletter-title">Subscribe to Our Newsletter</span>
            </div>

            <div className="footer-input-group">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-subscribe-btn" aria-label="Send">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Copyright with PR WEBSTOCK Link & Legal Links */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © Copyright 2026 by{' '}
            <a
              href="https://prwebstock.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-copyright-link"
            >
              PR WEBSTOCK
            </a>
            . All Rights Reserved.
          </p>
          <div className="footer-legal-links">
            <Link to="/terms" className="footer-legal-link">Terms & Condition</Link>
            <span className="footer-legal-sep">|</span>
            <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-legal-sep">|</span>
            <Link to="/contact" className="footer-legal-link">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;