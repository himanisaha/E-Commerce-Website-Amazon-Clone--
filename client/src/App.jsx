import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Footer from "./components/layout/Footer.jsx";

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

import { AuthContext } from "./context/AuthContext";
import PaymentPage from "./admin/pages/checkout/PaymentPage.jsx";

// ADMIN
import AdminRoutes from "./admin/AdminRoutes.jsx";

function PrivateRoute({ children }) {
  const { token, loading } = useContext(AuthContext);
  if (loading) return null;
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* User navbar hidden on admin routes */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-fill">
        <Routes>
          {/* USER ROUTES (now protected) */}

          <Route
            path="/search/:keyword"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route path="/payment" element={<PaymentPage />} />


          {/* Public auth route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />


          {/* ADMIN ROUTES */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </main>

      {/* User footer hidden on admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
