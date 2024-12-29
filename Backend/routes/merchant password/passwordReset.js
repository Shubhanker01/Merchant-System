const express = require('express')
const { authenticateToken } = require('../../middlewares/authenticateToken')
const router = express.Router()
const { resetPasswordInApp } = require('../../controllers/merchant password controller/merchantPassword.controller')

router.post('/reset', authenticateToken, resetPasswordInApp)

module.exports = router