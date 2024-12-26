const express = require('express')
const router = express.Router()
const {Merchant} = require('../../models/merchant.model')

router.post('/forgotpassword', async (req, res) => {
    try {
        let email = req.body.email
        let user = await Merchant.findOne({email:email})
        
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = router

