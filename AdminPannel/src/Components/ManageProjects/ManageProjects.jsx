import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";
import PublishToggle from "../PublishToggle/PublishToggle";
import "./ManageProjects.css";

/* ---------- Icons ---------- */
const PATHS = {
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  check: "m5 12 5 5L20 7",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  eyeOff: "M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a15 15 0 0 1-3.2 3.7M6.6 6.6A15.5 15.5 0 0 0 3 12s4 6 9 6a8.8 8.8 0 0 0 3.4-.7M9.9 9.9a3 3 0 0 0 4.2 4.2",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  search: "m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
  chevron: "m6 9 6 6 6-6",
  reset: "M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5",
  plus: "M12 5v14M5 12h14",
  home: "m3 11 9-8 9 8M5 10v10h14V10M10 20v-6h4v6",
  building: "M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M15 9h4a1 1 0 0 1 1 1v11M2 21h20M8 7h3M8 11h3M8 15h3",
  bug: "M9 7a3 3 0 0 1 6 0v1H9V7ZM8 8h8v7a4 4 0 0 1-8 0V8ZM12 12v7M4 10l4 2M20 10l-4 2M4 18l4-2M20 18l-4-2",
  heart: "M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1Z",
  wood: "M12 3c-3 4-5 6-5 9a5 5 0 0 0 10 0c0-3-2-5-5-9ZM12 12v6",
  pencil: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21ZM12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z",
  calendar: "M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM4 10h16M8 3v4M16 3v4",
  x: "M18 6 6 18M6 6l12 12",
  first: "m11 17-5-5 5-5M18 17l-5-5 5-5",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  last: "m13 17 5-5-5-5M6 17l5-5-5-5",
  alert: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
};

const Icon = ({ name, size = 18 }) => (
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
  >
    <path d={PATHS[name]} />
  </svg>
);

/* ---------- Config & sample data ---------- */
const CATEGORY_META = {
  Residential: { icon: "home", cls: "residential" },
  Commercial: { icon: "building", cls: "commercial" },
  "Termite Control": { icon: "wood", cls: "termite" },
  "Bed Bug Control": { icon: "bug", cls: "bedbug" },
  "Rodent Control": { icon: "heart", cls: "rodent" },
};
const CATEGORIES = Object.keys(CATEGORY_META);
const LOCATIONS = ["Bhubaneswar", "Cuttack", "Puri", "Kendrapara", "Balasore", "Rourkela"];
const STATUSES = ["Published", "Draft", "Unpublished"];
const STATUS_META = {
  Published: { icon: "check", cls: "published" },
  Draft: { icon: "clock", cls: "draft" },
  Unpublished: { icon: "eyeOff", cls: "unpublished" },
};
const PAGE_SIZE = 5;

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const normalizeProject = (p) => {
  const imgs = Array.isArray(p.images) && p.images.length ? p.images : p.image ? [p.image] : [];
  const rawDescription = p.description || "";
  const plainDesc = p.desc || rawDescription.replace(/<[^>]+>/g, " ").trim();
  return {
    ...p,
    id: p._id || p.id,
    description: plainDesc,
    rawDescription,
    images: imgs,
    imageCount: imgs.length,
    status: p.status || "Published",
    date: p.createdAt || new Date().toISOString(),
  };
};

/* ---------- Small pieces ---------- */
const Thumb = ({ src, category, size = "md" }) => {
  const meta = CATEGORY_META[category] || CATEGORY_META.Residential;
  return src ? (
    <img src={src} alt="" className={`ManageProjects-thumb ManageProjects-thumb-${size}`} />
  ) : (
    <span
      className={`ManageProjects-thumb ManageProjects-thumb-${size} ManageProjects-thumb-ph ManageProjects-tone-${meta.cls}`}
    >
      <Icon name={meta.icon} size={size === "sm" ? 15 : 22} />
    </span>
  );
};

const Select = ({ value, onChange, options, allLabel }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <div className="ManageProjects-select" ref={ref}>
      <button
        type="button"
        className={`ManageProjects-select-btn ${open ? "ManageProjects-select-btn-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="ManageProjects-select-text">{value || allLabel}</span>
        <span className={`ManageProjects-select-chev ${open ? "ManageProjects-select-chev-open" : ""}`}>
          <Icon name="chevron" size={16} />
        </span>
      </button>
      {open && (
        <ul className="ManageProjects-select-menu" role="listbox">
          {[allLabel, ...options].map((o) => {
            const isAll = o === allLabel;
            const active = (isAll && !value) || value === o;
            return (
              <li
                key={o}
                role="option"
                aria-selected={active}
                className={`ManageProjects-select-item ${active ? "ManageProjects-select-item-active" : ""}`}
                onClick={() => {
                  onChange(isAll ? "" : o);
                  setOpen(false);
                }}
              >
                {o}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="ManageProjects-overlay" onMouseDown={onClose}>
      <div className="ManageProjects-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="ManageProjects-modal-head">
          <h3 className="ManageProjects-modal-title">{title}</h3>
          <button type="button" className="ManageProjects-modal-close" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ---------- Main component ---------- */
const ManageProjects = ({ onAdd, onView, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2400);
  };

  useEffect(() => {
    let ignore = false;
    const fetchProjects = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/categories`),
        ]);
        const result = await projRes.json();
        const catResult = await catRes.json();
        if (!ignore) {
          if (projRes.ok && result.success) {
            setProjects((result.data || []).map(normalizeProject));
          }
          if (catRes.ok && catResult.success) {
            setCategoryOptions((catResult.data || []).map((c) => c.name));
          }
        }
      } catch {
        if (!ignore) showToast("Failed to load projects from server.");
      }
    };
    fetchProjects();
    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(
    () => ({
      total: projects.length,
      published: projects.filter((p) => p.status === "Published").length,
      draft: projects.filter((p) => p.status === "Draft").length,
      unpublished: projects.filter((p) => p.status === "Unpublished").length,
    }),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (!q || p.title.toLowerCase().includes(q)) &&
        (!category || p.category === category) &&
        (!location || p.location === location) &&
        (!status || p.status === status)
    );
  }, [projects, search, category, location, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageNumbers = useMemo(() => {
    const max = 5;
    let s = Math.max(1, current - Math.floor(max / 2));
    let e = Math.min(totalPages, s + max - 1);
    s = Math.max(1, e - max + 1);
    return Array.from({ length: e - s + 1 }, (_, i) => s + i);
  }, [current, totalPages]);

  const hasFilters = search || category || location || status;
  const reset = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setStatus("");
    setPage(1);
  };

  const openEdit = (p) => {
    if (onEdit) return onEdit(p);
    navigate("/projects/add", { state: { project: p } });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setEditing(null);
  };

  const toggleProjectStatus = async (p) => {
    const nextStatus = p.status === "Published" ? "Unpublished" : "Published";
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to update project status");
      }
      setProjects((prev) =>
        prev.map((item) => (item.id === p.id ? normalizeProject(result.data) : item))
      );
      showToast(`Project ${nextStatus.toLowerCase()}`);
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${deleting.id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to delete project");
      }
      setProjects((prev) => prev.filter((p) => p.id !== deleting.id));
      if (onDelete) onDelete(deleting);
      setDeleting(null);
      showToast("Project deleted");
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  const statCards = [
    { key: "total", label: "Total Projects", value: stats.total, icon: "layers" },
    { key: "published", label: "Published", value: stats.published, icon: "check" },
    { key: "draft", label: "Draft", value: stats.draft, icon: "clock" },
    { key: "unpublished", label: "Unpublished", value: stats.unpublished, icon: "eyeOff" },
  ];

  return (
    <section className="ManageProjects">
      {/* Header */}
      <header className="ManageProjects-header">
        <div className="ManageProjects-header-icon">
          <Icon name="layers" size={26} />
        </div>
        <div className="ManageProjects-header-text">
          <h1 className="ManageProjects-heading">Manage Projects</h1>
          <p className="ManageProjects-subheading">View, edit, update and manage all your pest-control projects.</p>
        </div>
      </header>

      {/* Stats */}
      <div className="ManageProjects-stats">
        {statCards.map((s) => (
          <div key={s.key} className={`ManageProjects-stat ManageProjects-stat-${s.key}`}>
            <span className="ManageProjects-stat-icon">
              <Icon name={s.icon} size={24} />
            </span>
            <div className="ManageProjects-stat-body">
              <p className="ManageProjects-stat-label">{s.label}</p>
              <p className="ManageProjects-stat-value">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="ManageProjects-filters">
        <div className="ManageProjects-search">
          <Icon name="search" size={18} />
          <input
            type="text"
            className="ManageProjects-search-input"
            placeholder="Search projects by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && (
            <button type="button" className="ManageProjects-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
              <Icon name="x" size={14} />
            </button>
          )}
        </div>
        <Select value={category} onChange={(v) => { setCategory(v); setPage(1); }} options={categoryOptions} allLabel="All Category" />
        <Select value={location} onChange={(v) => { setLocation(v); setPage(1); }} options={LOCATIONS} allLabel="All Location" />
        <Select value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUSES} allLabel="All Status" />
        <button type="button" className="ManageProjects-reset" onClick={reset} disabled={!hasFilters}>
          <Icon name="reset" size={16} />
          <span>Reset</span>
        </button>
        <button
          type="button"
          className="ManageProjects-add"
          onClick={() => (onAdd ? onAdd() : navigate("/projects/add"))}
        >
          <Icon name="plus" size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Table card */}
      <div className="ManageProjects-card">
        <div className="ManageProjects-table-wrap">
          <table className="ManageProjects-table">
            <colgroup>
              <col className="ManageProjects-col-num" />
              <col className="ManageProjects-col-title" />
              <col className="ManageProjects-col-category" />
              <col className="ManageProjects-col-location" />
              <col className="ManageProjects-col-images" />
              <col className="ManageProjects-col-status" />
              <col className="ManageProjects-col-date" />
              <col className="ManageProjects-col-action" />
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Project Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Images</th>
                <th>Status</th>
                <th>Created Date</th>
                <th className="ManageProjects-th-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const cm = CATEGORY_META[p.category] || CATEGORY_META.Residential;
                const sm = STATUS_META[p.status] || STATUS_META.Published;
                const extra = Math.max(0, p.imageCount - 3);
                return (
                  <tr key={p.id} className="ManageProjects-row" style={{ "--MP-i": i }}>
                    <td data-label="#" className="ManageProjects-cell-num">{start + i + 1}</td>
                    <td data-label="Project" className="ManageProjects-td-title">
                      <div className="ManageProjects-title-box">
                        <Thumb src={p.images[0]} category={p.category} />
                        <div className="ManageProjects-title-text">
                          <p className="ManageProjects-title">{p.title}</p>
                          <p className="ManageProjects-desc">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td data-label="Category">
                      <span className={`ManageProjects-badge ManageProjects-cat-${cm.cls}`}>
                        <Icon name={cm.icon} size={13} />
                        <span className="ManageProjects-badge-text">{p.category}</span>
                      </span>
                    </td>
                    <td data-label="Location">
                      <span className="ManageProjects-loc">
                        <Icon name="pin" size={15} />
                        <span className="ManageProjects-badge-text">{p.location}</span>
                      </span>
                    </td>
                    <td data-label="Images">
                      <div className="ManageProjects-imgs">
                        {[0, 1, 2].map((n) => (
                          <Thumb key={n} src={p.images[n]} category={p.category} size="sm" />
                        ))}
                        {extra > 0 && <span className="ManageProjects-more">+{extra}</span>}
                      </div>
                    </td>
                    <td data-label="Status">
                      <PublishToggle
                        checked={p.status === "Published"}
                        onChange={() => toggleProjectStatus(p)}
                        label={`Toggle publish status for ${p.title}`}
                      />
                    </td>
                    <td data-label="Created">
                      <span className="ManageProjects-date">
                        <Icon name="calendar" size={15} />
                        {fmtDate(p.date)}
                      </span>
                    </td>
                    <td data-label="Action">
                      <div className="ManageProjects-actions">
                        <button type="button" className="ManageProjects-act ManageProjects-act-view" title="View" aria-label="View" onClick={() => (onView ? onView(p) : setViewing(p))}>
                          <Icon name="eye" size={16} />
                        </button>
                        <button type="button" className="ManageProjects-act ManageProjects-act-edit" title="Edit" aria-label="Edit" onClick={() => openEdit(p)}>
                          <Icon name="pencil" size={16} />
                        </button>
                        <button type="button" className="ManageProjects-act ManageProjects-act-delete" title="Delete" aria-label="Delete" onClick={() => setDeleting(p)}>
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="ManageProjects-empty">
              <span className="ManageProjects-empty-icon">
                <Icon name="search" size={28} />
              </span>
              <p className="ManageProjects-empty-title">No projects found</p>
              <p className="ManageProjects-empty-text">Try changing your search or filters.</p>
              <button type="button" className="ManageProjects-reset" onClick={reset}>
                <Icon name="reset" size={16} />
                <span>Reset filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer / pagination */}
        <div className="ManageProjects-footer">
          <p className="ManageProjects-showing">
            Showing {filtered.length === 0 ? 0 : start + 1} to {Math.min(start + PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} projects
          </p>
          <nav className="ManageProjects-pager" aria-label="Pagination">
            <button type="button" className="ManageProjects-page" disabled={current === 1} onClick={() => setPage(1)} aria-label="First page">
              <Icon name="first" size={16} />
            </button>
            <button type="button" className="ManageProjects-page" disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Previous page">
              <Icon name="prev" size={16} />
            </button>
            {pageNumbers.map((n) => (
              <button
                key={n}
                type="button"
                className={`ManageProjects-page ${n === current ? "ManageProjects-page-active" : ""}`}
                onClick={() => setPage(n)}
                aria-current={n === current ? "page" : undefined}
              >
                {n}
              </button>
            ))}
            <button type="button" className="ManageProjects-page" disabled={current === totalPages} onClick={() => setPage(current + 1)} aria-label="Next page">
              <Icon name="next" size={16} />
            </button>
            <button type="button" className="ManageProjects-page" disabled={current === totalPages} onClick={() => setPage(totalPages)} aria-label="Last page">
              <Icon name="last" size={16} />
            </button>
          </nav>
        </div>
      </div>

      {/* View modal */}
      {viewing && (
        <Modal title="Project Details" onClose={() => setViewing(null)}>
          <div className="ManageProjects-view">
            <div className="ManageProjects-view-top">
              <Thumb src={viewing.images[0]} category={viewing.category} />
              <div>
                <p className="ManageProjects-title">{viewing.title}</p>
                <span className={`ManageProjects-badge ManageProjects-status-${(STATUS_META[viewing.status] || STATUS_META.Published).cls}`}>
                  <Icon name={(STATUS_META[viewing.status] || STATUS_META.Published).icon} size={13} />
                  {viewing.status}
                </span>
              </div>
            </div>
            <p className="ManageProjects-view-desc">{viewing.description}</p>
            <dl className="ManageProjects-view-list">
              <div><dt>Category</dt><dd>{viewing.category}</dd></div>
              <div><dt>Location</dt><dd>{viewing.location}</dd></div>
              <div><dt>Images</dt><dd>{viewing.imageCount}</dd></div>
              <div><dt>Created</dt><dd>{fmtDate(viewing.date)}</dd></div>
            </dl>
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {editing && (
        <Modal title="Edit Project" onClose={() => setEditing(null)}>
          <form className="ManageProjects-form" onSubmit={saveEdit} noValidate>
            <label className="ManageProjects-label">
              Project Title
              <input
                className={`ManageProjects-field ${editErrors.title ? "ManageProjects-field-error" : ""}`}
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
              {editErrors.title && <span className="ManageProjects-error">{editErrors.title}</span>}
            </label>
            <div className="ManageProjects-form-row">
              <div className="ManageProjects-label">
                Category
                <Select value={editing.category} onChange={(v) => setEditing({ ...editing, category: v || editing.category })} options={CATEGORIES} allLabel={editing.category} />
              </div>
              <div className="ManageProjects-label">
                Status
                <Select value={editing.status} onChange={(v) => setEditing({ ...editing, status: v || editing.status })} options={STATUSES} allLabel={editing.status} />
              </div>
            </div>
            <label className="ManageProjects-label">
              Location
              <input
                className={`ManageProjects-field ${editErrors.location ? "ManageProjects-field-error" : ""}`}
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
              />
              {editErrors.location && <span className="ManageProjects-error">{editErrors.location}</span>}
            </label>
            <div className="ManageProjects-modal-actions">
              <button type="button" className="ManageProjects-btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="ManageProjects-btn-main">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete modal */}
      {deleting && (
        <Modal title="Delete Project" onClose={() => setDeleting(null)}>
          <div className="ManageProjects-confirm">
            <span className="ManageProjects-confirm-icon">
              <Icon name="alert" size={28} />
            </span>
            <p className="ManageProjects-confirm-text">
              Are you sure you want to delete <strong>{deleting.title}</strong>? This action cannot be undone.
            </p>
            <div className="ManageProjects-modal-actions">
              <button type="button" className="ManageProjects-btn-ghost" onClick={() => setDeleting(null)}>Cancel</button>
              <button type="button" className="ManageProjects-btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </Modal>
      )}

      {toast && <div className="ManageProjects-toast">{toast}</div>}
    </section>
  );
};

export default ManageProjects;