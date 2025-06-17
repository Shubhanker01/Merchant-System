const { Server, Socket } = require('socket.io')
// store temporary messages
let messages = [];


// initialize socket io event

// const create chat room


const sendMessageToRoom = (socket, io) => {
    // listen for chat message
    socket.on('send-message', (arg) => {

        console.log(arg)
        io.to('room1').emit('message', arg)
        messages.push(arg)
        // io.emit('messages', messages)
    })
}

// create namespace for users
const createNamspace = (io) => {
    const users = io.of('/users')
    users.on('connection', (socket) => {
        socket.on('enter-user', (arg) => {
            socket.join("room1")
            console.log(socket.rooms)
        })
        sendMessageToRoom(socket, users)
    })
}


const initializeSocketio = (io) => {
    return io.on('connection', async (socket) => {
        try {
            socket.emit('msg', 'This message is for client')
            // createChatRoom(socket)

            socket.on('disconnect', () => {
                io.emit('left', 'a user has left the chat')
            })
        }
        catch (err) {
            console.log(err)
        }
    })
}


module.exports = { initializeSocketio, createNamspace }