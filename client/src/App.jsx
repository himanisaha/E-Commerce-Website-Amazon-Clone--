import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import { CartProvider } from "./context/CartContext";

// ADMIN
import AdminRoutes from "./admin/AdminRoutes"; // ✅ import only AdminRoutes

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        {/* USER NAVBAR */}
        {!isAdminRoute && <Navbar />}

        <main className="flex-fill">
          <Routes>
            {/* USER ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </main>

        {/* USER FOOTER */}
        {!isAdminRoute && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;


// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage.jsx';
// import ProductPage from './pages/ProductPage.jsx';
// import CartPage from './pages/CartPage.jsx';
// import Navbar from './components/layout/Navbar.jsx';
// import Footer from './components/layout/Footer.jsx';
// import { CartProvider } from "./context/CartContext";

// NEW PAGES
// import KeepShoppingPage from './pages/KeepShoppingPage.jsx';
// import ContinueDealsPage from './pages/ContinueDealsPage.jsx';
// import RevampHomePage from './pages/RevampHomePage.jsx';
// import ExploreMorePage from './pages/ExploreMorePage.jsx';

// function App() {
//   return (
//     <CartProvider>
//       <div className="d-flex flex-column min-vh-100">
//         <Navbar />
//         <main className="flex-fill">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/product/:id" element={<ProductPage />} />
//             <Route path="/cart" element={<CartPage />} />
            
//             {/* 🔥 NEW SECTION ROUTES */}
//             <Route path="/keep-shopping" element={<KeepShoppingPage />} />
//             <Route path="/continue-deals" element={<ContinueDealsPage />} />
//             <Route path="/revamp-home" element={<RevampHomePage />} />
//             <Route path="/explore-more" element={<ExploreMorePage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </CartProvider>
//   );
// }

// export default App;
