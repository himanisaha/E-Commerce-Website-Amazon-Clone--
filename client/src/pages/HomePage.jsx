import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryNav from "../components/sections/CategoryNav";
import HeroSlider from "../components/sections/HeroSlider";
import ProductCard from "../components/layout/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data); // ✅ NOT data.products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

 export default HomePage;
 
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import CategoryNav from "../components/sections/CategoryNav";
// import HeroSlider from "../components/sections/HeroSlider";
// import ProductCard from "../components/layout/ProductCard";

// import KeepShopping from "../components/ShoppingSections/KeepShopping";
// import ContinueDeals from "../components/ShoppingSections/ContinueDeals";
// import RevampHome from "../components/ShoppingSections/RevampHome";
// import ExploreMore from "../components/ShoppingSections/ExploreMore";

// function HomePage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <CategoryNav />
//         <HeroSlider />
//         <div className="container-fluid px-4 my-4">
//           <p>Loading products...</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* TOP NAV + BANNER */}
//       <CategoryNav />
//       <HeroSlider />

//       {/* 🔥 AMAZON-STYLE SECTIONS */}
//       <div style={{ marginTop: "20px" }}>
//         <KeepShopping />
//         <ContinueDeals />
//         <RevampHome />
//         <ExploreMore />
//       </div>

//       {/* 🔽 OLD PRODUCT GRID */}
//       <div className="container-fluid px-4 mt-5">
//         <h2 className="h4 fw-bold mb-3">Popular Products</h2>
//         <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default HomePage;