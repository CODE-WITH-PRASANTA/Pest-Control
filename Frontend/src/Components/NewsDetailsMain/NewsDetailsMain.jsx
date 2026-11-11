import React, { useState } from "react";
import "./NewsDetailsMain.css";

const recentPosts = [
  {
    title: "5 Eco-Friendly Pest Control Methods You Should Know",
    image: "/assets/news/news-4.jpg",
  },
  {
    title: "How to Keep Your Home Pest-Free This Winter",
    image: "/assets/news/news-5.jpg",
  },
  {
    title: "The Best Natural Remedies for Common Household Pests",
    image: "/assets/news/news-6.jpg",
  },
];

const categories = [
  "Ant Infestation",
  "Bed Bug Treatment",
  "Cockroach Control",
  "Mosquito Control",
  "Pest Identification",
  "Termite Control",
];

const tags = [
  "Bedbugs",
  "Bugs",
  "Extermination",
  "Hygiene",
  "Pest",
  "Safety",
];

const comments = [
  {
    name: "Kevin Martin",
    image: "/assets/news/user-1.jpg",
    message:
      "Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor.",
  },
  {
    name: "Sarah Albert",
    image: "/assets/news/user-2.jpg",
    message:
      "Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor.",
  },
];

const recentComments = [
  "A WordPress commenter on launch new mobile app",
  "John Doe on template comments",
  "A WordPress commenter on launch new mobile app",
  "John Doe on template comments",
];

const NewsDetailsMain = () => {
  const [search, setSearch] = useState("");
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setCommentData({ name: "", email: "", message: "" });
  };

  return (
    <main className="news-details-main">
      <div className="news-details-main-container">
        <div className="news-details-main-layout">

          {/* MAIN ARTICLE */}
          <article className="news-details-main-article">
            <div className="news-details-main-featured-image">
              <img
                src="/assets/news/news-2.jpg"
                alt="Professional pest control treatment"
              />
              <span className="news-details-main-date">
                <strong>28</strong>
                <small>AUG</small>
              </span>
            </div>

            <div className="news-details-main-meta">
              <span><i>●</i> Admin</span>
              <span><i>●</i> 02 Comments</span>
            </div>

            <div className="news-details-main-body">
              <h1>
                We Ensure Best Quality Bugs & Pest Control Service
              </h1>
              <p>
                Mauris non dignissim purus, ac commodo diam. Donec sit amet
                lacinia nulla. Aliquam quis purus in justo pulvinar tempor.
                Mauris non dignissim purus, ac commodo diam. Donec sit amet
                lacinia nulla. Aliquam quis purus in justo pulvinar tempor.
                Phasellus a rhoncus erat. Vivamus vel eros vitae eros
                aliquet pellentesque.
              </p>
              <p>
                Mauris non dignissim purus, ac commodo diam. Donec sit amet
                lacinia nulla. Aliquam quis purus in justo pulvinar tempor.
                Aliquam quis purus in justo pulvinar tempor. Quisque vitae
                odio nec lacus interdum tempus. Phasellus a rhoncus erat.
                Vivamus vel eros vitae eros aliquet pellentesque.
              </p>
              <p>
                Mauris non dignissim purus, ac commodo diam. Donec sit amet
                lacinia nulla. Aliquam quis purus in justo pulvinar tempor.
                Quisque vitae odio nec lacus interdum tempus. Phasellus a
                rhoncus erat. Vivamus vel eros vitae eros aliquet
                pellentesque. Sed vitae leo vitae nisi pellentesque semper.
              </p>
            </div>

            {/* TAGS AND SOCIAL */}
            <div className="news-details-main-share-row">
              <div className="news-details-main-tags">
                <span className="news-details-main-share-label">Tags</span>
                <a href="#tags">Business</a>
                <a href="#tags">Agency</a>
              </div>

              <div className="news-details-main-socials">
                <a href="#twitter" aria-label="Twitter">𝕏</a>
                <a href="#facebook" aria-label="Facebook">f</a>
                <a href="#pinterest" aria-label="Pinterest">p</a>
                <a href="#instagram" aria-label="Instagram">◎</a>
              </div>
            </div>

            {/* RELATED POSTS */}
            <div className="news-details-main-related-posts">
              <a href="#related" className="news-details-main-related-card">
                <span>Bring to the table win-win survival strategies</span>
                <b>↗</b>
              </a>

              <a href="#related" className="news-details-main-related-card">
                <span>How to lead a healthy & well-balanced life</span>
                <b>↗</b>
              </a>
            </div>

            {/* COMMENTS */}
            <section className="news-details-main-comments">
              <h2>2 Comments</h2>

              {comments.map((comment, index) => (
                <div className="news-details-main-comment-item" key={index}>
                  <img src={comment.image} alt={comment.name} />

                  <div className="news-details-main-comment-content">
                    <div className="news-details-main-comment-top">
                      <h3>{comment.name}</h3>
                      <button type="button">Reply</button>
                    </div>
                    <p>{comment.message}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* COMMENT FORM */}
            <section className="news-details-main-leave-comment">
              <h2>Leave a Comment</h2>

              <form onSubmit={handleSubmit}>
                <div className="news-details-main-comment-input-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={commentData.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={commentData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Enter Message"
                  value={commentData.message}
                  onChange={handleChange}
                  required
                />

                <button type="submit" className="news-details-main-comment-submit-btn">
                  Submit Comment <span>↗</span>
                </button>

                {submitted && (
                  <p className="news-details-main-comment-success" role="status">
                    ✓ Your comment has been submitted successfully!
                  </p>
                )}
              </form>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="news-details-main-sidebar">

            {/* SEARCH */}
            <form
              className="news-details-main-sidebar-search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                placeholder="Search here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" aria-label="Search">⌕</button>
            </form>

            {/* LATEST POSTS */}
            <div className="news-details-main-sidebar-box news-details-main-latest-posts-box">
              <h3>Latest Posts</h3>

              {recentPosts.map((post, index) => (
                <a href="#latest" className="news-details-main-latest-post" key={index}>
                  <img src={post.image} alt={post.title} />
                  <div>
                    <span>● Admin</span>
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
                    {category}
                    <span>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* SIDEBAR TAGS */}
            <div className="news-details-main-sidebar-box">
              <h3>Tags</h3>
              <div className="news-details-main-sidebar-tags">
                {tags.map((tag, index) => (
                  <a href="#tag" key={index}>{tag}</a>
                ))}
              </div>
            </div>

            {/* RECENT COMMENTS */}
            <div className="news-details-main-sidebar-box news-details-main-recent-comments-box">
              <h3>Recent Comments</h3>

              {recentComments.map((comment, index) => (
                <div className="news-details-main-recent-comment" key={index}>
                  <span>●</span>
                  <p>{comment}</p>
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