const mongoose = require('mongoose')
const { Schema } = mongoose

const TempPasswordSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

const TempPassword = mongoose.model('temppassword', TempPasswordSchema)
module.exports = TempPassword