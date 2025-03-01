// route to query user
const queryParticipant = require('../../controllers/chat room/queryParticipant.controller')
const express = require('express')
const router = express.Router()

router.route('/query/:name').get(queryParticipant)
module.exports = router
