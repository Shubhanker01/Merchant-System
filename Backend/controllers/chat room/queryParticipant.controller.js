const { Merchant } = require('../../models/merchant.model')
const queryParticipant = async (req, res) => {
    try {
        let name = req.params.name
        let data = await Merchant.find({ name: name })
        let result = data.map((merchant) => {
            return { name: merchant.name, id: merchant._id, email: merchant.email }
        })
        return res.json(result)
    } catch (error) {
        console.log(error)
    }

}

module.exports = queryParticipant