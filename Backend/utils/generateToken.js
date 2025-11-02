const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (email, name) => {
    return jwt.sign({ email, name }, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' })
}



module.exports = { generateToken }