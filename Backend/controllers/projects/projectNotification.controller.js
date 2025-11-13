// controller for project notifications
const ProjectNotifications = require('../../models/projectnotification.model')
const { Merchant } = require('../../models/merchant.model')
const { projectBids } = require('../../models/projectBids.model')

const createNotification = async (req, res) => {
    try {
        const { projectId, bidderId, recipientId } = req.params
        const { message, price, bidderName } = req.body
        if (![projectId, bidderId, recipientId, message, price, bidderName].every(Boolean)) {
            return res.status(400).send("All fields are required")
        }
        const newNotification = await ProjectNotifications.create({
            projectId: projectId,
            recipientId: recipientId,
            bidderId: bidderId,
            bidderName: bidderName,
            message: message,
            price: price,
            isRead: false,
        })
        if (!newNotification) {
            return res.status(500).send("Some error occcured")
        }
        return res.status(201).json({ notification: newNotification })

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

// read creater notifications
const readNotifications = async (req, res) => {
    try {
        const { recipientId } = req.params
        const notifications = await ProjectNotifications.find({ recipientId: recipientId }).sort({ createdAt: -1 })
        return res.status(200).json({ notifications: notifications })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

// show notification count for a user
const showNotificationCount = async (req, res) => {
    try {
        const { userId } = req.params
        const count = await ProjectNotifications.countDocuments({ recipientId: userId, isRead: false })
        const notificationCount = await Merchant.findByIdAndUpdate(userId, {
            $set: { notificationCount: count }
        })
        return res.status(200).json({ notificationCount: notificationCount.notificationCount })
    } catch (error) {
        console.log(error)
    }
}

const showNotificationCountSocketStyle = async (userId) => {
    try {
        const count = await ProjectNotifications.countDocuments({ recipientId: userId, isRead: false })
        const notificationCount = await Merchant.findByIdAndUpdate(userId, {
            $set: { notificationCount: count }
        })
        return notificationCount.notificationCount
    } catch (error) {
        console.log(error)
    }
}

// mark notifications as read 
const markNotificationAsRead = async (req, res) => {
    try {
        const { userId } = req.params
        // update project notifications
        await ProjectNotifications.updateMany({ recipientId: userId, isRead: false }, {
            $set: { isRead: true }
        })
        // update notification count to zero
        await Merchant.findByIdAndUpdate(userId, {
            $set: { notificationCount: 0 }
        })
        return res.status(200).json({ message: "All notifications mark as read" })
    } catch (error) {
        console.log(error)
    }
}


const getBiddersOfProject = async (req, res) => {
    try {
        let { projectId } = req.params
        let bidders = []
        let bids = await projectBids.find({ projectId: projectId })
        for (const bid of bids) {
            bidders.push(bid.bidderId)
        }
        return res.json(bidders)

    } catch (error) {
        console.log(error)
    }
}

const notifyBidders = async (io, projectId) => {
    const bids = await projectBids.find({ projectId: projectId })
    const bidderIds = bids.map(bid => bid.bidderId)

    for (const id of bidderIds) {
        io.to(id).emit('new-bid-added', {
            message: `A new bid has been added in the project in which your bid is added.`
        })
    }
}

module.exports = { createNotification, readNotifications, showNotificationCount, markNotificationAsRead, showNotificationCountSocketStyle, notifyBidders }