// routes/cart.js
const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { verifyToken, authenticate } = require("./middleware"); // Middleware to verify token
const router = express.Router();

router.post("/add", authenticate, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Extracted from the token

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Failed to add to cart" });
    }
});



router.get("/", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete("/remove/:productId", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(
            (product) => product.productId.toString() !== productId
        );

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
