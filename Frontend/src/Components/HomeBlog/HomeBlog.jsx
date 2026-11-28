import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, BACKEND_BASE_URL } from "../../config/api";
import "./HomeBlog.css";

const TITLE = "Everything you need to know about insect control";

const resolveImageUrl = (img) => {
  if (!img) return "";
  const clean = String(img).replace(/\\/g, "/");
  if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("data:") || clean.startsWith("blob:")) {
    return clean;
  }
  return `${BACKEND_BASE_URL}${clean.startsWith("/") ? "" : "/"}${clean}`;
};

const toSlug = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const HomeBlog = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const result = await res.json();
        if (!ignore && res.ok && result.success) {
          const published = (result.data || [])
            .filter((b) => b.status === "Published" || (!b.status && b.published !== false))
            .slice(0, 3);
          setPosts(published);
        }
      } catch {
        // Keep empty if backend is unreachable
      }
    };
    fetchBlogs();
    return () => {
      ignore = true;
    };
  }, []);

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
          {posts.map((post, index) => {
            const imgSrc = resolveImageUrl(post.image);
            const blogSlug = post.slug || toSlug(post.title) || post._id || post.id;
            const openBlog = (e) => {
              e.preventDefault();
              navigate(`/blogs/${blogSlug}`, { state: { blog: post } });
            };
            return (
              <article
                className="HomeBlog-card"
                key={post._id || post.id || index}
                style={{ "--c": index }}
              >
                <div className="HomeBlog-imageWrap">
                  <div className="HomeBlog-imageTrack">
                    {imgSrc ? (
                      <>
                        <img
                          src={imgSrc}
                          alt={post.title}
                          className="HomeBlog-image"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <img
                          src={imgSrc}
                          alt=""
                          aria-hidden="true"
                          className="HomeBlog-image"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className="HomeBlog-image"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #0f5132, #2fb344)",
                            color: "#ffffff",
                            fontWeight: 700,
                          }}
                        >
                          {post.category || "Blog"}
                        </div>
                        <div
                          className="HomeBlog-image"
                          aria-hidden="true"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #0f5132, #2fb344)",
                            color: "#ffffff",
                            fontWeight: 700,
                          }}
                        >
                          {post.category || "Blog"}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="HomeBlog-content">
                  <span className="HomeBlog-category">{post.category}</span>
                  <h3 className="HomeBlog-cardTitle">{post.title}</h3>
                  <p className="HomeBlog-text">{post.desc || post.excerpt}</p>

                  <a href={`/blogs/${blogSlug}`} className="HomeBlog-readMore" onClick={openBlog}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;