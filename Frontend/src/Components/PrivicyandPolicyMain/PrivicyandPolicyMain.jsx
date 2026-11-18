
import React, { useEffect, useState, useRef } from "react";

import {
  List,
  FileText,
  UserRound,
  Share2,
  ShieldCheck,
  Cookie,
  RefreshCw,
  Mail,
  Phone,
  CalendarDays,
  Settings,
  Leaf,
  ArrowUpRight,
} from "lucide-react";

import "./PrivicyandPolicyMain.css";

const policySections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FileText,
    description:
      "This Privacy Policy describes how Insectra ('we', 'our', or 'us') collects, uses and protects your personal information when you use our website or services.",
  },
  {
    id: "information",
    title: "Information We Collect",
    icon: UserRound,
    description:
      "We may collect personal information such as your name, email address, phone number, location, and service request details when you fill out forms, make a booking or contact us.",
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    icon: Settings,
    description:
      "We use the collected information to provide and improve our services, process bookings, respond to inquiries, send service updates and share important notifications.",
  },
  {
    id: "sharing",
    title: "Information Sharing",
    icon: Share2,
    description:
      "We do not sell your personal data. We may share your information only with trusted service providers who assist us in operating our website, managing bookings, or delivering our services, under strict confidentiality.",
  },
  {
    id: "security",
    title: "Data Security",
    icon: ShieldCheck,
    description:
      "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure or misuse.",
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: UserRound,
    description:
      "You have the right to access, update or request deletion of your personal information. You can contact us anytime to exercise these rights.",
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: Cookie,
    description:
      "Our website uses cookies to enhance your browsing experience, analyze website traffic and improve our services. You can manage or disable cookies in your browser settings.",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    icon: RefreshCw,
    description:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated 'Last Revised' date.",
  },
];

const contactSection = {
  id: "contact",
  title: "Contact Us",
  icon: Mail,
};

const navigationItems = [
  ...policySections,
  contactSection,
];

const PrivicyandPolicyMain = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const navigationLockRef = useRef(false);
  const navigationTimerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const activeSectionRef = useRef("introduction");

  // Keep the state and ref synchronized.
  const updateActiveSection = (id) => {
    if (!id || activeSectionRef.current === id) return;

    activeSectionRef.current = id;
    setActiveSection(id);
  };

  // Detect the section that has reached the activation line.
  const detectActiveSection = () => {
    if (navigationLockRef.current) return;

    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Activate Contact Us when the user reaches the bottom.
    if (
      scrollPosition + viewportHeight >= documentHeight - 25
    ) {
      updateActiveSection("contact");
      return;
    }

    const activationPoint = scrollPosition + 160;
    let currentSection = "introduction";

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);

      if (!element) return;

      const sectionTop =
        element.getBoundingClientRect().top + scrollPosition;

      if (sectionTop <= activationPoint) {
        currentSection = item.id;
      }
    });

    updateActiveSection(currentSection);
  };

  // Sidebar click handler.
  const scrollToSection = (id) => {
    const target = document.getElementById(id);

    if (!target) return;

    // Immediately activate the clicked navigation item.
    updateActiveSection(id);

    // Lock automatic section detection during smooth scrolling.
    navigationLockRef.current = true;

    if (navigationTimerRef.current) {
      window.clearTimeout(navigationTimerRef.current);
    }

    // Maintain a consistent scroll offset.
    const headerOffset = 110;

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    // Release the navigation lock after scrolling settles.
    navigationTimerRef.current = window.setTimeout(() => {
      navigationLockRef.current = false;
      navigationTimerRef.current = null;

      // Recheck the current section without losing the clicked selection.
      detectActiveSection();
    }, 1200);
  };

  // Scroll detection and event-listener management.
  useEffect(() => {
    const handleScroll = () => {
      if (
        navigationLockRef.current ||
        animationFrameRef.current !== null
      ) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(() => {
        animationFrameRef.current = null;
        detectActiveSection();
      });
    };

    const handleResize = () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      detectActiveSection();
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    // Set the correct active item on initial render.
    detectActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (navigationTimerRef.current) {
        window.clearTimeout(navigationTimerRef.current);
        navigationTimerRef.current = null;
      }

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      navigationLockRef.current = false;
    };
  }, []);

  return (
    <main className="pp-policy-page">

      <div className="pp-policy-glow pp-glow-one"></div>
      <div className="pp-policy-glow pp-glow-two"></div>

      <div className="pp-policy-container">

        {/* LEFT SIDEBAR */}

        <aside className="pp-policy-sidebar">

          <div className="pp-sidebar-heading">
            <div className="pp-sidebar-heading-icon">
              <List size={19} strokeWidth={2.7} />
            </div>

            <span>On This Page</span>
          </div>

          <div className="pp-sidebar-line"></div>

          <nav
            className="pp-sidebar-navigation"
            aria-label="Privacy policy sections"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "location" : undefined}
                  className={`pp-sidebar-link ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.3 : 2}
                  />

                  <span>{item.title}</span>

                  {isActive && (
                    <ArrowUpRight
                      className="pp-sidebar-arrow"
                      size={15}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* DECORATIVE LEAF AREA */}

          <div className="pp-sidebar-decoration">

            <div className="pp-leaf-glow"></div>

            <Leaf className="pp-leaf pp-leaf-one" />
            <Leaf className="pp-leaf pp-leaf-two" />
            <Leaf className="pp-leaf pp-leaf-three" />

            <div className="pp-decoration-text">
              <span>Care for Nature.</span>
              <small>Committed to a safer tomorrow.</small>
            </div>

          </div>

        </aside>

        {/* RIGHT CONTENT */}

        <section className="pp-policy-content">

          {/* HEADER */}

          <header className="pp-policy-header">

            <div className="pp-header-label">
              <span className="pp-header-dot"></span>
              YOUR PRIVACY MATTERS
            </div>

            <h1>
              Privacy <span>Policy</span>
            </h1>

            <p>
              At Insectra, we value your privacy and are committed
              to protecting your personal information. This Privacy
              Policy explains how we collect, use, store and
              safeguard your information when you visit our website
              or use our services.
            </p>

            <div className="pp-header-bottom-line"></div>

          </header>

          {/* POLICY CARDS */}

          <div className="pp-policy-list">

            {policySections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  className="pp-policy-section"
                  id={section.id}
                  key={section.id}
                >

                  <div className="pp-policy-icon">
                    <Icon size={23} strokeWidth={2.1} />
                  </div>

                  <div className="pp-policy-card-content">

                    <div className="pp-policy-card-title">

                      <span className="pp-section-number">
                        {index + 1}.
                      </span>

                      <h2>{section.title}</h2>

                    </div>

                    <p>{section.description}</p>

                  </div>

                  <div className="pp-card-hover-line"></div>

                </article>
              );
            })}

            {/* CONTACT SECTION */}

            <article
              className="pp-policy-section pp-contact-section"
              id="contact"
            >

              <div className="pp-policy-icon">
                <Mail size={23} strokeWidth={2.1} />
              </div>

              <div className="pp-policy-card-content">

                <div className="pp-policy-card-title">

                  <span className="pp-section-number">9.</span>

                  <h2>Contact Us</h2>

                </div>

                <p>
                  If you have any questions about this Privacy
                  Policy or how we handle your information,
                  please contact us:
                </p>

                <div className="pp-contact-details">

                  <a
                    href="tel:+917205303566"
                    className="pp-contact-pill"
                  >
                    <Phone size={14} />
                    <span>+91 7205303566</span>
                    <ArrowUpRight
                      size={12}
                      className="pp-pill-arrow"
                    />
                  </a>

                  <a
                    href="mailto:info@insectra.com"
                    className="pp-contact-pill"
                  >
                    <Mail size={14} />
                    <span>info@insectra.com</span>
                    <ArrowUpRight
                      size={12}
                      className="pp-pill-arrow"
                    />
                  </a>

                </div>

              </div>

              <div className="pp-card-hover-line"></div>

            </article>

          </div>

          {/* FOOTER */}

          <footer className="pp-policy-footer">

            <div className="pp-footer-note">
              <ShieldCheck size={15} />
              <span>Your information is safe with us.</span>
            </div>

            <div className="pp-last-revised">
              <CalendarDays size={15} />
              <span>Last Revised: 17 November 2026</span>
            </div>

          </footer>

        </section>

      </div>

    </main>
  );
};

export default PrivicyandPolicyMain;
