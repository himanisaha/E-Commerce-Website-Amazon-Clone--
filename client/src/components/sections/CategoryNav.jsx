import React, { useState } from "react";
import "./CategoryNav.css";

function CategoryNav() {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  return (
    <>
      {/* TOP CATEGORY NAV */}
      <nav
        style={{ backgroundColor: "#232f3e" }}
        className="text-white py-2 px-3 d-flex align-items-center"
      >
        {/* Hamburger + ALL */}
        <div
          className="d-flex align-items-center me-4"
          style={{ cursor: "pointer" }}
          onClick={openMenu}
        >
          <img
            src={`${API_BASE_URL}/icons/hamburger-menu.png`}
            alt="menu"
            style={{ width: "18px", marginRight: "6px", marginLeft: "7px" }}
          />
          <span style={{ fontSize: "16px", fontWeight: "600" }}>All</span>
        </div>

        {/* Scrollable Category List */}
        <div className="d-flex flex-nowrap" style={{ overflowX: "auto" }}>
          {[
            "Rufus",
            "Fresh",
            "New Releases",
            "Amazon Business",
            "Sell",
            "Today's Deals",
            "Gift Cards",
            "Flights",
            "AmazonBasics",
            "MX Player",
            "Amazon Pay",
            "Buy Again",
            "Browsing History",
          ].map((cat, idx) => (
            <a
              key={idx}
              href="#"
              className="text-white text-decoration-none me-3 flex-shrink-0"
              style={{ fontSize: "13px", whiteSpace: "nowrap" }}
            >
              {cat}
            </a>
          ))}
        </div>
      </nav>

      {/* SIDEBAR OVERLAY */}
      {showMenu && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            zIndex: 100,
          }}
        ></div>
      )}

      {/* SIDEBAR MENU */}
      <div
        className="sidebar-menu"
        style={{
          position: "fixed",
          top: 0,
          left: showMenu ? "0" : "-350px",
          width: "350px",
          height: "100vh",
          backgroundColor: "#fff",
          zIndex: 101,
          transition: "left 0.3s ease",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#232f3e",
            padding: "15px",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Hello, User
        </div>

        {/* Menu Items */}
        <div style={{ padding: "10px" }}>
          <h6 className="mt-2 mb-2">Trending</h6>
          <p className="side-item">Bestsellers</p>
          <p className="side-item">New Releases</p>
          <p className="side-item">Movers & Shakers</p>

          <h6 className="mt-3 mb-2">Digital Content & Devices</h6>
          <p className="side-item">Echo & Alexa</p>
          <p className="side-item">Fire TV</p>
          <p className="side-item">Kindle</p>
          <p className="side-item">Amazon Prime Video</p>

          <h6 className="mt-3 mb-2">Shop by Category</h6>
          <p className="side-item">Mobiles</p>
          <p className="side-item">Electronics</p>
          <p className="side-item">Home & Kitchen</p>
          <p className="side-item">Fashion</p>
        </div>

        {/* Close Button */}
        <button
          onClick={closeMenu}
          style={{
            position: "absolute",
            top: "10px",
            right: "-40px",
            background: "#fff",
            border: "none",
            padding: "8px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          ✕
        </button>
      </div>
    </>
  );
}

export default CategoryNav;
