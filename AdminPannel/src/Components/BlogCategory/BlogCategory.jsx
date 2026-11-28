import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_BASE_URL } from "../../config/api";
import PublishToggle from "../PublishToggle/PublishToggle";
import "../BlogManagement/BlogManagement.css";

const EMPTY = { name: "", description: "", status: "Active" };

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  useEffect(() => {
    let ignore = false;
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const result = await res.json();
        if (!ignore && res.ok && result.success) {
          setCategories(result.data || []);
        }
      } catch {
        if (!ignore) showToast("Failed to load categories from server.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchCategories();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }
    if (saving) return;
    setSaving(true);
    setError("");

    try {
      const url = editingId
        ? `${API_BASE_URL}/categories/${editingId}`
        : `${API_BASE_URL}/categories`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim(),
          status: form.status,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        setError(result.message || "Failed to save category.");
        return;
      }

      if (editingId) {
        setCategories((prev) =>
          prev.map((c) => ((c._id || c.id) === editingId ? result.data : c))
        );
        showToast("Category updated successfully");
      } else {
        setCategories((prev) => [result.data, ...prev]);
        showToast("Category added successfully");
      }

      setForm(EMPTY);
      setEditingId(null);
    } catch {
      setError("Could not connect to backend server.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id || cat.id);
    setForm({
      name: cat.name || "",
      description: cat.description || "",
      status: cat.status || "Active",
    });
    setError("");
  };

  const handleToggleStatus = async (cat) => {
    const id = cat._id || cat.id;
    const nextStatus = cat.status === "Active" ? "Inactive" : "Active";
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to update category status");
      }
      setCategories((prev) =>
        prev.map((c) => ((c._id || c.id) === id ? result.data : c))
      );
      showToast(`Category ${nextStatus.toLowerCase()}`);
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  const handleDelete = async (cat) => {
    const id = cat._id || cat.id;
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to delete category");
      }
      setCategories((prev) => prev.filter((c) => (c._id || c.id) !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm(EMPTY);
      }
      showToast("Category deleted");
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  return (
    <div className="blog-management">
      <header className="blog-management__header">
        <div className="blog-management__heading">
          <span className="blog-management__heading-icon">🏷️</span>
          <div>
            <h1>Blog Categories</h1>
            <p>Create and manage dynamic blog categories stored in the database.</p>
          </div>
        </div>
      </header>

      <section className="blog-management__card" style={{ padding: "22px", marginBottom: "20px" }}>
        <form className="blog-management__form" onSubmit={handleSubmit} noValidate>
          <div className="blog-management__field">
            <label>Category Name <em>*</em></label>
            <input
              type="text"
              placeholder="e.g. Termite Control"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setError("");
              }}
            />
            {error && <span className="blog-management__error">{error}</span>}
          </div>

          <div className="blog-management__field">
            <label>Status</label>
            <div className="blog-management__seg">
              {["Active", "Inactive"].map((s) => (
                <button
                  type="button"
                  key={s}
                  className={form.status === s ? "is-active" : ""}
                  onClick={() => setForm({ ...form, status: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-management__field is-full">
            <label>Description</label>
            <input
              type="text"
              placeholder="Short description (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="blog-management__field is-full" style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            {editingId && (
              <button
                type="button"
                className="blog-management__btn blog-management__btn--light"
                onClick={() => {
                  setEditingId(null);
                  setForm(EMPTY);
                  setError("");
                }}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="blog-management__btn blog-management__btn--primary"
              disabled={saving}
            >
              {saving ? "Saving..." : editingId ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </section>

      <section className="blog-management__card">
        <div className="blog-management__scroll">
          <table className="blog-management__table">
            <thead>
              <tr>
                <th className="c-num">#</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Status</th>
                <th className="c-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat._id || cat.id}>
                  <td className="c-num">{idx + 1}</td>
                  <td><strong>{cat.name}</strong></td>
                  <td>{cat.description || "—"}</td>
                  <td>
                    <PublishToggle
                      checked={cat.status === "Active"}
                      onChange={() => handleToggleStatus(cat)}
                      label={`Toggle ${cat.name} status`}
                    />
                  </td>
                  <td className="c-action">
                    <div className="blog-management__actions">
                      <button type="button" className="is-edit" title="Edit" aria-label={`Edit ${cat.name}`} onClick={() => handleEdit(cat)}>
                        <FiEdit2 size={16} />
                      </button>
                      <button type="button" className="is-delete" title="Delete" aria-label={`Delete ${cat.name}`} onClick={() => handleDelete(cat)}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && categories.length === 0 && (
            <div className="blog-management__empty">
              <h4>No categories found</h4>
              <p>Add a category above to use it in Blog Posting.</p>
            </div>
          )}
        </div>
      </section>

      {toast && <div className="blog-management__toast" role="status">{toast}</div>}
    </div>
  );
};

export default BlogCategory;
