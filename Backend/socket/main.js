
const { Message } = require('../models/message.model')
const { showAllBids, showUserBids } = require('../controllers/bids/bids.controller')
const { displayProject } = require('../controllers/projects/projects.controller')
const { showNotificationCountSocketStyle } = require('../controllers/projects/projectNotification.controller')
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
        console.log(`${socket.id} connected to bids namespace`)

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
        socket.on('hello', (arg) => {
            console.log(arg)
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

// function to display project
async function funcWrapperToDisplayProjects(project) {
    let result = await displayProject()
    // emit projects to the client
    project.emit('show-project', result)

}

// function to display notification count
async function displayNotificationCount(io, userId) {
    const count = await showNotificationCountSocketStyle(userId)
    io.to(userId).emit('count', count)
}

// create namespace for project section
const projectNamespace = (io) => {
    const project = io.of('/projects')
    project.on('connection', async (socket) => {
        console.log(`${socket.id} joined the project namespace`)
        funcWrapperToDisplayProjects(project)
        // listen to different events
        // 1. On project creation
        socket.on('project-added', (arg) => {
            console.log(arg)
            socket.broadcast.emit('on-project-added', 'A new Project has been created please check!!!')
            funcWrapperToDisplayProjects(project)
            io.of('/bids').emit('new-project-added', 'A new project has been added please check!!')
        })

        // check for disconnection
        socket.on('disconnect', () => {
            console.log(`${socket.id} is disconnected from project namespace`)
        })
    })
}

// 1. show notification increment real time
const initializeSocketio = (io) => {
    io.on('connection', async (socket) => {
        try {
            console.log(`${socket.id} joined the app globally`)
            const userId = socket.handshake.auth.userId
            if (userId) {
                socket.join(userId)
                console.log("UserId has joined the socket", userId)
            }
            await displayNotificationCount(io, userId)
            console.log(socket.rooms)
            socket.on('disconnect', () => {
                console.log(`${socket.id} is disconnected from app globally`)
            })
        }
        catch (err) {
            console.log(err)
        }
    })
}


module.exports = { initializeSocketio, createNamspace, bidsNamespace, projectNamespace }