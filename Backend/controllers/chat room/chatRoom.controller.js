const { groupChat } = require('../../models/groupchat.mode')
const { Merchant } = require('../../models/merchant.model')
const mongoose = require('mongoose')
// create a new group chat
const createGroupChat = async (req, res) => {
    try {
        let email = req.body.email
        let name = req.body.name
        let admin = await Merchant.findOne({ email: email })
        if (!admin) {
            return res.status(400).send("Some error occured")
        }
        await groupChat.create({
            name: name,
            admin: admin._id,
            participants: admin._id
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


module.exports = { createGroupChat, addParticipants }

