import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="container my-5">
      <h2>Thank you! Your order has been placed.</h2>
      <p>You can track it from the <Link to="/account/orders">Your Orders</Link> page.</p>
    </div>
  );
}

export default OrderSuccess;
