const express = require('express')
const router = express.Router()

const { addBid, showAllBids } = require('../../controllers/bids/bids.controller')

router.route('/v1/addbid').post(addBid)
router.route('/v1/showallbids').get(showAllBids)

module.exports = router