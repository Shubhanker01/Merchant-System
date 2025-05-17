const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8000
const cors = require('cors')
const connectToMongo = require('./db/connectToDb')
const cookieParser = require('cookie-parser')
const { createServer } = require('node:http')
const server = createServer(app)
const { Server } = require('socket.io')
const { initializeSocketio } = require('../Backend/socket/main')

const io = new Server(server, {
    cors: {
        origin: ['https://merchant-system-frontend.vercel.app', 'http://localhost:5173']
    }
})
initializeSocketio(io)
// createChatRoom(io, "123")

app.set('io', io)
// creating a middleware to use io in routes

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', function (req, res) {
    res.send("<h1>Hello world</h1>")
})

app.use('/api/merchant', require('./routes/merchant registration/merchantRegistration'))
app.use('/api/merchants', require('./routes/merchant login/merchantLogin'))
app.use('/api/merchant/password', require('./routes/merchant password/passwordReset'))
// forgot password route
app.use('/api/merchant', require('./routes/merchant password/forgotPassword'))
// bids routes
app.use('/api/bids', require('./routes/bids/bids.routes'))

// group chat routes
app.use('/api/chats', require('./routes/chat room/chatRoom.routes'))

// query user
app.use('/api', require('./routes/chat room/queryParticipant.routes'))

// message router
app.use('/api/message', require('./routes/chat room/message.routes'))


server.listen(port, () => {
    console.log("Example app listening on port ", port)
})

connectToMongo()
