const express = require('express')
const router = express.Router()

const { addBid, showAllBids } = require('../../controllers/bids/bids.controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

router.route('/v1/addbid').post(authenticateToken, addBid)
// router.route('/v1/showallbids').get(showAllBids)

module.exports = router