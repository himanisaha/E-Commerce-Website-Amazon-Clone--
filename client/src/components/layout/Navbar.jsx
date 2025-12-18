import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const { cartItems } = useContext(CartContext);
  const { token, user, logout } = useContext(AuthContext);   // NEW
  const [keyword, setKeyword] = useState("");
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clears token + localStorage
    navigate("/login");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const q = keyword.trim();
    if (!q) return navigate("/");

    navigate(`/search/${encodeURIComponent(q)}`);
    setKeyword(""); // clear box
  };
  
  const languages = [
    { code: "EN", name: "English - EN", flag: "🇮🇳" },
    { code: "HI", name: "हिंदी - HI", flag: "🇮🇳" },
    { code: "TA", name: "தமிழ் - TA", flag: "🇮🇳" },
    { code: "TE", name: "తెలుగు - TE", flag: "🇮🇳" },
    { code: "KN", name: "ಕನ್ನಡ - KN", flag: "🇮🇳" },
    { code: "ML", name: "മലയാളം - ML", flag: "🇮🇳" },
    { code: "BN", name: "বাংলা - BN", flag: "🇮🇳" },
    { code: "MR", name: "मराठी - MR", flag: "🇮🇳" },
  ];

  return (
    <header style={{ backgroundColor: "#131921" }} className="text-white">
      <nav className="navbar navbar-expand-lg navbar-dark container-fluid px-3">
        {/* Left: Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center me-3 nav-hover-box"
        >
          <img
            src="/images/logos/amazon-logo-white.png"
            alt="Amazon logo"
            style={{
              width: "95px",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <span className="ms-1 small text-light logo-in">.in</span>
        </Link>

        {/* Location */}
        <div className="d-none d-md-flex flex-column me-4 nav-hover-box">
          <span className="small text-light">Deliver to User</span>
          <span className="small fw-semibold">Baruipur 700144</span>
        </div>

        {/* Search bar */}
        <form
          onSubmit={submitHandler}                        // ✅ added
          className="d-flex flex-grow-1 mx-2"
          role="search"
          style={{
            backgroundColor: "#f3f3f3",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <select
            className="form-select form-select-sm border-0"
            style={{
              maxWidth: 60,
              backgroundColor: "#f3f3f3",
              borderRight: "1px solid #ddd",
              color: "#131921",
            }}
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Kitchen</option>
          </select>

          <input
            className="form-control form-control-sm border-10"
            type="search"
            placeholder="Search Amazon Clone"
            value={keyword}                               // ✅ added
            onChange={(e) => setKeyword(e.target.value)}  // ✅ added
            style={{
              backgroundColor: "#f3f3f3",
              color: "#131921",
              lineheight: "2.5",
            }}
          />

          <button
            className="btn border-0"
            type="submit"
            style={{
              backgroundColor: "#febd69",
              color: "#131921",
              width: 45,
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* your existing SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>

        {/* Right side */}
        <ul className="navbar-nav ms-auto align-items-center gap-3">
          {/* Language Dropdown */}
          <li className="nav-item d-none d-md-flex position-relative nav-hover-box">
            <button
              className="btn btn-link text-white text-decoration-none p-0 d-flex align-items-center gap-2"
              onMouseEnter={() => setShowLanguageDropdown(true)}
              onMouseLeave={() => setShowLanguageDropdown(false)}
              style={{ cursor: "pointer", fontSize: "12px" }}
            >
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="IN"
                style={{ borderRadius: 2 }}
              />
              {selectedLanguage}
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1L6 6L11 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {showLanguageDropdown && (
              <div
                onMouseEnter={() => setShowLanguageDropdown(true)}
                onMouseLeave={() => setShowLanguageDropdown(false)}
                className="dropdown-menu show"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "white",
                  color: "#131921",
                  minWidth: "200px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                  marginTop: "5px",
                  border: "1px solid #e0e0e0",
                  padding: "8px 0",
                  display: "block",
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setShowLanguageDropdown(false);
                    }}
                    className="dropdown-item"
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      border: "none",
                      backgroundColor:
                        selectedLanguage === lang.code ? "#f0f0f0" : "white",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "13px",
                      color: "#131921",
                      display: "block",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                    (e.target.style.backgroundColor =
                      selectedLanguage === lang.code ? "#f0f0f0" : "white")
                    }
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </li>

          {/* Account & Lists – different for logged in / logged out */}
          <li className="nav-item d-none d-md-block position-relative nav-hover-box">
            {token ? (
              // Logged in: show name, dropdown only
              <button
                className="btn btn-link text-white text-decoration-none p-0 text-start"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setShowAccountDropdown(true)}
                onMouseLeave={() => setShowAccountDropdown(false)}
              >
                <span style={{ fontSize: "14px" }}>
                  Hello, {user?.name || "User"}
                </span>
                <br />
                <span className="fw-semibold" style={{ fontSize: "13px" }}>
                  Account &amp; Lists
                </span>
              </button>
            ) : (
              // Not logged in: link to /login
              <Link
                to="/login"
                className="btn btn-link text-white text-decoration-none p-0 text-start"
                style={{ cursor: "pointer" }}
              >
                <span style={{ fontSize: "14px" }}>Hello, sign in</span>
                <br />
                <span className="fw-semibold" style={{ fontSize: "13px" }}>
                  Account &amp; Lists
                </span>
              </Link>
            )}

            {token && showAccountDropdown && (
              <div
                onMouseEnter={() => setShowAccountDropdown(true)}
                onMouseLeave={() => setShowAccountDropdown(false)}
                className="dropdown-menu show"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "white",
                  color: "#131921",
                  minWidth: "450px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                  marginTop: "5px",
                  border: "1px solid #e0e0e0",   // <-- fixed: one string
                  padding: "16px",
                  display: "block",
                }}

              >
                {/* Profile Section */}
                <div
                  style={{
                    paddingBottom: "16px",
                    borderBottom: "1px solid #e0e0e0",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{ fontSize: "13px", color: "#131921" }}
                    >
                      <strong>
                        Who is shopping? Select a profile.
                      </strong>
                    </span>
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #131921",
                        color: "#131921",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Manage Profiles
                    </button>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {/* Left Column - Your Lists */}
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        marginBottom: "12px",
                        color: "#131921",
                      }}
                    >
                      Your Lists
                    </div>
                    {[
                      "Shopping List",
                      "Create a Wish List",
                      "Wish from Any Website",
                      "Baby Wishlist",
                      "Discover Your Style",
                      "Explore Showroom",
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className="dropdown-item"
                        style={{
                          width: "100%",
                          padding: "8px 0",
                          border: "none",
                          backgroundColor: "white",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "12px",
                          color: "#0066cc",
                          display: "block",
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {/* Right Column - Your Account */}
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        marginBottom: "12px",
                        color: "#131921",
                      }}
                    >
                      Your Account
                    </div>
                    {[
                      "Your Account",
                      "Your Orders",
                      "Your Wish List",
                      "Your Recommendations",
                      "Returns",
                      "Your Prime Membership",
                      "Memberships & Subscriptions",
                      "Your Seller Account",
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className="dropdown-item"
                        style={{
                          width: "100%",
                          padding: "8px 0",
                          border: "none",
                          backgroundColor: "white",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "12px",
                          color: "#0066cc",
                          display: "block",
                        }}
                      >
                        {item}
                      </button>
                    ))}

                    {/* Sign out button */}
                    <button
                      className="dropdown-item"
                      style={{
                        width: "100%",
                        padding: "8px 0",
                        border: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#0066cc",
                        display: "block",
                        marginTop: "8px",
                      }}
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Returns & Orders */}
          <li className="nav-item d-none d-md-block nav-hover-box">
            <span style={{ fontSize: "14px" }}>Returns</span>
            <br />
            <span className="fw-semibold" style={{ fontSize: "13px" }}>
              &amp; Orders
            </span>
          </li>

          {/* Cart */}
          <li className="nav-item nav-hover-box">
            <Link
              to="/cart"
              className="nav-link d-flex align-items-end position-relative p-0"
              style={{ lineHeight: "1" }}
            >
              <span
                className="position-absolute"
                style={{
                  top: "-7px",
                  left: "34%",
                  transform: "translateX(-50%)",
                  color: "#f08804",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {totalItems}
              </span>

              <img
                src="/images/icons/cart-icon.png"
                alt="Cart"
                style={{
                  width: "40px",
                  height: "28px",
                  objectFit: "contain",
                  marginRight: "4px",
                }}
              />

              <span
                className="fw-semibold"
                style={{ fontSize: "14px", color: "white" }}
              >
                Cart
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
