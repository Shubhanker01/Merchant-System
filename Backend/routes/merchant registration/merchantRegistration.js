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

router.post('/verify', async (req, res) => {

    try {
        // verify
        let enteredPassword = req.body.password
        let email = req.body.email
        if (enteredPassword !== "") {
            let user = await TempPassword.findOne({ email: email })
            if (user) {
                if (user.expiresAt.getTime() > new Date().getTime()) {
                    if (user.password === enteredPassword) {
                        res.send("Email verified successfully")
                    }
                    else {
                        res.send("Incorrect password")
                    }
                }
                else {
                    res.send("Password expired")
                }
            }
        }
    }
    catch (error) {
        console.log(error.message)
    }
})

module.exports = router
