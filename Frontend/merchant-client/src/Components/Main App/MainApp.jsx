import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
import { toast } from 'react-toastify'
import { bidsSocket } from '../../socket'
import Pagination from '../Footer/Pagination'

function MainApp() {
    const [bids, setBids] = useState([])
    useEffect(() => {
        bidsSocket.connect()
        return () => {
            bidsSocket.disconnect()
        }
    }, [])
    useEffect(() => {
        function receiveBids(arg) {
            setBids(arg)
        }
        function receiveEventForCreation(arg) {
            toast.info(arg, { theme: 'dark' })
        }
        function receiveEventForDeletion(arg) {
            toast.info(arg, { theme: 'dark' })
        }
        function receiveEventForUpdation(arg) {
            toast.info(arg, { theme: 'dark' })
        }
        bidsSocket.on('read-bids', receiveBids)
        bidsSocket.on('success-creation-bids', receiveEventForCreation)
        bidsSocket.on('on-delete', receiveEventForDeletion)
        bidsSocket.on('on-updation', receiveEventForUpdation)
        return () => {
            bidsSocket.off('read-bids', receiveBids)
            bidsSocket.off('success-creation-bids', receiveEventForCreation)
            bidsSocket.off('on-delete', receiveEventForDeletion)
            bidsSocket.off('on-updation', receiveEventForUpdation)
        }

    }, [])
    return (
        <div>
            <NavbarApp />
            <BidsTable bids={bids} />
            <AddBid />
            <Pagination />
        </div>
    )
}

export default MainApp