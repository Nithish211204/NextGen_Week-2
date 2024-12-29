import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("Please log in to view your cart.");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/cart", {
                    headers: { "Authorization": `Bearer ${token}` },
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch cart items.");
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const removeFromCart = async (productId) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to remove items from your cart.");
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/cart/remove/${productId}`, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            setCartItems((prevItems) => prevItems.filter((item) => item.productId._id !== productId));
            alert("Product removed from cart.");
        } catch (err) {
            console.error("Error removing product from cart:", err);
            alert("Failed to remove product from cart.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.productId._id} className="cart-item">
                        <img src={item.productId.image} alt={item.productId.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.productId.name}</h3>
                            <p>{item.productId.description}</p>
                            <p><strong>₹{item.productId.price}</strong></p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.productId._id)}
                            className="remove-btn"
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
