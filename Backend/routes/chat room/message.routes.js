const express = require('express')
const router = express.Router()
const { sendMessage } = require('../../controllers/chat room/message.controller')

router.route('/sendmessage').post(sendMessage)

module.exports = router