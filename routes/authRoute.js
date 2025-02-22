const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')
const signupController = require('../controllers/signupController')

router.get("/login", loginController.renderLoginPage)

router.post("/login", loginController.handleLoginPage)

router.get('/signup', signupController.renderSignupPage);

router.post('/signup', signupController.handleSignup);

module.exports = router;