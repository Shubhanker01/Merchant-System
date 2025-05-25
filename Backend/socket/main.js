const { Server, Socket } = require('socket.io')
// store temporary messages
let messages = [];


// initialize socket io event

// const create chat room
const createChatRoom = (socket) => {
    socket.on("chat-room", (arg) => {
        socket.join(socket.id)
        console.log(`${socket.id} has joined the chat`)
        console.log("A new chat room has been created")
        console.log(socket.rooms)
        socket.emit("join", "Hello to the group")
    })
}

const sendMessageToRoom = (socket, io) => {
    // listen for chat message
    socket.on('send-message', (arg) => {

        console.log(arg)
        io.to('group1').emit('message', arg)
        messages.push(arg)
        io.emit('messages', messages)
    })
}
const initializeSocketio = (io) => {
    return io.on('connection', async (socket) => {
        try {
            socket.emit('msg', 'This message is for client')
            console.log(socket.id)
            createChatRoom(socket)
            sendMessageToRoom(socket, io)
            // const sockets = await io.in('group1').fetchSockets();
            // console.log('Sockets in group1:', sockets.map(s => s.id));
            socket.on('disconnect', () => {
                io.emit('left', 'a user has left the chat')
            })
        }
        catch (err) {
            console.log(err)
        }
    })
}


module.exports = { initializeSocketio, createChatRoom }