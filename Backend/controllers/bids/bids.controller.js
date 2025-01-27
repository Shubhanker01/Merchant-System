// controller to add a bid

const { Bids } = require('../../models/bids.model')

const addBid = async (req, res) => {
    try {
        const bidderName = req.body.bidderName
        const title = req.body.title
        const price = req.body.price
        const openingDate = new Date(req.body.openingDate)
        const closingDate = new Date(req.body.closingDate)

        await Bids.create({
            biddername: bidderName,
            title: title,
            price: price,
            openingDate: openingDate,
            closingDate: closingDate
        })

        res.send('Bid added successfully')
    } catch (error) {
        console.log(error)
    }
}


module.exports = { addBid }