const { Server, Socket } = require('socket.io')
// initialize socket io event

// const create chat room
const createChatRoom = (socket) => {
    socket.on("chat", (arg) => {
        console.log(arg)
        socket.join("Room123")
        console.log("Room 123 joined")
        console.log(socket.rooms)
        socket.emit("join", "Hello to the group")
    })
}

const initializeSocketio = (io) => {
    return io.on('connection', async (socket) => {
        try {
            socket.emit('msg', 'This message is for client')
            createChatRoom(socket)
        }
        catch (err) {
            console.log(err)
        }
    })
}



module.exports = { initializeSocketio, createChatRoom }