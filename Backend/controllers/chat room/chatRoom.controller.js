
const chatRoom = async (req, res) => {
    let msg = req.message
    req.io.on('connection', (socket) => {
        socket.join('chat room')
        req.io.to('chat room').emit('chat', msg)
    })
}

module.exports = { chatRoom }

