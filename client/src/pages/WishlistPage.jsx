import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ProductCard from "../components/layout/ProductCard";

function WishlistPage() {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/wishlist`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("wishlist response:", res.data);
      const data = Array.isArray(res.data) ? res.data : [];
      setItems(data);
    } catch (err) {
      console.error("Failed to load wishlist", err);
      setItems([]);
    }
  };

  // Call on mount and when token changes
  useEffect(() => {
    if (!token) return;
    fetchWishlist();
  }, [token]);

  const handleWishlistChange = async (product) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/wishlist/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      console.error("Failed to toggle wishlist from page", err);
    }
  };

  return (
    <div className="container py-4">
      <h2>Your Wish List</h2>
      {items.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="row">
          {items.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              inWishlist={true}
              onWishlistChange={handleWishlistChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
