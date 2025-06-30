// controller to add a bid

const { Bids } = require('../../models/bids.model')
const convertDateToString = require('../../utils/dateToString')

const addBid = async (req, res) => {
    try {
        const bidderName = req.user.name
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
        req.io.emit('bidadded', `Bid has been added by ${bidderName}`)
        res.send('Bid added successfully')
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

// controller to show all bids
const showAllBids = async (req, res) => {
    try {
        let result = [];
        const bids = await Bids.find({})
        if (bids.length !== 0) {
            bids.map((bid) => {
                result.push({
                    id: bid._id,
                    bidderName: bid.bidderName,
                    title: bid.title,
                    price: bid.price,
                    openingDate: convertDateToString(bid.openingDate),
                    closingDate: convertDateToString(bid.closingDate)
                })
            })
        }
        // res.send(result)
        return result

    } catch (error) {
        console.log(error)
    }
}

const showUserBids = async (bidderName) => {
    try {
        let result = []
        let bids = await Bids.find({ bidderName: bidderName })
        bids.map((bid) => {
            result.push({
                id: bid._id,
                title: bid.title,
                price: bid.price,
                openingDate: convertDateToString(bid.openingDate),
                closingDate: convertDateToString(bid.closingDate)
            })
        })
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = { addBid, showAllBids, showUserBids }