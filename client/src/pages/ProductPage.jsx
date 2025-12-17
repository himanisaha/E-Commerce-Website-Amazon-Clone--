import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import RatingStars from "../components/common/RatingStars";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(true);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);



  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center my-5">Loading...</div>;

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
              <h4>₹{(product.price * 85).toFixed(0)}</h4>
              <p className="mb-0">
                M.R.P: <span className="text-decoration-line-through">₹{(product.price * 100).toFixed(0)}</span>
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
                  <ul>
                    <ul>
                      {product.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                  </ul>

                  {!showAdditionalInfo && (
                    <div
                      className="text-primary" style={{ cursor: "pointer" }}
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
                        className="text-primary" style={{ cursor: "pointer" }}
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
            <h4 className="fw-bold">₹{(product.price * 85).toFixed(0)}</h4>

            <div className="mb-2">
              <span className="badge bg-secondary mb-1">Fulfilled</span>
              <p className="mb-0">
                FREE delivery <strong>Saturday, 20 December</strong>.<br />
                Order within <span className="text-success">3 hrs 56 mins</span>. <a href="#">Details</a>
              </p>
            </div>

            <div className="mb-2">
              <p className="mb-1"><i className="bi bi-geo-alt"></i> Deliver to Himani - Baruipur 700144</p>
              <p className="mb-1 text-danger fw-bold">Only 1 left in stock.</p>
              <p className="mb-1">Ships from <strong>Amazon</strong></p>
              <p className="mb-1">Sold by <a href="#">Atlantic Shoppe</a></p>
              <p className="mb-1">Gift options <a href="#">Available at checkout</a></p>
              <p className="mb-1">Payment <a href="#">Secure transaction</a></p>
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
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
            >
              Buy Now
            </button>


            <div className="dropdown w-100 mb-3">
              <button
                className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>Add to Wish List</span>
                <i className="bi bi-caret-down-fill"></i>
              </button>

              <ul className="dropdown-menu w-100">
                <li>
                  <button className="dropdown-item d-flex align-items-center">
                    <span className="me-2">🐱</span>
                    <div>
                      <div className="fw-semibold">Shopping List</div>
                      <small className="text-muted">Private</small>
                    </div>
                  </button>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li>
                  <button className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-plus-lg me-2"></i>
                    Create another Wish List
                  </button>
                </li>
              </ul>
            </div>

            {/* <button className="btn btn-outline-secondary w-100">Create a free account</button> */}
          </div>


        </div>

        {/* BELOW SECTIONS */}
        <div className="mt-5">

          {/* PRODUCT SPECIFICATIONS */}
          <section className="mb-5">
            <h3>Product Specifications</h3>

            <div className="row row-cols-1 row-cols-md-2 g-3">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div className="col" key={index}>
                  <strong>{key}</strong>
                  <p>{value}</p>
                </div>
              ))}
            </div>


            <button className="btn btn-link p-0 mt-2">See all product details</button>
          </section>

          {/* CUSTOMERS SAY */}
          <section className="mb-5">
            <h3>Customers say</h3>
            <div className="d-flex gap-3 align-items-center border p-3 rounded">
              <div className="display-5 text-warning">4.2 ★</div>
              <div>
                <p className="mb-1">89% said it is comfortable</p>
                <p className="mb-1">82% said quality is excellent</p>
                <p className="mb-0">78% said worth the price</p>
              </div>
            </div>
          </section>

          {/* REVIEW HIGHLIGHTS */}
          {/* REVIEW HIGHLIGHTS */}
          <section className="mb-5">
            <h3>Highlights from customer reviews</h3>

            <div className="row row-cols-1 row-cols-md-2 g-3">

              {product.stats?.comfortable && (
                <div className="col border p-3 rounded">
                  <strong>Comfort</strong>
                  <p>{product.stats.comfortable}% customers found this product comfortable</p>
                </div>
              )}

              {product.stats?.quality && (
                <div className="col border p-3 rounded">
                  <strong>Quality</strong>
                  <p>{product.stats.quality}% customers rated the quality highly</p>
                </div>
              )}

              {product.stats?.worthPrice && (
                <div className="col border p-3 rounded">
                  <strong>Value for Money</strong>
                  <p>{product.stats.worthPrice}% customers felt it is worth the price</p>
                </div>
              )}

              {product.reviews?.length > 0 && (
                <div className="col border p-3 rounded">
                  <strong>Customer Feedback</strong>
                  <p>“{product.reviews[0].comment}”</p>
                </div>
              )}

            </div>
          </section>


          {/* CUSTOMER REVIEWS */}
          <section className="mb-5">
            <h3>Customer reviews</h3>
            <div className="row">
              <div className="col-md-3 text-center mb-3">
                <div className="display-6 text-warning">★★★★☆</div>
                <p>4.2 out of 5</p>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div className="d-flex align-items-center mb-1" key={star}>
                    <span className="me-2">{star} star</span>
                    <div className="progress flex-grow-1">
                      <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${star * 17}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-9">
                <div className="mb-3">
                  <button className="btn btn-outline-secondary btn-sm me-1 mb-1 active">Top reviews</button>
                  <button className="btn btn-outline-secondary btn-sm me-1 mb-1">Positive</button>
                  <button className="btn btn-outline-secondary btn-sm me-1 mb-1">Critical</button>
                  <button className="btn btn-outline-secondary btn-sm me-1 mb-1">Recent</button>
                  <button className="btn btn-outline-secondary btn-sm me-1 mb-1">Comfort</button>
                  <button className="btn btn-outline-secondary btn-sm me-1 mb-1">Quality</button>
                  <button className="btn btn-outline-secondary btn-sm me-1 mb-1">Value</button>
                </div>

                {product.reviews.map((review, index) => (
                  <div className="border p-3 rounded mb-3" key={index}>
                    <h5>{review.title}</h5>
                    <div className="text-warning mb-1">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
                    <p>{review.comment}</p>
                    <small className="text-muted">Reviewed in India on {review.date}</small>
                  </div>
                ))}


                <div className="border p-3 rounded mb-3">
                  <h5>Good but slightly overpriced</h5>
                  <div className="text-warning mb-1">★★★★☆</div>
                  <p>“Everything is good but price could be lower.”</p>
                  <small className="text-muted">Reviewed in India on 10 Jan 2025</small>
                </div>

                <div className="border p-3 rounded mb-3">
                  <h5>Not spacious enough</h5>
                  <div className="text-warning mb-1">★★★☆☆</div>
                  <p>“Couldn’t fit my 16-inch laptop properly.”</p>
                  <small className="text-muted">Reviewed in India on 5 Dec 2024</small>
                </div>
              </div>
            </div>
          </section>

          {/* WRITE REVIEW */}
          <section className="mb-5">
            <h3>Write a review</h3>
            <textarea className="form-control mb-2" placeholder="Share your thoughts about this product..."></textarea>
            <button className="btn btn-primary">Submit</button>
          </section>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;
