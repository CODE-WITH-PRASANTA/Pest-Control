import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./HomeVideo.css";

// Update this path/extension to match your project
import videoBg from "../../assets/home-video.png";

/* Put your video here: a YouTube/Vimeo embed link or a direct .mp4 file */
const VIDEO_URL = "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0";

const STATS = [
  {
    value: 95,
    decimals: 0,
    suffix: "%",
    label: "pest Control Success Rate",
    icon: (
      <>
        <rect x="8" y="30" width="22" height="28" rx="4" />
        <path d="M13 30v-8h12v8M25 22h10l4-5M39 17l4 2" />
        <circle cx="44" cy="44" r="12" />
        <ellipse cx="44" cy="46" rx="3.4" ry="4.8" />
        <path d="M44 41v10M40 44l-3-2M48 44l3-2M40 48l-3 2M48 48l3 2" />
      </>
    ),
  },
  {
    value: 4.3,
    decimals: 1,
    suffix: "k",
    label: "Cockroaches Exist World Wide",
    icon: (
      <>
        <ellipse cx="32" cy="38" rx="10" ry="15" />
        <circle cx="32" cy="19" r="6" />
        <path d="M22 30 8 24M22 40 6 42M23 50 10 58M42 30l14-6M42 40l16 2M41 50l13 8M28 14l-5-8M36 14l5-8M32 24v28" />
      </>
    ),
  },
  {
    value: 24,
    decimals: 0,
    suffix: "/7",
    label: "termites Work Nonstops",
    icon: (
      <>
        <circle cx="12" cy="10" r="5" />
        <path d="M8 58V30a4 4 0 0 1 8 0v28M16 34l18 10M34 44l8 4M26 58l8-10" />
        <path d="M44 54v-8M50 54v-12M56 54v-8M42 54h16" />
        <path d="M46 40c0-4 2-6 4-6s4 2 4 6" />
      </>
    ),
  },
  {
    value: 400,
    decimals: 0,
    suffix: "",
    label: "termites Work Nonstops",
    icon: (
      <>
        <circle cx="12" cy="10" r="5" />
        <path d="M8 58V30a4 4 0 0 1 8 0v28M16 34l18 10M34 44l8 4M26 58l8-10" />
        <path d="M44 54v-8M50 54v-12M56 54v-8M42 54h16" />
        <path d="M46 40c0-4 2-6 4-6s4 2 4 6" />
      </>
    ),
  },
];

const isFile = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

const HomeVideo = () => {
  const ref = useRef(null);
  const closeRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  /* entrance */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* numbers run from 0 to the end value once visible */
  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }
    const duration = 2600;
    const delay = 900;
    let raf;
    let start;
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        setProgress(p === 1 ? 1 : 1 - Math.pow(2, -10 * p)); // easeOutExpo
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  /* modal: Esc to close, lock page scroll, focus close button */
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <section
      ref={ref}
      className={`HomeVideo ${visible ? "HomeVideo--visible" : ""}`}
    >
      <div className="HomeVideo__bg" style={{ backgroundImage: `url(${videoBg})` }} aria-hidden="true" />
      <div className="HomeVideo__overlay" aria-hidden="true" />

      {/* Play button */}
      <div className="HomeVideo__center">
        <button
          type="button"
          className="HomeVideo__play"
          onClick={() => setOpen(true)}
          aria-label="Play video"
        >
          <span className="HomeVideo__ring HomeVideo__ring--one" aria-hidden="true" />
          <span className="HomeVideo__ring HomeVideo__ring--two" aria-hidden="true" />
          <span className="HomeVideo__play-inner">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        </button>
      </div>

      {/* Stats */}
      <div className="HomeVideo__stats">
        {STATS.map((s, i) => (
          <div className="HomeVideo__stat" style={{ "--i": i }} key={i}>
            <span className="HomeVideo__stat-icon">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {s.icon}
              </svg>
            </span>
            <div className="HomeVideo__stat-body">
              <strong className="HomeVideo__stat-number">
                {(s.value * progress).toFixed(s.decimals)}
                {s.suffix}
              </strong>
              <span className="HomeVideo__stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Video modal */}
      {open &&
        createPortal(
          <div
            className="HomeVideo__modal"
            role="dialog"
            aria-modal="true"
            aria-label="Video"
            onClick={close}
          >
            <div className="HomeVideo__modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                ref={closeRef}
                className="HomeVideo__modal-close"
                onClick={close}
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>

              <div className="HomeVideo__modal-frame">
                {isFile(VIDEO_URL) ? (
                  <video className="HomeVideo__modal-video" src={VIDEO_URL} controls autoPlay playsInline />
                ) : (
                  <iframe
                    className="HomeVideo__modal-video"
                    src={VIDEO_URL}
                    title="Video"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default HomeVideo;