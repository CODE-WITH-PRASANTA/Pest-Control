import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, BACKEND_BASE_URL } from "../../config/api";
import "./NewsDetailsMain.css";

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
    return img;
  }
  return `${BACKEND_BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
};

const toSlug = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

/* ---------- ICONS ---------- */

const Icon = ({ children, size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Icon>
);
const IconChat = (p) => (
  <Icon {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
  </Icon>
);
const IconArrow = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Icon>
);
const IconChevron = (p) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);
const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
const IconCheck = (p) => (
  <Icon {...p}>
    <path d="m5 12 4.5 4.5L19 7" />
  </Icon>
);

const SocialIcon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
);

const IconX = (p) => (
  <SocialIcon
    {...p}
    d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"
  />
);
const IconFacebook = (p) => (
  <SocialIcon
    {...p}
    d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.5v3h2.8v8h3.2Z"
  />
);
const IconPinterest = (p) => (
  <SocialIcon
    {...p}
    d="M12 2a10 10 0 0 0-3.65 19.31c-.05-.79-.1-2 .02-2.86l.74-3.14s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.89 0 .54-.35 1.36-.53 2.11-.15.63.32 1.15.94 1.15 1.13 0 2-1.19 2-2.91 0-1.52-1.09-2.58-2.65-2.58-1.81 0-2.87 1.36-2.87 2.76 0 .55.21 1.13.47 1.45.05.06.06.12.04.18l-.18.72c-.03.11-.09.14-.22.08-.81-.38-1.32-1.56-1.32-2.51 0-2.04 1.48-3.91 4.27-3.91 2.24 0 3.98 1.6 3.98 3.73 0 2.23-1.4 4.02-3.35 4.02-.65 0-1.27-.34-1.48-.74l-.4 1.53c-.15.56-.54 1.27-.8 1.7A10 10 0 1 0 12 2Z"
  />
);
const IconInstagram = ({ size = 16 }) => (
  <Icon size={size}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </Icon>
);

const BugMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="14" rx="4.5" ry="6" />
    <circle cx="12" cy="6.5" r="2.2" />
    <path d="M12 8.5v11.5M7.5 12 3 10M7.5 15.5 3 17M16.5 12 21 10M16.5 15.5 21 17M10.5 4.5 8.5 2M13.5 4.5 15.5 2" />
  </svg>
);

const SmartImage = ({ src, alt, className = "", variant = "photo", ...rest }) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed || !src) {
    const initials = (alt || "B")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <span className={`ndm-fallback ndm-fallback--${variant} ${className}`} role="img" aria-label={alt}>
        {variant === "avatar" ? initials : <BugMark size={variant === "hero" ? 64 : 28} />}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${className} ndm-img ${loaded ? "is-loaded" : ""}`}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};

/* ---------- COMPONENT ---------- */

const NewsDetailsMain = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(location.state?.blog || null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(!location.state?.blog);
  const [search, setSearch] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentData, setCommentData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [commentSending, setCommentSending] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    let ignore = false;
    const loadData = async () => {
      try {
        const listRes = await fetch(`${API_BASE_URL}/blogs`);
        const listJson = await listRes.json();
        const published = listRes.ok && listJson.success
          ? (listJson.data || []).filter((b) => b.status === "Published" || (!b.status && b.published !== false))
          : [];

        if (!ignore) setAllBlogs(published);

        if (slug) {
          const singleRes = await fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(slug)}`);
          const singleJson = await singleRes.json();
          if (!ignore && singleRes.ok && singleJson.success && singleJson.data) {
            setBlog(singleJson.data);
          } else if (!ignore && !location.state?.blog) {
            const matched = published.find((b) => (b.slug || toSlug(b.title)) === slug);
            setBlog(matched || null);
          }
        } else if (!ignore && !location.state?.blog && published.length > 0) {
          setBlog(published[0]);
        }
      } catch {
        // Keep existing state if available
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    if (location.state?.blog) setBlog(location.state.blog);
    loadData();
    return () => {
      ignore = true;
    };
  }, [slug, location.state]);

  useEffect(() => {
    const blogId = blog?._id || blog?.id;
    if (!blogId) {
      setCommentList([]);
      return;
    }
    let ignore = false;
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/blog-comments?blog=${encodeURIComponent(blogId)}&status=Published`
        );
        const result = await res.json();
        if (!ignore && res.ok && result.success) {
          setCommentList(result.data || []);
        }
      } catch {
        // Ignore comment fetch errors
      }
    };
    fetchComments();
    return () => {
      ignore = true;
    };
  }, [blog?._id, blog?.id]);

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
    setSubmitted(false);
    setCommentError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentSending || !blog) return;
    setCommentSending(true);
    setCommentError("");
    setSubmitted(false);

    try {
      const blogId = blog._id || blog.id;
      const res = await fetch(`${API_BASE_URL}/blog-comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blog: blogId,
          blogTitle: blog.title || "",
          blogSlug: blog.slug || slug || "",
          name: commentData.name.trim(),
          email: commentData.email.trim(),
          message: commentData.message.trim(),
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to submit comment");
      }
      setSubmitted(true);
      setCommentData({ name: "", email: "", message: "" });
    } catch (err) {
      setCommentError(err.message || "Unable to post comment.");
    } finally {
      setCommentSending(false);
    }
  };

  const recentPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allBlogs
      .filter((b) => !q || b.title.toLowerCase().includes(q))
      .slice(0, 4);
  }, [allBlogs, search]);

  const categories = useMemo(() => {
    const map = new Map();
    allBlogs.forEach((b) => {
      const cat = b.category || "General";
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [allBlogs]);

  const allTags = useMemo(() => {
    const set = new Set();
    if (Array.isArray(blog?.tags)) blog.tags.forEach((t) => t && set.add(t));
    allBlogs.forEach((b) => {
      if (Array.isArray(b.tags)) b.tags.forEach((t) => t && set.add(t));
    });
    return Array.from(set);
  }, [blog, allBlogs]);

  const { prevBlog, nextBlog } = useMemo(() => {
    if (!blog || allBlogs.length < 2) return { prevBlog: null, nextBlog: null };
    const idx = allBlogs.findIndex((b) => (b._id || b.id) === (blog._id || blog.id));
    if (idx === -1) return { prevBlog: null, nextBlog: null };
    return {
      prevBlog: idx > 0 ? allBlogs[idx - 1] : null,
      nextBlog: idx < allBlogs.length - 1 ? allBlogs[idx + 1] : null,
    };
  }, [blog, allBlogs]);

  if (loading && !blog) {
    return (
      <main className="news-details-main">
        <div className="news-details-main-container" style={{ textAlign: "center", padding: "80px 16px" }}>
          <p>Loading blog...</p>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="news-details-main">
        <div className="news-details-main-container" style={{ textAlign: "center", padding: "80px 16px" }}>
          <h2>Blog not found</h2>
          <p style={{ margin: "12px 0 24px" }}>The requested blog post could not be found.</p>
          <Link to="/news" className="news-details-main-comment-submit-btn" style={{ display: "inline-flex", textDecoration: "none" }}>
            Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  const blogImage = resolveImageUrl(blog.image);
  const blogDateObj = blog.date || blog.createdAt ? new Date(blog.date || blog.createdAt) : null;
  const blogDay = blogDateObj && !isNaN(blogDateObj) ? String(blogDateObj.getDate()).padStart(2, "0") : "";
  const blogMonth = blogDateObj && !isNaN(blogDateObj) ? blogDateObj.toLocaleDateString("en-US", { month: "short" }) : "";
  const blogTags = Array.isArray(blog.tags) ? blog.tags.filter(Boolean) : [];
  const commentCount = commentList.length;
  const commentLabel = `${String(commentCount).padStart(2, "0")} ${commentCount === 1 ? "Comment" : "Comments"}`;

  const openPost = (post) => {
    const postSlug = post.slug || toSlug(post.title) || post._id || post.id;
    navigate(`/blogs/${postSlug}`, { state: { blog: post } });
  };

  return (
    <main className="news-details-main">
      <div className="news-details-main-container">
        <div className="news-details-main-layout">
          {/* ============ MAIN ARTICLE ============ */}
          <article className="news-details-main-article">
            <figure className="news-details-main-featured-image">
              <SmartImage src={blogImage} alt={blog.title} variant="hero" />
              {blogDay && (
                <figcaption className="news-details-main-date">
                  <strong>{blogDay}</strong>
                  <small>{blogMonth}</small>
                </figcaption>
              )}
            </figure>

            <div className="news-details-main-meta">
              <span>
                <IconUser size={17} /> By {blog.author || "Admin"}
              </span>
              <span>
                <IconChat size={17} /> {commentLabel}
              </span>
            </div>

            <div className="news-details-main-body">
              <h1>{blog.title}</h1>
              {(blog.desc || blog.excerpt) && (
                <p className="news-details-main-lead">{blog.desc || blog.excerpt}</p>
              )}
              {blog.content && <div dangerouslySetInnerHTML={{ __html: blog.content }} />}
            </div>

            {/* TAGS + SOCIAL */}
            <div className="news-details-main-share-row">
              {blogTags.length > 0 && (
                <div className="news-details-main-tags">
                  <span className="news-details-main-share-label">Tags</span>
                  {blogTags.map((t) => (
                    <a key={t} href="#tags" onClick={(e) => e.preventDefault()}>
                      {t}
                    </a>
                  ))}
                </div>
              )}

              <div className="news-details-main-socials">
                <span className="news-details-main-share-label">Share</span>
                <a href="#twitter" aria-label="Share on X" onClick={(e) => e.preventDefault()}>
                  <IconX size={16} />
                </a>
                <a href="#facebook" aria-label="Share on Facebook" onClick={(e) => e.preventDefault()}>
                  <IconFacebook size={17} />
                </a>
                <a href="#pinterest" aria-label="Share on Pinterest" onClick={(e) => e.preventDefault()}>
                  <IconPinterest size={17} />
                </a>
                <a href="#instagram" aria-label="Share on Instagram" onClick={(e) => e.preventDefault()}>
                  <IconInstagram size={17} />
                </a>
              </div>
            </div>

            {/* PREV / NEXT */}
            {(prevBlog || nextBlog) && (
              <nav className="news-details-main-related-posts" aria-label="More articles">
                {prevBlog && (
                  <a
                    href={`/blogs/${prevBlog.slug || toSlug(prevBlog.title)}`}
                    className="news-details-main-related-card"
                    onClick={(e) => {
                      e.preventDefault();
                      openPost(prevBlog);
                    }}
                  >
                    <div>
                      <small>Previous article</small>
                      <span>{prevBlog.title}</span>
                    </div>
                    <b>
                      <IconArrow size={20} />
                    </b>
                  </a>
                )}

                {nextBlog && (
                  <a
                    href={`/blogs/${nextBlog.slug || toSlug(nextBlog.title)}`}
                    className="news-details-main-related-card"
                    onClick={(e) => {
                      e.preventDefault();
                      openPost(nextBlog);
                    }}
                  >
                    <div>
                      <small>Next article</small>
                      <span>{nextBlog.title}</span>
                    </div>
                    <b>
                      <IconArrow size={20} />
                    </b>
                  </a>
                )}
              </nav>
            )}

            {/* COMMENTS */}
            <section className="news-details-main-comments" aria-labelledby="comments-title">
              <h2 id="comments-title">
                {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
              </h2>

              {commentList.map((comment, index) => (
                <div className="news-details-main-comment-item" key={`${comment.name}-${index}`}>
                  <SmartImage
                    src={comment.image}
                    alt={comment.name}
                    variant="avatar"
                    className="news-details-main-avatar"
                  />

                  <div className="news-details-main-comment-content">
                    <div className="news-details-main-comment-top">
                      <div>
                        <h3>{comment.name}</h3>
                        <time>{formatDate(comment.createdAt || comment.date)}</time>
                      </div>
                    </div>
                    <p>{comment.message}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* COMMENT FORM */}
            <section className="news-details-main-leave-comment" aria-labelledby="leave-title">
              <h2 id="leave-title">Leave a comment</h2>
              <p className="news-details-main-form-note">
                Your email address will not be published.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="news-details-main-comment-input-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    aria-label="Your name"
                    value={commentData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    aria-label="Your email"
                    value={commentData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Write your comment"
                  aria-label="Your comment"
                  value={commentData.message}
                  onChange={handleChange}
                  required
                />

                <div className="news-details-main-form-footer">
                  <button
                    type="submit"
                    className="news-details-main-comment-submit-btn"
                    disabled={commentSending}
                  >
                    {commentSending ? "Submitting..." : "Post comment"} <IconArrow size={18} />
                  </button>

                  {commentError && (
                    <p style={{ color: "#dc2626", margin: 0, fontSize: "14px", fontWeight: 600 }} role="alert">
                      {commentError}
                    </p>
                  )}

                  {submitted && (
                    <p className="news-details-main-comment-success" role="status">
                      <IconCheck size={18} /> Thank you for your review!
                    </p>
                  )}
                </div>
              </form>
            </section>
          </article>

          {/* ============ SIDEBAR ============ */}
          <aside className="news-details-main-sidebar">
            {/* SEARCH */}
            <form
              className="news-details-main-sidebar-search"
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <input
                type="search"
                placeholder="Search articles"
                aria-label="Search articles"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" aria-label="Search">
                <IconSearch size={20} />
              </button>
            </form>

            {/* LATEST POSTS */}
            {recentPosts.length > 0 && (
              <div className="news-details-main-sidebar-box">
                <h3>Latest posts</h3>

                {recentPosts.map((post) => (
                  <a
                    href={`/blogs/${post.slug || toSlug(post.title)}`}
                    className="news-details-main-latest-post"
                    key={post._id || post.id}
                    onClick={(e) => {
                      e.preventDefault();
                      openPost(post);
                    }}
                  >
                    <SmartImage src={resolveImageUrl(post.image)} alt={post.title} />
                    <div>
                      <span>{formatDate(post.date || post.createdAt)}</span>
                      <h4>{post.title}</h4>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* CATEGORIES */}
            {categories.length > 0 && (
              <div className="news-details-main-sidebar-box">
                <h3>Categories</h3>
                <div className="news-details-main-category-list">
                  {categories.map((category) => (
                    <Link to="/news" key={category.name}>
                      <span className="news-details-main-category-name">{category.name}</span>
                      <em>{category.count}</em>
                      <IconChevron size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* TAGS */}
            {allTags.length > 0 && (
              <div className="news-details-main-sidebar-box">
                <h3>Tags</h3>
                <div className="news-details-main-sidebar-tags">
                  {allTags.map((tag) => (
                    <a key={tag} href="#tag" onClick={(e) => e.preventDefault()}>
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default NewsDetailsMain;
