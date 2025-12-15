import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">

        <div className="row text-start">

          <div className="col-6 col-md-3 mb-3">
            <h6 className="fw-bold">Get to Know Us</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-secondary text-decoration-none">About</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Press Releases</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 mb-3">
            <h6 className="fw-bold">Customer Service</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-secondary text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Returns</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Track Order</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 mb-3">
            <h6 className="fw-bold">Make Money with Us</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-secondary text-decoration-none">Sell on Amazon</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Affiliate Program</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Advertise</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 mb-3">
            <h6 className="fw-bold">Let Us Help You</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-secondary text-decoration-none">Your Account</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Shipping Rates</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Gift Cards</a></li>
            </ul>
          </div>

        </div>

        <div className="border-top border-secondary pt-3 mt-3 d-flex justify-content-between align-items-center flex-column flex-md-row">
          <small className="text-secondary">
            © {year} Amazon Clone
          </small>

          <div className="d-flex gap-2 mt-2 mt-md-0">
            <select className="form-select form-select-sm bg-dark text-light border-secondary" style={{ width: "120px" }}>
              <option>English</option>
              <option>বাংলা</option>
            </select>

            <select className="form-select form-select-sm bg-dark text-light border-secondary" style={{ width: "120px" }}>
              <option>INR</option>
              <option>USD</option>
            </select>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;