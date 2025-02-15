const { Server, Socket } = require('socket.io')

const initializeSocketio = (io) => {
    return io.on('connection', async (socket) => {
        try {
            socket.emit('msg', 'This message is for client')
            console.log('socket is active to be connected')
        }
        catch (err) {
            console.log(err)
        }
    })
}


module.exports = { initializeSocketio }