import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../common/RatingStars.jsx";

function ProductCard({ product }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0">

        {/* IMAGE + TITLE */}
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-dark">
          <div className="position-relative text-center p-3">
            <img
              src={`http://localhost:8000${product.image}`}
              alt={product.name}
              className="img-fluid"
              style={{ height: "180px", objectFit: "contain" }}
            />

            <h6 className="product-title mt-2">
              {product.name}
            </h6>

            {/* DISCOUNT BADGE */}
            <span className="badge bg-danger position-absolute top-0 start-0 m-2">
              Save 25%
            </span>
          </div>
        </Link>

        {/* BODY */}
        <div className="card-body pt-2 d-flex flex-column">

          {/* RATING */}
          <div className="d-flex align-items-center mb-2">
            <RatingStars rating={product.rating || 0} />
            <small className="text-muted ms-1">({product.rating || 0})</small>
          </div>


          {/* PRICE */}
          <div className="mb-2">
            <span className="fw-bold text-danger me-2">
              ₹{product.price}
            </span>
            <small className="text-muted text-decoration-line-through">
              ₹{Math.round(product.price * 1.25)}
            </small>
          </div>

          {/* BUTTON */}

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

