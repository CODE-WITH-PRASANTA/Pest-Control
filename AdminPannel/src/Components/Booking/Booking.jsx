import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import "./Booking.css";

/* ------------------------------------------------------------------ */
/*  Constants & seed data                                              */
/* ------------------------------------------------------------------ */

const STATUSES = ["Completed", "In Progress", "Pending", "Cancelled"];
const STATUS_CLASS = {
  Completed: "status-completed",
  "In Progress": "status-progress",
  Pending: "status-pending",
  Cancelled: "status-cancelled",
};

const SERVICES = [
  "Termite Control",
  "Bed Bug Control",
  "General Pest Control",
  "Rodent Control",
  "Cockroach Control",
  "Mosquito Control",
];
const SERVICE_CLASS = {
  "Termite Control": "service-termite",
  "Bed Bug Control": "service-bedbug",
  "General Pest Control": "service-general",
  "Rodent Control": "service-rodent",
  "Cockroach Control": "service-cockroach",
  "Mosquito Control": "service-mosquito",
};

const AVATAR_TONES = [
  ["#0f5132", "#34c46b"],
  ["#1d4ed8", "#60a5fa"],
  ["#b45309", "#fbbf24"],
  ["#9d174d", "#f472b6"],
  ["#5b21b6", "#a78bfa"],
  ["#0e7490", "#22d3ee"],
];

const NAMES = [
  "Manas Behera", "Lipsa Mohanty", "Debasish Sahoo", "Anita Jena", "Rakesh Swain",
  "Smita Panda", "Biswajit Mishra", "Sonali Dash", "Pratap Sethy", "Mamata Nayak",
  "Subrat Pradhan", "Jyoti Ranjan", "Kabita Sahu", "Tapan Parida", "Namita Barik",
  "Ashok Mallick", "Rashmi Behura", "Gopal Samal", "Sasmita Lenka", "Pradeep Otta",
];
const LOCATIONS = [
  "Bhubaneswar", "Cuttack", "Puri", "Kendrapara", "Jatni",
  "Khordha", "Balasore", "Berhampur", "Sambalpur", "Angul",
];
const AMOUNTS = [1500, 1800, 2200, 2500, 3000, 3500, 4200, 1200, 2800, 5000];

/* Static month-over-month trend labels (replace with API data) */
const TRENDS = {
  total: { value: 12, up: true },
  completed: { value: 18, up: true },
  progress: { value: 8, up: true },
  cancelled: { value: 5, up: false },
};

const buildSeed = () => {
  const head = [
    { name: "Ramesh Patra", service: "Termite Control", phone: "9876543210", location: "Bhubaneswar", date: "2026-11-15", status: "Completed", amount: 2500 },
    { name: "Sneha Das", service: "Bed Bug Control", phone: "8765432109", location: "Cuttack", date: "2026-11-15", status: "In Progress", amount: 1800 },
    { name: "Arjit Kuanar", service: "General Pest Control", phone: "9988766554", location: "Puri", date: "2026-11-14", status: "Completed", amount: 3000 },
    { name: "Priya Rout", service: "Rodent Control", phone: "7654321098", location: "Kendrapara", date: "2026-11-14", status: "Pending", amount: 2200 },
    { name: "Sibu Nayak", service: "Cockroach Control", phone: "9123456789", location: "Bhubaneswar", date: "2026-11-13", status: "Completed", amount: 1500 },
  ];

  /* 243 remaining rows: 179 completed, 35 in progress, 18 cancelled, 11 pending (248 total) */
  const pool = [
    ...Array(179).fill("Completed"),
    ...Array(35).fill("In Progress"),
    ...Array(18).fill("Cancelled"),
    ...Array(11).fill("Pending"),
  ];
  let seed = 20261116;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const rest = pool.map((status, k) => {
    const i = k + 5;
    return {
      name: NAMES[(i * 7 + 3) % NAMES.length],
      service: SERVICES[(i * 5 + 2) % SERVICES.length],
      phone: `9${100000000 + ((i * 48271 * 1237) % 899999999)}`,
      location: LOCATIONS[(i * 3 + 1) % LOCATIONS.length],
      date: new Date(Date.UTC(2026, 10, 13 - Math.floor(i / 3))).toISOString().slice(0, 10),
      status,
      amount: AMOUNTS[(i * 3 + 4) % AMOUNTS.length],
    };
  });

  return [...head, ...rest].map((b, i) => ({ ...b, id: 2489 - i }));
};

const INITIAL_BOOKINGS = buildSeed();
const PAGE_SIZE = 5;

const EMPTY_FORM = {
  name: "",
  service: "General Pest Control",
  phone: "",
  location: "",
  date: new Date().toISOString().slice(0, 10),
  status: "Pending",
  amount: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const pad = (n) => String(n).padStart(2, "0");
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const todayDate = () => new Date();
const isoOf = (d) => toISO(d.getFullYear(), d.getMonth(), d.getDate());

const formatPhone = (p) => `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
const formatAmount = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;
const parseDate = (iso) => new Date(`${iso}T00:00:00`);
const formatDate = (iso) =>
  parseDate(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const formatShort = (iso) => parseDate(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

const getInitials = (name) =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

const getTone = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_TONES[hash % AVATAR_TONES.length];
};

const validate = (form) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Enter the customer's full name.";
  if (!/^[6-9]\d{9}$/.test(form.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (form.location.trim().length < 2) errors.location = "Enter the service location.";
  if (!form.date) errors.date = "Choose a booking date.";
  if (!(Number(form.amount) > 0)) errors.amount = "Enter an amount greater than 0.";
  return errors;
};

/* Close on outside click / Escape (Escape stops here so a parent modal stays open) */
const useDismiss = (ref, open, close) => {
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open, ref, close]);
};

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const ICON_PATHS = {
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </>
  ),
  calendarCheck: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  xCircle: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </>
  ),
  hourglass: (
    <>
      <path d="M5 22h14" />
      <path d="M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
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
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  bug: (
    <>
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  chevronsLeft: (
    <>
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </>
  ),
  chevronsRight: (
    <>
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
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

const Avatar = ({ name, size = "md" }) => {
  const [from, to] = getTone(name);
  return (
    <span
      className={`Booking-avatar Booking-avatar--${size}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {getInitials(name)}
    </span>
  );
};

const ServiceBadge = ({ service }) => (
  <span className={`Booking-service Booking-${SERVICE_CLASS[service]}`}>
    <Icon name="bug" size={14} />
    {service}
  </span>
);

const StatusBadge = ({ status }) => (
  <span className={`Booking-badge Booking-${STATUS_CLASS[status]}`}>{status}</span>
);

const Checkbox = ({ checked, indeterminate = false, onChange, label }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      className="Booking-check"
      checked={checked}
      onChange={onChange}
      aria-label={label}
    />
  );
};

/* Premium dropdown */
const Dropdown = ({ value, options, onChange, label, icon, className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const current = options.find((o) => o.value === value);

  return (
    <div className={`Booking-dropdown ${className}`} ref={ref}>
      <button
        type="button"
        className={`Booking-dropdownTrigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        {icon && <Icon name={icon} size={17} className="Booking-triggerIcon" />}
        <span className="Booking-triggerText">{current?.label}</span>
        <Icon name="chevronDown" size={16} className="Booking-chevron" />
      </button>
      {open && (
        <ul className="Booking-dropdownMenu" role="listbox">
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                className={`Booking-dropdownOption ${opt.value === value ? "is-selected" : ""}`}
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

/* ------------------------------------------------------------------ */
/*  Embossed calendar (single date + range)                            */
/* ------------------------------------------------------------------ */

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const Calendar = ({ mode = "single", value, range, onPick }) => {
  const now = todayDate();
  const todayISO = isoOf(now);
  const anchor = mode === "single" ? value : range?.start;
  const base = anchor ? anchor.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];

  const [cursor, setCursor] = useState({ y: base[0], m: base[1] - 1 });
  const [view, setView] = useState("days");

  const shiftMonth = (delta) =>
    setCursor((c) => {
      const d = new Date(c.y, c.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  const shiftYear = (delta) => setCursor((c) => ({ ...c, y: c.y + delta }));

  const first = new Date(cursor.y, cursor.m, 1).getDay();
  const total = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  const start = mode === "range" ? range?.start : null;
  const end = mode === "range" ? range?.end : null;

  return (
    <div className="Booking-calendarBody">
      <div className="Booking-calendarHead">
        <button
          type="button"
          className="Booking-calendarNav"
          onClick={() => (view === "days" ? shiftMonth(-1) : shiftYear(-1))}
          aria-label={view === "days" ? "Previous month" : "Previous year"}
        >
          <Icon name="chevronLeft" size={16} />
        </button>
        <button
          type="button"
          className="Booking-calendarTitle"
          onClick={() => setView((v) => (v === "days" ? "months" : "days"))}
          aria-label="Switch between days and months"
        >
          {view === "days" ? `${MONTHS[cursor.m]} ${cursor.y}` : cursor.y}
        </button>
        <button
          type="button"
          className="Booking-calendarNav"
          onClick={() => (view === "days" ? shiftMonth(1) : shiftYear(1))}
          aria-label={view === "days" ? "Next month" : "Next year"}
        >
          <Icon name="chevronRight" size={16} />
        </button>
      </div>

      {view === "days" ? (
        <>
          <div className="Booking-calendarWeek">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="Booking-calendarDays">
            {cells.map((day, i) => {
              if (day === null) return <span key={`blank-${i}`} />;
              const iso = toISO(cursor.y, cursor.m, day);
              const selected = mode === "single" ? iso === value : iso === start || iso === end;
              const inRange = start && end && iso > start && iso < end;
              const cls = [
                "Booking-calendarDay",
                selected ? "is-selected" : "",
                inRange ? "is-inRange" : "",
                iso === todayISO ? "is-today" : "",
              ].join(" ");
              return (
                <button key={iso} type="button" className={cls} onClick={() => onPick(iso)} aria-pressed={selected}>
                  {day}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="Booking-calendarMonths">
          {MONTHS.map((name, i) => (
            <button
              key={name}
              type="button"
              className={`Booking-calendarMonth ${i === cursor.m ? "is-current" : ""}`}
              onClick={() => {
                setCursor((c) => ({ ...c, m: i }));
                setView("days");
              }}
            >
              {name.slice(0, 3)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* Single date picker (used in the booking form) */
const DatePicker = ({ value, onChange, hasError, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div className="Booking-datePicker" ref={ref}>
      <button
        type="button"
        className={`Booking-dateTrigger ${open ? "is-open" : ""} ${hasError ? "has-error" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
      >
        <Icon name="calendar" size={17} className="Booking-triggerIcon" />
        <span className={`Booking-triggerText ${value ? "" : "is-placeholder"}`}>
          {value ? formatDate(value) : "Select date"}
        </span>
        <Icon name="chevronDown" size={16} className="Booking-chevron" />
      </button>
      {open && (
        <div className="Booking-calendar Booking-calendar--form" role="dialog" aria-label="Choose a date">
          <Calendar
            value={value}
            onPick={(iso) => {
              onChange(iso);
              setOpen(false);
            }}
          />
          <div className="Booking-calendarFoot">
            <span>{value ? formatDate(value) : "No date chosen"}</span>
            <button
              type="button"
              className="Booking-calendarBtn"
              onClick={() => {
                onChange(isoOf(todayDate()));
                setOpen(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Date range picker (used in the toolbar filter) */
const DateRangePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const label = value.start
    ? value.start === value.end
      ? formatDate(value.start)
      : `${formatShort(value.start)} – ${formatDate(value.end)}`
    : "Select Date Range";

  const presets = useMemo(() => {
    const t = todayDate();
    const shift = (days) => {
      const d = new Date(t);
      d.setDate(d.getDate() - days);
      return isoOf(d);
    };
    return [
      { name: "Today", start: isoOf(t), end: isoOf(t) },
      { name: "Yesterday", start: shift(1), end: shift(1) },
      { name: "Last 7 days", start: shift(6), end: isoOf(t) },
      { name: "Last 30 days", start: shift(29), end: isoOf(t) },
      { name: "This month", start: toISO(t.getFullYear(), t.getMonth(), 1), end: isoOf(t) },
    ];
  }, []);

  const commit = (next) => {
    onChange(next);
    setOpen(false);
  };

  const pick = (iso) => {
    setDraft((d) => {
      if (!d.start || d.end) return { start: iso, end: null };
      return iso < d.start ? { start: iso, end: null } : { start: d.start, end: iso };
    });
  };

  const toggle = () => {
    if (!open) setDraft(value);
    setOpen((o) => !o);
  };

  return (
    <div className="Booking-datePicker Booking-datePicker--range" ref={ref}>
      <button
        type="button"
        className={`Booking-dropdownTrigger ${open ? "is-open" : ""} ${value.start ? "is-filled" : ""}`}
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Select date range"
      >
        <Icon name="calendar" size={17} className="Booking-triggerIcon" />
        <span className="Booking-triggerText">{label}</span>
        <Icon name="chevronDown" size={16} className="Booking-chevron" />
      </button>

      {open && (
        <div className="Booking-calendar Booking-calendar--range" role="dialog" aria-label="Choose a date range">
          <div className="Booking-presets">
            {presets.map((p) => (
              <button
                key={p.name}
                type="button"
                className={`Booking-preset ${value.start === p.start && value.end === p.end ? "is-active" : ""}`}
                onClick={() => commit({ start: p.start, end: p.end })}
              >
                {p.name}
              </button>
            ))}
          </div>
          <Calendar mode="range" range={draft} onPick={pick} />
          <div className="Booking-calendarFoot">
            <span>
              {draft.start
                ? `${formatShort(draft.start)}${draft.end ? ` – ${formatDate(draft.end)}` : " – pick end date"}`
                : "Pick a start date"}
            </span>
            <div className="Booking-calendarActions">
              <button type="button" className="Booking-calendarBtn" onClick={() => commit({ start: null, end: null })}>
                Clear
              </button>
              <button
                type="button"
                className="Booking-calendarBtn Booking-calendarBtn--apply"
                disabled={!draft.start}
                onClick={() => commit({ start: draft.start, end: draft.end || draft.start })}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Modal, form, pagination                                            */
/* ------------------------------------------------------------------ */

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
    <div className="Booking-overlay" onMouseDown={onClose}>
      <div
        className={`Booking-modal Booking-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="Booking-modalHeader">
          <div>
            <h3 className="Booking-modalTitle">{title}</h3>
            {subtitle && <p className="Booking-modalSubtitle">{subtitle}</p>}
          </div>
          <button type="button" className="Booking-modalClose" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const BookingForm = ({ initial, editing, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ ...initial, amount: String(initial.amount) });
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit({
        ...form,
        name: form.name.trim(),
        location: form.location.trim(),
        amount: Number(form.amount),
      });
    }
  };

  return (
    <form className="Booking-form" onSubmit={handleSubmit} noValidate>
      <div className="Booking-formGrid">
        <label className="Booking-field Booking-field--full">
          <span className="Booking-label">Customer name</span>
          <input
            className={`Booking-input ${errors.name ? "has-error" : ""}`}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Ramesh Patra"
            autoFocus
          />
          {errors.name && <span className="Booking-error">{errors.name}</span>}
        </label>

        <div className="Booking-field">
          <span className="Booking-label">Service</span>
          <Dropdown
            label="Service"
            value={form.service}
            options={SERVICES.map((s) => ({ value: s, label: s }))}
            onChange={(v) => set("service", v)}
            className="Booking-dropdown--field"
          />
        </div>

        <div className="Booking-field">
          <span className="Booking-label">Status</span>
          <Dropdown
            label="Status"
            value={form.status}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
            onChange={(v) => set("status", v)}
            className="Booking-dropdown--field"
          />
        </div>

        <label className="Booking-field">
          <span className="Booking-label">Mobile number</span>
          <div className={`Booking-phoneInput ${errors.phone ? "has-error" : ""}`}>
            <span className="Booking-phonePrefix">+91</span>
            <input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="98765 43210"
              inputMode="numeric"
            />
          </div>
          {errors.phone && <span className="Booking-error">{errors.phone}</span>}
        </label>

        <label className="Booking-field">
          <span className="Booking-label">Location</span>
          <input
            className={`Booking-input ${errors.location ? "has-error" : ""}`}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Bhubaneswar"
          />
          {errors.location && <span className="Booking-error">{errors.location}</span>}
        </label>

        <div className="Booking-field">
          <span className="Booking-label">Booking date</span>
          <DatePicker label="Booking date" value={form.date} hasError={Boolean(errors.date)} onChange={(v) => set("date", v)} />
          {errors.date && <span className="Booking-error">{errors.date}</span>}
        </div>

        <label className="Booking-field">
          <span className="Booking-label">Amount</span>
          <div className={`Booking-phoneInput ${errors.amount ? "has-error" : ""}`}>
            <span className="Booking-phonePrefix">₹</span>
            <input
              value={form.amount}
              onChange={(e) => set("amount", e.target.value.replace(/\D/g, "").slice(0, 7))}
              placeholder="2500"
              inputMode="numeric"
            />
          </div>
          {errors.amount && <span className="Booking-error">{errors.amount}</span>}
        </label>
      </div>

      <div className="Booking-modalFooter">
        <button type="button" className="Booking-btn Booking-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="Booking-btn Booking-btn--primary">
          {editing ? "Save changes" : "Add booking"}
        </button>
      </div>
    </form>
  );
};

const Actions = ({ booking, onAction }) => (
  <div className="Booking-actions">
    <button
      type="button"
      className="Booking-iconBtn Booking-iconBtn--view"
      onClick={() => onAction("view", booking)}
      aria-label={`View booking ${booking.id}`}
      title="View"
    >
      <Icon name="eye" size={16} />
    </button>
    <button
      type="button"
      className="Booking-iconBtn Booking-iconBtn--edit"
      onClick={() => onAction("edit", booking)}
      aria-label={`Edit booking ${booking.id}`}
      title="Edit"
    >
      <Icon name="edit" size={16} />
    </button>
    <button
      type="button"
      className="Booking-iconBtn Booking-iconBtn--delete"
      onClick={() => onAction("delete", booking)}
      aria-label={`Delete booking ${booking.id}`}
      title="Delete"
    >
      <Icon name="trash" size={16} />
    </button>
  </div>
);

const Pagination = ({ page, totalPages, total, onChange }) => {
  const pages = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    let from = Math.max(1, page - 2);
    const to = Math.min(totalPages, from + 4);
    from = Math.max(1, to - 4);
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }, [page, totalPages]);

  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="Booking-pagination">
      <p className="Booking-paginationInfo">
        Showing <strong>{from}</strong> to <strong>{to}</strong> of <strong>{total}</strong> bookings
      </p>
      <div className="Booking-paginationControls">
        <button type="button" className="Booking-pageBtn" disabled={page === 1} onClick={() => onChange(1)} aria-label="First page">
          <Icon name="chevronsLeft" size={16} />
        </button>
        <button type="button" className="Booking-pageBtn" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
          <Icon name="chevronLeft" size={16} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`Booking-pageBtn ${p === page ? "is-active" : ""}`}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}
        <button type="button" className="Booking-pageBtn" disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Next page">
          <Icon name="chevronRight" size={16} />
        </button>
        <button type="button" className="Booking-pageBtn" disabled={page === totalPages} onClick={() => onChange(totalPages)} aria-label="Last page">
          <Icon name="chevronsRight" size={16} />
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const Booking = () => {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [tab, setTab] = useState("All");
  const [service, setService] = useState("All");
  const [range, setRange] = useState({ start: null, end: null });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(() => new Set());
  const [modal, setModal] = useState(null); // { type, booking }
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const stats = useMemo(
    () => ({
      total: bookings.length,
      completed: bookings.filter((b) => b.status === "Completed").length,
      progress: bookings.filter((b) => b.status === "In Progress").length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    }),
    [bookings]
  );

  /* Bookings that match the service + date filters (tabs count within this set) */
  const inScope = useMemo(
    () =>
      bookings.filter(
        (b) =>
          (service === "All" || b.service === service) &&
          (!range.start || (b.date >= range.start && b.date <= range.end))
      ),
    [bookings, service, range]
  );

  const counts = useMemo(
    () => ({
      All: inScope.length,
      Completed: inScope.filter((b) => b.status === "Completed").length,
      "In Progress": inScope.filter((b) => b.status === "In Progress").length,
      Cancelled: inScope.filter((b) => b.status === "Cancelled").length,
    }),
    [inScope]
  );

  const filtered = useMemo(
    () => (tab === "All" ? inScope : inScope.filter((b) => b.status === tab)),
    [inScope, tab]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageIds = pageItems.map((b) => b.id);
  const allOnPage = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const someOnPage = pageIds.some((id) => selected.has(id));

  const toggleRow = (id) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const togglePage = () =>
    setSelected((s) => {
      const next = new Set(s);
      pageIds.forEach((id) => (allOnPage ? next.delete(id) : next.add(id)));
      return next;
    });

  const closeModal = useCallback(() => setModal(null), []);
  const openAction = (type, booking) => setModal({ type, booking });

  const handleAdd = (data) => {
    const nextId = Math.max(...bookings.map((b) => b.id)) + 1;
    setBookings((list) => [{ ...data, id: nextId }, ...list]);
    setTab("All");
    setService("All");
    setRange({ start: null, end: null });
    setPage(1);
    closeModal();
    showToast(`Booking #${nextId} was added.`);
  };

  const handleEdit = (data) => {
    setBookings((list) => list.map((b) => (b.id === modal.booking.id ? { ...b, ...data } : b)));
    closeModal();
    showToast(`Booking #${modal.booking.id} was updated.`);
  };

  const handleDelete = () => {
    const { id } = modal.booking;
    setBookings((list) => list.filter((b) => b.id !== id));
    setSelected((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
    closeModal();
    showToast(`Booking #${id} was deleted.`);
  };

  const handleBulkDelete = () => {
    const count = selected.size;
    setBookings((list) => list.filter((b) => !selected.has(b.id)));
    setSelected(new Set());
    closeModal();
    showToast(`${count} booking${count > 1 ? "s were" : " was"} deleted.`);
  };

  const statCards = [
    { key: "total", label: "Total Bookings", value: stats.total, icon: "calendarCheck", mark: "calendar", tone: "total" },
    { key: "completed", label: "Completed", value: stats.completed, icon: "checkCircle", mark: "checkCircle", tone: "completed" },
    { key: "progress", label: "In Progress", value: stats.progress, icon: "refresh", mark: "hourglass", tone: "progress" },
    { key: "cancelled", label: "Cancelled", value: stats.cancelled, icon: "xCircle", mark: "xCircle", tone: "cancelled" },
  ];

  const tabs = [
    { key: "All", label: "All Bookings", icon: "calendarCheck", tone: "all" },
    { key: "Completed", label: "Completed", icon: "checkCircle", tone: "completed" },
    { key: "In Progress", label: "In Progress", icon: "refresh", tone: "progress" },
    { key: "Cancelled", label: "Cancelled", icon: "xCircle", tone: "cancelled" },
  ];

  const serviceOptions = [{ value: "All", label: "All Services" }, ...SERVICES.map((s) => ({ value: s, label: s }))];
  const hasFilters = service !== "All" || range.start || tab !== "All";

  return (
    <section className="Booking">
      {/* Header */}
      <header className="Booking-header">
        <span className="Booking-headerIcon">
          <Icon name="calendarCheck" size={26} />
        </span>
        <div>
          <h1 className="Booking-title">Bookings</h1>
          <p className="Booking-subtitle">Track, manage and update every pest control service booking.</p>
        </div>
      </header>

      {/* Stats */}
      <div className="Booking-stats">
        {statCards.map((s) => {
          const trend = TRENDS[s.key];
          return (
            <article key={s.key} className={`Booking-stat Booking-stat--${s.tone}`}>
              <span className="Booking-statIcon">
                <Icon name={s.icon} size={26} />
              </span>
              <div className="Booking-statBody">
                <p className="Booking-statLabel">{s.label}</p>
                <p className="Booking-statValue">{s.value}</p>
                <p className={`Booking-statTrend ${trend.up ? "is-up" : "is-down"}`}>
                  <Icon name={trend.up ? "arrowUp" : "arrowDown"} size={13} />
                  <strong>{trend.up ? "+" : "-"}{trend.value}%</strong>
                  <span>from last month</span>
                </p>
              </div>
              <Icon name={s.mark} size={76} className="Booking-statWatermark" />
            </article>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="Booking-toolbar">
        <div className="Booking-tabs" role="tablist" aria-label="Filter by booking status">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={`Booking-tab Booking-tab--${t.tone} ${tab === t.key ? "is-active" : ""}`}
              onClick={() => {
                setTab(t.key);
                setPage(1);
              }}
            >
              <Icon name={t.icon} size={17} />
              {t.label} ({counts[t.key]})
            </button>
          ))}
        </div>

        <div className="Booking-controls">
          <DateRangePicker
            value={range}
            onChange={(r) => {
              setRange(r);
              setPage(1);
            }}
          />
          <Dropdown
            label="Filter by service"
            value={service}
            options={serviceOptions}
            onChange={(v) => {
              setService(v);
              setPage(1);
            }}
            className="Booking-dropdown--filter"
          />
          <button type="button" className="Booking-btn Booking-btn--primary Booking-btn--lg" onClick={() => setModal({ type: "add" })}>
            <Icon name="plus" size={18} />
            Add Booking
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="Booking-card">
        {selected.size > 0 && (
          <div className="Booking-bulk" role="status">
            <span>
              <strong>{selected.size}</strong> booking{selected.size > 1 ? "s" : ""} selected
            </span>
            <div className="Booking-bulkActions">
              <button type="button" className="Booking-btn Booking-btn--ghost Booking-btn--sm" onClick={() => setSelected(new Set())}>
                Clear selection
              </button>
              <button type="button" className="Booking-btn Booking-btn--danger Booking-btn--sm" onClick={() => setModal({ type: "bulkDelete" })}>
                <Icon name="trash" size={15} />
                Delete selected
              </button>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="Booking-empty">
            <span className="Booking-emptyIcon">
              <Icon name="calendar" size={28} />
            </span>
            <h3>No bookings found</h3>
            <p>Nothing matches these filters. Try a different date range, service or status.</p>
            {hasFilters && (
              <button
                type="button"
                className="Booking-btn Booking-btn--soft"
                onClick={() => {
                  setTab("All");
                  setService("All");
                  setRange({ start: null, end: null });
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="Booking-tableWrap">
            <table className="Booking-table">
              <thead>
                <tr>
                  <th className="Booking-thCheck">
                    <Checkbox checked={allOnPage} indeterminate={!allOnPage && someOnPage} onChange={togglePage} label="Select all bookings on this page" />
                  </th>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Service</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th className="Booking-thAction">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((b) => (
                  <tr key={b.id} className={selected.has(b.id) ? "is-selected" : ""}>
                    <td className="Booking-cellCheck">
                      <Checkbox checked={selected.has(b.id)} onChange={() => toggleRow(b.id)} label={`Select booking ${b.id}`} />
                    </td>
                    <td className="Booking-cellId">#{b.id}</td>
                    <td className="Booking-cellCustomer">
                      <Avatar name={b.name} />
                      <span className="Booking-customerName">{b.name}</span>
                    </td>
                    <td className="Booking-cellService">
                      <ServiceBadge service={b.service} />
                    </td>
                    <td data-label="Phone">
                      <span className="Booking-meta">
                        <Icon name="phone" size={16} />
                        {formatPhone(b.phone)}
                      </span>
                    </td>
                    <td data-label="Location">
                      <span className="Booking-meta">
                        <Icon name="pin" size={16} />
                        {b.location}
                      </span>
                    </td>
                    <td data-label="Date">
                      <span className="Booking-meta">
                        <Icon name="calendar" size={16} />
                        {formatDate(b.date)}
                      </span>
                    </td>
                    <td className="Booking-cellStatus">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="Booking-cellAmount">{formatAmount(b.amount)}</td>
                    <td className="Booking-cellAction">
                      <Actions booking={b} onAction={openAction} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > 0 && <Pagination page={page} totalPages={totalPages} total={filtered.length} onChange={setPage} />}
      </div>

      {/* Modals */}
      {modal?.type === "add" && (
        <Modal title="Add booking" subtitle="Enter the customer and service details for this booking." onClose={closeModal}>
          <BookingForm initial={EMPTY_FORM} onSubmit={handleAdd} onCancel={closeModal} />
        </Modal>
      )}

      {modal?.type === "edit" && (
        <Modal title="Edit booking" subtitle={`Update booking #${modal.booking.id} for ${modal.booking.name}.`} onClose={closeModal}>
          <BookingForm initial={modal.booking} editing onSubmit={handleEdit} onCancel={closeModal} />
        </Modal>
      )}

      {modal?.type === "view" && (
        <Modal title={`Booking #${modal.booking.id}`} onClose={closeModal} size="sm">
          <div className="Booking-profile">
            <Avatar name={modal.booking.name} size="xl" />
            <h3 className="Booking-profileName">{modal.booking.name}</h3>
            <div className="Booking-profileBadges">
              <ServiceBadge service={modal.booking.service} />
              <StatusBadge status={modal.booking.status} />
            </div>
            <p className="Booking-profileAmount">{formatAmount(modal.booking.amount)}</p>
          </div>
          <dl className="Booking-details">
            <div>
              <dt><Icon name="phone" size={16} /> Phone</dt>
              <dd>{formatPhone(modal.booking.phone)}</dd>
            </div>
            <div>
              <dt><Icon name="pin" size={16} /> Location</dt>
              <dd>{modal.booking.location}</dd>
            </div>
            <div>
              <dt><Icon name="calendar" size={16} /> Booking date</dt>
              <dd>{formatDate(modal.booking.date)}</dd>
            </div>
          </dl>
          <div className="Booking-modalFooter">
            <button type="button" className="Booking-btn Booking-btn--ghost" onClick={closeModal}>
              Close
            </button>
            <button type="button" className="Booking-btn Booking-btn--primary" onClick={() => setModal({ type: "edit", booking: modal.booking })}>
              <Icon name="edit" size={16} />
              Edit booking
            </button>
          </div>
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Delete booking" onClose={closeModal} size="sm">
          <div className="Booking-confirm">
            <span className="Booking-confirmIcon">
              <Icon name="alert" size={28} />
            </span>
            <p>
              Delete booking <strong>#{modal.booking.id}</strong> for <strong>{modal.booking.name}</strong>? This can't be undone.
            </p>
          </div>
          <div className="Booking-modalFooter">
            <button type="button" className="Booking-btn Booking-btn--ghost" onClick={closeModal}>
              Keep booking
            </button>
            <button type="button" className="Booking-btn Booking-btn--danger" onClick={handleDelete}>
              <Icon name="trash" size={16} />
              Delete booking
            </button>
          </div>
        </Modal>
      )}

      {modal?.type === "bulkDelete" && (
        <Modal title="Delete selected bookings" onClose={closeModal} size="sm">
          <div className="Booking-confirm">
            <span className="Booking-confirmIcon">
              <Icon name="alert" size={28} />
            </span>
            <p>
              Delete <strong>{selected.size}</strong> selected booking{selected.size > 1 ? "s" : ""}? This can't be undone.
            </p>
          </div>
          <div className="Booking-modalFooter">
            <button type="button" className="Booking-btn Booking-btn--ghost" onClick={closeModal}>
              Cancel
            </button>
            <button type="button" className="Booking-btn Booking-btn--danger" onClick={handleBulkDelete}>
              <Icon name="trash" size={16} />
              Delete {selected.size}
            </button>
          </div>
        </Modal>
      )}

      {toast && (
        <div className="Booking-toast" role="status">
          <Icon name="check" size={18} />
          {toast}
        </div>
      )}
    </section>
  );
};

export default Booking;