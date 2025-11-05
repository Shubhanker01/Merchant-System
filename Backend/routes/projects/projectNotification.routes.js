// routes for project notifications
const express = require('express')
const router = express.Router()

const { createNotification, readNotifications } = require('../../controllers/projects/projectNotification.controller')

router.route('/notify/:projectId/:bidderId/:recipientId').post(createNotification)

router.route('/read/:recipientId').get(readNotifications)
module.exports = router