import React, { useEffect } from 'react'
import NavbarApp from '../Header/NavbarApp'
import AddBid from '../Footer/AddBid'
import BidsTable from '../Body/BidsTable'
// import { socket } from '../../socket'

function MainApp() {
    useEffect(() => {
        // socket.on('connection', () => {
        //     console.log("User is connected")
        // })
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