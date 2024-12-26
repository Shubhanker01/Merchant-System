const express = require('express')
const router = express.Router()
const {Merchant} = require('../../models/merchant.model')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        if(!email || !password){
            return res.status(401).send("Please fully enter your details")
        }
        else{
            let user = await Merchant.findOne({email:email})
            if(!user){
                return res.status(403).send("User not found")
            }
            let compare = bcrypt.compare(password,user.password)
            if(!compare){
                return res.status(403).send("Incorrect Password")
            }
            return res.status(200).send("Successfully logged in")
        }
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router