const { Merchant } = require('../../models/merchant.model')
const bcrypt = require('bcrypt')
const { TempPassword } = require('../../models/temppassword.model')
const sendEmail = require('../../utils/sendEmail')
const { generateToken } = require('../../utils/generateToken')


const resetPasswordInApp = async (req, res) => {
    try {
        let email = req.user.email
        let password = req.body.password
        let hashedPassword = await bcrypt.hash(password, 10)
        await Merchant.findOneAndUpdate({ email: email }, { password: hashedPassword })
        res.status(200).send("Password successfully reset")
    } catch (error) {
        console.log(error.message)
    }
}

const verifyEmailInForgotPasswordRoute = async (req, res) => {
    try {
        let email = req.body.email
        let user = await Merchant.findOne({ email: email })
        if (!user) return res.status(400).send('User not found')
        if (!user.isVerified) return res.status(400).send('User not verified')
        let token = await sendEmail(email, 'reset password')
        if (!token) return res.status(500).send('Internal server error')
        await TempPassword.create({
            email: email,
            password: token.password,
            createdAt: new Date(),
            expiresAt: new Date(new Date().getTime() + 5 * 60000)
        })
        let jsonToken = generateToken(email)
        return res.status(200).cookie('token', jsonToken, { sameSite: 'none', httpOnly: true, secure: true }).send('Email sent successfully')
    } catch (error) {
        console.log(error.message)
    }
}

const resetPasswordInForgotPasswordRoute = async (req, res) => {
    try {
        let emailToken = req.body.token
        let newPassword = req.body.newPassword
        let email = req.user.email

        let user = await TempPassword.findOne({ email: email })
        if (!user) return res.status(400).send('User not found')
        if (user.password !== emailToken) return res.status(400).send('Invalid token')
        if (user.expiresAt.getTime() < new Date().getTime()) return res.status(400).send('Your token has expired')
        let hashedPassword = await bcrypt.hash(newPassword, 10)
        await Merchant.findOneAndUpdate({ email: email }, { password: hashedPassword })
        await TempPassword.deleteOne({ email: email })
        return res.status(200).send('Password successfully reset')
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { resetPasswordInApp, verifyEmailInForgotPasswordRoute, resetPasswordInForgotPasswordRoute }