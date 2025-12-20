import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ProductCard from "../components/layout/ProductCard";

function WishlistPage() {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/wishlist`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("wishlist response:", res.data);
        // backend returns an array of populated product docs
        setItems(res.data || []);
      } catch (err) {
        console.error("Failed to load wishlist", err);
      }
    };

    if (token) fetchWishlist();
  }, [token]);

  // called when heart is clicked on this page
  const handleWishlistChange = async (product) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/wishlist/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // remove from local list after successful un-wishlist
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
