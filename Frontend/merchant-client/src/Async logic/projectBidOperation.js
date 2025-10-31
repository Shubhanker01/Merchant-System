import axios from 'axios'

export const addBidToProject = async (formData, token) => {
    try {
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/v1/project/bids/add`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        let data = await response.data
        return data
    }
    catch (error) {
        console.log(error)
    }
}