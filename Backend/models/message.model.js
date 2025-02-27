const mongoose = require('mongoose')
const { Schema } = mongoose

const messageModel = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groupChat'
    },
    message: {
        type: String,
        required: 'true'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant'
    },
}, {
    timestamps: true
})

const message = mongoose.model('message', messageModel)
module.exports = { message }