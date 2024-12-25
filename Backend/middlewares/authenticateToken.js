const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) throw new Error("Token is null")

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) res.status(403).send("Invalid token")
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