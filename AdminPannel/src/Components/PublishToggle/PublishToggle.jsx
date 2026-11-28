import React from "react";
import "./PublishToggle.css";

const PublishToggle = ({ checked, onChange, label = "Toggle publish status", disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    className={`PublishToggle ${checked ? "is-on" : "is-off"}`}
    onClick={onChange}
    title={checked ? "Published (click to unpublish)" : "Unpublished (click to publish)"}
  >
    <span className="PublishToggle-track">
      <span className="PublishToggle-thumb" />
    </span>
    <span className="PublishToggle-text">{checked ? "Published" : "Unpublished"}</span>
  </button>
);

export default PublishToggle;
