const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};


router.get("/", isAuthenticated, profileController.renderProfilePage);
router.get("/data", isAuthenticated, profileController.getProfile);
router.put("/update", isAuthenticated, profileController.updateProfile);
router.post("/logout", isAuthenticated, profileController.logoutUser);

module.exports = router;
