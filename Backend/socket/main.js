const { Server, Socket } = require('socket.io')
// store temporary messages
let messages = [];


// initialize socket io event

// const create chat room
const createChatRoom = (socket) => {
    socket.on('create-room', (groups) => {
        for (let i = 0; i < groups.length; i++) {
            socket.join(groups[i].name)
        }
        console.log(socket.rooms)
    })
}

// send notification about user being added to chat
// const userAddedToChat = (socket) => {
//     socket.on('user-added', (arg) => {
//         socket.emit('user-added-success', arg)
//     })
// }

const sendMessageToRoom = (socket, io) => {
    // listen for chat message
    socket.on('send-message', (arg) => {

        console.log(arg)
        io.to(arg.room).emit('message', arg)
        messages.push(arg)
        console.log(`${socket.id} sent the message`)
        // io.emit('messages', messages)
    })

}

// create namespace for users
const createNamspace = (io) => {
    const users = io.of('/users')
    users.on('connection', (socket) => {
        console.log(socket.id)
        createChatRoom(socket)
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