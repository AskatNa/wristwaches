require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 9999,
    MONGO_URI: process.env.MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET
}

