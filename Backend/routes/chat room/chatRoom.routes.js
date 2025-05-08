const express = require('express')
const router = express.Router()
const { createGroupChat, addParticipants, deleteGroupChat, showGroups, removeParticipant } = require('../../controllers/chat room/chatRoom.controller')
// route for creating group chat
router.route('/createchat').post(createGroupChat)
// route for adding members
router.route('/addmembers').post(addParticipants)
// route for deleting group
router.route('/deletegroup/:groupId').delete(deleteGroupChat)
// route for getting group chats
router.route('/getchats/:id').get(showGroups)
// route for removing participant
router.route('/removeparticipant/:id').post(removeParticipant)

module.exports = router