const express = require('express')
const router = express.Router()

const { authenticateToken } = require('../../middlewares/authenticateToken')
const { verifyEmailInForgotPasswordRoute, resetPasswordInForgotPasswordRoute } = require('../../controllers/merchant password controller/merchantPassword.controller')

router.post('/forgotpassword/verify', verifyEmailInForgotPasswordRoute)

router.post('/forgotpassword/reset', authenticateToken, resetPasswordInForgotPasswordRoute)

module.exports = router

