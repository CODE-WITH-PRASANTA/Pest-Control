import React, { useState } from "react";
import "./NewsDetailsMain.css";

import newsDetailsImg from "../../assets/news-details.jpg";
import blog1 from "../../assets/blog1-1.jpg";
import blog2 from "../../assets/blog1-2.jpg";
import blog3 from "../../assets/blog1-3.jpg";
import client1 from "../../assets/client-2.jpg";
import client2 from "../../assets/client-3.jpg";

/* ---------- DATA ---------- */

const recentPosts = [
  {
    title: "5 Eco-Friendly Pest Control Methods You Should Know",
    image: blog1,
    date: "Aug 24, 2025",
  },
  {
    title: "How to Keep Your Home Pest-Free This Winter",
    image: blog2,
    date: "Aug 20, 2025",
  },
  {
    title: "The Best Natural Remedies for Common Household Pests",
    image: blog3,
    date: "Aug 15, 2025",
  },
];

const categories = [
  { name: "Ant Infestation", count: 12 },
  { name: "Bed Bug Treatment", count: 8 },
  { name: "Cockroach Control", count: 15 },
  { name: "Mosquito Control", count: 9 },
  { name: "Pest Identification", count: 6 },
  { name: "Termite Control", count: 11 },
];

const tags = ["Bedbugs", "Bugs", "Extermination", "Hygiene", "Pest", "Safety"];

const initialComments = [
  {
    name: "Kevin Martin",
    image: client1,
    date: "August 29, 2025",
    message:
      "Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor.",
  },
  {
    name: "Sarah Albert",
    image: client2,
    date: "August 30, 2025",
    message:
      "Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor.",
  },
];

const recentComments = [
  { author: "A WordPress commenter", post: "launch new mobile app" },
  { author: "John Doe", post: "template comments" },
  { author: "A WordPress commenter", post: "launch new mobile app" },
  { author: "John Doe", post: "template comments" },
];

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
const IconReply = (p) => (
  <Icon {...p}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 6 6v3" />
  </Icon>
);
const IconCheck = (p) => (
  <Icon {...p}>
    <path d="m5 12 5 5 9-10" />
  </Icon>
);
const IconX = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
  </Icon>
);
const IconFacebook = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M13.5 22v-8h2.7l.5-3.3h-3.2V8.6c0-.9.4-1.7 1.8-1.7h1.5V4.1c-.3 0-1.3-.1-2.4-.1-2.5 0-4.1 1.5-4.1 4.2v2.5H7.5V14h2.8v8h3.2z" />
  </Icon>
);
const IconPinterest = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.2-.8 3.4-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.700 0-2.400-1.800-4.200-4.300-4.200a4.500 4.500 0 0 0-4.700 4.500c0 .9.400 1.900.800 2.400.1.100.1.200.1.300l-.3 1.200c0 .2-.2.300-.4.200-1.300-.6-2.100-2.500-2.100-4 0-3.300 2.400-6.300 6.900-6.300 3.600 0 6.400 2.600 6.400 6 0 3.600-2.300 6.500-5.400 6.500-1.100 0-2.100-.6-2.400-1.200l-.7 2.500c-.2.900-.9 2.100-1.300 2.800A10 10 0 1 0 12 2z" />
  </Icon>
);
const IconInstagram = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
  </Icon>
);

/* Small bug mark used as image placeholder */
const BugMark = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="14" rx="4.5" ry="6" />
    <circle cx="12" cy="6.5" r="2.2" />
    <path d="M12 8.5v11.5M7.5 12 3 10M7.5 15.5 3 17M16.5 12 21 10M16.5 15.5 21 17M10.5 4.5 8.5 2M13.5 4.5 15.5 2" />
  </svg>
);

/* ---------- SMART IMAGE (never shows a broken icon) ---------- */

const SmartImage = ({ src, alt, className = "", variant = "photo", ...rest }) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed || !src) {
    const initials = alt
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <span
        className={`ndm-fallback ndm-fallback--${variant} ${className}`}
        role="img"
        aria-label={alt}
      >
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
  const [search, setSearch] = useState("");
  const [commentList, setCommentList] = useState(initialComments);
  const [commentData, setCommentData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    setCommentList([
      ...commentList,
      {
        name: commentData.name.trim(),
        image: "",
        date: today,
        message: commentData.message.trim(),
      },
    ]);
    setSubmitted(true);
    setCommentData({ name: "", email: "", message: "" });
  };

  const commentCount = commentList.length;
  const commentLabel = `${String(commentCount).padStart(2, "0")} ${
    commentCount === 1 ? "Comment" : "Comments"
  }`;

  return (
    <main className="news-details-main">
      <div className="news-details-main-container">
        <div className="news-details-main-layout">
          {/* ============ MAIN ARTICLE ============ */}
          <article className="news-details-main-article">
            <figure className="news-details-main-featured-image">
              <SmartImage
                src={newsDetailsImg}
                alt="Professional pest control treatment"
                variant="hero"
              />
              <figcaption className="news-details-main-date">
                <strong>28</strong>
                <small>Aug</small>
              </figcaption>
            </figure>

            <div className="news-details-main-meta">
              <span>
                <IconUser size={17} /> By Admin
              </span>
              <span>
                <IconChat size={17} /> {commentLabel}
              </span>
            </div>

            <div className="news-details-main-body">
              <h1>We Ensure Best Quality Bugs &amp; Pest Control Service</h1>
              <p className="news-details-main-lead">
                Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla.
                Aliquam quis purus in justo pulvinar tempor. Mauris non dignissim purus, ac
                commodo diam. Donec sit amet lacinia nulla.
              </p>
              <p>
                Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla.
                Aliquam quis purus in justo pulvinar tempor. Phasellus a rhoncus erat. Vivamus
                vel eros vitae eros aliquet pellentesque.
              </p>
              <p>
                Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla.
                Aliquam quis purus in justo pulvinar tempor. Aliquam quis purus in justo
                pulvinar tempor. Quisque vitae odio nec lacus interdum tempus. Phasellus a
                rhoncus erat.
              </p>
              <p>
                Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla.
                Quisque vitae odio nec lacus interdum tempus. Phasellus a rhoncus erat. Vivamus
                vel eros vitae eros aliquet pellentesque. Sed vitae leo vitae nisi pellentesque
                semper.
              </p>
            </div>

            {/* TAGS + SOCIAL */}
            <div className="news-details-main-share-row">
              <div className="news-details-main-tags">
                <span className="news-details-main-share-label">Tags</span>
                <a href="#tags">Business</a>
                <a href="#tags">Agency</a>
              </div>

              <div className="news-details-main-socials">
                <span className="news-details-main-share-label">Share</span>
                <a href="#twitter" aria-label="Share on X">
                  <IconX size={16} />
                </a>
                <a href="#facebook" aria-label="Share on Facebook">
                  <IconFacebook size={17} />
                </a>
                <a href="#pinterest" aria-label="Share on Pinterest">
                  <IconPinterest size={17} />
                </a>
                <a href="#instagram" aria-label="Share on Instagram">
                  <IconInstagram size={17} />
                </a>
              </div>
            </div>

            {/* PREV / NEXT */}
            <nav className="news-details-main-related-posts" aria-label="More articles">
              <a href="#related" className="news-details-main-related-card">
                <div>
                  <small>Previous article</small>
                  <span>Bring to the table win-win survival strategies</span>
                </div>
                <b>
                  <IconArrow size={20} />
                </b>
              </a>

              <a href="#related" className="news-details-main-related-card">
                <div>
                  <small>Next article</small>
                  <span>How to lead a healthy &amp; well-balanced life</span>
                </div>
                <b>
                  <IconArrow size={20} />
                </b>
              </a>
            </nav>

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
                        <time>{comment.date}</time>
                      </div>
                      <button type="button">
                        <IconReply size={15} /> Reply
                      </button>
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
                  <button type="submit" className="news-details-main-comment-submit-btn">
                    Post comment <IconArrow size={18} />
                  </button>

                  {submitted && (
                    <p className="news-details-main-comment-success" role="status">
                      <IconCheck size={18} /> Comment posted.
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
            <div className="news-details-main-sidebar-box">
              <h3>Latest posts</h3>

              {recentPosts.map((post, index) => (
                <a href="#latest" className="news-details-main-latest-post" key={index}>
                  <SmartImage src={post.image} alt={post.title} />
                  <div>
                    <span>{post.date}</span>
                    <h4>{post.title}</h4>
                  </div>
                </a>
              ))}
            </div>

            {/* CATEGORIES */}
            <div className="news-details-main-sidebar-box">
              <h3>Categories</h3>
              <div className="news-details-main-category-list">
                {categories.map((category, index) => (
                  <a href="#category" key={index}>
                    <span className="news-details-main-category-name">{category.name}</span>
                    <em>{category.count}</em>
                    <IconChevron size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* TAGS */}
            <div className="news-details-main-sidebar-box">
              <h3>Tags</h3>
              <div className="news-details-main-sidebar-tags">
                {tags.map((tag, index) => (
                  <a href="#tag" key={index}>
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* RECENT COMMENTS */}
            <div className="news-details-main-sidebar-box">
              <h3>Recent comments</h3>

              {recentComments.map((item, index) => (
                <div className="news-details-main-recent-comment" key={index}>
                  <span aria-hidden="true">
                    <IconChat size={15} />
                  </span>
                  <p>
                    <strong>{item.author}</strong> on <a href="#comment">{item.post}</a>
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default NewsDetailsMain;