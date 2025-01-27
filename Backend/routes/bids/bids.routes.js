const express = require('express')
const router = express.Router()

const { addBid } = require('../../controllers/bids/bids.controller')

router.route('/v1/addbid').post(addBid)

module.exports = router