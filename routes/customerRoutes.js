const express = require("express");
const customerController= require("../controllers/customerController");
const {getCart, removeFromCart, addToCart} = require("../controllers/customerController");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'customer') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

router.get("/watches",isAuthenticated, customerController.getAllWatches);

router.post("/cart/add",isAuthenticated, addToCart);
router.get("/cart",isAuthenticated, getCart);
router.delete("/cart/remove",isAuthenticated, removeFromCart);

module.exports = router;
