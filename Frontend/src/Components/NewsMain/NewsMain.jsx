import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, BACKEND_BASE_URL } from "../../config/api";
import "./NewsMain.css";

const HEADING_WORDS = [
  { text: "Explore", accent: false },
  { text: "Our", accent: false },
  { text: "Latest", accent: false },
  { text: "Insights", accent: true },
];

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
    return img;
  }
  return `${BACKEND_BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const toSlug = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const estimateReadTime = (html = "") => {
  const text = html.replace(/<[^>]+>/g, " ").trim();
  const words = text ? text.split(/\s+/).length : 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

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
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const result = await res.json();
        if (!ignore) {
          if (!res.ok || !result.success) {
            throw new Error(result.message || "Failed to load blogs");
          }
          const publishedBlogs = (result.data || []).filter(
            (b) => b.status === "Published" || (!b.status && b.published !== false)
          );
          setNewsData(publishedBlogs);
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Unable to load blogs.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchBlogs();
    return () => {
      ignore = true;
    };
  }, []);

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

        {loading ? (
          <p style={{ textAlign: "center", padding: "48px 16px", fontSize: "16px" }}>
            Loading blogs...
          </p>
        ) : error ? (
          <p style={{ textAlign: "center", padding: "48px 16px", color: "#dc2626", fontSize: "16px" }}>
            {error}
          </p>
        ) : newsData.length === 0 ? (
          <p style={{ textAlign: "center", padding: "48px 16px", fontSize: "16px" }}>
            No published blogs found in database.
          </p>
        ) : (
          <div className="news-main-grid">
            {newsData.map((item, index) => {
              const blogSlug = item.slug || toSlug(item.title) || item._id || item.id;
              const openBlog = (e) => {
                if (e) e.preventDefault();
                navigate(`/blogs/${blogSlug}`, { state: { blog: item } });
              };
              return (
              <article
                className="news-main-card"
                key={item._id || item.id}
                style={{ "--card-index": index, cursor: "pointer" }}
                onClick={openBlog}
              >
                <div className="news-main-image-wrapper">
                  {item.image ? (
                    <img
                      src={resolveImageUrl(item.image)}
                      alt={item.title}
                      className="news-main-image"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="news-main-image"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #0f5132, #2fb344)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "20px",
                      }}
                    >
                      {item.category || "Blog"}
                    </div>
                  )}
                  <div className="news-main-image-overlay"></div>

                  <span className="news-main-image-tag">{item.category}</span>

                  <span className="news-main-image-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="news-main-content">
                  <div className="news-main-meta">
                    <span>{formatDate(item.date || item.createdAt)}</span>
                    <i />
                    <span className="news-main-meta-time">
                      <ClockIcon />
                      {estimateReadTime(item.content)}
                    </span>
                  </div>

                  <span className="news-main-category">{item.category}</span>

                  <h3>{item.title}</h3>

                  <p>{item.desc || item.excerpt}</p>

                  <a
                    href={`/blogs/${blogSlug}`}
                    className="news-main-read-more"
                    onClick={(e) => {
                      e.stopPropagation();
                      openBlog(e);
                    }}
                  >
                    <span>Read More</span>
                    <span className="news-main-arrow">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsMain;
