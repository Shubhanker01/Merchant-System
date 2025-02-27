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


module.exports = { initializeSocketio }