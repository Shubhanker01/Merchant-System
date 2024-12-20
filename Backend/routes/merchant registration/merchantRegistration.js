const express = require('express')
const router = express.Router()

const { Merchant } = require('../../models/merchant.model')

router.post('/registration', async (req, res) => {
    try {
        await Merchant.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isVerified: false,
        })
        res.json({ message: "Merchant registered successfully" })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
