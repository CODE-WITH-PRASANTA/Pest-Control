import React, { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, BACKEND_BASE_URL } from "../../config/api";
import "./GalleryMain.css";

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
    return img;
  }
  return `${BACKEND_BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
};

const GalleryMain = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let ignore = false;
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/gallery`);
        const result = await res.json();
        if (!ignore) {
          if (!res.ok || !result.success) {
            throw new Error(result.message || "Failed to load gallery");
          }
          const published = (result.data || []).filter(
            (g) => g.status === "Published" || !g.status
          );
          setItems(published);
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Unable to load gallery.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchGallery();
    return () => {
      ignore = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
    return ["All", ...unique];
  }, [items]);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((i) => i.category === activeCategory),
    [items, activeCategory]
  );

  const getImages = (item) => {
    const list =
      Array.isArray(item.images) && item.images.length
        ? item.images
        : item.image
        ? [item.image]
        : [];
    return list.map(resolveImageUrl).filter(Boolean);
  };

  return (
    <section className="gallery-main-section">
      <div className="gallery-main-glow gallery-main-glow-one" />
      <div className="gallery-main-glow gallery-main-glow-two" />

      <div className="gallery-main-container">
        <div className="gallery-main-heading">
          <span className="gallery-main-subtitle">
            <i className="gallery-main-subtitle-dot" />
            OUR SERVICE GALLERY
          </span>
          <h2>
            Explore Our <span>Field Work</span>
          </h2>
          <p>
            Browse real pest control inspections, treatments, and sanitization
            projects completed by our certified technicians.
          </p>
        </div>

        {categories.length > 1 && (
          <div className="gallery-main-filters" role="tablist" aria-label="Filter gallery by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-main-filter-btn ${activeCategory === cat ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="gallery-main-state">Loading gallery...</div>
        ) : error ? (
          <div className="gallery-main-state is-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="gallery-main-state">No gallery items found in database.</div>
        ) : (
          <div className="gallery-main-grid">
            {filtered.map((item) => {
              const imgs = getImages(item);
              const cover = imgs[0];
              return (
                <article
                  key={item._id || item.id}
                  className="gallery-main-card"
                >
                  <div className="gallery-main-media">
                    {cover ? (
                      <img src={cover} alt={item.title} loading="lazy" />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #0f5132, #2fb344)",
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      >
                        {item.category}
                      </div>
                    )}
                    <div className="gallery-main-overlay" />
                    <div className="gallery-main-badges">
                      <span className="gallery-main-cat">{item.category}</span>
                      {imgs.length > 1 && (
                        <span className="gallery-main-count">{imgs.length} Photos</span>
                      )}
                    </div>
                    <div className="gallery-main-caption">
                      <h3>{item.title}</h3>
                      <p>{item.location || item.desc || "Pest Control Service"}</p>
                    </div>
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

export default GalleryMain;
