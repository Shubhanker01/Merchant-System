const express = require('express')
const router = express.Router()
const { createGroupChat, addParticipants, deleteGroupChat } = require('../../controllers/chat room/chatRoom.controller')
// route for creating group chat
router.route('/createchat').post(createGroupChat)
// route for adding members
router.route('/addmembers').post(addParticipants)
// route for deleting group
router.route('/deletegroup').delete(deleteGroupChat)
module.exports = router