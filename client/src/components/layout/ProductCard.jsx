import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../common/RatingStars.jsx";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./ProductCard.css";
import { BASE_URL } from "../../api/baseUrl.js";


function ProductCard({ product, inWishlist = false, onWishlistChange }) {
  const { token } = useContext(AuthContext);

  const handleWishlistClick = async (e) => {
    e.preventDefault(); // don't navigate to product page when heart clicked
    try {
      await axios.put(
        `${BASE_URL}/api/users/wishlist/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // let parent know so it can update UI (home or wishlist page)
      if (onWishlistChange) {
        onWishlistChange(product);
      }
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
    }
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0">
        {/* IMAGE + TITLE + HEART */}
        <div className="position-relative text-center p-3">
          <Link
            to={`/product/${product._id}`}
            className="text-decoration-none text-dark"
          >
            <img
              src={`${BASE_URL}${product.image}`}
              alt={product.name}
              className="img-fluid"
              style={{ height: "180px", objectFit: "contain" }}
            />
            <h6 className="product-title mt-2">{product.name}</h6>
          </Link>

          {/* DISCOUNT BADGE */}
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Save 25%
          </span>

          {/* WISHLIST HEART (filled on wishlist page) */}
          <button onClick={handleWishlistClick} className="wishlist-btn">
            <span className="wishlist-heart">
              {inWishlist ? "♥" : "♡"}
            </span>
          </button>
        </div>

        {/* BODY */}
        <div className="card-body pt-2 d-flex flex-column">
          <div className="d-flex align-items-center mb-2">
            <RatingStars rating={product.rating || 0} />
            <small className="text-muted ms-1">
              ({product.rating || 0})
            </small>
          </div>

          <div className="mb-2">
            <span className="fw-bold text-danger me-2">
              ₹{product.price}
            </span>
            <small className="text-muted text-decoration-line-through">
              ₹{Math.round(product.price * 1.25)}
            </small>
          </div>

          <div className="mt-auto">
            <Link to={`/product/${product._id}`}>
              <button className="btn btn-outline-primary btn-sm w-100">
                View details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
