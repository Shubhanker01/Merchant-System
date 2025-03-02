import axios from "axios";

const queryUser = async (query) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/query/${query}`)
        const data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export default queryUser