import React, { useState } from "react";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");

  const addresses = [
    {
      id: 0,
      name: "Sourabh Pandey",
      address: "21 Kashipuri, Near Manas Public School, MR 10, Bhangad Road, Madhya Pradesh - 452010",
      mobile: "9993086342",
    },
    {
      id: 1,
      name: "Mahendra Singh",
      address: "Cw 170 Near Jain Medical Store, Sukhlia, Indore, Madhya Pradesh - 452010",
      mobile: "9926017724",
    },
  ];

  const order = {
    name: "Hero Honda",
    price: 75000,
    description:
      "The Hero Splendor Plus is one of the most iconic motorcycles in India's two-wheeler market known for its unbeatable reliability, fuel efficiency, and value.",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#2A4747", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>SELLSPHERE</h1>
      <h3 style={{ textAlign: "center", marginBottom: "30px" }}>You are almost there...!</h3>
      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#2A4747" }}>
        {/* Left Section */}
        <div style={{ width: "60%", backgroundColor: "#f8f8f8", color: "#333", padding: "20px", borderRadius: "8px" }}>
          {/* Delivery Address */}
          <section>
            <h3>Delivery Address</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              {addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAddress(index)}
                  style={{
                    padding: "10px",
                    border: selectedAddress === index ? "2px solid #007bff" : "1px solid #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  <h4>{address.name}</h4>
                  <p style={{ margin: "5px 0" }}>{address.address}</p>
                  <p style={{ fontWeight: "bold" }}>Mobile No: {address.mobile}</p>
                </div>
              ))}
              <div
                style={{
                  padding: "10px",
                  border: "1px dashed #ccc",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <span>Add Address</span>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section>
            <h3>Order Summary</h3>
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <img src="https://via.placeholder.com/100" alt="Product" style={{ borderRadius: "8px" }} />
              <div>
                <h4>{order.name}</h4>
                <p>Rs. {order.price}/-</p>
                <p>{order.description}</p>
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section>
            <h3>Payment Details</h3>
            <div>
              {["Credit/Debit Card", "Net Banking", "Cash On Delivery", "UPI"].map((method) => (
                <div key={method} style={{ marginBottom: "10px" }}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    id={method}
                    checked={selectedPayment === method}
                    onChange={() => setSelectedPayment(method)}
                  />
                  <label htmlFor={method} style={{ marginLeft: "10px" }}>
                    {method}
                  </label>
                </div>
              ))}
            </div>
          </section>

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            onClick={() => alert("Order Placed Successfully!")}
          >
            Pay Now
          </button>
        </div>

        {/* Right Section */}
        <div style={{ width: "35%", padding: "20px", backgroundColor: "#2A4747", borderRadius: "8px", color: "#fff" }}>
          <h3>Order Details</h3>
          <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>Price</span>
            <span>Rs. {order.price}/-</span>
          </div>
          <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>Delivery Charges</span>
            <span>Free</span>
          </div>
          <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>Discount Price</span>
            <span>Rs. 0/-</span>
          </div>
          <div style={{ marginTop: "20px", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
            <span>Total Amount</span>
            <span>Rs. {order.price}/-</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
