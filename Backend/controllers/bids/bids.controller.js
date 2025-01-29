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
            bidderName: bidderName,
            title: title,
            price: price,
            openingDate: openingDate,
            closingDate: closingDate
        })

        res.send('Bid added successfully')
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

// controller to show all bids
const showAllBids = async (req, res) => {
    try {
        const bids = await Bids.find({})
        res.send(bids)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { addBid, showAllBids }