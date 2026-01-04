// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../api/baseUrl";

// function OrdersPage() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     axios
//       .get(`${BASE_URL}/api/orders/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setOrders(res.data || []))
//       .catch(console.error);
//   }, []);

//   const getCurrentStatus = (order) => {
//     if (!order.orderStatus?.length) return order.status || "Placed";
//     return order.orderStatus[order.orderStatus.length - 1].type;
//   };

//   return (
//     <div className="container my-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3 className="mb-0">Your Orders</h3>
//         <div className="text-muted small">({orders.length} orders)</div>
//       </div>

//       {orders.length === 0 && <p>No orders placed yet.</p>}

//       {orders.map((order) => {
//         const currentStatus = getCurrentStatus(order);
//         const addr = order.shippingAddress || {};
//         const firstItem = Array.isArray(order.items) ? order.items[0] : null;

//         return (
//           <div key={order._id} className="border rounded-3 mb-3" style={{ backgroundColor: "#fff" }}>
//             <div className="px-3 py-2 border-bottom" style={{ backgroundColor: "#f0f2f2" }}>
//               <div className="d-flex flex-wrap small">
//                 <div className="me-4">
//                   <span className="text-muted">ORDER PLACED</span>
//                   <div>{new Date(order.createdAt).toLocaleDateString()}</div>
//                 </div>
//                 <div className="me-4">
//                   <span className="text-muted">TOTAL</span>
//                   <div>₹{order.totalPrice}</div>
//                 </div>
//                 <div className="me-4">
//                   <span className="text-muted">SHIP TO</span>
//                   <div>{addr.fullName || "-"}</div>
//                 </div>
//                 <div className="ms-auto">
//                   <span className="text-muted">ORDER ID</span>
//                   <div className="text-truncate" style={{ maxWidth: 220 }}>{order._id}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-3">
//               <div className="d-flex">
//                 {/* ✅ Use Cloudinary URL directly - NO BASE_URL manipulation */}
//                 {firstItem?.image && (
//                   <div className="me-3">
//                     <img
//                       src={firstItem.image}  // ✅ Full Cloudinary URL from DB
//                       alt={firstItem?.name}
//                       style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
//                       onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }}
//                     />
//                   </div>
//                 )}

//                 <div className="flex-grow-1">
//                   <div className="mb-1 fw-semibold">{currentStatus}</div>
//                   <div className="mb-1">
//                     {firstItem?.name}
//                     {order.items.length > 1 && ` (+${order.items.length - 1} more items)`}
//                   </div>
//                   <div className="small text-muted">
//                     Deliver to: {addr.addressLine1 ? `${addr.addressLine1}, ${addr.city || ""} ${addr.postalCode || ""}` : "-"}
//                   </div>
//                   <div className="mt-2 d-flex flex-wrap small">
//                     <Link to={`/orders/${order._id}`} className="me-3">View order details</Link>
//                     <Link to={`/orders/${order._id}#track`} className="me-3">Track package</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default OrdersPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api/baseUrl";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(`${BASE_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data || []))
      .catch(console.error);
  }, []);

  const getCurrentStatus = (order) => {
    if (!order.orderStatus?.length) return order.status || "Placed";
    return order.orderStatus[order.orderStatus.length - 1].type;
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Your Orders</h3>
        <div className="text-muted small">({orders.length} orders)</div>
      </div>

      {orders.length === 0 && <p>No orders placed yet.</p>}

      {orders.map((order) => {
        const currentStatus = getCurrentStatus(order);
        const addr = order.shippingAddress || {};
        const firstItem = Array.isArray(order.items) ? order.items[0] : null;
        
        // ✅ Handles ALL cases: flat items, populated items, missing images
        const imageUrl = firstItem?.image || 
                        firstItem?.product?.image || 
                        "https://via.placeholder.com/80x80/ddd?text=No+Image";
        const productName = firstItem?.name || firstItem?.product?.name || "Product";

        return (
          <div key={order._id} className="border rounded-3 mb-3" style={{ backgroundColor: "#fff" }}>
            {/* Order header */}
            <div className="px-3 py-2 border-bottom" style={{ backgroundColor: "#f0f2f2" }}>
              <div className="d-flex flex-wrap small">
                <div className="me-4">
                  <span className="text-muted">ORDER PLACED</span>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="me-4">
                  <span className="text-muted">TOTAL</span>
                  <div>₹{order.totalPrice}</div>
                </div>
                <div className="me-4">
                  <span className="text-muted">SHIP TO</span>
                  <div>{addr.fullName || "-"}</div>
                </div>
                <div className="ms-auto">
                  <span className="text-muted">ORDER ID</span>
                  <div className="text-truncate" style={{ maxWidth: 220 }}>
                    {order._id}
                  </div>
                </div>
              </div>
            </div>

            {/* Order content */}
            <div className="p-3">
              <div className="d-flex">
                {/* Product thumbnail */}
                <div className="me-3">
                  <img
                    src={imageUrl}
                    alt={productName}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80x80/ddd?text=No+Image";
                    }}
                  />
                </div>

                {/* Product info */}
                <div className="flex-grow-1">
                  <div className="mb-1 fw-semibold">{currentStatus}</div>
                  <div className="mb-1">
                    {productName}
                    {order.items.length > 1 && ` (+${order.items.length - 1} more items)`}
                  </div>
                  <div className="small text-muted">
                    Deliver to: {addr.addressLine1 
                      ? `${addr.addressLine1}, ${addr.city || ""} ${addr.postalCode || ""}` 
                      : "-"}
                  </div>

                  {/* Action links */}
                  <div className="mt-2 d-flex flex-wrap small">
                    <Link to={`/orders/${order._id}`} className="me-3 text-decoration-none">
                      View order details
                    </Link>
                    <Link to={`/orders/${order._id}#track`} className="me-3 text-decoration-none">
                      Track package
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersPage;
