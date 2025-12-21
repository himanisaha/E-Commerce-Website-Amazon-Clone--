import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CategoryNav from "../components/sections/CategoryNav";
import HeroSlider from "../components/sections/HeroSlider";
import ProductCard from "../components/layout/ProductCard";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../api/baseUrl"; // ✅ new import

function HomePage() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]); // store product ids in wishlist
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured"); // ✅ new

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        if (category !== "all") params.append("category", category);
        if (priceRange[0] > 0) params.append("minPrice", priceRange[0]);
        if (priceRange[1] > 0) params.append("maxPrice", priceRange[1]);
        if (minRating > 0) params.append("minRating", minRating);
        if (sort !== "featured") params.append("sort", sort); // ✅ send sort

        const res = await axios.get(
          `${BASE_URL}/api/products?${params.toString()}`
        );

        console.log("products API res:", res.data);

        // ✅ ensure products is always an array
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // ✅ keep it an array on error
      }
    };

    fetchProducts();
  }, [category, priceRange, minRating, sort]); // ✅ sort dependency

  useEffect(() => {
    // optional: preload wishlist so hearts render correctly
    const fetchWishlist = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/users/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("wishlist API res:", res.data);

        // ✅ normalize to array before map
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.wishlist || res.data.data || [];

        setWishlistIds(list.map((p) => p._id));
      } catch (err) {
        console.error("Failed to load wishlist on home", err);
        setWishlistIds([]); // keep it safe on error
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
      <div className="container-fluid my-3 px-4">
        <div className="text-center">
          <h1 className="h3 fw-bold">Welcome to Amazon Clone</h1>
          <p>Browse popular products and add them to your cart.</p>
        </div>
      </div>

      <div className="container-fluid px-4">
        <div className="row">
          {/* LEFT: Filters sidebar */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Filters</h5>

            {/* Category (checkboxes) */}
            <div className="mb-4">
              <div className="fw-semibold mb-1">Category</div>

              {/* All categories = no filter */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cat-all"
                  checked={category === "all"}
                  onChange={() => setCategory("all")}
                />
                <label className="form-check-label" htmlFor="cat-all">
                  All
                </label>
              </div>

              {[
                "Headphones",
                "Women's Footwear",
                "Women's Clothing",
                "Men's Clothing",
                "Kitchen Appliances",
                "Curtains",
              ].map((cat) => (
                <div className="form-check" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`cat-${cat}`}
                    checked={category === cat}
                    onChange={() =>
                      setCategory((prev) => (prev === cat ? "all" : cat))
                    }
                  />
                  <label className="form-check-label" htmlFor={`cat-${cat}`}>
                    {cat}
                  </label>
                </div>
              ))}
            </div>

            {/* Price range */}
            <div className="mb-4">
              <div className="fw-semibold mb-1">Price range (₹)</div>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Number(e.target.value) || 0,
                      priceRange[1],
                    ])
                  }
                  placeholder="Min"
                />
                <input
                  type="number"
                  className="form-control"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Number(e.target.value) || 0,
                    ])
                  }
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <div className="fw-semibold mb-1">Customer Review</div>
              {[4, 3, 2].map((r) => (
                <div className="form-check" key={r}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rating-filter"
                    id={`rating-${r}`}
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                  />
                  <label className="form-check-label" htmlFor={`rating-${r}`}>
                    {r}★ & up
                  </label>
                </div>
              ))}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating-filter"
                  id="rating-all"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                />
                <label className="form-check-label" htmlFor="rating-all">
                  All ratings
                </label>
              </div>
            </div>

            {/* Clear filters */}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setCategory("all");
                setPriceRange([0, 5000]);
                setMinRating(0);
                setSort("featured");
              }}
            >
              Clear filters
            </button>
          </div>

          {/* RIGHT: Results header + products */}
          <div className="col-md-9">
            {/* Results header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-semibold">
                  {products.length} results
                  {category !== "all" && ` in "${category}"`}
                </div>
                <small className="text-muted">
                  Price: {priceRange[0]} – {priceRange[1]} | Min rating:{" "}
                  {minRating || "Any"}
                </small>
              </div>
              <div>
                <select
                  className="form-select form-select-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products grid */}
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
              {Array.isArray(products) &&
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    inWishlist={wishlistIds.includes(product._id)}
                    onWishlistChange={handleWishlistChange}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
