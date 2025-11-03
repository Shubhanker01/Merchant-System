import axios from 'axios'
import { loadingWrapper } from '../utils/loadingWrapper'
import { updateWrapper } from '../utils/updateWrapper'

export const addBidToProject = async (formData, token) => {
    const toastId = loadingWrapper()
    try {
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/v1/projects/bids/add`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        updateWrapper(toastId, 'success', 'Bid placed successfully!')
        let data = await response.data
        return data
    }
    catch (error) {
        console.log(error)
        updateWrapper(toastId, 'error', error.response?.data?.message || 'Failed to place bid.')
        return null
    }
}

export const checkIfBidPlaced = async (projectId, bidderEmail) => {
    try {
        let response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/v1/projects/bids/hasPlacedBid`, {
            projectId: projectId,
            bidderEmail: bidderEmail
        })
        let data = await response.data
        return data.placedBid
    } catch (error) {
        console.log(error)
    }
}

