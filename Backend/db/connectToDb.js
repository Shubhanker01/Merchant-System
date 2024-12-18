const mongoose = require('mongoose')
require('dotenv').config()

const connectToMongo = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch (error) {
        console.log('Error: ',error)
    }
}