// client/src/admin/AdminLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        <h4>Admin Panel</h4>
        <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <NavLink
              to="/admin/dashboard"
              className="nav-link text-white"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/products" className="nav-link text-white">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/orders" className="nav-link text-white">
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/users" className="nav-link text-white">
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/reports" className="nav-link text-white">
              Reports
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/settings" className="nav-link text-white">
              Settings
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-fill p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
