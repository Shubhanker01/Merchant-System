// routes for project notifications
const express = require('express')
const router = express.Router()

const { createNotification, readNotifications, showNotificationCount, markNotificationAsRead, getBiddersOfProject } = require('../../controllers/projects/projectNotification.controller')

router.route('/notify/:projectId/:bidderId/:recipientId').post(createNotification)
router.route('/read/:recipientId').get(readNotifications)
router.route('/count/:userId').get(showNotificationCount)
router.route('/mark/:userId').post(markNotificationAsRead)
// router.route('/bids/:projectId').get(getBiddersOfProject)

module.exports = router