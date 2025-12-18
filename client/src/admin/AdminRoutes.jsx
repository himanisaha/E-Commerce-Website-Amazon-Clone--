import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
// import Orders from "./pages/Orders";  // old one no longer needed
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import AdminLayout from "./AdminLayout";
import AdminOrders from "./AdminOrders";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public admin login */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected admin area */}
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
