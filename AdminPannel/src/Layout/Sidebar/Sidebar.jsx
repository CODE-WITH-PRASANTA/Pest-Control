import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiCalendar,
  FiBriefcase,
  FiImage,
  FiEdit3,
  FiShoppingCart,
  FiTool,
  FiMail,
  FiUser,
  FiSettings,
  FiChevronDown,
  FiFileText,
  FiPlusSquare,
  FiPhoneCall,
  FiX,
} from "react-icons/fi";

import logo from "../../assets/logo.png";
import "./Sidebar.css";

const menuItems = [
  {
    text: "Dashboard",
    path: "/",
    icon: <FiGrid size={20} />,
  },
  {
    text: "Team Member",
    path: "/team",
    icon: <FiUsers size={20} />,
  },
  {
    text: "Booking",
    path: "/booking",
    icon: <FiCalendar size={20} />,
  },
  {
    type: "dropdown",
    text: "Projects",
    icon: <FiBriefcase size={20} />,
    children: [
      { text: "Add Project", path: "/projects/add", icon: <FiPlusSquare size={16} /> },
      { text: "Manage Projects", path: "/projects", icon: <FiFileText size={16} /> },
    ],
  },
  {
    type: "dropdown",
    text: "Gallery Management",
    icon: <FiImage size={20} />,
    children: [
      { text: "Add Gallery", path: "/gallery/add", icon: <FiPlusSquare size={16} /> },
      { text: "Manage Gallery", path: "/gallery", icon: <FiFileText size={16} /> },
    ],
  },
  {
    type: "dropdown",
    text: "Blog Management",
    icon: <FiEdit3 size={20} />,
    children: [
      { text: "Blog Posting", path: "/blog/new", icon: <FiPlusSquare size={16} /> },
      { text: "Blog Management", path: "/blog", icon: <FiFileText size={16} /> },
    ],
  },
  {
    text: "Order",
    path: "/orders",
    icon: <FiShoppingCart size={20} />,
  },
  {
    type: "dropdown",
    text: "Service",
    icon: <FiTool size={20} />,
    children: [
      { text: "Add Service", path: "/services/add", icon: <FiPlusSquare size={16} /> },
      { text: "Manage Service", path: "/services", icon: <FiFileText size={16} /> },
    ],
  },
  {
    text: "Enquiry",
    path: "/enquiry",
    icon: <FiMail size={20} />,
  },
  {
    text: "Profile",
    path: "/profile",
    icon: <FiUser size={20} />,
  },
  {
    text: "Setting",
    path: "/settings",
    icon: <FiSettings size={20} />,
  },
];

const isPathActive = (pathname, path) =>
  pathname === path || pathname.startsWith(path + "/");

const Sidebar = ({ isCollapsed, isMobileOpen, onClose }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState("");

  const showText = !isCollapsed || isMobileOpen;

  // Auto-open the dropdown that contains the active route
  useEffect(() => {
    const activeDropdown = menuItems.find(
      (item) =>
        item.type === "dropdown" &&
        item.children?.some((child) =>
          isPathActive(location.pathname, child.path)
        )
    );
    setOpenDropdown(activeDropdown?.text || "");
  }, [location.pathname]);

  const handleNavClick = () => {
    if (isMobileOpen && onClose) onClose();
  };

  const handleDropdownToggle = (text) => {
    if (isCollapsed && !isMobileOpen) return;
    setOpenDropdown((prev) => (prev === text ? "" : text));
  };

  const isChildActive = (children) =>
    children?.some((child) => isPathActive(location.pathname, child.path));

  return (
    <aside
      className={`Sidebar ${isCollapsed ? "collapsed" : ""} ${
        isMobileOpen ? "mobile-open" : ""
      }`}
    >
      <div className="Sidebar-sheen" />

      {/* LOGO */}
      <div className="Sidebar-logo">
        <div className="Sidebar-logo-iconWrap">
          <img
            src={logo}
            alt="Pest-Control logo"
            className="Sidebar-logo-img"
          />
        </div>

        {showText && (
          <div className="Sidebar-logo-text-group">
            <span className="Sidebar-logo-text">Pest-Control</span>
            <span className="Sidebar-logo-tagline">Admin Panel</span>
          </div>
        )}

        {isMobileOpen && (
          <button
            type="button"
            className="Sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="Sidebar-nav">
        {showText && <span className="Sidebar-section-label">Main Menu</span>}

        {menuItems.map((item) => {
          // DROPDOWN MENU
          if (item.type === "dropdown") {
            const isOpen = openDropdown === item.text;
            const isActive = isChildActive(item.children);

            return (
              <div
                key={item.text}
                className={`Sidebar-dropdown-wrapper ${
                  isOpen || isActive ? "is-open" : ""
                }`}
              >
                <button
                  type="button"
                  className={`Sidebar-link Sidebar-dropdown-toggle ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => handleDropdownToggle(item.text)}
                  title={!showText ? item.text : undefined}
                  aria-expanded={isOpen}
                >
                  <span className="Sidebar-icon">{item.icon}</span>

                  {showText && (
                    <>
                      <span className="Sidebar-text">{item.text}</span>
                      <FiChevronDown
                        size={16}
                        className={`Sidebar-chevron ${isOpen ? "rotated" : ""}`}
                      />
                    </>
                  )}
                </button>

                {/* SUBMENU */}
                {showText && isOpen && (
                  <div className="Sidebar-submenu">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        end
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `Sidebar-submenu-link ${isActive ? "active" : ""}`
                        }
                      >
                        {child.icon}
                        <span>{child.text}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // NORMAL MENU
          return (
            <NavLink
              key={item.text}
              to={item.path}
              end={item.path === "/"}
              title={!showText ? item.text : undefined}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `Sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="Sidebar-icon">{item.icon}</span>
              {showText && <span className="Sidebar-text">{item.text}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER CARD */}
      {showText && (
        <div className="Sidebar-footer">
          <div className="Sidebar-help-card">
            <span className="Sidebar-help-icon">
              <FiPhoneCall size={18} />
            </span>
            <div className="Sidebar-help-text">
              <span className="Sidebar-help-title">Call Anytime</span>
              <span className="Sidebar-help-number">+91 7205303566</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;