const express = require('express')
const router = express.Router()
const { registerUserEmail, verifyUserEmail, setUserPasswordFirstTime } = require('../../controllers/merchant registration controller/merchantregister.controller')
const { limiter } = require('../../middlewares/rateLimiter')
const { authenticateToken } = require('../../middlewares/authenticateToken')

router.route('/registration', registerUserEmail)
router.route('/verify', limiter, verifyUserEmail)
router.route('/setpassword', authenticateToken, setUserPasswordFirstTime)

module.exports = router
