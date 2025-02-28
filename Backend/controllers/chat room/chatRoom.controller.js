const { groupChat } = require('../../models/groupchat.mode')
const { Merchant } = require('../../models/merchant.model')
// create a new group chat
const createGroupChat = async (req, res) => {
    try {
        let email = req.body.email
        let name = req.body.name
        let admin = await Merchant.findOne({ email: email })
        await groupChat.create({
            name: name,
            admin: admin._id
        })
        res.send("Group successfully created")
    } catch (error) {
        console.log(error)
    }
}
// add participants
// delete chat group


module.exports = {createGroupChat}

