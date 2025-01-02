const express = require('express')
const router = express.Router()
const { registerUserEmail, verifyUserEmail, setUserPasswordFirstTime } = require('../../controllers/merchant registration controller/merchantregister.controller')
const { limiter } = require('../../middlewares/rateLimiter')
const { authenticateToken } = require('../../middlewares/authenticateToken')

router.route('/registration').post(limiter, registerUserEmail)
router.route('/verify').post(verifyUserEmail)
router.route('/setpassword').post(authenticateToken,setUserPasswordFirstTime)

module.exports = router
