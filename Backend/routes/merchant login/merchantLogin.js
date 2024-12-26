const express = require('express')
const router = express.Router()
const { Merchant } = require('../../models/merchant.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/generateToken')
const { limiter } = require('../../utils/rateLimiter')

router.post('/login', limiter, async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        if (!email || !password) {
            return res.status(401).send("Please fully enter your details")
        }
        else {
            let user = await Merchant.findOne({ email: email })
            if (!user) {
                return res.status(404).send("User not found")
            }
            let compare = await bcrypt.compare(password, user.password)
            if (!compare) {
                return res.status(401).send("Incorrect Password")
            }
            else {
                let token = generateToken(req.body.email)
                return res.status(200).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', }).send("Successfully logged in")
            }

        }
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router