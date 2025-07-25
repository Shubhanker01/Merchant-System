const express = require('express')
const router = express.Router()

const { addBid, showUserBids, deleteBid, updateBid, queryBids } = require('../../controllers/bids/bids.controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

router.route('/v1/addbid').post(authenticateToken, addBid)
// router.route('/v1/showallbids').get(showAllBids)
router.route('/v1/user/showbids').get(showUserBids)
router.route('/v1/delete/:id').delete(deleteBid)
router.route('/v1/update/:id').put(updateBid)
router.route('/v1/searchbids').get(queryBids)

module.exports = router