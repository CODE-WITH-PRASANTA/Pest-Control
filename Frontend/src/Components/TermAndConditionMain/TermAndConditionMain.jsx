
import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  FileText,
  Monitor,
  CalendarDays,
  CreditCard,
  UserRound,
  ShieldCheck,
  Copyright,
  RefreshCw,
  Mail,
  Phone,
  Leaf,
  ArrowUpRight,
} from "lucide-react";

import "./TermAndConditionMain.css";

const termsData = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FileText,
    description:
      "These Terms & Conditions (Terms) govern your use of the Insectra website and services. By using our website, you accept these Terms in full.",
  },
  {
    id: "website",
    title: "Use of Our Website",
    icon: Monitor,
    description:
      "You may use this website for lawful purposes only. You must not misuse the site, attempt unauthorized access, or interfere with its normal operation.",
  },
  {
    id: "services",
    title: "Services & Bookings",
    icon: CalendarDays,
    description:
      "Insectra provides professional pest control and related services. Bookings made through the website are subject to availability, service area, and confirmation by our team.",
  },
  {
    id: "payments",
    title: "Payments & Refunds",
    icon: CreditCard,
    description:
      "Service charges are as per the mentioned pricing at the time of booking. Payments can be made via the available online or offline methods. Refunds (if applicable) will be processed as per our refund policy.",
  },
  {
    id: "responsibilities",
    title: "User Responsibilities",
    icon: UserRound,
    description:
      "You agree to provide accurate and complete information during booking or inquiry. You are responsible for maintaining the confidentiality of your contact details.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: ShieldCheck,
    description:
      "Insectra is not liable for any direct or indirect loss, damage, or inconvenience arising from the use of our website or services, except as required by applicable law.",
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    icon: Copyright,
    description:
      "All content on this website, including text, images, logos, and designs, is the property of Insectra and is protected by applicable copyright and trademark laws.",
  },
  {
    id: "changes",
    title: "Changes to Terms",
    icon: RefreshCw,
    description:
      "We may update or modify these Terms & Conditions at any time without prior notice. Continued use of the website after changes implies your acceptance of the updated terms.",
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    description:
      "If you have any questions about these Terms & Conditions, please contact us at:",
  },
];

const TermAndConditionMain = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent the observer from overriding a clicked navigation item
  // while smooth scrolling is still happening.
  const navigationLock = useRef(false);
  const navigationTimer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (navigationLock.current) return;

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    termsData.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      clearTimeout(navigationTimer.current);
    };
  }, []);

  const handleNavigation = (id) => {
    navigationLock.current = true;
    setActiveSection(id);
    setMenuOpen(false);

    clearTimeout(navigationTimer.current);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Allow the smooth scroll to finish before automatic
    // scroll detection updates the active navigation.
    navigationTimer.current = setTimeout(() => {
      navigationLock.current = false;
      setActiveSection(id);
    }, 1100);
  };

  return (
    <section className="tc-page">
      {/* Background Decorations */}
      <div className="tc-bg-glow tc-glow-one"></div>
      <div className="tc-bg-glow tc-glow-two"></div>
      <div className="tc-decoration-circle"></div>

      <div className="tc-container">
        {/* Mobile Navigation Button */}
        <button
          className="tc-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <Menu size={20} />
          <span>On This Page</span>
        </button>

        {/* Left Sidebar */}
        <aside
          className={`tc-sidebar ${
            menuOpen ? "tc-sidebar-open" : ""
          }`}
        >
          <div className="tc-sidebar-heading">
            <span className="tc-menu-icon">
              <Menu size={19} />
            </span>
            <h3>On This Page</h3>
          </div>

          <div className="tc-sidebar-line"></div>

          <nav className="tc-navigation">
            {termsData.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  className={`tc-nav-item ${
                    activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => handleNavigation(item.id)}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                >
                  <span className="tc-nav-icon">
                    <Icon size={17} strokeWidth={2.1} />
                  </span>

                  <span className="tc-nav-label">
                    {item.title}
                  </span>

                  <ArrowUpRight
                    className="tc-nav-arrow"
                    size={14}
                  />
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom Decoration */}
          <div className="tc-sidebar-bottom">
            <div className="tc-sidebar-wave"></div>

            <div className="tc-plant-decoration">
              <Leaf className="tc-leaf-one" />
              <Leaf className="tc-leaf-two" />
              <Leaf className="tc-leaf-three" />
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <main className="tc-main-content">
          {/* Page Header */}
          <header className="tc-header">
            <div className="tc-eyebrow">
              <span></span>
              LEGAL INFORMATION
              <span></span>
            </div>

            <h1>
              Terms <span>&</span> Conditions
            </h1>

            <p>
              Please read these Terms & Conditions carefully before
              using the Insectra website or our services.
              <br className="tc-desktop-break" />
              By accessing or using our website, you agree to be
              bound by these terms.
            </p>

            <div className="tc-header-line"></div>
          </header>

          {/* Terms Cards */}
          <div className="tc-terms-list">
            {termsData.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  className="tc-card"
                  id={item.id}
                  key={item.id}
                  style={{
                    "--card-index": index,
                  }}
                >
                  <div className="tc-card-icon">
                    <Icon size={23} strokeWidth={2} />
                  </div>

                  <div className="tc-card-content">
                    <h2>
                      <span className="tc-card-number">
                        {index + 1}.
                      </span>
                      {item.title}
                    </h2>

                    <p>{item.description}</p>

                    {item.id === "contact" && (
                      <div className="tc-contact-details">
                        <a
                          href="tel:+917205303566"
                          className="tc-contact-pill"
                        >
                          <Phone size={14} />
                          +91 7205303566
                        </a>

                        <a
                          href="mailto:info@insectra.com"
                          className="tc-contact-pill"
                        >
                          <Mail size={14} />
                          info@insectra.com
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="tc-bottom-note">
            <span className="tc-bottom-leaf">
              <Leaf size={17} />
            </span>

            <p>
              Thank you for choosing <strong>Insectra.</strong>
              We appreciate your trust in our services.
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default TermAndConditionMain;
