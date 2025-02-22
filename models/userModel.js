const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["customer", "watch_seller"],
        default: "customer"
    },
    watches:[{
        type: mongoose.Schema.Types.ObjectId, ref: "wristwatches"
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "wristwatches"
    }]
})

module.exports = mongoose.model('users', userSchema)
