import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
import io from 'socket.io-client'
import { toast } from 'react-toastify'

const socket = io('http://localhost:8000')
socket.on('msg', (arg) => {
    console.log(arg)
    toast.info(arg)
})

function MainApp() {
    const [message, setMessage] = useState('')
    // useEffect(() => {
    //     socket.on("msg", (arg) => {
    //         console.log(arg)
    //     })
    // })
    return (
        <div>
            <NavbarApp />
            <BidsTable />
            <AddBid />
        </div>
    )
}

export default MainApp