const jwt = require('jsonwebtoken')
require('dotenv').config()
const apiError = require('../utils/apiError')

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) throw new apiError(400,'Token is Null')

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) throw new apiError(402,'Invalid Token')
            else {
                req.user = user
            }

        })
        next()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { authenticateToken }