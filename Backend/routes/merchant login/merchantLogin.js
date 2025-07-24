const express = require('express')
const router = express.Router()

const { limiter } = require('../../middlewares/rateLimiter')

const merchantLogin = require('../../controllers/merchant login controller/merchantlogin.controller')


router.route('/login').post(limiter, merchantLogin)
// router.route('/login').post(merchantLogin)
module.exports = router