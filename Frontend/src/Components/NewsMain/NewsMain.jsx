import React, { useEffect, useRef, useState } from "react";
import "./NewsMain.css";
import news1 from "../../assets/news-1.jpg"; // adjust path if needed
import news2 from "../../assets/news-2.jpg";
import news3 from "../../assets/news-3.jpg";

const newsData = [
  {
    id: 1,
    category: "Pest Identification",
    title: "Preventing Rodents in Homes and Businesses",
    description:
      "Learn how to identify rodent activity early and protect your home or business with effective prevention methods.",
    image: news1,
    date: "Nov 08, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Bed Bug Treatment",
    title: "Bed Bug Identification and Treatment Guide",
    description:
      "Discover the common signs of bed bugs and the best ways to eliminate infestations effectively.",
    image: news2,
    date: "Nov 03, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Mosquito Control",
    title: "Effective Mosquito Control for Your Home",
    description:
      "Keep your surroundings safe and comfortable with professional mosquito control and prevention tips.",
    image: news3,
    date: "Oct 28, 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Professional Pest Care",
    title: "Why Professional Pest Control Matters",
    description:
      "Understand why professional pest management is essential for maintaining a clean and healthy environment.",
    image: news3,
    date: "Oct 21, 2026",
    readTime: "4 min read",
  },
  {
    id: 5,
    category: "Home Protection",
    title: "Simple Ways to Keep Your Home Pest-Free",
    description:
      "Follow these simple preventive measures to keep unwanted pests away from your living spaces.",
    image: news2,
    date: "Oct 14, 2026",
    readTime: "3 min read",
  },
  {
    id: 6,
    category: "Pest Prevention",
    title: "Seasonal Pest Problems and Their Solutions",
    description:
      "Explore common seasonal pest problems and learn how to protect your property throughout the year.",
    image: news1,
    date: "Oct 06, 2026",
    readTime: "5 min read",
  },
];

const HEADING_WORDS = [
  { text: "Explore", accent: false },
  { text: "Our", accent: false },
  { text: "Latest", accent: false },
  { text: "Insights", accent: true },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const NewsMain = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let letterIndex = 0;

  return (
    <section
      className={`news-main-section ${inView ? "news-main-active" : ""}`}
      ref={sectionRef}
    >
      <div className="news-main-glow news-main-glow-one" />
      <div className="news-main-glow news-main-glow-two" />

      <div className="news-main-container">
        <div className="news-main-heading">
          <span className="news-main-subtitle">
            <i className="news-main-subtitle-dot" />
            LATEST NEWS &amp; ARTICLES
          </span>

          <h2 aria-label="Explore Our Latest Insights">
            {HEADING_WORDS.map((word, wi) => (
              <span
                className={`news-main-word ${
                  word.accent ? "news-main-word-accent" : ""
                }`}
                key={wi}
              >
                {word.text.split("").map((ch) => {
                  const delay = letterIndex++ * 0.045;
                  return (
                    <span
                      className="news-main-letter"
                      style={{ animationDelay: `${delay}s` }}
                      key={letterIndex}
                      aria-hidden="true"
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>

          <p>
            Stay informed with expert advice, helpful tips and the latest
            updates from the world of pest management.
          </p>
        </div>

        <div className="news-main-grid">
          {newsData.map((item, index) => (
            <article
              className="news-main-card"
              key={item.id}
              style={{ "--card-index": index }}
            >
              <div className="news-main-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-main-image"
                  loading="lazy"
                />
                <div className="news-main-image-overlay"></div>

                <span className="news-main-image-tag">{item.category}</span>

                <span className="news-main-image-number">
                  {String(item.id).padStart(2, "0")}
                </span>
              </div>

              <div className="news-main-content">
                <div className="news-main-meta">
                  <span>{item.date}</span>
                  <i />
                  <span className="news-main-meta-time">
                    <ClockIcon />
                    {item.readTime}
                  </span>
                </div>

                <span className="news-main-category">{item.category}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <a
                  href="#"
                  className="news-main-read-more"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>Read More</span>
                  <span className="news-main-arrow">
                    <ArrowIcon />
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

export default NewsMain;