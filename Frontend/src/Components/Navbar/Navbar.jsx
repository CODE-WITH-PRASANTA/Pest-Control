import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../../assets/main-logo.png'; // Adjust path based on your folder structure
import './Navbar.css';

const PHONE_DISPLAY = '+91 7205303566';
const PHONE_HREF = 'tel:+917205303566';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' },
];

const PhoneIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.2 2.52.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
  </svg>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Add a compact style once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu} aria-label="Giridurga Pest Controls - Home">
          <img
            src={logoImg}
            alt="Giridurga Pest Controls Logo"
            className="navbar-brand-logo"
          />
        </Link>

        {/* Navigation Links */}
        <nav
          className={`navbar-nav ${mobileMenuOpen ? 'navbar-nav-active' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="navbar-menu">
            {navLinks.map((link) => (
              <li key={link.name} className="navbar-item">
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                  }
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile-only contact action */}
          <div className="navbar-mobile-contact">
            <a href={PHONE_HREF} className="navbar-contact-link">
              <div className="navbar-contact-icon">
                <PhoneIcon size={18} />
              </div>
              <div className="navbar-contact-info">
                <span className="navbar-contact-label">Call anytime</span>
                <span className="navbar-contact-number">{PHONE_DISPLAY}</span>
              </div>
            </a>
          </div>
        </nav>

        {/* Right side: Call action (desktop) */}
        <div className="navbar-action">
          <a href={PHONE_HREF} className="navbar-contact-link">
            <div className="navbar-contact-icon">
              <PhoneIcon size={20} />
            </div>
            <div className="navbar-contact-info">
              <span className="navbar-contact-label">Call anytime</span>
              <span className="navbar-contact-number">{PHONE_DISPLAY}</span>
            </div>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="navbar-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`navbar-toggle-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`navbar-toggle-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`navbar-toggle-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;