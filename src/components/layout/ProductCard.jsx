import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../common/RatingStars.jsx";

function ProductCard({ product }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0">

        {/* IMAGE */}
        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
          <div className="position-relative text-center p-3">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ height: "180px", objectFit: "contain" }}
            />

            {/* DISCOUNT BADGE */}
            <span className="badge bg-danger position-absolute top-0 start-0 m-2">
              Save 25%
            </span>
          </div>

          {/* BODY */}
          <div className="card-body pt-2">
            {/* TITLE */}
            <h6 className="card-title text-truncate" title={product.title}>
              {product.title}
            </h6>

            {/* RATING */}
            <div className="d-flex align-items-center mb-2">
              <RatingStars rating={product.rating?.rate || 0} />
              <small className="text-muted ms-1">
                ({product.rating?.count || 0})
              </small>
            </div>


            {/* PRICE */}
            <div className="mb-2">
              <span className="fw-bold text-danger me-2">
                ₹{(product.price * 85).toFixed(0)}
              </span>
              <small className="text-muted text-decoration-line-through">
                ₹{(product.price * 100).toFixed(0)}
              </small>
            </div>

            {/* CATEGORY */}
            <p className="text-muted small mb-3 text-capitalize">
              {product.category}
            </p>

            {/* BUTTON */}
            <button className="btn btn-outline-primary btn-sm w-100">
              View details
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
