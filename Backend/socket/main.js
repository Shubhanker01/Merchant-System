const { Server, Socket } = require('socket.io')
// initialize socket io event

// const create chat room
const createChatRoom = (socket) => {
    socket.on("chat-room", (arg) => {
        socket.join(arg)
        console.log("A new chat room has been created")
        console.log(socket.rooms)
        socket.emit("join", "Hello to the group")
    })
    socket.on('message', (arg) => {
        console.log(arg)
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

const emitSocketEvent = (req, groupName, event, payload) => {
    req.app.get('io').in(groupName).emit(event, payload)
}


module.exports = { initializeSocketio, createChatRoom, emitSocketEvent }