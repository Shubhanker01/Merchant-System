import axios from 'axios'
import { toast } from 'react-toastify'

export const addProject = async (formData, token) => {
    try {
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/v1/projects/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        let data = await response.data
        toast.success(data.message, { position: 'top-center' })
        return { success: true, project: data.project }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data, { position: 'top-center' })
        return
    }
}

export const displayProjects = async () => {
    try {
        let response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/v1/projects/display`)
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }
}