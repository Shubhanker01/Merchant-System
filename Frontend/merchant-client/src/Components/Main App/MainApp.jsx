import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
import { toast } from 'react-toastify'
import { socket } from '../../socket'

function MainApp() {
    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    }, [])
    useEffect(() => {
        socket.on("msg", (arg) => {
            toast.info(arg)
            console.log(arg)
        })
        socket.on('bidadded', (arg) => {
            toast.info(arg)
        })
        return () => {
            socket.off('msg', () => {
                console.log('disconnected')
            })
        }

    }, [])
    return (
        <div>
            <NavbarApp />
            <BidsTable />
            <AddBid />
        </div>
    )
}

export default MainApp