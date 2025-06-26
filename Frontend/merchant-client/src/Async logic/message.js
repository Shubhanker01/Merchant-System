import axios from "axios";

export const sendMessage = async (groupName, message) => {
    try {
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/message/sendmessage`, {
            groupName: groupName,
            message: message
        })
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getOldMessages = async (groupName) => {
    try {
        let response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/message/getmessages/${groupName}`)
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }
}

