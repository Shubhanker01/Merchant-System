const { rateLimit } = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    message: "Too many requests , please try again after 5 minutes",
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = { limiter }