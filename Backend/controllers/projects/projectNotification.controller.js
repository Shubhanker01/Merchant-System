// controller for project notifications
const ProjectNotifications = require('../../models/projectnotification.model')

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

module.exports = { createNotification }