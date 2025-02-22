const path = require("path");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const renderProfilePage = (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/customerProfile.html"));
};

const getProfile = async (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ error: "Unauthorized access" });
    }

    try {
        const user = await User.findById(req.session.userId).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const updateProfile = async (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ error: "Unauthorized access" });
    }

    try {
        const { name, password } = req.body;
        let updateData = { name };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.session.userId, updateData, { new: true }).select("-password");
        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};

module.exports = {
    renderProfilePage,
    getProfile,
    updateProfile,
    logoutUser
};
