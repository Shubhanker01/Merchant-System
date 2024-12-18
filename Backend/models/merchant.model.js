const mongoose = require('mongoose')

const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:[8,"Your password should contain minimum of length 8"]
    }
})

export const Merchant = mongoose.model("merchant", merchantSchema)