const mongoose = require('mongoose')

const bidsSchema = new mongoose.Schema({
    bidderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "merchant"
    },
    title: {
        type: String,
        minLength: [5, 'Title should be atleast 5 characters long'],
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

const Bids = mongoose.model('bids', bidsSchema)
module.exports = { Bids }