
const { Message } = require('../models/message.model')
const { showAllBids, showUserBids } = require('../controllers/bids/bids.controller')

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

    socket.on('send-message', async (arg) => {
        io.to(arg.room).emit('message', arg)
        await Message.create({
            groupName: arg.room,
            username: arg.message.user,
            userId: arg.message.userId,
            message: arg.message.text
        })
        console.log(`${socket.id} sent the message`)

    })

}

const sendBids = (io, socket) => {
    // listen for the event from client to server about next page info
    socket.on('query-bids', async ({ nextQuery, prevQuery }) => {
        let bids = await showAllBids({ nextQuery, prevQuery })
        socket.emit("read-bids", bids)
    })

}

// create namespace for bids crud
const bidsNamespace = (io) => {
    const bids = io.of('/bids')
    bids.on('connection', (socket) => {
        // console.log(`${socket.id} connected to bids namespace`)
        sendBids(bids, socket)
        // listen to different events 
        socket.on('create-bids', (arg) => {
            console.log(arg)
            // broadcast the message to all user except the sender
            socket.broadcast.emit('success-creation-bids', "A new bid has been added")
            // sendBids(bids)
        })
        socket.on('send-user-bids', async (user, pageNo) => {
            let userBids = await showUserBids(user, pageNo)
            socket.emit('user-bids', userBids)
        })
        // listen for deleting event
        socket.on('delete-bids', () => {
            socket.broadcast.emit('on-delete', "A bid has been removed by the user")
            // sendBids(bids)
        })
        // listening for updation event
        socket.on('updation-bid', (id) => {
            socket.broadcast.emit('on-updation', `Bid ID ${id} has been updated`)
            // sendBids(bids)
        })

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
            socket.on('bid-added', (arg) => {
                console.log(arg)
            })
            // sendBids(io)
            socket.on('disconnect', () => {
                io.emit('left', 'a user has left the chat')
            })
        }
        catch (err) {
            console.log(err)
        }
    })
}


module.exports = { initializeSocketio, createNamspace, bidsNamespace }