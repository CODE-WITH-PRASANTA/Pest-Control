import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { API_BASE_URL } from "../../config/api";
import "./TeamManagement.css";

/* ------------------------------------------------------------------ */
/*  Constants & seed data                                              */
/* ------------------------------------------------------------------ */

const ROLES = ["Manager", "Technician", "Field Staff", "Support"];
const STATUSES = ["Active", "On Leave", "Inactive"];

const ROLE_CLASS = {
  Manager: "role-manager",
  Technician: "role-technician",
  "Field Staff": "role-field",
  Support: "role-support",
};

const STATUS_CLASS = {
  Active: "status-active",
  "On Leave": "status-leave",
  Inactive: "status-inactive",
};

const AVATAR_TONES = [
  ["#0f5132", "#34c46b"],
  ["#1d4ed8", "#60a5fa"],
  ["#b45309", "#fbbf24"],
  ["#9d174d", "#f472b6"],
  ["#5b21b6", "#a78bfa"],
  ["#0e7490", "#22d3ee"],
];

const EMPTY_FORM = {
  name: "",
  role: "Technician",
  phone: "",
  email: "",
  joinDate: new Date().toISOString().slice(0, 10),
  status: "Active",
  avatar: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const formatPhone = (p) => `+91 ${p.slice(0, 5)} ${p.slice(5)}`;

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const getTone = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_TONES[hash % AVATAR_TONES.length];
};

const validate = (form, members, editingId) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter the full name.";
  if (!/^[6-9]\d{9}$/.test(form.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  else if (
    members.some((m) => m.id !== editingId && m.email.toLowerCase() === form.email.trim().toLowerCase())
  )
    errors.email = "This email is already used by another member.";
  if (!form.joinDate) errors.joinDate = "Choose a join date.";
  return errors;
};

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG, no extra dependency)                            */
/* ------------------------------------------------------------------ */

const ICON_PATHS = {
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  userX: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m17 8 5 5" />
      <path d="m22 8-5 5" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  alert: (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
};

const Icon = ({ name, size = 18, className = "" }) => (
  <svg
    className={className}
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
    {ICON_PATHS[name]}
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

const Avatar = ({ name, avatar, size = "md" }) => {
  const [from, to] = getTone(name);
  if (avatar) {
    return (
      <span className={`TeamManagement-avatar TeamManagement-avatar--${size}`} style={{ overflow: "hidden", padding: 0 }}>
        <img
          src={avatar}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit", display: "block" }}
        />
      </span>
    );
  }
  return (
    <span
      className={`TeamManagement-avatar TeamManagement-avatar--${size}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {getInitials(name)}
    </span>
  );
};

const RoleBadge = ({ role }) => (
  <span className={`TeamManagement-badge TeamManagement-${ROLE_CLASS[role]}`}>{role}</span>
);

const StatusBadge = ({ status }) => (
  <span className={`TeamManagement-badge TeamManagement-${STATUS_CLASS[status]}`}>{status}</span>
);

/* Premium custom dropdown */
const Dropdown = ({ value, options, onChange, label, className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div className={`TeamManagement-dropdown ${className}`} ref={ref}>
      <button
        type="button"
        className={`TeamManagement-dropdownTrigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        <span>{current?.label}</span>
        <Icon name="chevronDown" size={16} className="TeamManagement-dropdownChevron" />
      </button>
      {open && (
        <ul className="TeamManagement-dropdownMenu" role="listbox">
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                className={`TeamManagement-dropdownOption ${opt.value === value ? "is-selected" : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Icon name="check" size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Modal = ({ title, subtitle, onClose, children, size = "md" }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="TeamManagement-overlay" onMouseDown={onClose}>
      <div
        className={`TeamManagement-modal TeamManagement-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="TeamManagement-modalHeader">
          <div>
            <h3 className="TeamManagement-modalTitle">{title}</h3>
            {subtitle && <p className="TeamManagement-modalSubtitle">{subtitle}</p>}
          </div>
          <button type="button" className="TeamManagement-modalClose" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* Embossed calendar date picker */
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n) => String(n).padStart(2, "0");
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

const DatePicker = ({ value, onChange, hasError, label }) => {
  const parsed = value ? value.split("-").map(Number) : null;
  const now = new Date();
  const todayISO = toISO(now.getFullYear(), now.getMonth(), now.getDate());

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("days"); // "days" | "months"
  const [cursor, setCursor] = useState(() =>
    parsed ? { y: parsed[0], m: parsed[1] - 1 } : { y: now.getFullYear(), m: now.getMonth() }
  );
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      if (parsed) setCursor({ y: parsed[0], m: parsed[1] - 1 });
      setMode("days");
    }
    setOpen((o) => !o);
  };

  const shiftMonth = (delta) =>
    setCursor((c) => {
      const d = new Date(c.y, c.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const pick = (y, m, d) => {
    onChange(toISO(y, m, d));
    setOpen(false);
  };

  const firstWeekday = new Date(cursor.y, cursor.m, 1).getDay();
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="TeamManagement-datePicker" ref={ref}>
      <button
        type="button"
        className={`TeamManagement-dateTrigger ${open ? "is-open" : ""} ${hasError ? "has-error" : ""}`}
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
      >
        <Icon name="calendar" size={17} />
        <span className={value ? "" : "is-placeholder"}>{value ? formatDate(value) : "Select date"}</span>
        <Icon name="chevronDown" size={16} className="TeamManagement-dropdownChevron" />
      </button>

      {open && (
        <div className="TeamManagement-calendar" role="dialog" aria-label="Choose a date">
          <div className="TeamManagement-calendarHead">
            <button
              type="button"
              className="TeamManagement-calendarNav"
              onClick={() => (mode === "days" ? shiftMonth(-1) : setCursor((c) => ({ ...c, y: c.y - 1 })))}
              aria-label={mode === "days" ? "Previous month" : "Previous year"}
            >
              <Icon name="chevronLeft" size={16} />
            </button>
            <button
              type="button"
              className="TeamManagement-calendarTitle"
              onClick={() => setMode((m) => (m === "days" ? "months" : "days"))}
              aria-label="Switch between days and months"
            >
              {mode === "days" ? `${MONTHS[cursor.m]} ${cursor.y}` : cursor.y}
            </button>
            <button
              type="button"
              className="TeamManagement-calendarNav"
              onClick={() => (mode === "days" ? shiftMonth(1) : setCursor((c) => ({ ...c, y: c.y + 1 })))}
              aria-label={mode === "days" ? "Next month" : "Next year"}
            >
              <Icon name="chevronRight" size={16} />
            </button>
          </div>

          {mode === "days" ? (
            <>
              <div className="TeamManagement-calendarWeek">
                {WEEKDAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="TeamManagement-calendarDays">
                {cells.map((day, i) => {
                  if (day === null) return <span key={`blank-${i}`} />;
                  const iso = toISO(cursor.y, cursor.m, day);
                  const classes = [
                    "TeamManagement-calendarDay",
                    iso === value ? "is-selected" : "",
                    iso === todayISO ? "is-today" : "",
                  ].join(" ");
                  return (
                    <button
                      key={iso}
                      type="button"
                      className={classes}
                      onClick={() => pick(cursor.y, cursor.m, day)}
                      aria-pressed={iso === value}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="TeamManagement-calendarMonths">
              {MONTHS.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  className={`TeamManagement-calendarMonth ${
                    parsed && parsed[0] === cursor.y && parsed[1] - 1 === i ? "is-selected" : ""
                  }`}
                  onClick={() => {
                    setCursor((c) => ({ ...c, m: i }));
                    setMode("days");
                  }}
                >
                  {name.slice(0, 3)}
                </button>
              ))}
            </div>
          )}

          <div className="TeamManagement-calendarFoot">
            <span>{value ? formatDate(value) : "No date chosen"}</span>
            <button
              type="button"
              className="TeamManagement-calendarToday"
              onClick={() => pick(now.getFullYear(), now.getMonth(), now.getDate())}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Add / edit form */
const MemberForm = ({ initial, members, editingId, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(initial.avatar || "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, avatar: "Please choose a valid image file." }));
      return;
    }
    if (avatarPreview && avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, avatar: undefined }));
  };

  const handleRemoveAvatar = () => {
    if (avatarPreview && avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(null);
    setAvatarPreview("");
    set("avatar", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form, members, editingId);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit({ ...form, name: form.name.trim(), email: form.email.trim(), avatarFile });
    }
  };

  return (
    <form className="TeamManagement-form" onSubmit={handleSubmit} noValidate>
      <div className="TeamManagement-formGrid">
        <div className="TeamManagement-field TeamManagement-field--full">
          <span className="TeamManagement-label">Profile picture</span>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <Avatar name={form.name || "TM"} avatar={avatarPreview} size="lg" />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="team-avatar-upload"
              />
              <label
                htmlFor="team-avatar-upload"
                className="TeamManagement-btn TeamManagement-btn--ghost"
                style={{ cursor: "pointer", margin: 0 }}
              >
                {avatarPreview ? "Change photo" : "Upload photo"}
              </label>
              {avatarPreview && (
                <button
                  type="button"
                  className="TeamManagement-btn TeamManagement-btn--ghost"
                  onClick={handleRemoveAvatar}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          {errors.avatar && <span className="TeamManagement-error">{errors.avatar}</span>}
        </div>

        <label className="TeamManagement-field TeamManagement-field--full">
          <span className="TeamManagement-label">Full name</span>
          <input
            className={`TeamManagement-input ${errors.name ? "has-error" : ""}`}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Ramesh Patra"
            autoFocus
          />
          {errors.name && <span className="TeamManagement-error">{errors.name}</span>}
        </label>

        <div className="TeamManagement-field">
          <span className="TeamManagement-label">Role</span>
          <Dropdown
            label="Role"
            value={form.role}
            options={ROLES.map((r) => ({ value: r, label: r }))}
            onChange={(v) => set("role", v)}
            className="TeamManagement-dropdown--field"
          />
        </div>

        <div className="TeamManagement-field">
          <span className="TeamManagement-label">Status</span>
          <Dropdown
            label="Status"
            value={form.status}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
            onChange={(v) => set("status", v)}
            className="TeamManagement-dropdown--field"
          />
        </div>

        <label className="TeamManagement-field">
          <span className="TeamManagement-label">Mobile number</span>
          <div className={`TeamManagement-phoneInput ${errors.phone ? "has-error" : ""}`}>
            <span className="TeamManagement-phonePrefix">+91</span>
            <input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="98765 43210"
              inputMode="numeric"
            />
          </div>
          {errors.phone && <span className="TeamManagement-error">{errors.phone}</span>}
        </label>

        <div className="TeamManagement-field">
          <span className="TeamManagement-label">Join date</span>
          <DatePicker
            label="Join date"
            value={form.joinDate}
            hasError={Boolean(errors.joinDate)}
            onChange={(v) => set("joinDate", v)}
          />
          {errors.joinDate && <span className="TeamManagement-error">{errors.joinDate}</span>}
        </div>

        <label className="TeamManagement-field TeamManagement-field--full">
          <span className="TeamManagement-label">Email address</span>
          <input
            type="email"
            className={`TeamManagement-input ${errors.email ? "has-error" : ""}`}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="name@pestcontrol.com"
          />
          {errors.email && <span className="TeamManagement-error">{errors.email}</span>}
        </label>
      </div>

      <div className="TeamManagement-modalFooter">
        <button type="button" className="TeamManagement-btn TeamManagement-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="TeamManagement-btn TeamManagement-btn--primary">
          {editingId ? "Save changes" : "Add team member"}
        </button>
      </div>
    </form>
  );
};

/* Action buttons used in both list and grid */
const Actions = ({ member, onAction }) => (
  <div className="TeamManagement-actions">
    <button
      type="button"
      className="TeamManagement-iconBtn TeamManagement-iconBtn--edit"
      onClick={() => onAction("edit", member)}
      aria-label={`Edit ${member.name}`}
      title="Edit"
    >
      <Icon name="edit" size={16} />
    </button>
    <button
      type="button"
      className="TeamManagement-iconBtn TeamManagement-iconBtn--view"
      onClick={() => onAction("view", member)}
      aria-label={`View ${member.name}`}
      title="View"
    >
      <Icon name="eye" size={16} />
    </button>
    <button
      type="button"
      className="TeamManagement-iconBtn TeamManagement-iconBtn--delete"
      onClick={() => onAction("delete", member)}
      aria-label={`Delete ${member.name}`}
      title="Delete"
    >
      <Icon name="trash" size={16} />
    </button>
  </div>
);

/* Pagination */
const Pagination = ({ page, totalPages, total, pageSize, onChange }) => {
  const pages = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const list = new Set([1, totalPages, page - 1, page, page + 1]);
    const sorted = [...list].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const out = [];
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
      out.push(p);
    });
    return out;
  }, [page, totalPages]);

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="TeamManagement-pagination">
      <p className="TeamManagement-paginationInfo">
        Showing <strong>{from}–{to}</strong> of <strong>{total}</strong> members
      </p>
      <div className="TeamManagement-paginationControls">
        <button
          type="button"
          className="TeamManagement-pageBtn TeamManagement-pageBtn--nav"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          <Icon name="chevronLeft" size={16} />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="TeamManagement-pageGap">…</span>
          ) : (
            <button
              key={p}
              type="button"
              className={`TeamManagement-pageBtn ${p === page ? "is-active" : ""}`}
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          className="TeamManagement-pageBtn TeamManagement-pageBtn--nav"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          <Icon name="chevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const normalizeMember = (m) => ({ ...m, id: m._id || m.id });

const TeamManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { type, member }
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const pageSize = view === "list" ? 5 : 6;

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    let ignore = false;
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/teams`);
        const result = await res.json();
        if (!ignore && res.ok && result.success) {
          setMembers((result.data || []).map(normalizeMember));
        }
      } catch (err) {
        if (!ignore) showToast("Failed to load team members from server.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchMembers();
    return () => {
      ignore = true;
    };
  }, [showToast]);

  const stats = useMemo(
    () => ({
      total: members.length,
      active: members.filter((m) => m.status === "Active").length,
      leave: members.filter((m) => m.status === "On Leave").length,
      inactive: members.filter((m) => m.status === "Inactive").length,
    }),
    [members]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      const matchStatus = statusFilter === "All" || m.status === statusFilter;
      const matchQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.phone.includes(q.replace(/\D/g, "") || "§") ||
        m.email.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [members, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const closeModal = useCallback(() => setModal(null), []);
  const openAction = (type, member) => setModal({ type, member });

  const buildMemberFormData = (data) => {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("role", data.role);
    fd.append("phone", data.phone);
    fd.append("email", data.email);
    fd.append("joinDate", data.joinDate);
    fd.append("status", data.status);
    if (data.avatarFile) {
      fd.append("avatar", data.avatarFile);
    } else if (typeof data.avatar === "string") {
      fd.append("avatar", data.avatar);
    }
    return fd;
  };

  const handleAdd = async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/teams`, {
        method: "POST",
        body: buildMemberFormData(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to add team member.");
      }
      setMembers((list) => [normalizeMember(result.data), ...list]);
      setQuery("");
      setStatusFilter("All");
      setPage(1);
      closeModal();
      showToast(`${data.name} was added to the team.`);
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  const handleEdit = async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/teams/${modal.member.id}`, {
        method: "PUT",
        body: buildMemberFormData(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to update team member.");
      }
      const updated = normalizeMember(result.data);
      setMembers((list) => list.map((m) => (m.id === modal.member.id ? updated : m)));
      closeModal();
      showToast(`${data.name}'s details were updated.`);
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  const handleDelete = async () => {
    const { id, name } = modal.member;
    try {
      const res = await fetch(`${API_BASE_URL}/teams/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        return showToast(result.message || "Failed to delete team member.");
      }
      setMembers((list) => list.filter((m) => m.id !== id));
      closeModal();
      showToast(`${name} was removed from the team.`);
    } catch {
      showToast("Could not connect to backend server.");
    }
  };

  const statusOptions = [
    { value: "All", label: "All Status" },
    ...STATUSES.map((s) => ({ value: s, label: s })),
  ];

  const statCards = [
    { key: "total", label: "Total Members", value: stats.total, icon: "users", tone: "total" },
    { key: "active", label: "Active Members", value: stats.active, icon: "shield", tone: "active" },
    { key: "leave", label: "On Leave", value: stats.leave, icon: "clock", tone: "leave" },
    { key: "inactive", label: "Inactive", value: stats.inactive, icon: "users", tone: "inactive" },
  ];

  return (
    <section className="TeamManagement">
      {/* Header */}
      <header className="TeamManagement-header">
        <div className="TeamManagement-headerMain">
          <span className="TeamManagement-headerIcon">
            <Icon name="users" size={26} />
          </span>
          <div>
            <h1 className="TeamManagement-title">Team Members</h1>
            <p className="TeamManagement-subtitle">Manage your team members, roles and access permissions.</p>
          </div>
        </div>
        <button
          type="button"
          className="TeamManagement-btn TeamManagement-btn--primary TeamManagement-btn--lg"
          onClick={() => setModal({ type: "add" })}
        >
          <Icon name="plus" size={18} />
          Add Team Member
        </button>
      </header>

      {/* Stats */}
      <div className="TeamManagement-stats">
        {statCards.map((s) => (
          <article key={s.key} className={`TeamManagement-stat TeamManagement-stat--${s.tone}`}>
            <span className="TeamManagement-statIcon">
              <Icon name={s.icon} size={24} />
            </span>
            <div>
              <p className="TeamManagement-statLabel">{s.label}</p>
              <p className="TeamManagement-statValue">{s.value}</p>
            </div>
            <Icon name={s.key === "inactive" ? "userX" : s.icon} size={72} className="TeamManagement-statWatermark" />
          </article>
        ))}
      </div>

      {/* List card */}
      <div className="TeamManagement-card">
        <div className="TeamManagement-toolbar">
          <h2 className="TeamManagement-cardTitle">
            <Icon name="users" size={22} />
            Team Member List
          </h2>

          <div className="TeamManagement-controls">
            <label className="TeamManagement-search">
              <Icon name="search" size={17} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, role or mobile..."
                aria-label="Search team members"
              />
            </label>

            <Dropdown
              label="Filter by status"
              value={statusFilter}
              options={statusOptions}
              onChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
              className="TeamManagement-dropdown--filter"
            />

            <div className="TeamManagement-viewToggle" role="group" aria-label="Change layout">
              <button
                type="button"
                className={`TeamManagement-viewBtn ${view === "grid" ? "is-active" : ""}`}
                onClick={() => {
                  setView("grid");
                  setPage(1);
                }}
                aria-label="Grid view"
                title="Grid view"
              >
                <Icon name="grid" size={17} />
              </button>
              <button
                type="button"
                className={`TeamManagement-viewBtn ${view === "list" ? "is-active" : ""}`}
                onClick={() => {
                  setView("list");
                  setPage(1);
                }}
                aria-label="List view"
                title="List view"
              >
                <Icon name="list" size={17} />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="TeamManagement-empty">
            <span className="TeamManagement-emptyIcon">
              <Icon name="search" size={28} />
            </span>
            <h3>No team members found</h3>
            <p>Try a different search term or change the status filter.</p>
            <button
              type="button"
              className="TeamManagement-btn TeamManagement-btn--soft"
              onClick={() => {
                setQuery("");
                setStatusFilter("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : view === "list" ? (
          <div className="TeamManagement-tableWrap">
            <table className="TeamManagement-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Member</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th className="TeamManagement-thAction">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((m, i) => (
                  <tr key={m.id}>
                    <td className="TeamManagement-cellIndex">{(page - 1) * pageSize + i + 1}</td>
                    <td className="TeamManagement-cellMember">
                      <Avatar name={m.name} avatar={m.avatar} />
                      <span className="TeamManagement-memberName">{m.name}</span>
                    </td>
                    <td className="TeamManagement-cellRole">
                      <RoleBadge role={m.role} />
                    </td>
                    <td data-label="Phone">
                      <span className="TeamManagement-meta">
                        <Icon name="phone" size={16} />
                        {formatPhone(m.phone)}
                      </span>
                    </td>
                    <td data-label="Email">
                      <span className="TeamManagement-meta">
                        <Icon name="mail" size={16} />
                        {m.email}
                      </span>
                    </td>
                    <td data-label="Joined">
                      <span className="TeamManagement-meta">
                        <Icon name="calendar" size={16} />
                        {formatDate(m.joinDate)}
                      </span>
                    </td>
                    <td className="TeamManagement-cellStatus">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="TeamManagement-cellAction">
                      <Actions member={m} onAction={openAction} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="TeamManagement-grid">
            {pageItems.map((m) => (
              <article key={m.id} className="TeamManagement-gridCard">
                <div className="TeamManagement-gridTop">
                  <Avatar name={m.name} avatar={m.avatar} size="lg" />
                  <StatusBadge status={m.status} />
                </div>
                <h3 className="TeamManagement-gridName">{m.name}</h3>
                <RoleBadge role={m.role} />
                <ul className="TeamManagement-gridMeta">
                  <li>
                    <Icon name="phone" size={16} />
                    {formatPhone(m.phone)}
                  </li>
                  <li>
                    <Icon name="mail" size={16} />
                    <span>{m.email}</span>
                  </li>
                  <li>
                    <Icon name="calendar" size={16} />
                    Joined {formatDate(m.joinDate)}
                  </li>
                </ul>
                <Actions member={m} onAction={openAction} />
              </article>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            total={filtered.length}
            pageSize={pageSize}
            onChange={setPage}
          />
        )}
      </div>

      {/* Modals */}
      {modal?.type === "add" && (
        <Modal title="Add team member" subtitle="Fill in the details to add a new person to your team." onClose={closeModal}>
          <MemberForm initial={EMPTY_FORM} members={members} onSubmit={handleAdd} onCancel={closeModal} />
        </Modal>
      )}

      {modal?.type === "edit" && (
        <Modal title="Edit team member" subtitle={`Update the details for ${modal.member.name}.`} onClose={closeModal}>
          <MemberForm
            initial={modal.member}
            members={members}
            editingId={modal.member.id}
            onSubmit={handleEdit}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === "view" && (
        <Modal title="Member details" onClose={closeModal} size="sm">
          <div className="TeamManagement-profile">
            <Avatar name={modal.member.name} avatar={modal.member.avatar} size="xl" />
            <h3 className="TeamManagement-profileName">{modal.member.name}</h3>
            <div className="TeamManagement-profileBadges">
              <RoleBadge role={modal.member.role} />
              <StatusBadge status={modal.member.status} />
            </div>
          </div>
          <dl className="TeamManagement-details">
            <div>
              <dt><Icon name="phone" size={16} /> Phone</dt>
              <dd>{formatPhone(modal.member.phone)}</dd>
            </div>
            <div>
              <dt><Icon name="mail" size={16} /> Email</dt>
              <dd>{modal.member.email}</dd>
            </div>
            <div>
              <dt><Icon name="calendar" size={16} /> Join date</dt>
              <dd>{formatDate(modal.member.joinDate)}</dd>
            </div>
          </dl>
          <div className="TeamManagement-modalFooter">
            <button type="button" className="TeamManagement-btn TeamManagement-btn--ghost" onClick={closeModal}>
              Close
            </button>
            <button
              type="button"
              className="TeamManagement-btn TeamManagement-btn--primary"
              onClick={() => setModal({ type: "edit", member: modal.member })}
            >
              <Icon name="edit" size={16} />
              Edit member
            </button>
          </div>
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Delete team member" onClose={closeModal} size="sm">
          <div className="TeamManagement-confirm">
            <span className="TeamManagement-confirmIcon">
              <Icon name="alert" size={28} />
            </span>
            <p>
              Remove <strong>{modal.member.name}</strong> from the team? Their access will end immediately and this
              can't be undone.
            </p>
          </div>
          <div className="TeamManagement-modalFooter">
            <button type="button" className="TeamManagement-btn TeamManagement-btn--ghost" onClick={closeModal}>
              Keep member
            </button>
            <button type="button" className="TeamManagement-btn TeamManagement-btn--danger" onClick={handleDelete}>
              <Icon name="trash" size={16} />
              Delete member
            </button>
          </div>
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <div className="TeamManagement-toast" role="status">
          <Icon name="check" size={18} />
          {toast}
        </div>
      )}
    </section>
  );
};

export default TeamManagement;