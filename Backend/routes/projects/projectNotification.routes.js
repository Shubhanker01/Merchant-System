// routes for project notifications
const express = require('express')
const router = express.Router()

const { createNotification } = require('../../controllers/projects/projectNotification.controller')

router.route('/notify/:projectId/:bidderId/:recipientId').post(createNotification)

module.exports = router