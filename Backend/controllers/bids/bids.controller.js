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
        if (closingDate < openingDate) {
            return res.status(400).send("Opening Date should be less than closing date")
        }
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
// pagination implement
const showAllBids = async () => {
    try {
        // let pageSize = 10
        let result = [];
        const bids = await Bids.find({}).sort({ createdAt: 'desc' }).exec()
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
        // const bids = await Bids.aggregate([
        //     {
        //         $facet: {
        //             noOfBids: [{ $count: 'totalCount' }],
        //             data: [
        //                 {
        //                     $skip: (pageNo - 1) * pageSize
        //                 },
        //                 {
        //                     $limit: pageSize
        //                 }
        //             ]
        //         }
        //     }
        // ]

        // )
        return result

    } catch (error) {
        console.log(error)
    }
}

// pagination implement
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

const deleteBid = async (req, res) => {
    try {
        let { id } = req.params
        await Bids.findOneAndDelete({ _id: id })
        return res.send("Successfully deleted")
    } catch (error) {
        console.log(error)
    }
}

const updateBid = async (req, res) => {
    try {
        let { id } = req.params
        let { title, price, closingDate } = req.body
        let bids = await Bids.findOne({ _id: id })
        if (!bids) return res.status(400).send("Bid not found")
        if (closingDate && bids.openingDate > new Date(closingDate)) {
            return res.status(400).send("Your closing date should not be less than opening date")
        }
        bids.title = title || bids.title
        bids.price = price || bids.price
        bids.closingDate = new Date(closingDate) || bids.closingDate
        await bids.save()
        return res.send("Your Bid is successfully updated!!!")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = { addBid, showAllBids, showUserBids, deleteBid, updateBid }