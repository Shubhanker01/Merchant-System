import { io } from 'socket.io-client'

const URL = `${import.meta.env.VITE_PROD_SERVER}`

export const socket = io(URL, {
    autoConnect: false
})

export const bidsSocket = io(`${URL}/bids`, {
    autoConnect: false
})

export const userSocket = io(`${URL}/users`, {
    autoConnect: false
})