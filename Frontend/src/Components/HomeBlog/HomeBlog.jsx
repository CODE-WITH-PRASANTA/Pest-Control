import React, { useEffect, useRef, useState } from "react";
import "./HomeBlog.css";
import blogImg from "../../assets/home-blog-1.jpg";

const TITLE = "Everything you need to know about insect control";

const posts = [
  {
    id: 1,
    category: "Pest Identification",
    title: "Preventing Rodents in Homes and Businesses",
    text: "We ensure best quality bugs pest control service. This service is best for homes, shops and offices.",
    image: blogImg,
  },
  {
    id: 2,
    category: "Bed Bug Treatment",
    title: "Bed Bug Identification And Treatment Guide",
    text: "We ensure best quality bugs pest control service. This service is best for homes, shops and offices.",
    image: blogImg,
  },
  {
    id: 3,
    category: "Ant Infestation",
    title: "Effective Mosquito Control for Your Home",
    text: "We ensure best quality bugs pest control service. This service is best for homes, shops and offices.",
    image: blogImg,
  },
];

const HomeBlog = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  /* ---------- start animations when section is visible ---------- */
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ---------- letter by letter heading ---------- */
  const renderTitle = () => {
    let letterIndex = 0;
    return TITLE.split(" ").map((word, wIdx) => (
      <span className="HomeBlog-word" key={wIdx} aria-hidden="true">
        {word.split("").map((char, cIdx) => {
          const i = letterIndex++;
          return (
            <span className="HomeBlog-letter" key={cIdx} style={{ "--i": i }}>
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
      className={`HomeBlog ${inView ? "HomeBlog--visible" : ""}`}
    >
      {/* decorative insect outline */}
      <svg
        className="HomeBlog-bug"
        viewBox="0 0 200 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <ellipse cx="100" cy="170" rx="55" ry="95" transform="rotate(20 100 170)" />
        <ellipse cx="100" cy="170" rx="38" ry="78" transform="rotate(20 100 170)" />
        <path d="M100 85 Q108 40 120 30" />
        <path d="M92 90 Q70 50 50 42" />
        <circle cx="104" cy="82" r="16" />
        <path d="M60 150 Q20 140 5 120" />
        <path d="M58 185 Q15 190 0 210" />
        <path d="M70 225 Q40 250 35 285" />
        <path d="M150 145 Q185 130 198 105" />
        <path d="M155 185 Q190 195 200 220" />
        <path d="M135 230 Q155 255 150 290" />
      </svg>

      <div className="HomeBlog-container">
        {/* HEADER */}
        <div className="HomeBlog-header">
          <span className="HomeBlog-tag">
            <i className="HomeBlog-tagDot"></i>Blog
          </span>

          <h2 className="HomeBlog-title" aria-label={TITLE}>
            {renderTitle()}
          </h2>
        </div>

        {/* CARDS */}
        <div className="HomeBlog-grid">
          {posts.map((post, index) => (
            <article
              className="HomeBlog-card"
              key={post.id}
              style={{ "--c": index }}
            >
              <div className="HomeBlog-imageWrap">
                <div className="HomeBlog-imageTrack">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="HomeBlog-image"
                    loading="lazy"
                  />
                  <img
                    src={post.image}
                    alt=""
                    aria-hidden="true"
                    className="HomeBlog-image"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="HomeBlog-content">
                <span className="HomeBlog-category">{post.category}</span>
                <h3 className="HomeBlog-cardTitle">{post.title}</h3>
                <p className="HomeBlog-text">{post.text}</p>

                <a href="#" className="HomeBlog-readMore">
                  <span className="HomeBlog-readMoreText">Read More</span>
                  <span className="HomeBlog-readMoreIcon">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;