const { emitSocketEvent } = require('../../socket/main')
const sendMessage = async (req, res) => {
    try {
        let message = req.body.message
        

        res.send("Message successfully send")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendMessage }