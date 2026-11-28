import React, { useEffect, useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { API_BASE_URL } from "../../config/api";
import PublishToggle from "../PublishToggle/PublishToggle";
import "../BlogManagement/BlogManagement.css";

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const BlogReview = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  useEffect(() => {
    let ignore = false;
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog-comments`);
        const result = await res.json();
        if (!ignore && res.ok && result.success) {
          setComments(result.data || []);
        }
      } catch {
        if (!ignore) showToast("Failed to load blog reviews.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchComments();
    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(
    () => ({
      total: comments.length,
      draft: comments.filter((c) => c.status === "Draft").length,
      published: comments.filter((c) => c.status === "Published").length,
    }),
    [comments]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return comments.filter((c) => {
      const blogTitle = (c.blog?.title || c.blogTitle || "").toLowerCase();
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q) ||
        blogTitle.includes(q);
      const matchStatus = !statusFilter || c.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [comments, search, statusFilter]);

  const toggleStatus = async (comment, nextStatus) => {
    const id = comment._id || comment.id;
    try {
      const res = await fetch(`${API_BASE_URL}/blog-comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to update comment status.");
      }
      setComments((prev) =>
        prev.map((c) => ((c._id || c.id) === id ? result.data : c))
      );
      showToast(`Comment ${nextStatus === "Published" ? "published" : "moved to draft"}`);
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  const handleDelete = async (comment) => {
    const id = comment._id || comment.id;
    try {
      const res = await fetch(`${API_BASE_URL}/blog-comments/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to delete comment.");
      }
      setComments((prev) => prev.filter((c) => (c._id || c.id) !== id));
      showToast("Comment deleted");
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  return (
    <div className="blog-management">
      <header className="blog-management__header">
        <div className="blog-management__heading">
          <span className="blog-management__heading-icon">💬</span>
          <div>
            <h1>Blog Review</h1>
            <p>Review incoming blog comments (Draft) and publish them to your website.</p>
          </div>
        </div>
      </header>

      <section className="blog-management__stats">
        <button
          type="button"
          className="blog-management__stat blog-management__stat--total"
          onClick={() => setStatusFilter("")}
        >
          <span className="blog-management__stat-icon">💬</span>
          <span><small>Total Reviews</small><b>{stats.total}</b></span>
        </button>
        <button
          type="button"
          className="blog-management__stat blog-management__stat--draft"
          onClick={() => setStatusFilter("Draft")}
        >
          <span className="blog-management__stat-icon">🕒</span>
          <span><small>Draft (Pending)</small><b>{stats.draft}</b></span>
        </button>
        <button
          type="button"
          className="blog-management__stat blog-management__stat--published"
          onClick={() => setStatusFilter("Published")}
        >
          <span className="blog-management__stat-icon">✅</span>
          <span><small>Published</small><b>{stats.published}</b></span>
        </button>
      </section>

      <section className="blog-management__toolbar">
        <label className="blog-management__search">
          <input
            type="text"
            placeholder="Search by blog, name, email or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="blog-management__seg">
          {["", "Draft", "Published"].map((st) => (
            <button
              type="button"
              key={st || "All"}
              className={statusFilter === st ? "is-active" : ""}
              onClick={() => setStatusFilter(st)}
            >
              {st || "All"}
            </button>
          ))}
        </div>
      </section>

      <section className="blog-management__card">
        <div className="blog-management__scroll">
          <table className="blog-management__table">
            <thead>
              <tr>
                <th className="c-num">#</th>
                <th>Blog</th>
                <th>Reviewer</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Status</th>
                <th className="c-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => (
                <tr key={c._id || c.id}>
                  <td className="c-num">{idx + 1}</td>
                  <td><strong>{c.blog?.title || c.blogTitle || "Blog Post"}</strong></td>
                  <td>
                    <div>
                      <strong>{c.name}</strong>
                      <div style={{ fontSize: "12px", color: "#5f7467" }}>{c.email}</div>
                    </div>
                  </td>
                  <td style={{ maxWidth: "300px" }}>{c.message}</td>
                  <td>{fmtDate(c.createdAt)}</td>
                  <td>
                    <PublishToggle
                      checked={c.status === "Published"}
                      onChange={() => toggleStatus(c, c.status === "Published" ? "Draft" : "Published")}
                      label={`Toggle publish status for ${c.name}'s comment`}
                    />
                  </td>
                  <td className="c-action">
                    <div className="blog-management__actions">
                      <button
                        type="button"
                        className="is-delete"
                        title="Delete"
                        aria-label={`Delete comment from ${c.name}`}
                        onClick={() => handleDelete(c)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && filtered.length === 0 && (
            <div className="blog-management__empty">
              <h4>No blog comments found</h4>
              <p>Comments submitted on blog pages appear here as Draft first.</p>
            </div>
          )}
        </div>
      </section>

      {toast && <div className="blog-management__toast" role="status">{toast}</div>}
    </div>
  );
};

export default BlogReview;
