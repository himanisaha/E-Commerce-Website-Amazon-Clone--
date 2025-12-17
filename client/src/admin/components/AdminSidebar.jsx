import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "220px" }}>
      <h5 className="mb-4">Admin Panel</h5>

      <ul className="nav flex-column gap-2">
        <li>
          <NavLink to="dashboard" className="text-white text-decoration-none">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="products" className="text-white text-decoration-none">
            Products
          </NavLink>
        </li>

        <li>
          <NavLink to="orders" className="text-white text-decoration-none">
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="users" className="text-white text-decoration-none">
            Users
          </NavLink>
        </li>

        <li>
          <NavLink to="reports" className="text-white text-decoration-none">
            Reports
          </NavLink>
        </li>

        <li>
          <NavLink to="settings" className="text-white text-decoration-none">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
