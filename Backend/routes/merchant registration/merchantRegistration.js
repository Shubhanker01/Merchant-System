const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Merchant } = require('../../models/merchant.model')
const sendEmail = require('../../utils/sendEmail')
const { TempPassword } = require('../../models/temppassword.model')
const { limiter } = require('../../utils/rateLimiter')
const { generateToken } = require('../../utils/generateToken')
const { authenticateToken } = require('../../middlewares/authenticateToken')

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

router.post('/verify', limiter, async (req, res) => {
    try {
        // verify
        let enteredPassword = req.body.password
        let email = req.body.email

        // check if password is empty
        if (enteredPassword === "" || email === "") {
            res.status(400).send("Password cannot be empty or email cannot be empty")
        }
        else {
            let user = await TempPassword.findOne({ email: email })
            if (!user) {
                res.status(404).send("Email not found")
            }
            else if (user.password !== enteredPassword) {
                res.status(401).send("Incorrect password")
            }
            else if (user.expiresAt.getTime() < new Date().getTime()) {
                await TempPassword.deleteOne({ email: email })
                await Merchant.deleteOne({ email: email })
                res.status(401).send("Password expired , go back to registration page")
            }
            else {
                await TempPassword.deleteOne({ email: email })
                await Merchant.findOneAndUpdate({ email: email }, { isVerified: true })
                let token = generateToken(email)
                console.log(token)
                res.status(200).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', domain:'http://localhost:8000' })
                .send("User verified successfully")
            }
        }
    }
    catch (error) {
        console.log(error.message)
    }
})

router.post('/setpassword', authenticateToken, async (req, res) => {
    try {
        let email = req.user.email
        if (email == undefined) {
            return res.status(400).send("Something went wrong")
        }
        let password = req.body.password
        let hashedPassword = await bcrypt.hash(password, 10)
        if (!password) {
            return res.status(400).send("Password cannot be empty")
        }
        else {
            await Merchant.findOneAndUpdate({ email: email }, { password: hashedPassword })
            return res.send("Password set successfully")
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
