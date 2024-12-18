const mongoose = require('mongoose')

const bidsSchema = new mongoose.Schema({
    biddername: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "merchant"
    },
    title: {
        type: String,
        min: [6, "Minimum length of title should be 6"]
    },
    price: {
        type: String,
        required: true
    },
    openingDate: {
        type: Date,
        required: true
    },
    closingDate: {
        type: Date,
        required: true
    }
})

export const Bids = mongoose.model('bids', bidsSchema)