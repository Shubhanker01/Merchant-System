import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
import { toast } from 'react-toastify'
import { bidsSocket, socket } from '../../socket'
import Pagination from '../Footer/Pagination'
import { useParams } from 'react-router-dom'

function MainApp() {
    const { userId } = useParams()
    const [bids, setBids] = useState([])
    const [nextQuery, setNextQuery] = useState("")
    const [prevQuery, setPrevQuery] = useState("")
    useEffect(() => {
        // connecting global socket
        socket.auth = { userId }
        socket.connect()
        bidsSocket.connect()
        return () => {
            bidsSocket.disconnect()
        }
    }, [])
    // edge cases -> 1. Check if the user is in last page of the results.
    // edge case -> 2. Checking if the user is in the first page but the result length is less than page limit ie show no navigation 
    useEffect(() => {
        bidsSocket.emit('query-bids', { nextQuery: "", prevQuery: "" })
        function receiveBids(arg) {
            console.log(arg)
            setBids(arg.results)
            setNextQuery(arg.nextPage)
            setPrevQuery(arg.prevPage)
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
        function receiveMessageFromProjectNamespace(arg) {
            toast.info(arg, { theme: 'dark' })
        }
        bidsSocket.on('read-bids', receiveBids)
        bidsSocket.on('success-creation-bids', receiveEventForCreation)
        bidsSocket.on('on-delete', receiveEventForDeletion)
        bidsSocket.on('on-updation', receiveEventForUpdation)
        bidsSocket.on('new-project-added', receiveMessageFromProjectNamespace)
        return () => {
            bidsSocket.off('read-bids', receiveBids)
            bidsSocket.off('success-creation-bids', receiveEventForCreation)
            bidsSocket.off('on-delete', receiveEventForDeletion)
            bidsSocket.off('on-updation', receiveEventForUpdation)
            bidsSocket.off('new-project-added', receiveMessageFromProjectNamespace)
        }

    }, [])

    return (
        <div>
            <NavbarApp />
            <BidsTable bids={bids} />
            <AddBid />
            <Pagination query={nextQuery} prevQuery={prevQuery} />
        </div>
    )
}

export default MainApp