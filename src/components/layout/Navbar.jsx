import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
            <option>Fashion</option>
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

      {/* Secondary nav bar */}
      <div className="bg-secondary bg-opacity-75 small">
        <div className="container-fluid px-3 d-flex gap-3 py-1 text-white">
          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            <i className="bi bi-list me-1" />
            All
          </button>
          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            Fresh
          </button>
          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            Best Sellers
          </button>
          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            Mobiles
          </button>
          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            Fashion
          </button>
          <button className="btn btn-sm btn-link text-white text-decoration-none p-0">
            Electronics
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
