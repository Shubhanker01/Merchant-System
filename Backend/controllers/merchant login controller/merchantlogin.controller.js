const { Merchant } = require('../../models/merchant.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/generateToken')

const merchantLogin = async (req, res) => {
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
                let token = generateToken(req.body.email, user.name)
                return res.status(200).send({ token: token, message: "User successfully logged in", userId: user._id, username: user.name })
            }
        }
    }
    catch (error) {
        console.log(error.message)
    }

}
module.exports = merchantLogin