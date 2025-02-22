const User = require('../models/userModel');
const express = require('express')
const bcrypt = require('bcrypt');
const path = require('path');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const renderSignupPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
};

const handleSignup = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("All fields are required.");
        }

        if (password.length < 8) {
            return res.status(400).send("Password must be at least 8 characters long.");
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.redirect('/signup?error=User already exists. Use a different email.');
        }

        const saltRounds = 10;
        if (!password) {
            return res.status(400).send("Password is required");
        }
        const hashedPassword = await bcrypt.hash(password.trim(), saltRounds);

        const user = await User.collection.insertOne(
            {
                name,
                email,
                password: hashedPassword,
                role: "customer",
                watches: []
            });
        if (user.acknowledged) {
            console.log("User registered:", user.insertedId);
            return res.redirect('/login');
        } else {
            return res.status(500).send("Failed to register user.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

module.exports = { renderSignupPage, handleSignup };
