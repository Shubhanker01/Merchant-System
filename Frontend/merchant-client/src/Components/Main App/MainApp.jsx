import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
import { toast } from 'react-toastify'
import { bidsSocket } from '../../socket'

function MainApp() {
    const [bids, setBids] = useState([])
    useEffect(() => {
        // socket.connect()
        bidsSocket.connect()
        // socket.on('connect', () => {
        //     console.log(`${socket.id} is connected`)
        // })
        return () => {
            // socket.disconnect()
            bidsSocket.disconnect()
        }
    }, [])
    useEffect(() => {
        function receiveBids(arg) {
            setBids(arg)
        }
        function receiveEventForCreation(arg) {
            toast.info(arg)
        }
        bidsSocket.on('read-bids', receiveBids)
        bidsSocket.on('success-creation-bids', receiveEventForCreation)
        // socket.on('read-bids', receiveBids)
        // socket.on("msg", (arg) => {
        //     toast.info(arg)
        //     console.log(arg)
        // })
        // socket.on('bidadded', (arg) => {
        //     toast.info(arg)
        // })
        return () => {
            // socket.off('read-bids', receiveBids)
            // socket.off('msg', () => {
            //     console.log('disconnected')
            // })
            bidsSocket.off('read-bids', receiveBids)
        }

    }, [])
    return (
        <div>
            <NavbarApp />
            <BidsTable bids={bids} />
            <AddBid />
        </div>
    )
}

export default MainApp