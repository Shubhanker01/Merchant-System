const express = require('express')
const router = express.Router()
const { upload } = require('../../middlewares/multer')
const { authenticateToken } = require('../../middlewares/authenticateToken')

const { addBidToProject, hasPlacedBid } = require('../../controllers/projects/projectBids.controller')
router.route('/v1/projects/bids/add').post(authenticateToken, upload.single('proposal'), addBidToProject)

router.route('/v1/projects/bids/hasPlacedBid').get(hasPlacedBid)
module.exports = router