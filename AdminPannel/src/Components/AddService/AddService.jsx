import React, { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../config/api";
import "./AddService.css";

/* ------------------------------- Icons ------------------------------- */
const ICONS = {
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  type: (<><path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" /></>),
  file: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>),
  grid: (<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>),
  pin: (<><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  bold: (<><path d="M6 4h8a4 4 0 0 1 0 8H6z" /><path d="M6 12h9a4 4 0 0 1 0 8H6z" /></>),
  italic: (<><path d="M19 4h-9" /><path d="M14 20H5" /><path d="M15 4L9 20" /></>),
  underline: (<><path d="M6 4v6a6 6 0 0 0 12 0V4" /><path d="M4 20h16" /></>),
  strike: (<><path d="M16 4H9a3 3 0 0 0-2.83 4" /><path d="M14 12a4 4 0 0 1 0 8H6" /><path d="M4 12h16" /></>),
  quote: (<><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1v2c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></>),
  ul: (<><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>),
  ol: (<><path d="M10 6h11M10 12h11M10 18h11" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></>),
  alignl: <path d="M17 10H3M21 6H3M21 14H3M17 18H3" />,
  alignc: <path d="M18 10H6M21 6H3M21 14H3M18 18H6" />,
  alignr: <path d="M21 10H7M21 6H3M21 14H3M21 18H7" />,
  link: (<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>),
  image: (<><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="1.8" /><path d="M21 15l-5-5L5 21" /></>),
  table: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></>),
  code: (<><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></>),
  expand: <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />,
  shrink: <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />,
  cloud: (<><path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" /><path d="M12 12v9" /><path d="M16 16l-4-4-4 4" /></>),
  upload: (<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></>),
  save: (<><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></>),
  x: (<><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>),
  check: <path d="M20 6L9 17l-5-5" />,
  down: <path d="M6 9l6 6 6-6" />,
  shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>),
  alert: (<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></>),
  trash: (<><path d="M3 6h18" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
};

const Icon = ({ name, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[name]}
  </svg>
);

/* ------------------------------- Config ------------------------------ */
const CATEGORIES = ["Residential", "Commercial", "Termite Control", "Rodent Control", "Cockroach Control", "Mosquito Control", "Bed Bug Control", "Disinfection"];
const BLOCKS = [
  { v: "p", l: "Paragraph" },
  { v: "h1", l: "Heading 1" },
  { v: "h2", l: "Heading 2" },
  { v: "h3", l: "Heading 3" },
];
const MAX_DESC = 160;
const MAX_IMG = 5 * 1024 * 1024;
const OK_TYPES = ["image/jpeg", "image/png", "image/webp"];
const INITIAL = { title: "", desc: "", category: "", location: "", published: true };

/* ----------------------------- Small parts --------------------------- */
const Select = ({ value, options, onChange, placeholder = "Select", icon, invalid }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const items = options.map((o) => (typeof o === "string" ? { v: o, l: o } : o));
  const cur = items.find((i) => i.v === value);
  return (
    <div className={`add-service__select ${open ? "is-open" : ""} ${invalid ? "is-invalid" : ""}`} ref={ref}>
      <button type="button" className="add-service__select-btn" onClick={() => setOpen(!open)}>
        {icon && <Icon name={icon} size={17} />}
        <span className={cur ? "" : "is-placeholder"}>{cur ? cur.l : placeholder}</span>
        <Icon name="down" size={16} />
      </button>
      {open && (
        <ul className="add-service__select-menu">
          {items.map((i) => (
            <li key={i.v}>
              <button type="button" className={i.v === value ? "is-active" : ""} onClick={() => { onChange(i.v); setOpen(false); }}>
                {i.l}
                {i.v === value && <Icon name="check" size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Modal = ({ title, subtitle, onClose, footer, children }) => {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="add-service__overlay" onMouseDown={onClose}>
      <div className="add-service__modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="add-service__modal-head">
          <div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
          <button type="button" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        </div>
        <div className="add-service__modal-body">{children}</div>
        {footer && <div className="add-service__modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

/* ------------------------------ Component ---------------------------- */
const AddService = () => {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [modal, setModal] = useState(null); // link | image | table | cancel | success
  const [fullscreen, setFullscreen] = useState(false);
  const [fmt, setFmt] = useState({});
  const [block, setBlock] = useState("p");
  const [toast, setToast] = useState("");
  const [saved, setSaved] = useState(null);

  const [linkUrl, setLinkUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tbl, setTbl] = useState({ rows: 3, cols: 3 });

  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const range = useRef(null);

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => () => image && URL.revokeObjectURL(image.url), [image]);

  /* ------------------------------ Editor ------------------------------ */
  const inEditor = (n) => editorRef.current && n && editorRef.current.contains(n);

  useEffect(() => {
    const update = () => {
      const sel = window.getSelection();
      if (!sel || !inEditor(sel.anchorNode)) return;
      const q = (c) => { try { return document.queryCommandState(c); } catch { return false; } };
      setFmt({ bold: q("bold"), italic: q("italic"), underline: q("underline"), strike: q("strikeThrough"), ul: q("insertUnorderedList"), ol: q("insertOrderedList") });
      let v = "";
      try { v = String(document.queryCommandValue("formatBlock")).toLowerCase(); } catch { /* noop */ }
      setBlock(["h1", "h2", "h3"].includes(v) ? v : "p");
    };
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, []);

  const onInput = () => setErrors((e) => ({ ...e, content: "" }));

  const exec = (cmd, val) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    onInput();
  };

  const saveRange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && inEditor(sel.anchorNode)) range.current = sel.getRangeAt(0).cloneRange();
  };
  const restoreRange = () => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (range.current && sel) { sel.removeAllRanges(); sel.addRange(range.current); }
  };
  const openModal = (type) => { saveRange(); setModal(type); };

  const onPaste = (e) => {
    e.preventDefault();
    document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
  };

  const insertCode = () => {
    const txt = (window.getSelection()?.toString() || "code").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    exec("insertHTML", `<code>${txt}</code>&nbsp;`);
  };

  const insertLink = (e) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;
    const url = /^(https?:|mailto:|tel:)/i.test(linkUrl.trim()) ? linkUrl.trim() : `https://${linkUrl.trim()}`;
    restoreRange();
    if (window.getSelection()?.isCollapsed) document.execCommand("insertHTML", false, `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    else document.execCommand("createLink", false, url);
    setLinkUrl(""); setModal(null); onInput();
  };

  const insertImage = (src) => {
    restoreRange();
    document.execCommand("insertHTML", false, `<img src="${src}" alt="" />`);
    setImgUrl(""); setModal(null); onInput();
  };
  const pickEditorImage = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = () => insertImage(r.result);
    r.readAsDataURL(file);
    e.target.value = "";
  };

  const insertTable = (e) => {
    e.preventDefault();
    const r = Math.min(Math.max(+tbl.rows || 1, 1), 10);
    const c = Math.min(Math.max(+tbl.cols || 1, 1), 6);
    const head = `<tr>${Array.from({ length: c }, (_, i) => `<th>Heading ${i + 1}</th>`).join("")}</tr>`;
    const body = Array.from({ length: r - 1 }, () => `<tr>${Array.from({ length: c }, () => "<td><br></td>").join("")}</tr>`).join("");
    restoreRange();
    document.execCommand("insertHTML", false, `<table><tbody>${head}${body}</tbody></table><p><br></p>`);
    setModal(null); onInput();
  };

  const tool = (icon, title, active, onClick) => (
    <button type="button" key={title} title={title} aria-label={title} className={`add-service__tool ${active ? "is-active" : ""}`} onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
      <Icon name={icon} size={17} />
    </button>
  );

  /* ------------------------------- Image ------------------------------ */
  const handleImage = (file) => {
    if (!file) return;
    if (!OK_TYPES.includes(file.type)) return setErrors((e) => ({ ...e, image: "Only JPG, JPEG, PNG or WEBP images are allowed." }));
    if (file.size > MAX_IMG) return setErrors((e) => ({ ...e, image: "Image must be 5MB or smaller." }));
    setImage({ url: URL.createObjectURL(file), name: file.name, size: file.size });
    setErrors((e) => ({ ...e, image: "" }));
  };

  /* ------------------------------- Submit ----------------------------- */
  const reset = () => {
    setForm(INITIAL); setErrors({}); setImage(null);
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const save = async () => {
    const err = {};
    if (!form.title.trim()) err.title = "Service title is required.";
    if (!form.desc.trim()) err.desc = "Short description is required.";
    if (!(editorRef.current?.innerText || "").trim()) err.content = "Service description is required.";
    if (!image) err.image = "Please upload a service image.";
    if (!form.category) err.category = "Please select a category.";
    setErrors(err);
    if (Object.keys(err).length) return setToast("Please fix the highlighted fields");

    try {
      const response = await fetch(`${API_BASE_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          desc: form.desc.trim(),
          category: form.category,
          location: form.location.trim(),
          content: editorRef.current?.innerHTML || "",
          image: image?.url || "",
          published: form.published,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        return setToast(result.message || "Failed to save service");
      }
      setSaved({ title: form.title.trim(), category: form.category, published: form.published });
      setModal("success");
    } catch (error) {
      setToast("Could not connect to backend server");
    }
  };

  const dirty = form.title || form.desc || form.category || form.location || image || (editorRef.current?.innerText || "").trim();
  const cancel = () => (dirty ? setModal("cancel") : setToast("Nothing to discard"));

  return (
    <div className="add-service">
      {/* Header */}
      <header className="add-service__header">
        <div className="add-service__heading">
          <span className="add-service__heading-icon"><Icon name="wrench" size={24} /></span>
          <div>
            <h1>Add Service</h1>
            <p>Create a new service to showcase on your website.</p>
          </div>
        </div>
        <div className="add-service__banner">
          <span><Icon name="shield" size={24} /></span>
          <strong>Pest Control<br />Services</strong>
        </div>
      </header>

      <div className="add-service__card">
        {/* LEFT */}
        <section className="add-service__left">
          <div className={`add-service__field ${errors.title ? "has-error" : ""}`}>
            <label htmlFor="as-title">Service Title <em>*</em></label>
            <div className="add-service__input">
              <Icon name="type" size={17} />
              <input id="as-title" type="text" maxLength={100} placeholder="Enter service title (e.g., Termite Control)" value={form.title} onChange={(e) => set("title", e.target.value)} />
            </div>
            {errors.title && <span className="add-service__error">{errors.title}</span>}
          </div>

          <div className={`add-service__field ${errors.desc ? "has-error" : ""}`}>
            <label htmlFor="as-desc">Short Description <em>*</em></label>
            <div className="add-service__textarea">
              <Icon name="file" size={17} />
              <textarea id="as-desc" rows={3} maxLength={MAX_DESC} placeholder="Enter a short description (max 160 characters)..." value={form.desc} onChange={(e) => set("desc", e.target.value)} />
              <span className={form.desc.length > 140 ? "is-warn" : ""}>{form.desc.length}/{MAX_DESC}</span>
            </div>
            {errors.desc && <span className="add-service__error">{errors.desc}</span>}
          </div>

          <div className={`add-service__field ${errors.content ? "has-error" : ""}`}>
            <label>Service Description <em>*</em></label>
            <div className={`add-service__editor ${fullscreen ? "is-fullscreen" : ""}`}>
              <div className="add-service__toolbar">
                <div className="add-service__block"><Select value={block} options={BLOCKS} onChange={(v) => { setBlock(v); exec("formatBlock", `<${v}>`); }} /></div>
                <span className="add-service__sep" />
                {tool("bold", "Bold", fmt.bold, () => exec("bold"))}
                {tool("italic", "Italic", fmt.italic, () => exec("italic"))}
                {tool("underline", "Underline", fmt.underline, () => exec("underline"))}
                {tool("strike", "Strikethrough", fmt.strike, () => exec("strikeThrough"))}
                {tool("quote", "Quote", false, () => exec("formatBlock", "<blockquote>"))}
                <span className="add-service__sep" />
                {tool("ul", "Bullet list", fmt.ul, () => exec("insertUnorderedList"))}
                {tool("ol", "Numbered list", fmt.ol, () => exec("insertOrderedList"))}
                <span className="add-service__sep" />
                {tool("alignl", "Align left", false, () => exec("justifyLeft"))}
                {tool("alignc", "Align center", false, () => exec("justifyCenter"))}
                {tool("alignr", "Align right", false, () => exec("justifyRight"))}
                <span className="add-service__sep" />
                {tool("link", "Insert link", false, () => openModal("link"))}
                {tool("image", "Insert image", false, () => openModal("image"))}
                {tool("table", "Insert table", false, () => openModal("table"))}
                {tool("code", "Inline code", false, insertCode)}
                <span className="add-service__spacer" />
                {tool(fullscreen ? "shrink" : "expand", "Fullscreen", fullscreen, () => setFullscreen(!fullscreen))}
              </div>
              <div
                ref={editorRef}
                className="add-service__content"
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Write full description about this service..."
                onInput={onInput}
                onPaste={onPaste}
              />
            </div>
            {errors.content && <span className="add-service__error">{errors.content}</span>}
          </div>
        </section>

        {/* RIGHT */}
        <aside className="add-service__right">
          <div className="add-service__field">
            <h4 className="add-service__title"><span><Icon name="upload" size={17} /></span> Service Image <em>*</em></h4>
            <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp" hidden onChange={(e) => { handleImage(e.target.files?.[0]); e.target.value = ""; }} />
            {image ? (
              <div className="add-service__preview">
                <img src={image.url} alt="Service preview" />
                <div>
                  <p><b>{image.name}</b><small>{(image.size / 1024).toFixed(0)} KB</small></p>
                  <button type="button" onClick={() => fileRef.current?.click()}>Change</button>
                  <button type="button" className="is-danger" onClick={() => setImage(null)} aria-label="Remove image"><Icon name="trash" size={15} /></button>
                </div>
              </div>
            ) : (
              <div
                className={`add-service__drop ${dragging ? "is-drag" : ""} ${errors.image ? "has-error" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); handleImage(e.dataTransfer.files?.[0]); }}
              >
                <Icon name="cloud" size={48} />
                <strong>Drag &amp; drop image here or click to browse</strong>
                <small>Supports: JPG, JPEG, PNG, WEBP (Max 5MB)</small>
                <span className="add-service__choose"><Icon name="upload" size={16} /> Choose Image</span>
              </div>
            )}
            {errors.image && <span className="add-service__error">{errors.image}</span>}
          </div>

          <div className="add-service__row">
            <div className={`add-service__field ${errors.category ? "has-error" : ""}`}>
              <label>Category <em>*</em></label>
              <Select value={form.category} options={CATEGORIES} onChange={(v) => set("category", v)} placeholder="Select category" icon="grid" invalid={!!errors.category} />
              {errors.category && <span className="add-service__error">{errors.category}</span>}
            </div>
            <div className="add-service__field">
              <label htmlFor="as-loc">Location</label>
              <div className="add-service__input">
                <Icon name="pin" size={17} />
                <input id="as-loc" type="text" placeholder="Enter location (e.g., Bhubaneswar)" value={form.location} onChange={(e) => set("location", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="add-service__status">
            <b>Status</b>
            <label className="add-service__switch">
              <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
              <i />
              <span>{form.published ? "Publish this service (Visible on website)" : "Keep as draft (Hidden from website)"}</span>
            </label>
          </div>

          <div className="add-service__actions">
            <button type="button" className="add-service__btn add-service__btn--primary" onClick={save}><Icon name="save" size={17} /> Save Service</button>
            <button type="button" className="add-service__btn add-service__btn--light" onClick={cancel}><Icon name="x" size={17} /> Cancel</button>
          </div>
        </aside>
      </div>

      {/* Modals */}
      {modal === "link" && (
        <Modal title="Insert link" subtitle="Add a URL to the selected text." onClose={() => setModal(null)}
          footer={<><button type="button" className="add-service__btn add-service__btn--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" form="as-link-form" className="add-service__btn add-service__btn--primary">Insert</button></>}>
          <form id="as-link-form" onSubmit={insertLink} className="add-service__field">
            <label htmlFor="as-link">URL</label>
            <div className="add-service__input"><Icon name="link" size={17} /><input id="as-link" autoFocus type="text" placeholder="https://example.com" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} /></div>
          </form>
        </Modal>
      )}

      {modal === "image" && (
        <Modal title="Insert image" subtitle="Paste an image URL or upload from your device." onClose={() => setModal(null)}
          footer={<><button type="button" className="add-service__btn add-service__btn--light" onClick={() => setModal(null)}>Cancel</button><button type="button" className="add-service__btn add-service__btn--primary" disabled={!imgUrl.trim()} onClick={() => insertImage(imgUrl.trim())}>Insert</button></>}>
          <div className="add-service__field">
            <label htmlFor="as-img">Image URL</label>
            <div className="add-service__input"><Icon name="image" size={17} /><input id="as-img" autoFocus type="text" placeholder="https://..." value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} /></div>
          </div>
          <div className="add-service__or"><span>or</span></div>
          <label className="add-service__btn add-service__btn--light add-service__btn--block">
            <Icon name="upload" size={16} /> Upload from device
            <input type="file" accept="image/*" hidden onChange={pickEditorImage} />
          </label>
        </Modal>
      )}

      {modal === "table" && (
        <Modal title="Insert table" subtitle="Choose the size of the table." onClose={() => setModal(null)}
          footer={<><button type="button" className="add-service__btn add-service__btn--light" onClick={() => setModal(null)}>Cancel</button><button type="submit" form="as-table-form" className="add-service__btn add-service__btn--primary">Insert</button></>}>
          <form id="as-table-form" onSubmit={insertTable} className="add-service__row">
            <div className="add-service__field"><label>Rows (1–10)</label><div className="add-service__input"><input type="number" min={1} max={10} value={tbl.rows} onChange={(e) => setTbl({ ...tbl, rows: e.target.value })} /></div></div>
            <div className="add-service__field"><label>Columns (1–6)</label><div className="add-service__input"><input type="number" min={1} max={6} value={tbl.cols} onChange={(e) => setTbl({ ...tbl, cols: e.target.value })} /></div></div>
          </form>
        </Modal>
      )}

      {modal === "cancel" && (
        <Modal title="Discard this service?" onClose={() => setModal(null)}
          footer={<><button type="button" className="add-service__btn add-service__btn--light" onClick={() => setModal(null)}>Keep editing</button><button type="button" className="add-service__btn add-service__btn--danger" onClick={() => { reset(); setModal(null); setToast("Service discarded"); }}><Icon name="trash" size={16} /> Discard</button></>}>
          <div className="add-service__confirm">
            <span><Icon name="alert" size={28} /></span>
            <p>Everything you've entered will be lost. This cannot be undone.</p>
          </div>
        </Modal>
      )}

      {modal === "success" && saved && (
        <Modal title="Service saved!" onClose={() => { setModal(null); reset(); }}
          footer={<button type="button" className="add-service__btn add-service__btn--primary" onClick={() => { setModal(null); reset(); }}>Add another service</button>}>
          <div className="add-service__success">
            <span><Icon name="check" size={32} /></span>
            <h4>{saved.title}</h4>
            <p>{saved.published ? "It is now live on your website." : "Saved as a draft — hidden from your website."}</p>
            <small>Category: {saved.category}</small>
          </div>
        </Modal>
      )}

      {toast && <div className="add-service__toast" role="status"><Icon name="alert" size={16} /> {toast}</div>}
    </div>
  );
};

export default AddService;