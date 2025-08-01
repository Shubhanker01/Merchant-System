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
// implement time based pagination
const showAllBids = async ({ nextQuery, prevQuery }) => {
    try {
        // let pageSize = 10
        let result = []
        // look for both previous query or next query if both queries are null then fetch only the first data according to page size
        let previousQuery = prevQuery == "" ? null : prevQuery
        let nextquery = nextQuery == "" ? null : nextQuery
        let query = {}
        if (previousQuery) {
            query = { createdAt: { $gt: new Date(previousQuery) } }
        }
        if (nextquery) {
            query = { createdAt: { $lt: new Date(nextquery) } }
        }
        const bids = await Bids.find(query).sort({ createdAt: 'desc' }).limit(2).exec()
        if (bids.length !== 0) {
            bids.map((bid) => {
                result.push({
                    id: bid._id,
                    bidderName: bid.bidderName,
                    title: bid.title,
                    price: bid.price,
                    openingDate: convertDateToString(bid.openingDate),
                    closingDate: convertDateToString(bid.closingDate),
                    createdAt: bid.createdAt
                })
            })
        }
        if (result.length == 0) {
            return { results: [], nextPage: "", prevPage: "" }
        }
        return { results: result, nextPage: result[result.length - 1].createdAt, prevPage: result[0].createdAt }

    } catch (error) {
        console.log(error)
    }
}

// pagination implement for individual user bids
// index based pagination
const showUserBids = async (bidderName, currPage) => {
    try {
        let currentPage = currPage
        let itemsPerPage = 2
        let skipAmt = (currentPage - 1) * itemsPerPage
        let result = []
        let total = await Bids.countDocuments({ bidderName: bidderName })
        let bids = await Bids.find({ bidderName: bidderName }).sort({ createdAt: 'desc' }).skip(skipAmt).limit(itemsPerPage)
        bids.map((bid) => {
            result.push({
                id: bid._id,
                title: bid.title,
                price: bid.price,
                openingDate: convertDateToString(bid.openingDate),
                closingDate: convertDateToString(bid.closingDate)
            })
        })
        return { results: result, totalPages: total }
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

// query for bids
const queryBids = async (req, res) => {
    try {
        let results = []
        let searchValue = req.query.search
        let name = req.query.name
        // find bids by both biddername and title
        let bids = await Bids.find({ bidderName: name, title: { $regex: '^' + searchValue, $options: 'i' } })
        bids.map((bid) => {
            results.push({
                id: bid._id,
                title: bid.title,
                price: bid.price,
                openingDate: convertDateToString(bid.openingDate),
                closingDate: convertDateToString(bid.closingDate)
            })
        })

        return res.send(results)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { addBid, showAllBids, showUserBids, deleteBid, updateBid, queryBids }