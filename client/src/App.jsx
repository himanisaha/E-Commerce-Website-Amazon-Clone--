import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Footer from "./components/layout/Footer.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import { AuthContext } from "./context/AuthContext";
import PaymentPage from "./admin/pages/checkout/PaymentPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import AdminRoutes from "./admin/AdminRoutes.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

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
      {!isAdminRoute && <Navbar />}

      <main className="flex-fill">
        <Routes>
          {/* USER ROUTES (protected) */}
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
          <Route
            path="/account/orders"
            element={
              <PrivateRoute>
                <OrdersPage />
              </PrivateRoute>
            }
          />
          {/* Order details route */}
          <Route
            path="/orders/:id"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <PrivateRoute>
                <OrderSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/account/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/account/wishlist"
            element={
              <PrivateRoute>
                <WishlistPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            }
          />

          {/* Public auth + password routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPasswordPage />}
          />

          {/* ADMIN ROUTES (nested inside AdminRoutes) */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
