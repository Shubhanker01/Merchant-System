const express = require('express')
const router = express.Router()

const { Merchant } = require('../../models/merchant.model')
const sendEmail = require('../../utils/sendEmail')

router.post('/registration', async (req, res) => {
    try {
        await Merchant.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isVerified: false,
        })
        let response = await sendEmail(req.body.email)
        console.log(response)
        res.json({ message: "Merchant registered successfully" })
    } catch (error) {
        console.log(error.message)
        if (error.code === 11000) {
            res.status(401).send("This email is already registered")
        }
    }
})

module.exports = router
