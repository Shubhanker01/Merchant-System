const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) console.log("Token is null")

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) console.log(err.message)
            else {
                console.log(user)
            }

        })
        next()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { authenticateToken }