const express = require('express')
const router = express.Router()
const {createGroupChat} = require('../../controllers/chat room/chatRoom.controller')
// route for creating group chat
router.route('/createchat').post(createGroupChat)

module.exports = router