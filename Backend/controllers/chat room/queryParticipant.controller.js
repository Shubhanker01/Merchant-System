const { Merchant } = require('../../models/merchant.model')
const queryParticipant = async (req, res) => {
    try {
        let name = req.params.name
        let data = await Merchant.findOne({ name: name })
        if (data) {
            return res.send({ name: data.name, id: data._id })
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = queryParticipant