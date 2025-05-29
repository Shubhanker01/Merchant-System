import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'
import Message from './Message'
import { socket } from '../../socket'
import { useParams } from 'react-router-dom'

function MessageApp() {
    const params = useParams()
    const [currentSocket, setCurrentSocket] = useState(null)
    useEffect(() => {
        socket.connect()
        socket.on('connect', () => {
            socket.emit('enter-room', params.userId)
            socket.on('entry', (msg) => {
                console.log(msg)
            })
        })
        return () => {
            socket.disconnect()
        }
    }, [])
    useEffect(() => {
        // socket.emit('chat', "I am in chat room")

        // socket.on('join', (arg) => {
        //     console.log(arg)
        // })
        return () => {
            socket.off('join', () => {
                console.log('disconnected')
            })
        }
    }, [])
    const [groups, showGroups] = useState([])
    const [chatAdded, isChatAdded] = useState(false)
    const [currentGroupChat, showCurrentGroupChat] = useState('')

    return (
        <>
            <NavbarApp />
            <div className="grid grid-cols-4 w-full mx-auto p-4 bg-gray-800 h-screen fixed">
                <div>
                    <ShowGroups groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} />
                </div>


                <div className='col-span-3'>
                    <Message />
                </div>

            </div>
            <CreateChat groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} />
        </>
    )
}

export default MessageApp