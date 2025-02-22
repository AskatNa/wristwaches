const express = require('express');
const router = express.Router()
const path = require('path')
const Wristwatch = require('../models/wristWatchesModule')

const publicPath = path.join(__dirname, '../public');
router.use(express.static(publicPath));
router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
router.get("/watches", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/watches.html"));
});

router.get("/allWatches", async (req, res) => {
    try {
        const watches = await Wristwatch.find().populate("owner", "name email");
        const totalCount = await Wristwatch.countDocuments();

        res.status(200).json({ totalCount, watches });
    } catch (error) {
        res.status(500).json({ message: "Error fetching watch list", error });
    }
});
module.exports = router;
