import React from 'react'
import NavbarApp from '../Header/NavbarApp'
import { useEffect } from 'react'
import { bidsSocket } from '../../socket'
import decodeToken from '../../utils/decodeJwt'
import getCookie from '../../utils/getCookie'
import { useState } from 'react'
import UserBids from '../Body/UserBids'

function MyBids() {
    const [userBids, setUserBids] = useState([])
    const cookie = getCookie()
    const user = decodeToken(cookie)
    useEffect(() => {
        bidsSocket.connect()
        return () => {
            bidsSocket.disconnect()
        }
    })
    useEffect(() => {
        bidsSocket.emit('send-user-bids', user.name)
        function getUserBids(bids) {
            console.log(bids)
            setUserBids(bids)
        }
        bidsSocket.on('user-bids', getUserBids)
        return () => {
            bidsSocket.off('user-bids', getUserBids)
        }
    }, [])
    return (
        <>
            <NavbarApp />
            <div className='mt-[100px]'>
                <h1 className='ml-[20px] font-bold text-2xl'>Your Bids</h1>
                <UserBids />
            </div>

        </>
    )
}

export default MyBids