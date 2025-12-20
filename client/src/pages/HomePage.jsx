import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CategoryNav from "../components/sections/CategoryNav";
import HeroSlider from "../components/sections/HeroSlider";
import ProductCard from "../components/layout/ProductCard";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]); // store product ids in wishlist

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/products");
        setProducts(data); // array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // optional: preload wishlist so hearts render correctly
    const fetchWishlist = async () => {
      if (!token) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/wishlist`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // res.data is array of product docs; map to ids
        setWishlistIds(res.data.map((p) => p._id));
      } catch (err) {
        console.error("Failed to load wishlist on home", err);
      }
    };

    fetchWishlist();
  }, [token]);

  const handleWishlistChange = (product) => {
    // toggle id locally after ProductCard successfully called PUT
    setWishlistIds((prev) =>
      prev.includes(product._id)
        ? prev.filter((id) => id !== product._id)
        : [...prev, product._id]
    );
  };

  return (
    <>
      <CategoryNav />
      <HeroSlider />
      <div className="container-fluid my-4 px-4">
        <h1 className="h3 fw-bold">Welcome to Amazon Clone</h1>
        <p>Browse popular products and add them to your cart.</p>
      </div>

      <div className="container-fluid px-4">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              inWishlist={wishlistIds.includes(product._id)}
              onWishlistChange={handleWishlistChange}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;

 
// import ContinueDeals from "../components/ShoppingSections/ContinueDeals";
// import KeepShopping from "../components/ShoppingSections/KeepShopping";
// import RevampHome from "../components/ShoppingSections/RevampHome";
// import ExploreMore from "../components/ShoppingSections/ExploreMore";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CategoryNav from "../components/sections/CategoryNav";
// import HeroSlider from "../components/sections/HeroSlider";
// import ProductCard from "../components/layout/ProductCard";

// function HomePage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get("/api/products");
//         setProducts(data); // ✅ NOT data.products
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//   <>
//     {/* TOP NAV + HERO SLIDER */}
//     <CategoryNav />
//     <HeroSlider />

//     {/* WELCOME SECTION */}
//     <div className="container-fluid my-4 px-4">
//       <h1 className="h3 fw-bold">Welcome to Amazon Clone</h1>
//       <p>Browse popular products and add them to your cart.</p>
//     </div>

//     {/* 🔥 AMAZON-STYLE SECTIONS */}
//     <div style={{ marginTop: "20px" }}>
//       <ContinueDeals />
//       <KeepShopping />
//       <RevampHome />
//       <ExploreMore />
//     </div>

//     {/* 🔽 PRODUCTS GRID */}
//     <div className="container-fluid px-4">
//       <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
//         {products.map(product => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   </>
// );

// }

//  export default HomePage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import CategoryNav from "../components/sections/CategoryNav";
// import HeroSlider from "../components/sections/HeroSlider";
// import ProductCard from "../components/layout/ProductCard";

// import ContinueDeals from "../components/ShoppingSections/ContinueDeals";
// import KeepShopping from "../components/ShoppingSections/KeepShopping";
// import RevampHome from "../components/ShoppingSections/RevampHome";
// import ExploreMore from "../components/ShoppingSections/ExploreMore";

// function HomePage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get("/api/products");
//         setProducts(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchProducts();
//   }, []);

//  <div className="container-fluid px-4">
//   <div className="row g-3">
//     <div className="col-12 col-md-6 col-lg-3">
//       <ContinueDeals />
//     </div>
//     <div className="col-12 col-md-6 col-lg-3">
//       <KeepShopping />
//     </div>
//     <div className="col-12 col-md-6 col-lg-3">
//       <RevampHome />
//     </div>
//     <div className="col-12 col-md-6 col-lg-3">
//       <ExploreMore />
//     </div>
//   </div>
// </div>
// }

// export default HomePage;