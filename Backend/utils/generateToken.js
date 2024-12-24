const jwt = require('jsonwebtoken')

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' })
}



module.exports = {generateToken}