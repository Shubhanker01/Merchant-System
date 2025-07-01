import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
import { toast } from 'react-toastify'
import { bidsSocket } from '../../socket'

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
            toast.info(arg)
        }
        function receiveEventForDeletion(arg) {
            toast.info(arg)
        }
        bidsSocket.on('read-bids', receiveBids)
        bidsSocket.on('success-creation-bids', receiveEventForCreation)
        bidsSocket.on('on-delete', receiveEventForDeletion)
        return () => {
            bidsSocket.off('read-bids', receiveBids)
            bidsSocket.off('success-creation-bids', receiveEventForCreation)
            bidsSocket.off('on-delete', receiveEventForDeletion)
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