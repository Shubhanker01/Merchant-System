const express = require('express')
const router = express.Router()

const { addBid, showAllBids, showUserBids } = require('../../controllers/bids/bids.controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

router.route('/v1/addbid').post(authenticateToken, addBid)
// router.route('/v1/showallbids').get(showAllBids)
router.route('/v1/user/showbids').get(showUserBids)

module.exports = router