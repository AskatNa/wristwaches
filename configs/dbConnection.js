const mongoose = require('mongoose');
const User = require('../models/userModel')
const Wristwatch = require('../models/wristWatchesModule')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Successfully connected to DB");
    } catch (error) {
        console.error("Couldn't connect to DB", error);
        process.exit(1);
    }
};
User.collection.createIndex({ email: 1 }, { unique: true });
Wristwatch.collection.createIndex({ ObjectId: 1 });

console.log("Indexes created!");
module.exports = connectDB;
