const mongoose = require('mongoose')
const { Schema } = mongoose

const messageModel = new Schema({
    groupName: {
        type: String,
        ref: 'groupchats'
    },
    message: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'merchants'
    }
}, {
    timestamps: true
})

const Message = mongoose.model('message', messageModel)
module.exports = { Message }