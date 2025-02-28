const express = require('express')
const router = express.Router()
const { createGroupChat, addParticipants } = require('../../controllers/chat room/chatRoom.controller')
// route for creating group chat
router.route('/createchat').post(createGroupChat)
// route for adding members
router.route('/addmembers').post(addParticipants)
module.exports = router