const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
}



module.exports = {generateToken}