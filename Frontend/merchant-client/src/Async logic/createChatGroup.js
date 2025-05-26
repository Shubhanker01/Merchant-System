import axios from "axios";
import decodeToken from "../utils/decodeJwt";
import getCookie from "../utils/getCookie";
import { socket } from "../socket";

const createGroupChat = async (participants, groupName) => {
    try {
        let token = getCookie()
        let user = decodeToken(token)
        let participantsId = participants.map((user) => user.id)
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/chats/createchat`, {
            email: user.email,
            name: groupName,
            participants: participantsId
        })
        socket.emit('chat-room', participantsId)
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }

}

export const showGroupChat = async (id) => {
    try {
        let response = await axios.get(`${import.meta.env.VITE_PROD_SERVER}/api/chats/getchats/${id}`)
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }

}

export const addMembers = async (groupId, participants) => {
    try {
        let participantsId = participants.map((user) => user.id)
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/chats/addmembers`, {
            id: groupId,
            participants: participantsId
        })
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }

}

export const deleteGroup = async (groupId) => {
    try {
        let response = await axios.delete(`${import.meta.env.VITE_PROD_SERVER}/api/chats/deletegroup/${groupId}`)
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }

}

export const removeParticipant = async (id, groupId) => {
    try {
        let response = await axios.post(`${import.meta.env.VITE_PROD_SERVER}/api/chats/removeparticipant/${id}`, {
            groupId: groupId
        }
        )
        let data = await response.data
        return data
    } catch (error) {
        console.log(error)
    }

}

export default createGroupChat