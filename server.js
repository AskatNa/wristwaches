const express = require('express')
const session = require("express-session");
const adminRoutes = require("./routes/adminPanelRoute");
const app = express()
const mainRoute = require("./routes/mainRoute.js")
const connectDB = require("./configs/dbConnection.js")
const {PORT} = require("./configs/config.js")
const authRoute = require('./routes/authRoute')
const watchesSellerRoute = require("./routes/watchesSellerRoute");
const customerRoute = require("./routes/customerRoute");
const profileRoute = require("./routes/profileRoute");


require('dotenv').config()

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

connectDB().then(() => {
    app.use('/', mainRoute)
})
app.use("/", authRoute)
app.use("/admin", adminRoutes);
app.use("/seller", watchesSellerRoute);
app.use("/customer", customerRoute);


app.use("/profile", profileRoute);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
