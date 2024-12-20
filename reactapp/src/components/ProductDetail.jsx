import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../constants";
import "./ProductDetail.css"; // Import a CSS file for styles

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [showContact, setShowContact] = useState(false);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = `${API_URL}/get-product/${productId}`;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                } else {
                    console.error("Product data is empty or missing.");
                }
            })
            .catch((err) => {
                alert('Server Error.');
                console.error("Error fetching product details:", err);
            });
    }, [productId]);

    const handleContact = (addedBy) => {
        const url = `${API_URL}/get-user/${addedBy}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                    setShowContact(true);
                } else {
                    console.log("User data is empty or missing in response.");
                }
            })
            .catch((err) => {
                alert('Server Error.');
                console.error("Error fetching user data:", err);
            });
    };

    const handlePayNow = () => {
        navigate('/payment', { state: { product } });
    };

    const handleChat = () => {
        navigate('/chat', { state: { user } }); // Navigate to chat with user details
    };

    return (
        <div className="product-detail-container">
            <h2>PRODUCT DETAILS:</h2>
            <div>
                {product && (
                    <div className="product-detail-content">
                        <div className="product-images">
                            <img src={`${API_URL}/${product.pimage}`} alt={product.pname} className="product-image" />
                            {product.pimage2 && (
                                <img src={`${API_URL}/${product.pimage2}`} alt={`${product.pname} alternate`} className="product-image" />
                            )}
                            <h6>Product Description:</h6>
                            <p>{product.pdesc}</p>
                        </div>
                        <div className="product-info">
                            <h3 className="price-text">Rs. {product.price} /-</h3>
                            <p>{product.pname} | {product.category}</p>

                            {product.addedBy && (
                                <button onClick={() => handleContact(product.addedBy)} className="btn btn-secondary">
                                    Show Contact Details
                                </button>
                            )}

                            {showContact && user && (
                                <div className="contact-info">
                                    <h4>Username: {user.username}</h4>
                                    <h4>Mobile: {user.mobile || 'Not available'}</h4>
                                    <h6>Email: {user.email || 'Not available'}</h6>
                                    <h4>Pick-up Address: {user.address || 'Not available'}</h4>
                                </div>
                            )}

                            <div className="action-buttons">
                                <button className="btn btn-primary" onClick={handlePayNow}>
                                    Order Now
                                </button>
                                <button className="btn btn-secondary" onClick={handleChat}>
                                    Chat
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
