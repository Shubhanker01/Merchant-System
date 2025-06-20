import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'
import Message from './Message'
import { socket, userSocket } from '../../socket'
import { useParams } from 'react-router-dom'


function MessageApp() {
    const params = useParams()
    // connect the user socket instance with the namespace user
    useEffect(() => {
        userSocket.connect()
        return () => {
            userSocket.disconnect()
        }
    }, [])
    // useEffect(() => {
    //     userSocket.emit('enter-user', params.userId)
    //     return () => {
    //         socket.off('join', () => {
    //             console.log('disconnected')
    //         })
    //     }
    // }, [])
    const [groups, showGroups] = useState([])
    const [chatAdded, isChatAdded] = useState(false)
    const [currentGroupChat, showCurrentGroupChat] = useState('')

    return (
        <>
            <NavbarApp />
            <div className="grid grid-cols-4 w-full mx-auto p-4 bg-gray-800 h-screen fixed">
                <div>
                    <ShowGroups groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} showCurrentGroupChat={showCurrentGroupChat} />
                </div>


                <div className='col-span-3'>
                    <Message currentGroupChat={currentGroupChat} />
                </div>

            </div>
            <CreateChat groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} />
        </>
    )
}

export default MessageApp