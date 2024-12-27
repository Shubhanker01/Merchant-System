require('dotenv').config()
const nodemailer = require('nodemailer')
const generatePassword = require('./generatePassword')

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const sendEmail = async (recepient, type) => {
    try {
        let temporaryPassword = generatePassword()
        const sendPassword = await transporter.sendMail({
            from: process.env.EMAIL,
            to: recepient,
            subject: `Enter the below OTP to ${type}`,
            text: temporaryPassword
        })
        return { password: temporaryPassword, id: sendPassword.messageId }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = sendEmail