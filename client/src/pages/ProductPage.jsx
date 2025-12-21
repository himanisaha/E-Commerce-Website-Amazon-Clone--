import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import RatingStars from "../components/common/RatingStars";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../api/baseUrl";

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
        `${BASE_URL}/api/users/wishlist/${product._id}`,
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
        `${BASE_URL}/api/orders`,
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
      .get(`${BASE_URL}/api/products/${id}`)
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
        `${BASE_URL}/api/products/${product._id}/reviews`,
        { rating, title, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviewMsg("Review submitted");

      const { data } = await axios.get(
        `${BASE_URL}/api/products/${product._id}`
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
      <div className="container">
        {/* ================= TOP SECTION ================= */}
        <div className="row gx-4">
          {/* LEFT IMAGE SECTION */}
          <div className="col-md-4">
            <div className="bg-light p-3 rounded text-center">
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.name}
                className="img-fluid"
              />
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="col-md-5">
            <h3>{product.name}</h3>

            <div className="d-flex align-items-center mb-2">
              <RatingStars rating={product.rating || 0} />
              <span className="ms-2 text-muted">
                ({product.numReviews || 0} ratings)
              </span>
            </div>

            <p className="text-secondary">{product.category}</p>

            <div className="mb-3">
              <h4>₹{product.price.toFixed(0)}</h4>
              <p className="mb-0">
                M.R.P:{" "}
                <span className="text-decoration-line-through">
                  ₹{(product.price * 1.25).toFixed(0)}
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
              <p className="mb-1 text-danger fw-bold">
                Only 1 left in stock.
              </p>
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
                    <span className="me-2">
                      {inWishlist ? "♥" : "♡"}
                    </span>
                    <div>
                      <div className="fw-semibold">
                        {inWishlist
                          ? "Shopping List (remove)"
                          : "Shopping List"}
                      </div>
                      <small className="text-muted">
                        {inWishlist
                          ? "Tap to remove from wishlist"
                          : "Private"}
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

        {/* ================= BELOW SECTIONS ================= */}
        <div className="mt-5">
          {/* PRODUCT SPECIFICATIONS */}
          <section className="mb-4">
            <h3>Product Specifications</h3>

            <div className="row row-cols-2 row-cols-md-4 g-3 mt-2">
              <div className="col">
                <div className="border rounded p-2 h-100">
                  <strong>Material</strong>
                  <p className="mb-0">Premium Leather</p>
                </div>
              </div>
              <div className="col">
                <div className="border rounded p-2 h-100">
                  <strong>Capacity</strong>
                  <p className="mb-0">25 Litres</p>
                </div>
              </div>
              <div className="col">
                <div className="border rounded p-2 h-100">
                  <strong>Warranty</strong>
                  <p className="mb-0">1 Year</p>
                </div>
              </div>
              <div className="col">
                <div className="border rounded p-2 h-100">
                  <strong>Recommended Usage</strong>
                  <p className="mb-0">Office, Travel, College</p>
                </div>
              </div>
            </div>

            <button className="btn btn-link p-0 mt-2">
              See all product details
            </button>
          </section>

          {/* CUSTOMERS SAY */}
          <section className="mb-4">
            <h3>Customers say</h3>

            <div className="d-flex align-items-center border rounded p-3 mt-2">
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginRight: "16px",
                }}
              >
                4.2 ★
              </div>
              <div className="text-muted small">
                <p className="mb-1">89% said it is comfortable</p>
                <p className="mb-1">82% said quality is excellent</p>
                <p className="mb-0">78% said worth the price</p>
              </div>
            </div>
          </section>

          {/* REVIEW HIGHLIGHTS */}
          <section className="mb-4">
            <h3>Highlights from customer reviews</h3>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mt-2">
              <div className="col">
                <div className="border rounded p-3 h-100">
                  <strong>Comfort</strong>
                  <p className="mb-0">
                    "Very comfortable straps even when fully loaded."
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="border rounded p-3 h-100">
                  <strong>Quality</strong>
                  <p className="mb-0">"Material is premium & waterproof."</p>
                </div>
              </div>
              <div className="col">
                <div className="border rounded p-3 h-100">
                  <strong>Value</strong>
                  <p className="mb-0">"Totally worth the money."</p>
                </div>
              </div>
              <div className="col">
                <div className="border rounded p-3 h-100">
                  <strong>Space</strong>
                  <p className="mb-0">
                    "Fits everything including my laptop."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CUSTOMER REVIEWS */}
          <section className="mb-4">
            <h3>Customer reviews</h3>

            <div className="row mt-2">
              <div className="col-md-4 mb-3">
                <div className="mb-2">
                  <div style={{ fontSize: "28px" }}>★★★★☆</div>
                  <p className="mb-0">
                    {product.rating?.toFixed(1) || 4.2} out of 5
                  </p>
                </div>

                <div>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div
                      className="d-flex align-items-center mb-1"
                      key={star}
                    >
                      <span style={{ width: 60 }}>{star} star</span>
                      <div
                        className="flex-grow-1 bg-light"
                        style={{ height: 8, borderRadius: 4 }}
                      >
                        <div
                          style={{
                            width: `${star * 17}%`,
                            height: "100%",
                            borderRadius: 4,
                            backgroundColor: "#ffa41c",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-8 mb-3">
                <div className="mb-2">
                  <button className="btn btn-sm btn-outline-secondary me-1">
                    Top reviews
                  </button>
                  <button className="btn btn-sm btn-outline-secondary me-1">
                    Positive
                  </button>
                  <button className="btn btn-sm btn-outline-secondary me-1">
                    Critical
                  </button>
                  <button className="btn btn-sm btn-outline-secondary me-1">
                    Recent
                  </button>
                  <button className="btn btn-sm btn-outline-secondary me-1">
                    Comfort
                  </button>
                  <button className="btn btn-sm btn-outline-secondary me-1">
                    Quality
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    Value
                  </button>
                </div>

                <div>
                  {/* If your backend returns reviews on product, map them here */}
                  {Array.isArray(product.reviews) &&
                  product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div className="mb-3 border-bottom pb-2" key={rev._id}>
                        <h5 className="mb-1">{rev.title}</h5>
                        <div className="text-warning small mb-1">
                          {"★".repeat(rev.rating)}
                          {"☆".repeat(5 - rev.rating)}
                        </div>
                        <p className="mb-1">{rev.comment}</p>
                        <span className="text-muted small">
                          by {rev.name} on{" "}
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="mb-3 border-bottom pb-2">
                        <h5>Great quality!</h5>
                        <div className="text-warning small mb-1">
                          ★★★★★
                        </div>
                        <p className="mb-1">
                          "Loved it. Premium material and very comfortable."
                        </p>
                        <span className="text-muted small">
                          Reviewed in India on 2 Jan 2025
                        </span>
                      </div>

                      <div className="mb-3 border-bottom pb-2">
                        <h5>Good but slightly overpriced</h5>
                        <div className="text-warning small mb-1">
                          ★★★★☆
                        </div>
                        <p className="mb-1">
                          "Everything is good but price could be lower."
                        </p>
                        <span className="text-muted small">
                          Reviewed in India on 10 Jan 2025
                        </span>
                      </div>

                      <div className="mb-3">
                        <h5>Not spacious enough</h5>
                        <div className="text-warning small mb-1">
                          ★★★☆☆
                        </div>
                        <p className="mb-1">
                          "Couldn't fit my 16-inch laptop properly."
                        </p>
                        <span className="text-muted small">
                          Reviewed in India on 5 Dec 2024
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* WRITE REVIEW */}
          <section className="mb-4">
            <h3>Write a review</h3>

            <form className="mt-2" onSubmit={submitReview}>
              <div className="mb-2">
                <label className="form-label">Rating</label>
                <select
                  className="form-select form-select-sm"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Title</label>
                <input
                  className="form-control form-control-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summary of your review"
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                ></textarea>
              </div>

              {reviewMsg && (
                <div className="small text-success mb-2">{reviewMsg}</div>
              )}

              <button className="btn btn-primary btn-sm">
                Submit
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
