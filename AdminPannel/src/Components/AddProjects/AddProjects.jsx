import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";
import "./AddProjects.css";

/* ---------- Inline icons ---------- */
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
    {...rest}
  >
    {children}
  </svg>
);

const PlusIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M12 8v8M8 12h8" />
  </Icon>
);
const TextIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7V5h16v2M12 5v14M9 19h6" />
  </Icon>
);
const TagIcon = (p) => (
  <Icon {...p}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7.5" cy="7.5" r="1.2" />
  </Icon>
);
const PinIcon = (p) => (
  <Icon {...p}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);
const ChevronIcon = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
const ImageIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </Icon>
);
const UploadIcon = (p) => (
  <Icon {...p}>
    <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 7.95" />
    <path d="m12 12-3 3m3-3 3 3m-3-3v9" />
  </Icon>
);
const CloseIcon = (p) => (
  <Icon {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);
const SaveIcon = (p) => (
  <Icon {...p}>
    <path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    <path d="M7 3v5h8V3M7 21v-7h10v7" />
  </Icon>
);
const BoldIcon = (p) => (
  <Icon {...p}>
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />
  </Icon>
);
const ItalicIcon = (p) => (
  <Icon {...p}>
    <path d="M19 4h-9M14 20H5M15 4 9 20" />
  </Icon>
);
const UnderlineIcon = (p) => (
  <Icon {...p}>
    <path d="M6 4v6a6 6 0 0 0 12 0V4M4 21h16" />
  </Icon>
);
const StrikeIcon = (p) => (
  <Icon {...p}>
    <path d="M4 12h16M16 6.5A4 4 0 0 0 12 5c-2.5 0-4 1.2-4 3 0 1.5 1 2.3 4 3M8 17.5A4.5 4.5 0 0 0 12.5 19c2.5 0 4-1.2 4-3" />
  </Icon>
);
const LinkIcon = (p) => (
  <Icon {...p}>
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </Icon>
);
const QuoteIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M5 17h3l2-4V7H4v6h3zM14 17h3l2-4V7h-6v6h3z" />
  </Icon>
);
const ListUlIcon = (p) => (
  <Icon {...p}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1" />
    <circle cx="4.5" cy="12" r="1" />
    <circle cx="4.5" cy="18" r="1" />
  </Icon>
);
const ListOlIcon = (p) => (
  <Icon {...p}>
    <path d="M10 6h10M10 12h10M10 18h10M4 5l1-1v4M3.5 13.5c0-1 2-1 2 0s-2 1.5-2 2.5h2M3.5 18.5h2l-1 1.2c1 0 1.5.5 1.5 1s-.7 1-2 .8" />
  </Icon>
);
const AlignLeftIcon = (p) => (
  <Icon {...p}>
    <path d="M4 6h16M4 10h10M4 14h16M4 18h10" />
  </Icon>
);
const AlignCenterIcon = (p) => (
  <Icon {...p}>
    <path d="M4 6h16M7 10h10M4 14h16M7 18h10" />
  </Icon>
);
const AlignRightIcon = (p) => (
  <Icon {...p}>
    <path d="M4 6h16M10 10h10M4 14h16M10 18h10" />
  </Icon>
);
const VideoIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="m16 10 5-3v10l-5-3z" />
  </Icon>
);
const TableIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
  </Icon>
);
const CodeIcon = (p) => (
  <Icon {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
  </Icon>
);
const ExpandIcon = (p) => (
  <Icon {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Icon>
);
const ShrinkIcon = (p) => (
  <Icon {...p}>
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
  </Icon>
);

/* ---------- Static data ---------- */
const CATEGORIES = [
  "Residential Pest Control",
  "Commercial Pest Control",
  "Termite Treatment",
  "Mosquito Control",
  "Rodent Control",
  "Cockroach Control",
  "Bed Bug Treatment",
  "Disinfection & Sanitization",
];

const BLOCKS = [
  { label: "Paragraph", tag: "P" },
  { label: "Heading 1", tag: "H1" },
  { label: "Heading 2", tag: "H2" },
  { label: "Heading 3", tag: "H3" },
];

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const AddProjects = ({ onSave, onCancel }) => {
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const editProject = routeLocation.state?.project || null;
  const editingId = editProject?._id || editProject?.id || null;

  const [title, setTitle] = useState(editProject?.title || "");
  const [category, setCategory] = useState(editProject?.category || "");
  const [location, setLocation] = useState(editProject?.location || "");
  const [images, setImages] = useState(() => {
    const existing =
      Array.isArray(editProject?.images) && editProject.images.length
        ? editProject.images
        : editProject?.image
        ? [editProject.image]
        : [];
    return existing.map((url, idx) => ({
      id: `existing-${idx}`,
      url,
      isExisting: true,
    }));
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [block, setBlock] = useState(BLOCKS[0]);
  const [fullscreen, setFullscreen] = useState(false);
  const [active, setActive] = useState({});
  const [saved, setSaved] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (!ignore && res.ok && data.success) {
          const active = (data.data || [])
            .filter((c) => c.status !== "Inactive")
            .map((c) => c.name);
          setCategories(active);
        }
      } catch {
        // Ignore category fetch error
      }
    };
    fetchCategories();
    return () => {
      ignore = true;
    };
  }, []);

  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const catRef = useRef(null);
  const blockRef = useRef(null);
  const imageInsertRef = useRef(null);
  const savedRange = useRef(null);

  /* Close dropdowns on outside click / Esc */
  useEffect(() => {
    const onDown = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
      if (blockRef.current && !blockRef.current.contains(e.target)) setBlockOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setCatOpen(false);
        setBlockOpen(false);
        setFullscreen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* Lock body scroll in fullscreen editor */
  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  /* Revoke previews on unmount */
  useEffect(() => {
    return () => images.forEach((i) => URL.revokeObjectURL(i.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Editor helpers ---------- */
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && editorRef.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const updateActive = useCallback(() => {
    try {
      setActive({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        insertOrderedList: document.queryCommandState("insertOrderedList"),
        justifyLeft: document.queryCommandState("justifyLeft"),
        justifyCenter: document.queryCommandState("justifyCenter"),
        justifyRight: document.queryCommandState("justifyRight"),
      });
    } catch (e) {
      /* ignore */
    }
  }, []);

  const exec = (cmd, value = null) => {
    restoreSelection();
    document.execCommand(cmd, false, value);
    saveSelection();
    updateActive();
    handleEditorInput();
  };

  const handleEditorInput = () => {
    const el = editorRef.current;
    if (!el) return;
    const empty = el.textContent.trim() === "" && !el.querySelector("img,video,table,iframe");
    el.classList.toggle("AddProjects-editor-empty", empty);
    if (!empty && errors.description) setErrors((p) => ({ ...p, description: "" }));
  };

  const insertHTML = (html) => {
    restoreSelection();
    document.execCommand("insertHTML", false, html);
    saveSelection();
    handleEditorInput();
  };

  const handleBlock = (b) => {
    setBlock(b);
    setBlockOpen(false);
    exec("formatBlock", b.tag);
  };

  const handleLink = () => {
    saveSelection();
    const url = window.prompt("Enter link URL (https://...)");
    if (!url) return;
    const safe = /^(https?:|mailto:)/i.test(url) ? url : `https://${url}`;
    exec("createLink", safe);
  };

  const handleVideo = () => {
    saveSelection();
    const url = window.prompt("Paste video URL (YouTube or direct .mp4 link)");
    if (!url) return;
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if (yt) {
      insertHTML(
        `<div class="AddProjects-embed"><iframe src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen></iframe></div><p><br></p>`
      );
    } else {
      insertHTML(`<video src="${url}" controls style="max-width:100%"></video><p><br></p>`);
    }
  };

  const handleTable = () => {
    saveSelection();
    const input = window.prompt("Table size (rows x columns)", "3x3");
    if (!input) return;
    const m = input.toLowerCase().match(/(\d+)\s*[x,]\s*(\d+)/);
    const rows = m ? Math.min(+m[1], 20) : 3;
    const cols = m ? Math.min(+m[2], 8) : 3;
    let html = '<table class="AddProjects-table"><tbody>';
    for (let r = 0; r < rows; r++) {
      html += "<tr>";
      for (let c = 0; c < cols; c++) html += "<td><br></td>";
      html += "</tr>";
    }
    html += "</tbody></table><p><br></p>";
    insertHTML(html);
  };

  const handleInlineImage = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !ALLOWED.includes(file.type) || file.size > MAX_SIZE) return;
    const reader = new FileReader();
    reader.onload = () => insertHTML(`<img src="${reader.result}" alt="" style="max-width:100%" /><p><br></p>`);
    reader.readAsDataURL(file);
  };

  const handleCode = () => {
    restoreSelection();
    const text = window.getSelection().toString();
    const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    insertHTML(`<code>${esc || "code"}</code>&nbsp;`);
  };

  /* ---------- Image upload ---------- */
  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    const next = [];
    let err = "";
    incoming.forEach((f) => {
      if (!ALLOWED.includes(f.type)) {
        err = "Only JPG, JPEG, PNG and WEBP images are allowed.";
      } else if (f.size > MAX_SIZE) {
        err = "Each image must be 5MB or smaller.";
      } else {
        next.push({
          id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          file: f,
          url: URL.createObjectURL(f),
        });
      }
    });
    setImages((prev) => [...prev, ...next]);
    setErrors((p) => ({ ...p, images: err }));
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const t = prev.find((i) => i.id === id);
      if (t?.url && t.url.startsWith("blob:")) URL.revokeObjectURL(t.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  };

  /* ---------- Submit / Cancel ---------- */
  const validate = () => {
    const er = {};
    if (!title.trim()) er.title = "Project title is required.";
    if (!category) er.category = "Please select a category.";
    if (!location.trim()) er.location = "Project location is required.";
    const el = editorRef.current;
    if (!el || (el.textContent.trim() === "" && !el.querySelector("img,video,table,iframe"))) {
      er.description = "Project description is required.";
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const resetForm = () => {
    images.forEach((i) => {
      if (i.url && i.url.startsWith("blob:")) URL.revokeObjectURL(i.url);
    });
    setTitle("");
    setCategory("");
    setLocation("");
    setImages([]);
    setErrors({});
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      editorRef.current.classList.add("AddProjects-editor-empty");
    }
  };

  useEffect(() => {
    if (editProject && editorRef.current) {
      const html = editProject.rawDescription || editProject.description || editProject.desc || "";
      editorRef.current.innerHTML = html;
      if (html.trim()) {
        editorRef.current.classList.remove("AddProjects-editor-empty");
      }
    }
  }, [editProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const htmlDesc = editorRef.current ? editorRef.current.innerHTML : "";
    const plainDesc = editorRef.current ? editorRef.current.innerText.trim() : "";

    try {
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("category", category);
      fd.append("location", location.trim());
      fd.append("desc", plainDesc.slice(0, 160));
      fd.append("description", htmlDesc);
      fd.append("status", editProject?.status || "Published");
      const existingImages = images
        .filter((item) => item.isExisting && item.url)
        .map((item) => item.url);
      fd.append("existingImages", JSON.stringify(existingImages));
      images.forEach((item) => {
        if (item.file) fd.append("images", item.file);
      });

      const url = editingId
        ? `${API_BASE_URL}/projects/${editingId}`
        : `${API_BASE_URL}/projects`;
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: fd,
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        setErrors((p) => ({ ...p, description: result.message || "Failed to save project." }));
        return;
      }

      if (onSave) onSave(result.data);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        if (editingId) navigate("/projects");
      }, 1000);
      if (!editingId) resetForm();
    } catch {
      setErrors((p) => ({ ...p, description: "Could not connect to backend server." }));
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  /* ---------- Toolbar config ---------- */
  const Btn = ({ cmd, title: t, icon, onClick, isActive }) => (
    <button
      type="button"
      className={`AddProjects-tool-btn ${isActive ? "AddProjects-tool-btn-active" : ""}`}
      title={t}
      aria-label={t}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick || (() => exec(cmd))}
    >
      {icon}
    </button>
  );

  return (
    <section className="AddProjects">
      {/* Header */}
      <header className="AddProjects-header">
        <div className="AddProjects-header-icon">
          <PlusIcon size={26} />
        </div>
        <div className="AddProjects-header-text">
          <h1 className="AddProjects-heading">{editingId ? "Edit Project" : "Add Project"}</h1>
          <p className="AddProjects-subheading">
            {editingId
              ? "Update project details and images in your database."
              : "Create a new project to showcase your work, case study, or service result."}
          </p>
        </div>
      </header>

      <form className="AddProjects-form" onSubmit={handleSubmit} noValidate>
        <div className="AddProjects-grid">
          {/* LEFT CARD */}
          <div className="AddProjects-card AddProjects-card-main">
            {/* Title */}
            <div className="AddProjects-field">
              <label className="AddProjects-label" htmlFor="AddProjects-title">
                Project Title <span className="AddProjects-required">*</span>
              </label>
              <div className={`AddProjects-input-wrap ${errors.title ? "AddProjects-has-error" : ""}`}>
                <span className="AddProjects-input-icon">
                  <TextIcon size={18} />
                </span>
                <input
                  id="AddProjects-title"
                  type="text"
                  className="AddProjects-input"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((p) => ({ ...p, title: "" }));
                  }}
                />
              </div>
              {errors.title && <p className="AddProjects-error">{errors.title}</p>}
            </div>

            {/* Category + Location */}
            <div className="AddProjects-row">
              <div className="AddProjects-field">
                <label className="AddProjects-label">
                  Category <span className="AddProjects-required">*</span>
                </label>
                <div className="AddProjects-dropdown" ref={catRef}>
                  <button
                    type="button"
                    className={`AddProjects-input-wrap AddProjects-select-btn ${
                      catOpen ? "AddProjects-focus" : ""
                    } ${errors.category ? "AddProjects-has-error" : ""}`}
                    onClick={() => setCatOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={catOpen}
                  >
                    <span className="AddProjects-input-icon">
                      <TagIcon size={18} />
                    </span>
                    <span className={`AddProjects-select-value ${category ? "" : "AddProjects-placeholder"}`}>
                      {category || "Select category"}
                    </span>
                    <span className={`AddProjects-chevron ${catOpen ? "AddProjects-chevron-open" : ""}`}>
                      <ChevronIcon size={18} />
                    </span>
                  </button>
                  {catOpen && (
                    <ul className="AddProjects-menu" role="listbox">
                      {categories.length === 0 ? (
                        <li className="AddProjects-menu-item" style={{ opacity: 0.7, cursor: "default" }}>
                          No categories found
                        </li>
                      ) : (
                        categories.map((c) => (
                          <li
                            key={c}
                            role="option"
                            aria-selected={category === c}
                            className={`AddProjects-menu-item ${
                              category === c ? "AddProjects-menu-item-active" : ""
                            }`}
                            onClick={() => {
                              setCategory(c);
                              setCatOpen(false);
                              setErrors((p) => ({ ...p, category: "" }));
                            }}
                          >
                            {c}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
                {errors.category && <p className="AddProjects-error">{errors.category}</p>}
              </div>

              <div className="AddProjects-field">
                <label className="AddProjects-label" htmlFor="AddProjects-location">
                  Location <span className="AddProjects-required">*</span>
                </label>
                <div className={`AddProjects-input-wrap ${errors.location ? "AddProjects-has-error" : ""}`}>
                  <span className="AddProjects-input-icon">
                    <PinIcon size={18} />
                  </span>
                  <input
                    id="AddProjects-location"
                    type="text"
                    className="AddProjects-input"
                    placeholder="Enter project location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (errors.location) setErrors((p) => ({ ...p, location: "" }));
                    }}
                  />
                </div>
                {errors.location && <p className="AddProjects-error">{errors.location}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="AddProjects-field">
              <label className="AddProjects-label">
                Project Description <span className="AddProjects-required">*</span>
              </label>

              <div
                className={`AddProjects-editor ${fullscreen ? "AddProjects-editor-full" : ""} ${
                  errors.description ? "AddProjects-has-error" : ""
                }`}
              >
                <div className="AddProjects-toolbar">
                  <div className="AddProjects-dropdown AddProjects-block" ref={blockRef}>
                    <button
                      type="button"
                      className="AddProjects-block-btn"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        saveSelection();
                        setBlockOpen((o) => !o);
                      }}
                    >
                      <span>{block.label}</span>
                      <ChevronIcon size={15} />
                    </button>
                    {blockOpen && (
                      <ul className="AddProjects-menu AddProjects-menu-small" role="listbox">
                        {BLOCKS.map((b) => (
                          <li
                            key={b.tag}
                            className={`AddProjects-menu-item ${
                              block.tag === b.tag ? "AddProjects-menu-item-active" : ""
                            }`}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleBlock(b)}
                          >
                            {b.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <Btn cmd="bold" title="Bold" icon={<BoldIcon size={17} />} isActive={active.bold} />
                  <Btn cmd="italic" title="Italic" icon={<ItalicIcon size={17} />} isActive={active.italic} />
                  <Btn
                    cmd="underline"
                    title="Underline"
                    icon={<UnderlineIcon size={17} />}
                    isActive={active.underline}
                  />
                  <Btn
                    cmd="strikeThrough"
                    title="Strikethrough"
                    icon={<StrikeIcon size={17} />}
                    isActive={active.strikeThrough}
                  />
                  <Btn title="Insert link" icon={<LinkIcon size={17} />} onClick={handleLink} />
                  <Btn
                    title="Quote"
                    icon={<QuoteIcon size={17} />}
                    onClick={() => exec("formatBlock", "BLOCKQUOTE")}
                  />

                  <span className="AddProjects-divider" />

                  <Btn
                    cmd="insertUnorderedList"
                    title="Bullet list"
                    icon={<ListUlIcon size={17} />}
                    isActive={active.insertUnorderedList}
                  />
                  <Btn
                    cmd="insertOrderedList"
                    title="Numbered list"
                    icon={<ListOlIcon size={17} />}
                    isActive={active.insertOrderedList}
                  />

                  <span className="AddProjects-divider" />

                  <Btn
                    cmd="justifyLeft"
                    title="Align left"
                    icon={<AlignLeftIcon size={17} />}
                    isActive={active.justifyLeft}
                  />
                  <Btn
                    cmd="justifyCenter"
                    title="Align center"
                    icon={<AlignCenterIcon size={17} />}
                    isActive={active.justifyCenter}
                  />
                  <Btn
                    cmd="justifyRight"
                    title="Align right"
                    icon={<AlignRightIcon size={17} />}
                    isActive={active.justifyRight}
                  />

                  <span className="AddProjects-divider" />

                  <Btn
                    title="Insert image"
                    icon={<ImageIcon size={17} />}
                    onClick={() => {
                      saveSelection();
                      imageInsertRef.current?.click();
                    }}
                  />
                  <Btn title="Insert video" icon={<VideoIcon size={17} />} onClick={handleVideo} />
                  <Btn title="Insert table" icon={<TableIcon size={17} />} onClick={handleTable} />
                  <Btn title="Inline code" icon={<CodeIcon size={17} />} onClick={handleCode} />
                  <Btn
                    title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                    icon={fullscreen ? <ShrinkIcon size={17} /> : <ExpandIcon size={17} />}
                    onClick={() => setFullscreen((f) => !f)}
                  />

                  <input
                    ref={imageInsertRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="AddProjects-hidden"
                    onChange={handleInlineImage}
                  />
                </div>

                <div
                  ref={editorRef}
                  className="AddProjects-editor-area AddProjects-editor-empty"
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="Write project description here..."
                  onInput={handleEditorInput}
                  onKeyUp={() => {
                    saveSelection();
                    updateActive();
                  }}
                  onMouseUp={() => {
                    saveSelection();
                    updateActive();
                  }}
                  onBlur={saveSelection}
                />
              </div>
              {errors.description && <p className="AddProjects-error">{errors.description}</p>}
            </div>
          </div>

          {/* RIGHT CARD */}
          <aside className="AddProjects-card AddProjects-card-side">
            <div className="AddProjects-side-head">
              <span className="AddProjects-side-icon">
                <ImageIcon size={20} />
              </span>
              <h2 className="AddProjects-side-title">Project Images</h2>
            </div>

            <div
              className={`AddProjects-upload ${dragActive ? "AddProjects-upload-active" : ""}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={onDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileRef.current?.click();
                }
              }}
            >
              <span className="AddProjects-upload-icon">
                <UploadIcon size={46} />
              </span>
              <p className="AddProjects-upload-title">Click to upload or drag &amp; drop images</p>
              <p className="AddProjects-upload-note">Supports: JPG, JPEG, PNG, WEBP (Max 5MB each)</p>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="AddProjects-hidden"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
            {errors.images && <p className="AddProjects-error">{errors.images}</p>}

            {images.length > 0 && (
              <ul className="AddProjects-thumbs">
                {images.map((img) => (
                  <li key={img.id} className="AddProjects-thumb">
                    <img src={img.url} alt={img.file?.name || "Project image"} className="AddProjects-thumb-img" />
                    <button
                      type="button"
                      className="AddProjects-thumb-remove"
                      aria-label={`Remove ${img.file?.name || "image"}`}
                      onClick={() => removeImage(img.id)}
                    >
                      <CloseIcon size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>

        {/* Action bar */}
        <div className="AddProjects-actions">
          <button type="submit" className="AddProjects-btn AddProjects-btn-primary">
            <SaveIcon size={18} />
            <span>{editingId ? "Update Project" : "Save Project"}</span>
          </button>
          <button type="button" className="AddProjects-btn AddProjects-btn-secondary" onClick={handleCancel}>
            <CloseIcon size={18} />
            <span>Cancel</span>
          </button>
          {saved && (
            <span className="AddProjects-toast">
              {editingId ? "Project updated successfully" : "Project saved successfully"}
            </span>
          )}
        </div>
      </form>
    </section>
  );
};

export default AddProjects;