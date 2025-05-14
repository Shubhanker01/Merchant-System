const { Server, Socket } = require('socket.io')
// initialize socket io event
const initializeSocketio = (io) => {
    return io.on('connection', async (socket) => {
        try {
            socket.emit('msg', 'This message is for client')
        }
        catch (err) {
            console.log(err)
        }
    })
}

// const create chat room
const createChatRoom = (io, groupId) => {
    return io.on("connection", async (socket) => {
        try {
            socket.join(groupId)
            io.to(groupId).emit("hi welcome to the group")
        } catch (error) {
            console.log(error)
        }
    })
}


module.exports = { initializeSocketio, createChatRoom }