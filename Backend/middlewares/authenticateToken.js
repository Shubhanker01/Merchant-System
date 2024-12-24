const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403)

            req.body.email = user.email
        })
        next()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = authenticateToken