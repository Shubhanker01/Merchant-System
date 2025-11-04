// a model for project notification
const mongoose = require('mongoose')
const { Schema } = mongoose

const projectNotificationModel = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true
    },
    recipientId: {
        type: Schema.Types.ObjectId,
        ref: 'merchants',
        required: true
    },
    bidderId: {
        type: Schema.Types.ObjectId,
        ref: 'merchants',
        required: true
    },
    bidderName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

}, {
    timestamps: true
})

const notificationModel = mongoose.model('project-notification', projectNotificationModel)

module.exports = notificationModel