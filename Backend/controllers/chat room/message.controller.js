const { emitSocketEvent } = require('../../socket/main')
const { Message } = require('../../models/message.model')
const sendMessage = async (req, res) => {
    try {
        let message = req.body.message
        let groupName = req.body.name
        // emitSocketEvent(req, groupName, "message", message)
        res.send("Message successfully send")
    } catch (error) {
        console.log(error)
    }
}

const getOldMessages = async (req, res) => {
    try {
        let { groupName } = req.params
        let messages = await Message.find({ groupName: groupName }).sort({ timestamp: -1 })
        return res.send(messages)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendMessage, getOldMessages }