
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import "./Breadcrumb.css";

import breadcrumbBg from "../../assets/breadcrumb.png";

const Breadcrumb = ({
  title,
  subtitle,
  backgroundImage = breadcrumbBg,
}) => {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter(Boolean);

  const formatName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section
      className="breadcrumb-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="breadcrumb-overlay"></div>

      <div className="breadcrumb-container">
        <div className="breadcrumb-content">

          <span className="breadcrumb-subtitle">
            {subtitle || "WELCOME TO INSECTRA"}
          </span>

          <h1>{title || "Page Title"}</h1>

          <div className="breadcrumb-navigation">

            <Link to="/" className="breadcrumb-home">
              <FaHome />
              <span>Home</span>
            </Link>

            {pathnames.map((name, index) => {
              const route =
                "/" +
                pathnames.slice(0, index + 1).join("/");

              const isLast =
                index === pathnames.length - 1;

              return (
                <React.Fragment key={route}>
                  <FaChevronRight className="breadcrumb-arrow" />

                  {isLast ? (
                    <span className="breadcrumb-active">
                      {formatName(name)}
                    </span>
                  ) : (
                    <Link to={route}>
                      {formatName(name)}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
