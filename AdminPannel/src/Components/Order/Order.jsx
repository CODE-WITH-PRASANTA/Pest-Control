import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Order.css";

/* ------------------------------- Icons ------------------------------- */
const ICONS = {
  cart: (<><circle cx="9" cy="21" r="1.5" /><circle cx="19" cy="21" r="1.5" /><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.5L22 7H6" /></>),
  check: <path d="M20 6L9 17l-5-5" />,
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  xcircle: (<><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></>),
  x: (<><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></>),
  down: <path d="M6 9l6 6 6-6" />,
  cal: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  reset: (<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>),
  plus: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  eye: (<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>),
  edit: (<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>),
  trash: (<><path d="M3 6h18" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  pin: (<><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  left: <path d="M15 18l-6-6 6-6" />,
  right: <path d="M9 18l6-6-6-6" />,
  dleft: (<><path d="M11 17l-5-5 5-5" /><path d="M18 17l-5-5 5-5" /></>),
  dright: (<><path d="M13 17l5-5-5-5" /><path d="M6 17l5-5-5-5" /></>),
  shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>),
  alert: (<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></>),
};

const Icon = ({ name, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[name]}
  </svg>
);

/* ------------------------------- Data -------------------------------- */
const SERVICES = {
  "Home Pest Control": { emoji: "🏠", bg: "#dcf8e3", fg: "#15803d" },
  "Termite Treatment": { emoji: "🪵", bg: "#fef3c7", fg: "#b45309" },
  "Bed Bug Control": { emoji: "🐞", bg: "#ffe0e3", fg: "#be123c" },
  "Rodent Control": { emoji: "🐀", bg: "#ede4ff", fg: "#6d28d9" },
  "Cockroach Control": { emoji: "🪳", bg: "#dbeafe", fg: "#1d4ed8" },
  "Mosquito Control": { emoji: "🦟", bg: "#cffafe", fg: "#0e7490" },
};
const SERVICE_LIST = Object.keys(SERVICES);
const LOCATIONS = ["Bhubaneswar", "Cuttack", "Puri", "Kendrapara", "Jajpur", "Balasore"];
const STATUSES = ["Completed", "In Progress", "Pending", "Cancelled"];
const STATUS_META = {
  Completed: { icon: "check", cls: "completed" },
  "In Progress": { icon: "clock", cls: "progress" },
  Pending: { icon: "clock", cls: "pending" },
  Cancelled: { icon: "xcircle", cls: "cancelled" },
};
const AVATARS = ["#f97316", "#ec4899", "#22a35a", "#3b82f6", "#2563eb", "#8b5cf6", "#0891b2", "#e11d48"];
const ID_COLORS = [
  { bg: "#dcf8e3", fg: "#15803d" }, { bg: "#dbeafe", fg: "#1d4ed8" }, { bg: "#fef3c7", fg: "#b45309" },
  { bg: "#ffe0e3", fg: "#be123c" }, { bg: "#ede4ff", fg: "#6d28d9" },
];
const PER_PAGE = 5;

const FIRST = [
  ["Ramesh Patra", "9876543210", "Home Pest Control", "Bhubaneswar", 2499, "Completed"],
  ["Sneha Das", "8765432109", "Termite Treatment", "Cuttack", 4999, "In Progress"],
  ["Arjit Kuanar", "9988766554", "Bed Bug Control", "Puri", 3499, "Completed"],
  ["Priya Rout", "7654321098", "Rodent Control", "Kendrapara", 2999, "Pending"],
  ["Sibu Nayak", "9123456789", "Cockroach Control", "Bhubaneswar", 1999, "Cancelled"],
];
const NAMES = ["Anil Sahoo", "Manas Behera", "Lopamudra Sahu", "Debasis Mohanty", "Smita Jena", "Biswajit Panda", "Namita Swain", "Rakesh Dash", "Puja Mishra", "Subrat Lenka", "Itishree Nayak", "Chandan Parida"];
const AMOUNTS = [1499, 1999, 2499, 2999, 3499, 3999, 4999, 5999];

const buildOrders = () => {
  // status pool for the remaining 123 orders (totals: 96 / 14 / 4 / 14 across all 128)
  const pool = [
    ...Array(94).fill("Completed"), ...Array(13).fill("In Progress"),
    ...Array(3).fill("Pending"), ...Array(13).fill("Cancelled"),
  ];
  let seed = 7; // small deterministic shuffle
  for (let i = pool.length - 1; i > 0; i -= 1) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const rest = pool.map((status, i) => [
    NAMES[i % NAMES.length],
    `9${String(100000000 + ((i + 3) * 7654321) % 899999999).slice(0, 9)}`,
    SERVICE_LIST[i % SERVICE_LIST.length],
    LOCATIONS[(i + 1) % LOCATIONS.length],
    AMOUNTS[i % AMOUNTS.length],
    status,
  ]);
  return [...FIRST, ...rest].map(([customer, phone, service, location, amount, status], i) => {
    const d = new Date(2026, 10, 15);
    d.setDate(d.getDate() - Math.floor(i / 2));
    return { id: 128 - i, customer, phone, service, location, amount, status, date: d.toISOString().slice(0, 10) };
  });
};

const orderCode = (n) => `PC-ORD-${String(n).padStart(4, "0")}`;
const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const fmtPhone = (p) => `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
const fmtMoney = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;
const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const todayIso = () => new Date().toISOString().slice(0, 10);
const EMPTY = { customer: "", phone: "", service: SERVICE_LIST[0], location: LOCATIONS[0], amount: "", date: todayIso(), status: "Pending" };

/* ----------------------------- Small parts --------------------------- */
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
    <div className={`order__select ${open ? "is-open" : ""}`} ref={ref}>
      <button type="button" className="order__select-btn" onClick={() => setOpen(!open)}>
        <span>{value || allLabel}</span>
        <Icon name="down" size={16} />
      </button>
      {open && (
        <ul className="order__select-menu">
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

const DateRange = ({ from, to, onChange }) => {
  const [open, setOpen] = useState(false);
  const [a, setA] = useState(from);
  const [b, setB] = useState(to);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => { setA(from); setB(to); }, [from, to]);
  const label = from || to ? `${from ? fmtDate(from) : "Start"} – ${to ? fmtDate(to) : "End"}` : "Select Date Range";
  const apply = () => {
    if (a && b && a > b) { onChange(b, a); } else { onChange(a, b); }
    setOpen(false);
  };
  return (
    <div className={`order__select order__date ${open ? "is-open" : ""}`} ref={ref}>
      <button type="button" className="order__select-btn" onClick={() => setOpen(!open)}>
        <span className={from || to ? "" : "is-placeholder"}>{label}</span>
        <Icon name="cal" size={17} />
      </button>
      {open && (
        <div className="order__select-menu order__date-panel">
          <label>From<input type="date" value={a} onChange={(e) => setA(e.target.value)} /></label>
          <label>To<input type="date" value={b} onChange={(e) => setB(e.target.value)} /></label>
          <div>
            <button type="button" className="order__btn order__btn--light" onClick={() => { onChange("", ""); setOpen(false); }}>Clear</button>
            <button type="button" className="order__btn order__btn--primary" onClick={apply}>Apply</button>
          </div>
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
    <div className="order__overlay" onMouseDown={onClose}>
      <div className={`order__modal ${wide ? "is-wide" : ""}`} onMouseDown={(e) => e.stopPropagation()}>
        <div className="order__modal-head">
          <div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
          <button type="button" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        </div>
        <div className="order__modal-body">{children}</div>
        {footer && <div className="order__modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

const StatusPill = ({ status }) => (
  <span className={`order__status order__status--${STATUS_META[status].cls}`}><Icon name={STATUS_META[status].icon} size={14} /> {status}</span>
);

/* ------------------------------ Component ---------------------------- */
const Order = () => {
  const [orders, setOrders] = useState(buildOrders);
  const [search, setSearch] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const count = (...s) => orders.filter((o) => s.includes(o.status)).length;
  const stats = [
    { label: "Total Orders", value: orders.length, icon: "cart", cls: "total", filter: "" },
    { label: "Completed", value: count("Completed"), icon: "check", cls: "completed", filter: "Completed" },
    { label: "In Progress", value: count("In Progress", "Pending"), icon: "clock", cls: "progress", filter: "In Progress" },
    { label: "Cancelled", value: count("Cancelled"), icon: "x", cls: "cancelled", filter: "Cancelled" },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (!q || orderCode(o.id).toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.phone.includes(q)) &&
        (!service || o.service === service) &&
        (!status || o.status === status) &&
        (!from || o.date >= from) &&
        (!to || o.date <= to)
    );
  }, [orders, search, service, status, from, to]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const start = (cur - 1) * PER_PAGE;
  const rows = filtered.slice(start, start + PER_PAGE);
  const first = Math.max(1, Math.min(cur - 2, pages - 4));
  const numbers = Array.from({ length: Math.min(5, pages) }, (_, i) => first + i);

  const change = (setter) => (v) => { setter(v); setPage(1); };
  const hasFilter = search || service || status || from || to;
  const reset = () => { setSearch(""); setService(""); setStatus(""); setFrom(""); setTo(""); setPage(1); };

  const ids = rows.map((r) => r.id);
  const allChecked = ids.length > 0 && ids.every((id) => selected.includes(id));
  const toggleAll = () => setSelected((s) => (allChecked ? s.filter((x) => !ids.includes(x)) : [...new Set([...s, ...ids])]));
  const toggleOne = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const close = () => { setModal(null); setErrors({}); };
  const openAdd = () => { setForm({ ...EMPTY, date: todayIso() }); setModal({ type: "form" }); };
  const openEdit = (o) => {
    setForm({ customer: o.customer, phone: o.phone, service: o.service, location: o.location, amount: String(o.amount), date: o.date, status: o.status });
    setModal({ type: "form", item: o });
  };
  const setField = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const save = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.customer.trim()) err.customer = "Customer name is required.";
    if (!/^\d{10}$/.test(form.phone)) err.phone = "Enter a valid 10-digit phone number.";
    if (!(Number(form.amount) > 0)) err.amount = "Enter a valid amount.";
    if (!form.date) err.date = "Select a date.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const data = { ...form, customer: form.customer.trim(), amount: Number(form.amount) };
    if (modal.item) {
      setOrders((l) => l.map((o) => (o.id === modal.item.id ? { ...o, ...data } : o)));
      setToast("Order updated successfully");
    } else {
      const id = Math.max(0, ...orders.map((o) => o.id)) + 1;
      setOrders((l) => [{ id, ...data }, ...l]);
      setPage(1);
      setToast("Order added successfully");
    }
    close();
  };

  const remove = () => {
    const del = modal.type === "bulk" ? selected : [modal.item.id];
    setOrders((l) => l.filter((o) => !del.includes(o.id)));
    setSelected((s) => s.filter((id) => !del.includes(id)));
    setToast(del.length > 1 ? `${del.length} orders deleted` : "Order deleted");
    close();
  };

  const changeStatus = (o, s) => {
    setOrders((l) => l.map((x) => (x.id === o.id ? { ...x, status: s } : x)));
    setModal({ type: "view", item: { ...o, status: s } });
    setToast(`Marked as ${s}`);
  };

  return (
    <div className="order">
      {/* Header */}
      <header className="order__header">
        <div className="order__heading">
          <span className="order__heading-icon"><Icon name="cart" size={26} /></span>
          <div>
            <h1>Order Management</h1>
            <p>View, track and manage all customer orders &amp; service requests.</p>
          </div>
        </div>
        <div className="order__banner">
          <span><Icon name="shield" size={24} /></span>
          <strong>Pest Control<br />Order Management</strong>
        </div>
      </header>

      {/* Stats */}
      <section className="order__stats">
        {stats.map((s) => (
          <button type="button" key={s.label} className={`order__stat order__stat--${s.cls}`} onClick={() => change(setStatus)(s.filter)}>
            <span className="order__stat-icon"><Icon name={s.icon} size={28} /></span>
            <span><small>{s.label}</small><b>{s.value}</b></span>
          </button>
        ))}
      </section>

      {/* Toolbar */}
      <section className="order__toolbar">
        <label className="order__search">
          <Icon name="search" size={18} />
          <input type="text" placeholder="Search by Order ID, Customer name..." value={search} onChange={(e) => change(setSearch)(e.target.value)} />
        </label>
        <Select value={service} options={SERVICE_LIST} allLabel="All Service" onChange={change(setService)} />
        <Select value={status} options={STATUSES} allLabel="All Status" onChange={change(setStatus)} />
        <DateRange from={from} to={to} onChange={(a, b) => { setFrom(a); setTo(b); setPage(1); }} />
        <button type="button" className="order__btn order__btn--reset" onClick={reset} disabled={!hasFilter}>
          <Icon name="reset" size={15} /> Reset
        </button>
        <button type="button" className="order__btn order__btn--primary order__btn--add" onClick={openAdd}>
          <Icon name="plus" size={18} /> Add Order
        </button>
      </section>

      {selected.length > 0 && (
        <div className="order__bulk">
          <span><b>{selected.length}</b> selected</span>
          <div>
            <button type="button" onClick={() => setSelected([])}>Clear</button>
            <button type="button" className="is-danger" onClick={() => setModal({ type: "bulk" })}><Icon name="trash" size={14} /> Delete selected</button>
          </div>
        </div>
      )}

      {/* Table */}
      <section className="order__card">
        <div className="order__scroll">
          <table className="order__table">
            <thead>
              <tr>
                <th className="c-check"><input type="checkbox" className="order__check" checked={allChecked} onChange={toggleAll} aria-label="Select all" /></th>
                <th className="c-num">#</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Service</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="c-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o, i) => {
                const sv = SERVICES[o.service];
                const idc = ID_COLORS[o.id % ID_COLORS.length];
                return (
                  <tr key={o.id} className={selected.includes(o.id) ? "is-selected" : ""}>
                    <td className="c-check"><input type="checkbox" className="order__check" checked={selected.includes(o.id)} onChange={() => toggleOne(o.id)} aria-label="Select row" /></td>
                    <td className="c-num">{start + i + 1}</td>
                    <td className="c-id"><span className="order__id" style={{ background: idc.bg, color: idc.fg }}>{orderCode(o.id)}</span></td>
                    <td className="c-title">
                      <div className="order__customer">
                        <span className="order__avatar" style={{ background: AVATARS[o.id % AVATARS.length] }}>{initials(o.customer)}</span>
                        <strong>{o.customer}</strong>
                      </div>
                    </td>
                    <td data-label="Service"><span className="order__badge" style={{ background: sv.bg, color: sv.fg }}>{sv.emoji} {o.service}</span></td>
                    <td data-label="Phone"><span className="order__meta"><Icon name="phone" size={14} /> {fmtPhone(o.phone)}</span></td>
                    <td data-label="Location"><span className="order__meta"><Icon name="pin" size={15} /> {o.location}</span></td>
                    <td data-label="Date"><span className="order__meta"><Icon name="cal" size={15} /> {fmtDate(o.date)}</span></td>
                    <td data-label="Amount"><b className="order__amount">{fmtMoney(o.amount)}</b></td>
                    <td data-label="Status"><StatusPill status={o.status} /></td>
                    <td className="c-action">
                      <div className="order__actions">
                        <button type="button" className="is-view" title="View" onClick={() => setModal({ type: "view", item: o })}><Icon name="eye" size={17} /></button>
                        <button type="button" className="is-edit" title="Edit" onClick={() => openEdit(o)}><Icon name="edit" size={17} /></button>
                        <button type="button" className="is-delete" title="Delete" onClick={() => setModal({ type: "delete", item: o })}><Icon name="trash" size={17} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="order__empty">
              <span><Icon name="cart" size={32} /></span>
              <h4>No orders found</h4>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <footer className="order__footer">
          <p>Showing <b>{filtered.length ? start + 1 : 0}</b> to <b>{Math.min(start + PER_PAGE, filtered.length)}</b> of <b>{filtered.length}</b> orders</p>
          <nav className="order__pagination">
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
          title={modal.item ? `Edit ${orderCode(modal.item.id)}` : "Add New Order"}
          subtitle={modal.item ? "Update the order details." : "Create a new service order."}
          onClose={close}
          footer={
            <>
              <button type="button" className="order__btn order__btn--light" onClick={close}>Cancel</button>
              <button type="submit" form="order-form" className="order__btn order__btn--primary">{modal.item ? "Save Changes" : "Add Order"}</button>
            </>
          }
        >
          <form id="order-form" className="order__form" onSubmit={save} noValidate>
            <div className="order__field">
              <label>Customer Name <em>*</em></label>
              <input type="text" autoFocus value={form.customer} placeholder="e.g. Ramesh Patra" onChange={(e) => setField("customer", e.target.value)} />
              {errors.customer && <span className="order__error">{errors.customer}</span>}
            </div>
            <div className="order__field">
              <label>Phone <em>*</em></label>
              <input type="text" inputMode="numeric" maxLength={10} value={form.phone} placeholder="10-digit number" onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))} />
              {errors.phone && <span className="order__error">{errors.phone}</span>}
            </div>
            <div className="order__field">
              <label>Service</label>
              <Select value={form.service} options={SERVICE_LIST} onChange={(v) => setField("service", v)} />
            </div>
            <div className="order__field">
              <label>Location</label>
              <Select value={form.location} options={LOCATIONS} onChange={(v) => setField("location", v)} />
            </div>
            <div className="order__field">
              <label>Amount (₹) <em>*</em></label>
              <input type="number" min="1" value={form.amount} placeholder="e.g. 2499" onChange={(e) => setField("amount", e.target.value)} />
              {errors.amount && <span className="order__error">{errors.amount}</span>}
            </div>
            <div className="order__field">
              <label>Order Date <em>*</em></label>
              <input type="date" value={form.date} onChange={(e) => setField("date", e.target.value)} />
              {errors.date && <span className="order__error">{errors.date}</span>}
            </div>
            <div className="order__field is-full">
              <label>Status</label>
              <div className="order__seg">
                {STATUSES.map((s) => <button type="button" key={s} className={form.status === s ? "is-active" : ""} onClick={() => setField("status", s)}>{s}</button>)}
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* View */}
      {modal?.type === "view" && (
        <Modal
          title={orderCode(modal.item.id)}
          subtitle="Order details"
          wide
          onClose={close}
          footer={
            <>
              <button type="button" className="order__btn order__btn--light" onClick={close}>Close</button>
              <button type="button" className="order__btn order__btn--primary" onClick={() => openEdit(modal.item)}><Icon name="edit" size={16} /> Edit</button>
            </>
          }
        >
          <div className="order__view">
            <div className="order__customer order__customer--big">
              <span className="order__avatar" style={{ background: AVATARS[modal.item.id % AVATARS.length] }}>{initials(modal.item.customer)}</span>
              <div><strong>{modal.item.customer}</strong><small>{fmtPhone(modal.item.phone)}</small></div>
              <StatusPill status={modal.item.status} />
            </div>
            <dl>
              <div><dt>Service</dt><dd>{SERVICES[modal.item.service].emoji} {modal.item.service}</dd></div>
              <div><dt>Location</dt><dd>{modal.item.location}</dd></div>
              <div><dt>Order Date</dt><dd>{fmtDate(modal.item.date)}</dd></div>
              <div><dt>Amount</dt><dd>{fmtMoney(modal.item.amount)}</dd></div>
            </dl>
            <div className="order__update">
              <span>Update status</span>
              <div className="order__seg">
                {STATUSES.map((s) => <button type="button" key={s} className={modal.item.status === s ? "is-active" : ""} onClick={() => changeStatus(modal.item, s)}>{s}</button>)}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete */}
      {(modal?.type === "delete" || modal?.type === "bulk") && (
        <Modal
          title={modal.type === "bulk" ? "Delete selected orders?" : "Delete this order?"}
          onClose={close}
          footer={
            <>
              <button type="button" className="order__btn order__btn--light" onClick={close}>Cancel</button>
              <button type="button" className="order__btn order__btn--danger" onClick={remove}><Icon name="trash" size={16} /> Delete</button>
            </>
          }
        >
          <div className="order__confirm">
            <span><Icon name="alert" size={28} /></span>
            <p>
              {modal.type === "bulk"
                ? <>You are about to delete <b>{selected.length}</b> orders. This cannot be undone.</>
                : <>You are about to delete order <b>{orderCode(modal.item.id)}</b> of <b>{modal.item.customer}</b>. This cannot be undone.</>}
            </p>
          </div>
        </Modal>
      )}

      {toast && <div className="order__toast" role="status"><Icon name="check" size={16} /> {toast}</div>}
    </div>
  );
};

export default Order;