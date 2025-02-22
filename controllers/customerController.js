const Wristwatch = require("../models/wristWatchesModule");
const User = require("../models/userModel");

const getAllWatches = async (req, res) => {
    try {
        const watches = await Wristwatch.find({});
        res.status(200).json(watches);
    } catch (error) {
        res.status(500).json({ message: "Error fetching watches", error });
    }
};

const addToCart = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "customer") {
            return res.status(403).json({ message: "Access denied" });
        }

        const { watchId } = req.body;
        const customer = await User.findById(req.session.user._id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        customer.cart = customer.cart || [];  // Ensure cart exists
        customer.cart.push(watchId);  // Add watch to cart
        await customer.save();

        res.status(200).json({ message: "Watch added to cart", cart: customer.cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

const getCart = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "customer") {
            return res.status(403).json({ message: "Access denied" });
        }

        const customer = await User.findById(req.session.user._id).populate("cart");
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json(customer.cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

const removeFromCart = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "customer") {
            return res.status(403).json({ message: "Access denied" });
        }

        const { watchId } = req.body;
        const customer = await User.findByIdAndDelete(req.session.user._id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        customer.cart = customer.cart.filter(id => id.toString() !== watchId);
        await customer.save();

        res.status(200).json({ message: "Watch removed from cart", cart: customer.cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error });
    }
};

module.exports = { getAllWatches, addToCart, getCart, removeFromCart };
