import axios from "axios";
import decodeToken from "../utils/decodeJwt";
import getCookie from "../utils/getCookie";

const createGroupChat = async (participants, groupName) => {
    let token = getCookie()
    let user = decodeToken(token)
    let participantsId = participants.map((user) => user.id)
    let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/chats/createchat`, {
        email: user.email,
        name: groupName,
        participants: participantsId
    })
    let data = await response.data
    return data
}

export const showGroupChat = async (id) => {
    let response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/chats/getchats/${id}`)
    let data = await response.data
    return data
}

export const addMembers = async (groupId, participants) => {
    let participantsId = participants.map((user) => user.id)
    let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/chats/addmembers`, {
        id: groupId,
        participants: participantsId
    })
    let data = await response.data
    return data
}

export const deleteGroup = async (groupId) => {
    let response = await axios.delete(`${import.meta.env.VITE_PROD_SERVER}/api/deletegroup`, {
        data: {
            id: groupId
        }
    })
    let data = await response.data
    return data
}

export default createGroupChat