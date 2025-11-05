const mongoose = require('mongoose')
const { Schema } = mongoose

const projectBidsModel = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projects'
    },
    price: {
        type: Number,
        required: true
    },
    expectedDate: {
        type: Date,
        required: true
    },
    proposal: {
        type: String,
        required: true
    },
    bidderEmail: {
        type: String,
        ref: 'merchants'
    },
    bidderId: {
        type: Schema.Types.ObjectId,
        ref: 'merchants'
    }
})

const projectBids = mongoose.model('projectBids', projectBidsModel)
module.exports = { projectBids }