import axios from 'axios'
import { toast } from 'react-toastify'

export const addProject = async (formData) => {
    try {
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/v1/projects/add`, formData)
        let data = await response.data
        toast.promise(response, { pending: "Wait your project proposal is being submitted" }, { position: 'top-center' })
        return data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data, { position: 'top-center' })
        return
    }
}