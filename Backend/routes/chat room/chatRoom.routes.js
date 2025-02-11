const { io } = require('../../index')
const { chatRoom } = require('../../controllers/chat room/chatRoom.controller')

const mychatroom = io.of('/chatroom', chatRoom)

module.exports = { mychatroom }