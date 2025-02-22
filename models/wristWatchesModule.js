const mongoose = require("mongoose");

const wristWatchesSchema = new mongoose.Schema({
    brand: {
        type:String,
        required:true,
    },
    model: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        index:true
    }
});

module.exports = mongoose.model("wristwatches", wristWatchesSchema)