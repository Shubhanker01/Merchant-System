import axios from 'axios'
import { toast } from 'react-toastify'

export const addBidToProject = async (formData, token) => {
    const toastId = toast.loading("Placing your bid...", { position: 'top-center' })
    try {
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/v1/projects/bids/add`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        toast.update(toastId, { render: "Bid placed successfully!", type: "success", isLoading: false, autoClose: 3000, position: 'top-center' })
        let data = await response.data
        return data
    }
    catch (error) {
        console.log(error)
        toast.update(toastId, {
            render: error.response?.data.message || "Failed to place bid!", type: "error", isLoading: false, autoClose: 3000, position: 'top-center'
        })
        return null
    }
}