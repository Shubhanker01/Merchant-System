import { io } from 'socket.io-client'

const URL = `${import.meta.env.VITE_PROD_SERVER}`

export const bidsSocket = io(`${URL}/bids`, {
    autoConnect: false
})

export const userSocket = io(`${URL}/users`, {
    autoConnect: false
})

// export const projectSocket = io(`${URL}/projects`, {
//     autoConnect: false
// })