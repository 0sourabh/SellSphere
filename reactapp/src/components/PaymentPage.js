import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import paymentQrImage from './Images/payment_qr.jpg'; // Adjust the path accordingly
import './PaymentPage.css';

function PaymentPage() {
    const location = useLocation();
    const { product } = location.state || {}; // Destructure the product from state

    const [selectedAddress, setSelectedAddress] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [message, setMessage] = useState('');

    const handlePayment = () => {
        if (!selectedAddress || !paymentMethod) {
            setMessage('Please select a delivery address and payment method.');
            return;
        }

        // Simulate a successful payment transaction
        setMessage('Payment successful! Thank you for your purchase.');
    };

    const addresses = [
        {
            id: 2,
            name: 'Sourabh Pandey',
            details: '21 Kashipuri, Near Manas Public School, MR 10, Bhangad Road, Madhya Pradesh - 452010',
            mobile: '9993086342',
        },
        {
            id: 1,
            name: 'Shrivanshu dubey',
            details: 'CW 170, Near Jain Medical Store, Jhawar Nagar, Dewas, Madhya Pradesh - 482510',
            mobile: '9926017724',
        },
    ];

    return (
        <div className="payment-page-container">
            <h1 className="header">SELLSPHERE</h1>

            <div className="main-container">
                {/* Delivery Address Section */}
                <section className="section">
                    <h2>Delivery Address</h2>
                    <div className="address-box">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`address ${selectedAddress === address.id ? 'selected' : ''}`}
                                onClick={() => setSelectedAddress(address.id)}
                            >
                                <h3>{address.name}</h3>
                                <p>{address.details}</p>
                                <p>Mobile No: {address.mobile}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Order Summary Section */}
                <section className="section">
                    <h2>Order Summary</h2>
                    {product ? (
                        <div className="order-summary">
                            <img src={product.image} alt={product.pname} />
                            <div>
                                <h3>{product.pname}</h3>
                                <p>Price: Rs. {product.price} /-</p>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No product selected for payment.</p>
                    )}
                </section>

                {/* Payment Details Section */}
                <section className="section">
                    <h2>Payment Details</h2>
                    <div className="payment-methods">
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Credit/Debit Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="netbanking"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Net Banking
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Cash on Delivery
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="upi"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            UPI
                        </label>
                    </div>

                    {/* QR Payment Section */}
                    <div className="qr-section">
                        <img src={paymentQrImage} alt="QR Code for payment" />
                        <p>Please confirm your payment details:</p>
                        <label>
                            Transaction ID:
                            <input
                                type="text"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                            />
                        </label>
                        <label>
                            Email Address:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                </section>
            </div>

            {/* Order Details Sidebar */}
            <aside className="order-details">
                <h2>Order Details</h2>
                {product && (
    <>
        <p>Price: <span>Rs. {product.price} /-</span></p>

        {/* Delivery Charges */}
        <p>Delivery Charges: <span>Rs. 1000 /-</span></p>

        {/* Discount Price (showing percentage) */}
        <p>Discount Price: <span>{20}%</span></p>

        {/* Total Amount Calculation */}
        <p>
  Total Amount: <span>
    Rs. {(product.price - (product.price * (20 / 100)) + 1000).toFixed(2)} /-
  </span>
</p>

    </>
)}

            </aside>

            {/* Pay Now Section */}
            <div className="pay-now">
                <button onClick={handlePayment}>Pay Now</button>
                {message && <p className="payment-message">{message}</p>}
            </div>
        </div>
    );
}

export default PaymentPage;
