const path = require("path");
const Wristwatch = require("../models/wristWatchesModule");
const User = require('../models/userModel')

const renderSellerDashboard = (req, res) => {
    if (!req.session.user || req.session.user.role !== "watch_seller") {
        return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/sellerDashboard.html"));
};

const handleSellerLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};


const createWatch = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "watch_seller") {
            return res.status(403).json({ message: "Access denied" });
        }

        const { brand, model, price } = req.body;

        const newWatch = await Wristwatch.create({
            brand,
            model,
            price,
            owner: req.session.user._id
        });
        res.status(201).json(newWatch);
    } catch (error) {
        res.status(500).json({ message: "Error creating watch", error });
    }
};
const getSellerWatches = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== "watch_seller") {
            return res.status(403).json({ message: "Access denied" });
        }

        const watches = await Wristwatch.find({ owner: req.session.user._id });

        res.status(200).json(watches);
    } catch (error) {
        res.status(500).json({ message: "Error fetching watches", error });
    }
};


const getWatchById = async (req, res) => {
    try {

        const { watchId } = req.params;

        const watch = await Wristwatch.findById(watchId).populate("owner","name email");
        if (!watch) {
            return res.status(404).json({ message: "Watch not found" });
        }

        res.status(200).json(watch);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving watch", error });
    }
};

const updateWatch = async (req, res) => {
    try {
        const { watchId } = req.params;
        const { brand, model, price } = req.body;

        const watch = await Wristwatch.findOneAndUpdate(
            { _id: watchId, owner: req.session.user._id },
            { brand, model, price },
            { new: true }
        );

        if (!watch) {
            return res.status(404).json({ message: "Watch not found or unauthorized" });
        }

        res.status(200).json({ message: "Watch updated successfully", watch });
    } catch (error) {
        res.status(500).json({ message: "Error updating watch", error });
    }
};

const deleteWatch = async (req, res) => {
    try {
        const { watchId } = req.params;

        const watch = await Wristwatch.findOneAndDelete({ _id: watchId, owner: req.session.user._id });
        if (!watch) {
            return res.status(404).json({ message: "Watch not found or unauthorized" });
        }

        res.status(200).json({ message: "Watch deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting watch", error });
    }
};



module.exports = {
    createWatch,
    getSellerWatches,
    getWatchById,
    updateWatch,
    deleteWatch,
    renderSellerDashboard,
    handleSellerLogout
};
