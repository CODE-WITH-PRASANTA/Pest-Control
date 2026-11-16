import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ManageService.css";

/* ------------------------------- Icons ------------------------------- */
const ICONS = {
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  layers: (<><path d="M12 2l10 5-10 5L2 7z" /><path d="M2 12l10 5 10-5" /><path d="M2 17l10 5 10-5" /></>),
  check: <path d="M20 6L9 17l-5-5" />,
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  eyeoff: (<><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><path d="M2 2l20 20" /></>),
  eye: (<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>),
  edit: (<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>),
  trash: (<><path d="M3 6h18" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></>),
  down: <path d="M6 9l6 6 6-6" />,
  left: <path d="M15 18l-6-6 6-6" />,
  right: <path d="M9 18l6-6-6-6" />,
  dleft: (<><path d="M11 17l-5-5 5-5" /><path d="M18 17l-5-5 5-5" /></>),
  dright: (<><path d="M13 17l5-5-5-5" /><path d="M6 17l5-5-5-5" /></>),
  plus: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  reset: (<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>),
  pin: (<><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  cal: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  x: (<><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>),
  alert: (<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></>),
  shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>),
};

const Icon = ({ name, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[name]}
  </svg>
);

/* ------------------------------- Data -------------------------------- */
const CATEGORIES = {
  "Termite Control": { emoji: "🪵", bg: "#fef3c7", fg: "#b45309", a: "#fcd34d", b: "#d97706" },
  "Bed Bug Control": { emoji: "🐞", bg: "#ffe0e3", fg: "#be123c", a: "#fda4af", b: "#e11d48" },
  "Rodent Control": { emoji: "🐀", bg: "#ede4ff", fg: "#6d28d9", a: "#c4b5fd", b: "#7c3aed" },
  "Cockroach Control": { emoji: "🪳", bg: "#dbeafe", fg: "#1d4ed8", a: "#93c5fd", b: "#2563eb" },
  "General Pest Control": { emoji: "🏠", bg: "#dcf8e3", fg: "#15803d", a: "#86efac", b: "#16a34a" },
  "Mosquito Control": { emoji: "🦟", bg: "#cffafe", fg: "#0e7490", a: "#67e8f9", b: "#0891b2" },
  Disinfection: { emoji: "🧴", bg: "#e0f2fe", fg: "#0369a1", a: "#7dd3fc", b: "#0284c7" },
};
const CATEGORY_LIST = Object.keys(CATEGORIES);
const LOCATIONS = ["Bhubaneswar", "Cuttack", "Puri", "Kendrapara", "Jajpur", "Balasore"];
const STATUSES = ["Published", "Draft", "Unpublished"];
const STATUS_ICON = { Published: "check", Draft: "clock", Unpublished: "eyeoff" };
const PER_PAGE = 5;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const FIRST = [
  ["Termite Control", "Safe and long-lasting termite treatment for your home.", "Termite Control", "Bhubaneswar", "Published", "2026-11-15"],
  ["Bed Bug Treatment", "Eliminate bed bugs from your home and furniture.", "Bed Bug Control", "Cuttack", "Published", "2026-11-14"],
  ["Rodent Control", "Keep your space safe from rats and mice.", "Rodent Control", "Puri", "Draft", "2026-11-14"],
  ["Cockroach Control", "Effective and hygienic cockroach removal service.", "Cockroach Control", "Kendrapara", "Unpublished", "2026-11-13"],
  ["General Pest Control", "Complete pest management for home and office.", "General Pest Control", "Bhubaneswar", "Published", "2026-11-12"],
];

/* date helpers (no timezone surprises) */
const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const toIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmtDate = (s) => parse(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const TODAY = toIso(new Date());

const buildData = () => {
  const names = ["Ant Control", "Mosquito Fogging", "Office Disinfection", "Wood Borer Treatment", "Kitchen Pest Care", "Garden Pest Care", "Warehouse Fumigation", "Hotel Pest Audit"];
  const drafts = [3, 8, 14];
  const rest = Array.from({ length: 19 }, (_, i) => {
    const cat = CATEGORY_LIST[(i + 2) % CATEGORY_LIST.length];
    const d = new Date(2026, 10, 11);
    d.setDate(d.getDate() - Math.floor(i / 1.5));
    return [
      `${names[i % names.length]}${i >= names.length ? ` Plus` : ""}`,
      `Professional ${cat.toLowerCase()} service by trained experts.`,
      cat,
      LOCATIONS[(i + 1) % LOCATIONS.length],
      drafts.includes(i) ? "Draft" : i === 11 ? "Unpublished" : "Published",
      toIso(d),
    ];
  });
  return [...FIRST, ...rest].map(([title, desc, category, location, status, date], i) => ({ id: i + 1, title, desc, category, location, status, date }));
};

const EMPTY = { title: "", desc: "", category: CATEGORY_LIST[0], location: LOCATIONS[0], status: "Published", date: TODAY };

/* ----------------------------- Small parts --------------------------- */
const Thumb = ({ category, size }) => {
  const c = CATEGORIES[category];
  return (
    <span className={`manage-service__thumb manage-service__thumb--${size}`} style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})` }}>
      {c.emoji}
    </span>
  );
};

/* Embossed mini calendar tile */
const CalTile = ({ date }) => {
  const d = parse(date);
  return (
    <span className="manage-service__cal" aria-hidden="true">
      <i>{MONTHS[d.getMonth()].slice(0, 3)}</i>
      <b>{d.getDate()}</b>
    </span>
  );
};

const Select = ({ value, options, onChange, allLabel }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const items = allLabel ? ["", ...options] : options;
  return (
    <div className={`manage-service__select ${open ? "is-open" : ""}`} ref={ref}>
      <button type="button" className="manage-service__select-btn" onClick={() => setOpen(!open)}>
        <span>{value || allLabel}</span>
        <Icon name="down" size={16} />
      </button>
      {open && (
        <ul className="manage-service__select-menu">
          {items.map((o) => (
            <li key={o || "all"}>
              <button type="button" className={o === value ? "is-active" : ""} onClick={() => { onChange(o); setOpen(false); }}>
                {o || allLabel}
                {o === value && <Icon name="check" size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* Embossed calendar date picker (opens inline) */
const Calendar = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const sel = parse(value);
  const [view, setView] = useState({ y: sel.getFullYear(), m: sel.getMonth() });

  const shift = (n) => setView((v) => {
    const d = new Date(v.y, v.m + n, 1);
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const lead = new Date(view.y, view.m, 1).getDay();
  const total = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  const pick = (day) => { onChange(toIso(new Date(view.y, view.m, day))); setOpen(false); };

  return (
    <div className="manage-service__picker">
      <button type="button" className={`manage-service__picker-btn ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)}>
        <CalTile date={value} />
        <span>{fmtDate(value)}</span>
        <Icon name="down" size={16} />
      </button>
      {open && (
        <div className="manage-service__calendar">
          <div className="manage-service__calendar-head">
            <button type="button" onClick={() => shift(-1)} aria-label="Previous month"><Icon name="left" size={16} /></button>
            <strong>{MONTHS[view.m]} {view.y}</strong>
            <button type="button" onClick={() => shift(1)} aria-label="Next month"><Icon name="right" size={16} /></button>
          </div>
          <div className="manage-service__calendar-grid">
            {DAYS.map((d) => <em key={d}>{d}</em>)}
            {cells.map((day, i) => {
              if (!day) return <span key={`e${i}`} />;
              const iso = toIso(new Date(view.y, view.m, day));
              return (
                <button type="button" key={iso} className={`${iso === value ? "is-selected" : ""} ${iso === TODAY ? "is-today" : ""}`} onClick={() => pick(day)}>
                  {day}
                </button>
              );
            })}
          </div>
          <button type="button" className="manage-service__calendar-today" onClick={() => { onChange(TODAY); setView({ y: parse(TODAY).getFullYear(), m: parse(TODAY).getMonth() }); setOpen(false); }}>
            Today
          </button>
        </div>
      )}
    </div>
  );
};

const Modal = ({ title, subtitle, onClose, footer, children, wide }) => {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="manage-service__overlay" onMouseDown={onClose}>
      <div className={`manage-service__modal ${wide ? "is-wide" : ""}`} onMouseDown={(e) => e.stopPropagation()}>
        <div className="manage-service__modal-head">
          <div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
          <button type="button" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        </div>
        <div className="manage-service__modal-body">{children}</div>
        {footer && <div className="manage-service__modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

/* ------------------------------ Component ---------------------------- */
const ManageService = () => {
  const [services, setServices] = useState(buildData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const count = (s) => services.filter((x) => x.status === s).length;
  const stats = [
    { label: "Total Services", value: services.length, icon: "layers", cls: "total", filter: "" },
    { label: "Published", value: count("Published"), icon: "check", cls: "published", filter: "Published" },
    { label: "Draft", value: count("Draft"), icon: "clock", cls: "draft", filter: "Draft" },
    { label: "Unpublished", value: count("Unpublished"), icon: "eyeoff", cls: "unpublished", filter: "Unpublished" },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return services.filter(
      (s) =>
        (!q || s.title.toLowerCase().includes(q)) &&
        (!category || s.category === category) &&
        (!location || s.location === location) &&
        (!status || s.status === status)
    );
  }, [services, search, category, location, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const start = (cur - 1) * PER_PAGE;
  const rows = filtered.slice(start, start + PER_PAGE);
  const first = Math.max(1, Math.min(cur - 2, pages - 4));
  const numbers = Array.from({ length: Math.min(5, pages) }, (_, i) => first + i);

  const change = (setter) => (v) => { setter(v); setPage(1); };
  const hasFilter = search || category || location || status;
  const reset = () => { setSearch(""); setCategory(""); setLocation(""); setStatus(""); setPage(1); };

  const ids = rows.map((r) => r.id);
  const allChecked = ids.length > 0 && ids.every((id) => selected.includes(id));
  const toggleAll = () => setSelected((s) => (allChecked ? s.filter((x) => !ids.includes(x)) : [...new Set([...s, ...ids])]));
  const toggleOne = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const close = () => { setModal(null); setError(""); };
  const openAdd = () => { setForm({ ...EMPTY, date: TODAY }); setModal({ type: "form" }); };
  const openEdit = (s) => {
    setForm({ title: s.title, desc: s.desc, category: s.category, location: s.location, status: s.status, date: s.date });
    setModal({ type: "form", item: s });
  };

  const save = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Service title is required.");
    const data = { ...form, title: form.title.trim(), desc: form.desc.trim() || "No description added." };
    if (modal.item) {
      setServices((l) => l.map((s) => (s.id === modal.item.id ? { ...s, ...data } : s)));
      setToast("Service updated successfully");
    } else {
      const id = Math.max(0, ...services.map((s) => s.id)) + 1;
      setServices((l) => [{ id, ...data }, ...l]);
      setPage(1);
      setToast("Service added successfully");
    }
    close();
  };

  const remove = () => {
    const del = modal.type === "bulk" ? selected : [modal.item.id];
    setServices((l) => l.filter((s) => !del.includes(s.id)));
    setSelected((s) => s.filter((id) => !del.includes(id)));
    setToast(del.length > 1 ? `${del.length} services deleted` : "Service deleted");
    close();
  };

  const setStatusFor = (s, st) => {
    setServices((l) => l.map((x) => (x.id === s.id ? { ...x, status: st } : x)));
    setToast(`Service ${st.toLowerCase()}`);
    close();
  };

  return (
    <div className="manage-service">
      {/* Header */}
      <header className="manage-service__header">
        <div className="manage-service__heading">
          <span className="manage-service__heading-icon"><Icon name="wrench" size={24} /></span>
          <div>
            <h1>Manage Service</h1>
            <p>View, edit, publish, unpublish and manage all services.</p>
          </div>
        </div>
        <div className="manage-service__banner">
          <span><Icon name="shield" size={24} /></span>
          <strong>Pest Control<br />Service Management</strong>
        </div>
      </header>

      {/* Stats */}
      <section className="manage-service__stats">
        {stats.map((s) => (
          <button type="button" key={s.label} className={`manage-service__stat manage-service__stat--${s.cls}`} onClick={() => change(setStatus)(s.filter)}>
            <span className="manage-service__stat-icon"><Icon name={s.icon} size={28} /></span>
            <span><small>{s.label}</small><b>{s.value}</b></span>
          </button>
        ))}
      </section>

      {/* Toolbar */}
      <section className="manage-service__toolbar">
        <label className="manage-service__search">
          <Icon name="search" size={18} />
          <input type="text" placeholder="Search service by title..." value={search} onChange={(e) => change(setSearch)(e.target.value)} />
        </label>
        <Select value={category} options={CATEGORY_LIST} allLabel="All Category" onChange={change(setCategory)} />
        <Select value={location} options={LOCATIONS} allLabel="All Location" onChange={change(setLocation)} />
        <Select value={status} options={STATUSES} allLabel="All Status" onChange={change(setStatus)} />
        <button type="button" className="manage-service__btn manage-service__btn--reset" onClick={reset} disabled={!hasFilter}>
          <Icon name="reset" size={15} /> Reset
        </button>
        <button type="button" className="manage-service__btn manage-service__btn--primary" onClick={openAdd}>
          <Icon name="plus" size={18} /> Add Service
        </button>
      </section>

      {selected.length > 0 && (
        <div className="manage-service__bulk">
          <span><b>{selected.length}</b> selected</span>
          <div>
            <button type="button" onClick={() => setSelected([])}>Clear</button>
            <button type="button" className="is-danger" onClick={() => setModal({ type: "bulk" })}><Icon name="trash" size={14} /> Delete selected</button>
          </div>
        </div>
      )}

      {/* Table */}
      <section className="manage-service__card">
        <div className="manage-service__scroll">
          <table className="manage-service__table">
            <thead>
              <tr>
                <th className="c-check"><input type="checkbox" className="manage-service__check" checked={allChecked} onChange={toggleAll} aria-label="Select all" /></th>
                <th className="c-num">#</th>
                <th>Service Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Created Date</th>
                <th className="c-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s, i) => {
                const c = CATEGORIES[s.category];
                return (
                  <tr key={s.id} className={selected.includes(s.id) ? "is-selected" : ""}>
                    <td className="c-check"><input type="checkbox" className="manage-service__check" checked={selected.includes(s.id)} onChange={() => toggleOne(s.id)} aria-label="Select row" /></td>
                    <td className="c-num">{start + i + 1}</td>
                    <td className="c-title">
                      <div className="manage-service__service">
                        <Thumb category={s.category} size="lg" />
                        <div><strong>{s.title}</strong><small>{s.desc}</small></div>
                      </div>
                    </td>
                    <td data-label="Category"><span className="manage-service__badge" style={{ background: c.bg, color: c.fg }}>{c.emoji} {s.category}</span></td>
                    <td data-label="Location"><span className="manage-service__meta"><Icon name="pin" size={15} /> {s.location}</span></td>
                    <td data-label="Status"><span className={`manage-service__status manage-service__status--${s.status.toLowerCase()}`}><Icon name={STATUS_ICON[s.status]} size={14} /> {s.status}</span></td>
                    <td data-label="Created"><span className="manage-service__meta"><CalTile date={s.date} /> {fmtDate(s.date)}</span></td>
                    <td className="c-action">
                      <div className="manage-service__actions">
                        <button type="button" className="is-view" title="View" onClick={() => setModal({ type: "view", item: s })}><Icon name="eye" size={17} /></button>
                        <button type="button" className="is-edit" title="Edit" onClick={() => openEdit(s)}><Icon name="edit" size={17} /></button>
                        <button type="button" className="is-delete" title="Delete" onClick={() => setModal({ type: "delete", item: s })}><Icon name="trash" size={17} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="manage-service__empty">
              <span><Icon name="layers" size={32} /></span>
              <h4>No services found</h4>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <footer className="manage-service__footer">
          <p>Showing <b>{filtered.length ? start + 1 : 0}</b> to <b>{Math.min(start + PER_PAGE, filtered.length)}</b> of <b>{filtered.length}</b> services</p>
          <nav className="manage-service__pagination">
            <button type="button" disabled={cur === 1} onClick={() => setPage(1)} aria-label="First"><Icon name="dleft" size={16} /></button>
            <button type="button" disabled={cur === 1} onClick={() => setPage(cur - 1)} aria-label="Previous"><Icon name="left" size={16} /></button>
            {numbers.map((n) => <button type="button" key={n} className={n === cur ? "is-active" : ""} onClick={() => setPage(n)}>{n}</button>)}
            <button type="button" disabled={cur === pages} onClick={() => setPage(cur + 1)} aria-label="Next"><Icon name="right" size={16} /></button>
            <button type="button" disabled={cur === pages} onClick={() => setPage(pages)} aria-label="Last"><Icon name="dright" size={16} /></button>
          </nav>
        </footer>
      </section>

      {/* Add / Edit */}
      {modal?.type === "form" && (
        <Modal
          title={modal.item ? "Edit Service" : "Add New Service"}
          subtitle={modal.item ? "Update the service details." : "Create a new service for your website."}
          onClose={close}
          footer={
            <>
              <button type="button" className="manage-service__btn manage-service__btn--light" onClick={close}>Cancel</button>
              <button type="submit" form="manage-service-form" className="manage-service__btn manage-service__btn--primary">{modal.item ? "Save Changes" : "Add Service"}</button>
            </>
          }
        >
          <form id="manage-service-form" className="manage-service__form" onSubmit={save} noValidate>
            <div className="manage-service__field is-full">
              <label>Service Title <em>*</em></label>
              <input type="text" autoFocus value={form.title} placeholder="e.g. Termite Control" onChange={(e) => { setForm({ ...form, title: e.target.value }); setError(""); }} />
              {error && <span className="manage-service__error">{error}</span>}
            </div>
            <div className="manage-service__field is-full">
              <label>Short Description</label>
              <textarea rows={2} maxLength={160} value={form.desc} placeholder="Short description (max 160 characters)" onChange={(e) => setForm({ ...form, desc: e.target.value })} />
            </div>
            <div className="manage-service__field">
              <label>Category</label>
              <Select value={form.category} options={CATEGORY_LIST} onChange={(v) => setForm({ ...form, category: v })} />
            </div>
            <div className="manage-service__field">
              <label>Location</label>
              <Select value={form.location} options={LOCATIONS} onChange={(v) => setForm({ ...form, location: v })} />
            </div>
            <div className="manage-service__field is-full">
              <label>Created Date</label>
              <Calendar value={form.date} onChange={(d) => setForm({ ...form, date: d })} />
            </div>
            <div className="manage-service__field is-full">
              <label>Status</label>
              <div className="manage-service__seg">
                {STATUSES.map((s) => <button type="button" key={s} className={form.status === s ? "is-active" : ""} onClick={() => setForm({ ...form, status: s })}>{s}</button>)}
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* View */}
      {modal?.type === "view" && (
        <Modal
          title={modal.item.title}
          subtitle={modal.item.desc}
          wide
          onClose={close}
          footer={
            <>
              {modal.item.status === "Published" ? (
                <button type="button" className="manage-service__btn manage-service__btn--light" onClick={() => setStatusFor(modal.item, "Unpublished")}><Icon name="eyeoff" size={16} /> Unpublish</button>
              ) : (
                <button type="button" className="manage-service__btn manage-service__btn--light" onClick={() => setStatusFor(modal.item, "Published")}><Icon name="check" size={16} /> Publish</button>
              )}
              <button type="button" className="manage-service__btn manage-service__btn--primary" onClick={() => openEdit(modal.item)}><Icon name="edit" size={16} /> Edit</button>
            </>
          }
        >
          <div className="manage-service__view">
            <Thumb category={modal.item.category} size="hero" />
            <div className="manage-service__view-meta">
              <span className="manage-service__badge" style={{ background: CATEGORIES[modal.item.category].bg, color: CATEGORIES[modal.item.category].fg }}>{CATEGORIES[modal.item.category].emoji} {modal.item.category}</span>
              <span className={`manage-service__status manage-service__status--${modal.item.status.toLowerCase()}`}><Icon name={STATUS_ICON[modal.item.status]} size={14} /> {modal.item.status}</span>
              <span className="manage-service__meta"><Icon name="pin" size={15} /> {modal.item.location}</span>
              <span className="manage-service__meta"><CalTile date={modal.item.date} /> {fmtDate(modal.item.date)}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete */}
      {(modal?.type === "delete" || modal?.type === "bulk") && (
        <Modal
          title={modal.type === "bulk" ? "Delete selected services?" : "Delete this service?"}
          onClose={close}
          footer={
            <>
              <button type="button" className="manage-service__btn manage-service__btn--light" onClick={close}>Cancel</button>
              <button type="button" className="manage-service__btn manage-service__btn--danger" onClick={remove}><Icon name="trash" size={16} /> Delete</button>
            </>
          }
        >
          <div className="manage-service__confirm">
            <span><Icon name="alert" size={28} /></span>
            <p>
              {modal.type === "bulk"
                ? <>You are about to delete <b>{selected.length}</b> services. This cannot be undone.</>
                : <>You are about to delete <b>{modal.item.title}</b>. This cannot be undone.</>}
            </p>
          </div>
        </Modal>
      )}

      {toast && <div className="manage-service__toast" role="status"><Icon name="check" size={16} /> {toast}</div>}
    </div>
  );
};

export default ManageService;