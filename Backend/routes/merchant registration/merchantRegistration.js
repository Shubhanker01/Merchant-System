const express = require('express')
const router = express.Router()

const { Merchant } = require('../../models/merchant.model')
const sendEmail = require('../../utils/sendEmail')
const { TempPassword } = require('../../models/temppassword.model')
router.post('/registration', async (req, res) => {
    try {
        await Merchant.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isVerified: false,
        })
        let response = await sendEmail(req.body.email)
        if (response) {
            await TempPassword.create({
                password: response.password,
                email: req.body.email,
                createdAt: new Date(),
                expiresAt: new Date(new Date().getTime() + 5 * 60000)
            })
            res.status(200).send("Email sent successfully")
        }

    } catch (error) {
        console.log(error.message)
        if (error.code === 11000) {
            res.status(401).send("This email is already registered")
        }
    }
})

router.post('/verify', async (req, res)=> {
    // let numberofAttemps = 0
    try {
        // verify
        
    }
    catch (error) {
        console.log(error.message)
    }
})

module.exports = router
