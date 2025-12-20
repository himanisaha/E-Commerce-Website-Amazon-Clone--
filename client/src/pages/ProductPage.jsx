import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import RatingStars from "../components/common/RatingStars";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(true);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const { token } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");

  // wishlist state
  const [inWishlist, setInWishlist] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const handleWishlistToggle = async () => {
    if (!token) {
      alert("Please login to use wishlist");
      return;
    }
    if (!product) return;

    try {
      setWishLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/wishlist/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInWishlist((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle wishlist from product page", err);
    } finally {
      setWishLoading(false);
    }
  };

  const handleOrderNow = async () => {
    try {
      if (!token) {
        alert("Please login to place an order");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/orders",
        {
          items: [
            {
              product: product._id,
              name: product.name,
              price: product.price,
              qty: 1,
            },
          ],
          totalPrice: product.price,
          paymentMethod: "COD",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order placed successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center my-5">Loading...</div>;

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to write a review");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/products/${product._id}/reviews`,
        { rating, title, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviewMsg("Review submitted");

      const { data } = await axios.get(
        `http://localhost:8000/api/products/${product._id}`
      );
      setProduct(data);
      setRating(5);
      setTitle("");
      setComment("");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to submit review";
      setReviewMsg(msg);
    }
  };

  return (
    <div className="bg-white min-vh-100 pt-4">
      <div className="container ">
        {/* TOP SECTION */}
        <div className="row gx-4">
          {/* LEFT IMAGE SECTION */}
          <div className="col-md-4">
            <div className="bg-light p-3 rounded text-center">
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="img-fluid"
              />
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="col-md-5">
            <h3>{product.name}</h3>
            <div className="d-flex align-items-center mb-2">
              <span className="text-warning me-2">★★★★☆</span>
              <span className="text-muted">(128 ratings)</span>
            </div>

            <p className="text-secondary">{product.category}</p>

            <div className="mb-3">
              <h4>₹{product.price.toFixed(0)}</h4>
              <p className="mb-0">
                M.R.P:{" "}
                <span className="text-decoration-line-through">
                  ₹{(product.price * 100).toFixed(0)}
                </span>
                <span className="text-success"> (25% off)</span>
              </p>
            </div>

            <div className="mb-3">
              <h5>Available Offers</h5>
              <ul className="list-unstyled">
                <li>Bank Offer: 10% off on Credit Cards</li>
                <li>No Cost EMI available</li>
                <li>Buy 2 items, get 5% extra discount</li>
              </ul>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="mb-3 border-top pt-3">
              <h4
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => setIsHighlightsOpen(!isHighlightsOpen)}
              >
                Top highlights
                <span>{isHighlightsOpen ? "⌃" : "⌄"}</span>
              </h4>

              {isHighlightsOpen && (
                <div>
                  <div className="d-flex justify-content-between">
                    <strong>Care instructions</strong>
                    <span>Hand Wash Only</span>
                  </div>
                  <hr />
                  <h5>About this item</h5>
                  {Array.isArray(product.highlights) &&
                    product.highlights.length > 0 && (
                      <ul>
                        {product.highlights.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}

                  {!showAdditionalInfo && (
                    <div
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowAdditionalInfo(true)}
                    >
                      ⌄ See more
                    </div>
                  )}

                  {showAdditionalInfo && (
                    <>
                      <div className="mt-3">
                        <h5>Additional Information</h5>
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <td>Item Weight</td>
                              <td>680 g</td>
                            </tr>
                            <tr>
                              <td>Item Dimensions</td>
                              <td>27 × 13 × 38 cm</td>
                            </tr>
                            <tr>
                              <td>Net Quantity</td>
                              <td>1 Count</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowAdditionalInfo(false)}
                      >
                        ⌃ See less
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* BUY BOX RIGHT */}
          <div className="col-md-3 border p-3 rounded">
            <h4 className="fw-bold">₹{product.price.toFixed(0)}</h4>

            <div className="mb-2">
              <span className="badge bg-secondary mb-1">Fulfilled</span>
              <p className="mb-0">
                FREE delivery <strong>Saturday, 20 December</strong>.<br />
                Order within{" "}
                <span className="text-success">3 hrs 56 mins</span>.{" "}
                <a href="#">Details</a>
              </p>
            </div>

            <div className="mb-2">
              <p className="mb-1">
                <i className="bi bi-geo-alt"></i> Deliver to Himani - Baruipur
                700144
              </p>
              <p className="mb-1 text-danger fw-bold">Only 1 left in stock.</p>
              <p className="mb-1">
                Ships from <strong>Amazon</strong>
              </p>
              <p className="mb-1">
                Sold by <a href="#">Atlantic Shoppe</a>
              </p>
              <p className="mb-1">
                Gift options <a href="#">Available at checkout</a>
              </p>
              <p className="mb-1">
                Payment <a href="#">Secure transaction</a>
              </p>
            </div>

            <button
              className="btn btn-warning w-100 mb-2"
              onClick={() => {
                console.log("ADDING PRODUCT:", product);
                addToCart(product);
              }}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-orange w-100 mb-3"
              onClick={handleOrderNow}
            >
              Buy Now
            </button>

            {/* ADD TO WISH LIST (Amazon-style, right aligned) */}
            <div className="btn-group w-100 mb-3">
              {/* Left part: label */}
              <button
                type="button"
                className="btn btn-outline-secondary text-start flex-grow-1"
                style={{
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  borderRight: "none",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                {inWishlist ? "In Wish List" : "Add to Wish List"}
              </button>

              {/* Right part: arrow that opens dropdown */}
              <button
                type="button"
                className="btn btn-outline-secondary"
                id="wishlistDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  width: "10px",
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 5,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <i className="bi bi-caret-down-fill"></i>
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end w-100"
                aria-labelledby="wishlistDropdown"
              >
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    type="button"
                    onClick={handleWishlistToggle}
                    disabled={wishLoading}
                  >
                    <span className="me-2">{inWishlist ? "♥" : "♡"}</span>
                    <div>
                      <div className="fw-semibold">
                        {inWishlist ? "Shopping List (remove)" : "Shopping List"}
                      </div>
                      <small className="text-muted">
                        {inWishlist ? "Tap to remove from wishlist" : "Private"}
                      </small>
                    </div>
                  </button>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    type="button"
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Create another Wish List
                  </button>
                </li>
              </ul>
            </div>


          </div>
        </div>

        {/* BELOW SECTIONS (specs, reviews etc.) – keep your existing code here */}
        {/* ... */}
      </div>
    </div>
  );
}

export default ProductPage;
