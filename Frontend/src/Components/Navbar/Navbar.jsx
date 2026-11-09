import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../../assets/main-logo.png'; // Adjust path based on your folder structure
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PAGES', path: '/pages' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'NEWS', path: '/news' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <img 
            src={logoImg} 
            alt="Insectra Logo" 
            className="navbar-brand-logo" 
          />
          <span className="navbar-brand-name">Insectra</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'navbar-nav-active' : ''}`}>
          <ul className="navbar-menu">
            {navLinks.map((link) => (
              <li key={link.name} className="navbar-item">
                <NavLink
                  to={link.path}
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
            <a href="tel:+8801750050088" className="navbar-contact-link">
              <div className="navbar-contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.2 2.52.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
                </svg>
              </div>
              <div className="navbar-contact-info">
                <span className="navbar-contact-label">Call Anytime</span>
                <span className="navbar-contact-number">+8801750050088</span>
              </div>
            </a>
          </div>
        </nav>

        {/* Right CTA / Call Action (Desktop) */}
        <div className="navbar-action">
          <a href="tel:+8801750050088" className="navbar-contact-link">
            <div className="navbar-contact-icon">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.2 2.52.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
              </svg>
            </div>
            <div className="navbar-contact-info">
              <span className="navbar-contact-label">Call Anytime</span>
              <span className="navbar-contact-number">+8801750050088</span>
            </div>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="navbar-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
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