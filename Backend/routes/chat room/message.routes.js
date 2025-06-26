const express = require('express')
const router = express.Router()
const { sendMessage, getOldMessages } = require('../../controllers/chat room/message.controller')

router.route('/sendmessage').post(sendMessage)
router.route('/getmessages/:groupName').get(getOldMessages)

module.exports = router