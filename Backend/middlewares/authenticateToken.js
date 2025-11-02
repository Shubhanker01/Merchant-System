const jwt = require('jsonwebtoken')
require('dotenv').config()
const apiError = require('../utils/apiError')

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ message: 'Token missing' })

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                console.log('JWT verification failed:', err.message)
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Session expired. Please log in again.' })
                }
                return res.status(403).json({ message: 'Invalid token' })
            }
            else {
                req.user = user
                next()
            }

        })

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { authenticateToken }