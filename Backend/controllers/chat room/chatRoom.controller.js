const { groupChat } = require('../../models/groupchat.mode')
const { Merchant } = require('../../models/merchant.model')
const mongoose = require('mongoose')

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
        let id = req.params.groupId
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

// show group that the user is part of
const showGroups = async (req, res) => {
    try {
        let id = req.params.id
        let groups = await groupChat.aggregate([
            // only give the chat in which the user is part of
            {
                $match: {
                    participants: { $elemMatch: { $eq: new mongoose.Types.ObjectId(`${id}`) } }
                }
            },
            // join two collection merchant through participants
            {
                $lookup: {
                    from: 'merchants',
                    localField: 'participants',
                    foreignField: '_id',
                    as: 'members'
                }
            },
            // filter in only name and email from foreign field
            {
                $project: {
                    _id: 1,
                    name: 1,
                    admin: 1,
                    members: {
                        name: 1,
                        email: 1,
                        _id: 1
                    }
                }
            }
        ])
        res.json(groups)
    } catch (error) {
        console.log(error)
    }
}

// remove particular participant from group
const removeParticipant = async (req, res) => {
    try {
        let id = req.params.id
        let groupId = req.body.groupId
        // find group
        let group = await groupChat.findOne({ _id: groupId })
        if (!group) {
            return res.status(400).send("Cannot find group")
        }
        let index = group.participants.indexOf(id)
        if (index == -1) {
            return res.status(400).send("Cannot find participant")
        }
        group.participants.splice(index, 1)
        await group.save()
        return res.send("participant successfully removed")

    } catch (error) {
        console.log(error)
    }
}

// creating room for chats


module.exports = { createGroupChat, addParticipants, deleteGroupChat, showGroups, removeParticipant }

