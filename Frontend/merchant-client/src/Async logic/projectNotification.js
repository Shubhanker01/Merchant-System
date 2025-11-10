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

export const readProjectNotifications = async (userId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/project/notifications/read/${userId}`)
        const data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getNotificationCount = async (userId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/project/notifications/count/${userId}`)
        const data = await response.data
        return data
    }
    catch (error) {
        console.log(error)
    }
}

export const markNotificationRead = async (userId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/project/notifications/mark/${userId}`)
        const data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }
}