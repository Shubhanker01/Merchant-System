const mongoose = require('mongoose')

const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: null,
        min: [8, "Your password should contain minimum of length 8"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    notificationCount: {
        type: Number,
        default: 0
    }
})

const Merchant = mongoose.model("merchant", merchantSchema)
module.exports = { Merchant }