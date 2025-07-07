import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
import { toast } from 'react-toastify'
import { bidsSocket } from '../../socket'
import Pagination from '../Footer/Pagination'

function MainApp() {
    const pageLimit = 2
    const [bids, setBids] = useState([])
    const [query, setNextQuery] = useState("")
    const [prevQuery, setPrevQuery] = useState("")
    useEffect(() => {
        bidsSocket.connect()
        return () => {
            bidsSocket.disconnect()
        }
    }, [])
    // edge cases -> 1. Check if the user is in last page of the results.
    // edge case -> 2. Checking if the user is in the first page but the result length is less than page limit ie show no navigation 
    useEffect(() => {
        bidsSocket.emit('query-bids', query)
        function receiveBids(arg) {
            console.log(arg)
            setBids(arg.results)
            if (arg.results.length == pageLimit) {
                setNextQuery(arg.nextPage)
            }
            else {
                // user is in the last page
                if (prevQuery !== "") {
                    setNextQuery("")
                }
            }
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
            <Pagination query={query} prevQuery={prevQuery} />
        </div>
    )
}

export default MainApp