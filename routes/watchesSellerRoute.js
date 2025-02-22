const express = require("express");
const path = require("path");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const {
    renderSellerDashboard,
    handleSellerLogout,
    getSellerWatches, createWatch, updateWatch,deleteWatch
} = require("../controllers/watchSellerController");

const router = express.Router();

router.get("/dashboard", ensureAuthenticated, renderSellerDashboard);
router.get("/watches", ensureAuthenticated, getSellerWatches);
router.post("/create", ensureAuthenticated, createWatch);
router.put("/update/:watchId", ensureAuthenticated, updateWatch);
router.delete("/delete/:watchId", ensureAuthenticated, deleteWatch);

router.get("/logout", handleSellerLogout);

module.exports = router;
