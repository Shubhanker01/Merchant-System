import axios from "axios";

export const deleteBidAsync = async (id) => {
    try {
        let res = await axios.delete(`${import.meta.env.VITE_PROD_SERVER}/api/bids/v1/delete/${id}`)
        let data = await res.data
        return data
    } catch (error) {
        console.log(error)
    }
}