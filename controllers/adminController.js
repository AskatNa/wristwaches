const path = require("path");
const User = require("../models/userModel")
const renderAdminLogin = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/adminLogin.html"));
};

const handleAdminLogin = (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        req.session.admin = true;
        return res.redirect("/admin/dashboard");
    } else {
        return res.redirect("/admin/login?error=Invalid credentials");
    }
};

const renderAdminPanel = (req, res) => {
    if (!req.session.admin) {
        return res.redirect("/admin/login");
    }
    res.sendFile(path.join(__dirname, "../public/adminPanel.html"));
};

const handleAdminLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login");
    });
};
const getAllUsers = async (req, res) => {
    if (!req.session.admin) {
        return res.status(403).send("Access denied");
    }
    const users = await User.find({}, "name email role");
    res.json(users);
};
const updateUserRole = async (req, res) => {
    if (!req.session.admin) {
        return res.status(403).send("Access denied");
    }

    const { userId, role } = req.body;
    if (role !== "customer" && role !== "watch_seller") {
        return res.status(400).send("Invalid role");
    }
    await User.findByIdAndUpdate(userId, { role });
    res.send("User role updated successfully");
};
const deleteUser = async (req, res) => {
    if (!req.session.admin) {
        return res.status(403).send("Access denied. Only the admin can delete users.");
    }

    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.status(200).send(`User ${User.name} has been deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user.");
    }
};
module.exports = { renderAdminLogin, handleAdminLogin, renderAdminPanel, handleAdminLogout, getAllUsers, updateUserRole,deleteUser};
