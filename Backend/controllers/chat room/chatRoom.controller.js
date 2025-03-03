const { groupChat } = require('../../models/groupchat.mode')
const { Merchant } = require('../../models/merchant.model')

// create a new group chat
const createGroupChat = async (req, res) => {
    try {
        let email = req.body.email
        let name = req.body.name
        let participants = req.body.participants
        let admin = await Merchant.findOne({ email: email })
        if (!admin) {
            return res.status(400).send("Some error occured")
        }
        await groupChat.create({
            name: name,
            admin: admin._id,
            participants: [admin._id, ...participants]
        })
        return res.send("Group successfully created")
    } catch (error) {
        console.log(error)
    }
}
// add participants
const addParticipants = async (req, res) => {
    try {
        // only admin can add participants
        let participant = req.body.participants
        let id = req.body.id
        let chat = await groupChat.findOne({ _id: id })
        if (!chat) {
            return res.status(400).send("Error Chat not found")
        }
        chat.participants.push(...participant)
        await chat.save()
        return res.send("Successfully added participants")
    } catch (error) {
        console.log(error)
    }
}

// delete chat group
const deleteGroupChat = async (req, res) => {
    try {
        let id = req.body.id
        let chat = await groupChat.findOne({ _id: id })
        if (!chat) {
            return res.status(400).send("Cannot find group chat")
        }
        await groupChat.findByIdAndDelete(id)
        return res.send("Group successfully deleted")
    } catch (error) {
        console.log(error)
    }
}


module.exports = { createGroupChat, addParticipants, deleteGroupChat }

