const mongoose = require('mongoose')
const { Schema } = mongoose
const projectModel = new Schema({
    title: {
        type: String,
        required: true
    },
    projectCreaterEmail: {
        type: String,
        ref: 'merchants'
    },
    createrId: {
        type: Schema.Types.ObjectId,
        ref: 'merchants'
    },
    description: {
        type: String,
        required: true
    },
    minPrice: {
        type: Number,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    attachments: {
        type: String,
        required: true
    }
})
const Project = mongoose.model('projects', projectModel)
module.exports = { Project }