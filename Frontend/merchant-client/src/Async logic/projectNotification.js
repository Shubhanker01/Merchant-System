// connect to project notification routes

import axios from 'axios'

export const sendProjectNotification = async (details) => {
    try {
        const { projectId, bidderId, recipientId, message, price, bidderName } = details
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/project/notifications/notify/${projectId}/${bidderId}/${recipientId}`, {
            message: message,
            price: price,
            bidderName: bidderName
        })
        let data = await response.data
        return data
    }
    catch (error) {
        console.log(error)
    }
}