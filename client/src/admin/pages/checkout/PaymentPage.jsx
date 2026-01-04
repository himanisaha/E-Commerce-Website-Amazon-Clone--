// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CartContext } from "../../../context/CartContext";
// import { BASE_URL } from "../../../api/baseUrl";

// function PaymentPage() {
//   const { cartItems } = useContext(CartContext);
//   const [method, setMethod] = useState("card");

//   // ✅ address state
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [addressLine1, setAddressLine1] = useState("");
//   const [addressLine2, setAddressLine2] = useState("");
//   const [city, setCity] = useState("");
//   const [stateVal, setStateVal] = useState("");
//   const [postalCode, setPostalCode] = useState("");

//   const navigate = useNavigate();

//   const itemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   useEffect(() => {
//     if (!cartItems.length) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Handle submit, method =", method, "items =", cartItems.length);

//     const token = localStorage.getItem("userToken");
//     if (!token) return navigate("/login");

//     // CASE 1: CASH ON DELIVERY
//     if (method === "cod") {
//       try {
//         await axios.post(
//           `${BASE_URL}/api/orders`,
//           {
//             items: cartItems.map((item) => ({
//               productId: item._id,
//               name: item.name,
//               price: item.price,
//               qty: item.qty,
//               image: item.image,
//             })),
//             totalPrice: subtotal,
//             paymentType: "COD",
//             shippingAddress: {
//               fullName,
//               phone,
//               addressLine1,
//               addressLine2,
//               city,
//               state: stateVal,
//               postalCode,
//             },
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         localStorage.removeItem("cartItems");
//         navigate("/order-success");
//       } catch (err) {
//         console.error(err);
//         alert("COD order failed");
//       }
//       return;
//     }

//     // CASE 2: RAZORPAY (CARD)
//     try {
//       // 1. Create Razorpay order on backend
//       const orderResponse = await axios.post(
//         `${BASE_URL}/api/payments/create-order`,
//         { amount: subtotal },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const { orderId, amount, currency } = orderResponse.data;
//       console.log("Razorpay order created:", orderId, amount, currency);

//       // 2. Load Razorpay script
//       const loadRazorpay = () => {
//         return new Promise((resolve) => {
//           const script = document.createElement("script");
//           script.src = "https://checkout.razorpay.com/v1/checkout.js";
//           script.onload = () => resolve(true);
//           script.onerror = () => resolve(false);
//           document.body.appendChild(script);
//         });
//       };

//       const result = await loadRazorpay();
//       if (!result) {
//         alert("Razorpay SDK failed to load");
//         return;
//       }

//       // 3. Open Razorpay popup
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: amount,
//         currency: currency,
//         name: "Your Store",
//         order_id: orderId,
//         handler: async (response) => {
//           // 4. Verify payment + create order in DB
//           const verifyResponse = await axios.post(
//             `${BASE_URL}/api/payments/verify-payment`,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               cartItems: cartItems.map((item) => ({
//                 _id: item._id,
//                 name: item.name,
//                 price: item.price,
//                 qty: item.qty,
//                 image: item.image,
//               })),
//               // optional: you can also send shippingAddress here
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (verifyResponse.data.success) {
//             localStorage.removeItem("cartItems");
//             navigate("/order-success", {
//               state: { orderId: verifyResponse.data.orderId },
//             });
//           } else {
//             alert("Payment verification failed");
//           }
//         },
//         prefill: {
//           name: fullName || "Customer Name",
//           email: "customer@example.com",
//         },
//         theme: { color: "#f0c14b" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error(error);
//       alert(
//         "Payment failed: " + (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#eaeded", minHeight: "100vh" }}>
//       <div className="container py-4" style={{ maxWidth: "1000px" }}>
//         <div className="row">
//           {/* LEFT: payment + address section */}
//           <div className="col-md-8">
//             <div
//               className="bg-white p-4 mb-3"
//               style={{ boxShadow: "0 2px 4px rgba(15,17,17,.15)" }}
//             >
//               <h1
//                 className="mb-3"
//                 style={{ fontSize: "28px", fontWeight: 500 }}
//               >
//                 Payment
//               </h1>

//               {/* Address form */}
//               <h5
//                 className="mb-3"
//                 style={{ fontSize: "18px", fontWeight: 500 }}
//               >
//                 Delivery address
//               </h5>
//               <div className="mb-3">
//                 <input
//                   className="form-control mb-2"
//                   placeholder="Full name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                 />
//                 <input
//                   className="form-control mb-2"
//                   placeholder="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <input
//                   className="form-control mb-2"
//                   placeholder="Address line 1"
//                   value={addressLine1}
//                   onChange={(e) => setAddressLine1(e.target.value)}
//                 />
//                 <input
//                   className="form-control mb-2"
//                   placeholder="Address line 2"
//                   value={addressLine2}
//                   onChange={(e) => setAddressLine2(e.target.value)}
//                 />
//                 <div className="d-flex gap-2 mb-2">
//                   <select
//                     className="form-control"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                   >
//                     <option value="">Select city</option>
//                     <option value="Kolkata">Kolkata</option>
//                     <option value="Mumbai">Mumbai</option>
//                     <option value="Delhi">Delhi</option>
//                     {/* add more */}
//                   </select>

//                   <select
//                     className="form-control"
//                     value={stateVal}
//                     onChange={(e) => setStateVal(e.target.value)}
//                   >
//                     <option value="">Select state</option>
//                     <option value="West Bengal">West Bengal</option>
//                     <option value="Maharashtra">Maharashtra</option>
//                     <option value="Karnataka">Karnataka</option>
//                     {/* add all Indian states */}
//                   </select>
//                 </div>

//                 <input
//                   className="form-control"
//                   placeholder="PIN code"
//                   value={postalCode}
//                   onChange={(e) => setPostalCode(e.target.value)}
//                 />
//               </div>

//               <h5
//                 className="mb-3"
//                 style={{ fontSize: "18px", fontWeight: 500 }}
//               >
//                 Select a payment method
//               </h5>

//               <form onSubmit={handleSubmit}>
//                 <div className="form-check mb-2">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     id="pm-card"
//                     value="card"
//                     checked={method === "card"}
//                     onChange={(e) => setMethod(e.target.value)}
//                   />
//                   <label className="form-check-label" htmlFor="pm-card">
//                     Credit or Debit card
//                   </label>
//                 </div>

//                 <div className="form-check mb-4">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     id="pm-cod"
//                     value="cod"
//                     checked={method === "cod"}
//                     onChange={(e) => setMethod(e.target.value)}
//                   />
//                   <label className="form-check-label" htmlFor="pm-cod">
//                     Cash on delivery
//                   </label>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn w-100"
//                   style={{
//                     backgroundColor: "#f0c14b",
//                     borderColor: "#a88734 #9c7e31 #846a29",
//                     color: "#111",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Continue
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* RIGHT: order summary */}
//           <div className="col-md-4">
//             <div
//               className="bg-white p-3"
//               style={{
//                 boxShadow: "0 2px 4px rgba(15,17,17,.15)",
//                 borderRadius: 4,
//               }}
//             >
//               <h5
//                 className="mb-2"
//                 style={{ fontSize: "18px", fontWeight: 500 }}
//               >
//                 Order summary
//               </h5>
//               <p className="mb-1" style={{ fontSize: "14px" }}>
//                 Items ({itemsCount}):{" "}
//                 <span style={{ fontWeight: 600 }}>
//                   ₹{subtotal.toFixed(0)}
//                 </span>
//               </p>
//               <hr className="my-2" />
//               <p
//                 className="mb-0"
//                 style={{
//                   color: "#b12704",
//                   fontWeight: 700,
//                   fontSize: "18px",
//                 }}
//               >
//                 Order total: ₹{subtotal.toFixed(0)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../../context/CartContext";
import { BASE_URL } from "../../../api/baseUrl";

function PaymentPage() {
  const { cartItems } = useContext(CartContext);
  const [method, setMethod] = useState("card");

  // ✅ address state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigate = useNavigate();

  const itemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  useEffect(() => {
    if (!cartItems.length) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // ✅ NEW: Validate address fields
// ✅ STRICT VALIDATION: Blocks partial/incomplete fields
const isAddressComplete = () => {
  const pinRegex = /^\d{6}$/; // Exactly 6 digits
  return (
    fullName.trim().length >= 2 &&           // Min 2 chars
    phone.trim().length >= 10 &&             // Min 10 digits
    addressLine1.trim().length >= 5 &&       // Min 5 chars
    city.trim() &&                           // Not empty
    stateVal.trim() &&                       // Not empty  
    postalCode.trim().length === 6 &&        // Exactly 6 digits
    pinRegex.test(postalCode.trim())         // PIN code format
  );
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit, method =", method, "items =", cartItems.length);

    const token = localStorage.getItem("userToken");
    if (!token) return navigate("/login");

    // ✅ NEW VALIDATION: Block COD without address
    if (method === "cod" && !isAddressComplete()) {
      alert("⚠️ Please fill all delivery address fields for Cash on Delivery");
      return;
    }

    // CASE 1: CASH ON DELIVERY (now validated)
    if (method === "cod") {
      try {
        await axios.post(
          `${BASE_URL}/api/orders`,
          {
            items: cartItems.map((item) => ({
              productId: item._id,
              name: item.name,
              price: item.price,
              qty: item.qty,
              image: item.image,
            })),
            totalPrice: subtotal,
            paymentType: "COD",
            shippingAddress: {
              fullName,
              phone,
              addressLine1,
              addressLine2: addressLine2 || "", // optional
              city,
              state: stateVal,
              postalCode,
            },
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        localStorage.removeItem("cartItems");
        navigate("/order-success");
      } catch (err) {
        console.error(err);
        alert("COD order failed");
      }
      return;
    }

    // CASE 2: RAZORPAY (CARD) - unchanged
    try {
      // ... rest of your Razorpay code stays exactly the same ...
      const orderResponse = await axios.post(
        `${BASE_URL}/api/payments/create-order`,
        { amount: subtotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount, currency } = orderResponse.data;
      console.log("Razorpay order created:", orderId, amount, currency);

      const loadRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const result = await loadRazorpay();
      if (!result) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Your Store",
        order_id: orderId,
        handler: async (response) => {
          const verifyResponse = await axios.post(
            `${BASE_URL}/api/payments/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: cartItems.map((item) => ({
                _id: item._id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                image: item.image,
              })),
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (verifyResponse.data.success) {
            localStorage.removeItem("cartItems");
            navigate("/order-success", {
              state: { orderId: verifyResponse.data.orderId },
            });
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: fullName || "Customer Name",
          email: "customer@example.com",
        },
        theme: { color: "#f0c14b" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert(
        "Payment failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#eaeded", minHeight: "100vh" }}>
      <div className="container py-4" style={{ maxWidth: "1000px" }}>
        <div className="row">
          {/* LEFT: payment + address section */}
          <div className="col-md-8">
            <div
              className="bg-white p-4 mb-3"
              style={{ boxShadow: "0 2px 4px rgba(15,17,17,.15)" }}
            >
              <h1
                className="mb-3"
                style={{ fontSize: "28px", fontWeight: 500 }}
              >
                Payment
              </h1>

              {/* Address form */}
              <h5
                className="mb-3"
                style={{ fontSize: "18px", fontWeight: 500 }}
              >
                Delivery address
              </h5>
              <div className="mb-3">
                <input
                  className="form-control mb-2"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Address line 1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Address line 2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
                <div className="d-flex gap-2 mb-2">
                  <select
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select city</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>

                  <select
                    className="form-control"
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                  >
                    <option value="">Select state</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <input
                  className="form-control"
                  placeholder="PIN code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <h5
                className="mb-3"
                style={{ fontSize: "18px", fontWeight: 500 }}
              >
                Select a payment method
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="pm-card"
                    value="card"
                    checked={method === "card"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="pm-card">
                    Credit or Debit card
                  </label>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="pm-cod"
                    value="cod"
                    checked={method === "cod"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="pm-cod">
                    Cash on delivery
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "#f0c14b",
                    borderColor: "#a88734 #9c7e31 #846a29",
                    color: "#111",
                    fontWeight: 500,
                  }}
                  disabled={method === "cod" && !isAddressComplete()}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: order summary */}
          <div className="col-md-4">
            <div
              className="bg-white p-3"
              style={{
                boxShadow: "0 2px 4px rgba(15,17,17,.15)",
                borderRadius: 4,
              }}
            >
              <h5
                className="mb-2"
                style={{ fontSize: "18px", fontWeight: 500 }}
              >
                Order summary
              </h5>
              <p className="mb-1" style={{ fontSize: "14px" }}>
                Items ({itemsCount}):{" "}
                <span style={{ fontWeight: 600 }}>
                  ₹{subtotal.toFixed(0)}
                </span>
              </p>
              <hr className="my-2" />
              <p
                className="mb-0"
                style={{
                  color: "#b12704",
                  fontWeight: 700,
                  fontSize: "18px",
                }}
              >
                Order total: ₹{subtotal.toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
