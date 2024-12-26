const express = require('express')
const { authenticateToken } = require('../../middlewares/authenticateToken')
const router = express.Router()
const { Merchant } = require('../../models/merchant.model')
const bcrypt = require('bcrypt')

router.post('/reset', authenticateToken, async (req, res) => {
    try {
        let email = req.user.email
        let password = req.body.password
        let hashedPassword = await bcrypt.hash(password, 10)
        await Merchant.findOneAndUpdate({ email: email }, { password: hashedPassword })
        res.status(200).send("Password successfully reset")
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router