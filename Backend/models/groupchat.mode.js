const mongoose = require('mongoose')
const { Schema } = mongoose

const groupChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Merchant',
            unique: true
        }
    ],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant'
    }
})

const groupChat = mongoose.model('groupchat', groupChatSchema)
module.exports = { groupChat }