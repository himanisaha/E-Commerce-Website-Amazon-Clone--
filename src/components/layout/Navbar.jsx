import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = [
    'Electronics',
    'Jewelery',
    "Men's Clothing",
    "Women's Clothing",
  ];

  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark container-fluid px-3">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center me-3">
          <span className="fw-bold">Amazon Clone</span>
          <span className="ms-1 small text-muted">.in</span>
        </Link>

        {/* Location (static for now) */}
        <div className="d-none d-md-flex flex-column me-3">
          <span className="small text-muted">Deliver to</span>
          <span className="small fw-semibold">Bariupur 700144</span>
        </div>

        {/* Search bar */}
        <form className="d-flex flex-grow-1 me-3" style={{ maxWidth: 700 }}>
          <select className="form-select w-auto rounded-0 rounded-start small">
            <option>All</option>
            <option>Electronics</option>
            <option>Jewelery</option>
            <option>Men's Clothing</option>
            <option>Women's Clothing</option>
          </select>
          <input
            type="search"
            className="form-control rounded-0"
            placeholder="Search Amazon Clone"
          />
          <button type="submit" className="btn btn-warning rounded-0 rounded-end">
            <i className="bi bi-search" />
          </button>
        </form>

        {/* Right side */}
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item d-none d-lg-block me-3">
            <span className="nav-link p-0">
              <span className="small">Hello, User</span>
              <br />
              <span className="fw-semibold">Account &amp; Lists</span>
            </span>
          </li>
          <li className="nav-item d-none d-lg-block me-3">
            <span className="nav-link p-0">
              <span className="small">Returns</span>
              <br />
              <span className="fw-semibold">&amp; Orders</span>
            </span>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link d-flex align-items-center">
              <i className="bi bi-cart-fill fs-4 me-1" />
              <span className="fw-semibold">Cart</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Secondary nav bar with categories */}
      <div className="bg-secondary bg-opacity-75 small">
        <div className="container-fluid px-3 d-flex gap-2 py-2 text-white">
          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            <i className="bi bi-list me-1" />
            All
          </button>

          {/* Category dropdowns */}
          {categories.map((category) => (
            <div key={category} className="position-relative">
              <button
                className="btn btn-sm btn-link text-white text-decoration-none p-0"
                onMouseEnter={() => setOpenDropdown(category)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {category}
              </button>

              {/* Dropdown menu */}
              {openDropdown === category && (
                <div
                  className="position-absolute bg-white text-dark rounded mt-2 shadow"
                  style={{ minWidth: 150, zIndex: 1000 }}
                  onMouseEnter={() => setOpenDropdown(category)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={`/?category=${category}`}
                    className="dropdown-item d-block px-3 py-2 text-decoration-none text-dark"
                  >
                    View All
                  </Link>
                  <a href="#" className="dropdown-item d-block px-3 py-2">
                    Best Sellers
                  </a>
                  <a href="#" className="dropdown-item d-block px-3 py-2">
                    New Arrivals
                  </a>
                  <a href="#" className="dropdown-item d-block px-3 py-2">
                    Deals
                  </a>
                </div>
              )}
            </div>
          ))}

          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            Today's Deals
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

