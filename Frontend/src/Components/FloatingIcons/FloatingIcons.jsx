import React, { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../config/api";
import "./FloatingIcons.css";

const ENQUIRY_SERVICES = [
  "Home Pest Control",
  "Termite Treatment",
  "Bed Bug Control",
  "Rodent Control",
  "Cockroach Control",
  "Mosquito Control",
];

/* ---------------------------------
   Contact number
--------------------------------- */
const CONTACT = {
  display: "+91 73759 71966",
  tel: "+917375971966",
  wa: "917375971966",
};

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I would like to get more information."
);

const CALL_HREF = `tel:${CONTACT.tel}`;
const WHATSAPP_HREF = `https://wa.me/${CONTACT.wa}?text=${WHATSAPP_MESSAGE}`;

/* Show the scroll-to-top button after this many px */
const SHOW_AFTER = 300;

/* Scroll progress ring: circle r=24 -> circumference */
const RING_RADIUS = 24;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/* ---------------------------------
   Icons
--------------------------------- */
const PhoneIcon = () => (
  <svg className="FloatingIcons__svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="FloatingIcons__svg FloatingIcons__svg--wa" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15c-1.49 0-2.94-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.69 8.23-8.22 8.23zm4.51-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.12-.22-.19-.47-.31z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    className="FloatingIcons__svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const EnquiryIcon = () => (
  <svg
    className="FloatingIcons__svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

/* ---------------------------------
   Helpers
--------------------------------- */
const isPageScroller = (el) =>
  !el ||
  el === window ||
  el === document ||
  el === document.documentElement ||
  el === document.body;

/* Reads scroll position of either the window or a custom scroll container */
const getMetrics = (el) => {
  if (isPageScroller(el)) {
    const doc = document.documentElement;
    const body = document.body;
    const top = window.scrollY || doc.scrollTop || body.scrollTop || 0;
    const height = Math.max(doc.scrollHeight, body.scrollHeight);
    return { top, max: height - window.innerHeight };
  }
  return { top: el.scrollTop, max: el.scrollHeight - el.clientHeight };
};

/* Only treat big containers as "the page scroller" (ignores sliders, textareas, etc.) */
const isMainScroller = (el) =>
  el.scrollHeight - el.clientHeight > 200 &&
  el.clientHeight >= window.innerHeight * 0.5;

/* Smooth ease in/out */
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* Finds every element that is currently scrolled down */
const getScrolledElements = (preferred) => {
  const list = new Set();

  const pageEl = document.scrollingElement || document.documentElement;
  list.add(pageEl);
  list.add(document.documentElement);
  list.add(document.body);

  if (preferred) list.add(preferred);

  document.querySelectorAll("body *").forEach((el) => {
    if (el.scrollTop > 0) list.add(el);
  });

  return Array.from(list).filter((el) => el && el.scrollTop > 0);
};

/* ---------------------------------
   Component
--------------------------------- */
const FloatingIcons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: ENQUIRY_SERVICES[0],
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");

  /* The element that is actually scrolling (null = window) */
  const scrollerRef = useRef(null);

  /* Running scroll-to-top animation (frame id + cleanup) */
  const animRef = useRef({ frame: 0, stop: null });

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
    setEnquiryError("");
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setEnquiryError("");
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enquiryForm.name.trim(),
          email: enquiryForm.email.trim(),
          phone: enquiryForm.phone.trim(),
          service: enquiryForm.service,
          subject: enquiryForm.service,
          message: enquiryForm.message.trim(),
          status: "New",
          at: new Date().toISOString().slice(0, 16),
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to submit enquiry");
      }
      setEnquirySuccess(true);
      setEnquiryForm({
        name: "",
        email: "",
        phone: "",
        service: ENQUIRY_SERVICES[0],
        message: "",
      });
    } catch (err) {
      setEnquiryError(err.message || "Unable to submit enquiry. Please try again.");
    } finally {
      setSending(false);
    }
  };

  /* Scroll visibility + progress (works for window AND inner containers) */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, max } = getMetrics(scrollerRef.current);
      setShowScrollTop(top > SHOW_AFTER);
      setProgress(max > 0 ? Math.min(1, Math.max(0, top / max)) : 0);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const handleScroll = (event) => {
      const target = event.target;

      if (isPageScroller(target)) {
        scrollerRef.current = null;
      } else if (target instanceof Element && isMainScroller(target)) {
        scrollerRef.current = target;
      } else {
        return; // small inner scroller, ignore
      }

      schedule();
    };

    update();

    /* capture = true catches scroll events from ANY container */
    document.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", schedule);
      if (animRef.current.stop) animRef.current.stop();
    };
  }, []);

  /* Bottom -> top smooth scroll */
  const scrollToTop = () => {
    /* Stop any animation already running */
    if (animRef.current.stop) animRef.current.stop();

    /* If the site uses Lenis smooth-scroll, let it handle the scroll */
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(0, { duration: 1.2 });
      return;
    }

    const elements = getScrolledElements(scrollerRef.current);
    if (!elements.length) return;

    const starts = elements.map((el) => el.scrollTop);
    const farthest = Math.max(...starts);

    /* Respect "reduce motion" -> jump instantly */
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Disable CSS scroll-behavior while we animate, so it can't fight us */
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.scrollBehavior;
    const prevBody = body.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    const setPosition = (ratio) => {
      elements.forEach((el, i) => {
        const value = Math.round(starts[i] * (1 - ratio));
        if (el === html || el === body || el === document.scrollingElement) {
          window.scrollTo(0, value);
        }
        el.scrollTop = value;
      });
    };

    let cancelled = false;

    const cleanup = () => {
      cancelled = true;
      cancelAnimationFrame(animRef.current.frame);
      window.removeEventListener("wheel", cleanup);
      window.removeEventListener("touchstart", cleanup);
      window.removeEventListener("keydown", cleanup);
      html.style.scrollBehavior = prevHtml;
      body.style.scrollBehavior = prevBody;
      animRef.current.stop = null;
    };

    animRef.current.stop = cleanup;

    if (reduceMotion) {
      setPosition(1);
      cleanup();
      return;
    }

    /* Longer pages take a bit longer, between 0.5s and 1.4s */
    const duration = Math.min(1400, Math.max(500, farthest * 0.25));
    const startTime = performance.now();

    /* If the user scrolls or touches during the animation, stop it */
    window.addEventListener("wheel", cleanup, { passive: true });
    window.addEventListener("touchstart", cleanup, { passive: true });
    window.addEventListener("keydown", cleanup);

    const step = (now) => {
      if (cancelled) return;

      const t = Math.min(1, (now - startTime) / duration);
      setPosition(easeInOutCubic(t));

      if (t < 1) {
        animRef.current.frame = requestAnimationFrame(step);
      } else {
        cleanup();
      }
    };

    animRef.current.frame = requestAnimationFrame(step);
  };

  return (
    <aside className="FloatingIcons" aria-label="Floating quick actions">
      {/* Scroll to top */}
      <div
        className={`FloatingIcons__item FloatingIcons__item--scroll ${
          showScrollTop ? "FloatingIcons__item--visible" : ""
        }`}
      >
        <button
          type="button"
          className="FloatingIcons__btn FloatingIcons__btn--scroll"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          tabIndex={showScrollTop ? 0 : -1}
        >
          <svg className="FloatingIcons__ring" viewBox="0 0 52 52" aria-hidden="true">
            <circle className="FloatingIcons__ring-track" cx="26" cy="26" r={RING_RADIUS} />
            <circle
              className="FloatingIcons__ring-bar"
              cx="26"
              cy="26"
              r={RING_RADIUS}
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - progress)}
            />
          </svg>
          <ArrowUpIcon />
        </button>
      </div>

      {/* Quick Enquiry */}
      <div className="FloatingIcons__item FloatingIcons__item--enquiry" style={{ "--enter": 0 }}>
        <button
          type="button"
          className="FloatingIcons__btn FloatingIcons__btn--enquiry"
          onClick={() => {
            setEnquirySuccess(false);
            setEnquiryError("");
            setEnquiryOpen(true);
          }}
          aria-label="Open quick enquiry form"
          title="Quick Enquiry"
        >
          <EnquiryIcon />
        </button>
      </div>

      {/* Call */}
      <div className="FloatingIcons__item FloatingIcons__item--call" style={{ "--enter": 1 }}>
        <a
          href={CALL_HREF}
          className="FloatingIcons__btn FloatingIcons__btn--call"
          aria-label={`Call ${CONTACT.display}`}
        >
          <PhoneIcon />
        </a>
      </div>

      {/* WhatsApp */}
      <div className="FloatingIcons__item FloatingIcons__item--whatsapp" style={{ "--enter": 2 }}>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="FloatingIcons__btn FloatingIcons__btn--whatsapp"
          aria-label={`Chat on WhatsApp ${CONTACT.display}`}
        >
          <WhatsAppIcon />
        </a>
      </div>

      {/* Enquiry Modal */}
      {enquiryOpen && (
        <div
          className="FloatingEnquiry-overlay"
          onMouseDown={() => setEnquiryOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Quick Enquiry"
        >
          <div className="FloatingEnquiry-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="FloatingEnquiry-head">
              <div>
                <span className="FloatingEnquiry-badge">QUICK ENQUIRY</span>
                <h3>Request a Free Inspection</h3>
              </div>
              <button
                type="button"
                className="FloatingEnquiry-close"
                onClick={() => setEnquiryOpen(false)}
                aria-label="Close enquiry modal"
              >
                ×
              </button>
            </div>

            {enquirySuccess ? (
              <div className="FloatingEnquiry-success">
                <div className="FloatingEnquiry-successIcon">✓</div>
                <h4>Enquiry Submitted!</h4>
                <p>Thank you for reaching out. Our pest control team will contact you shortly.</p>
                <button
                  type="button"
                  className="FloatingEnquiry-submit"
                  onClick={() => setEnquiryOpen(false)}
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="FloatingEnquiry-form" onSubmit={handleEnquirySubmit}>
                <div className="FloatingEnquiry-grid">
                  <label className="FloatingEnquiry-field">
                    <span>Full Name *</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={enquiryForm.name}
                      onChange={handleEnquiryChange}
                      required
                    />
                  </label>
                  <label className="FloatingEnquiry-field">
                    <span>Phone Number *</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={enquiryForm.phone}
                      onChange={handleEnquiryChange}
                      required
                    />
                  </label>
                </div>

                <div className="FloatingEnquiry-grid">
                  <label className="FloatingEnquiry-field">
                    <span>Email Address *</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={enquiryForm.email}
                      onChange={handleEnquiryChange}
                      required
                    />
                  </label>
                  <label className="FloatingEnquiry-field">
                    <span>Service Needed</span>
                    <select
                      name="service"
                      value={enquiryForm.service}
                      onChange={handleEnquiryChange}
                    >
                      {ENQUIRY_SERVICES.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="FloatingEnquiry-field">
                  <span>Message *</span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us about your pest issue..."
                    value={enquiryForm.message}
                    onChange={handleEnquiryChange}
                    required
                  />
                </label>

                {enquiryError && <p className="FloatingEnquiry-error">{enquiryError}</p>}

                <div className="FloatingEnquiry-actions">
                  <button
                    type="button"
                    className="FloatingEnquiry-cancel"
                    onClick={() => setEnquiryOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="FloatingEnquiry-submit"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Submit Enquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default FloatingIcons;