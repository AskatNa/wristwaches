const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const path = require('path')
const connectDB = require('../configs/dbConnection')

connectDB().then(()=> console.log("Connected for login")).catch(() => console.log("Error has occured in login"))

const renderLoginPage = (req,res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
}

const handleLoginPage = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.redirect('/login?error=User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.redirect('/login?error=Wrong password');
        }
        req.session.user = {
            _id: user._id.toString(),
            email: user.email,
            role: user.role
        };
        console.log("User role:", req.session.user.role);
        if (user.role === "watch_seller") {
            return res.redirect("/seller/dashboard");
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

module.exports = {handleLoginPage, renderLoginPage}