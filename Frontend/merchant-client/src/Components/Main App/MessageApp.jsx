import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'
import Message from './Message'
import { userSocket } from '../../socket'
import { useParams } from 'react-router-dom'


function MessageApp() {
    const params = useParams()
    const [groups, showGroups] = useState([])
    const [chatAdded, isChatAdded] = useState(false)
    const [currentGroupChat, showCurrentGroupChat] = useState('')
    const [groupMessages, setGroupMessages] = useState({ group: "", messages: [] })
    // connect the user socket instance with the namespace user

    useEffect(() => {
        userSocket.connect()

        return () => {
            userSocket.disconnect()
        }
    }, [])
    useEffect(() => {
        function receiveMessageEvent(arg) {
            if (arg.room !== currentGroupChat) {
                console.log("This message is from other group chat")
            }
            else {
                setGroupMessages({ ...groupMessages, group: currentGroupChat, messages: [...groupMessages.messages, arg.message] })
            }
        }
        userSocket.on('message', receiveMessageEvent)
        // clean up function to remove duplicate events
        return () => {
            console.log("Clean up function is called")
            userSocket.off('message', receiveMessageEvent)
        }

    }, [groupMessages])
    useEffect(() => {
        setGroupMessages({ ...setGroupMessages, group: currentGroupChat, messages: [] })
    }, [currentGroupChat])
    console.log(groupMessages)

    return (
        <>
            {/* {console.log(tempMessages)} */}
            <NavbarApp />
            <div className="grid grid-cols-4 w-full mx-auto p-4 bg-gray-800 h-screen fixed">
                <div>
                    <ShowGroups groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} showCurrentGroupChat={showCurrentGroupChat} />
                </div>


                <div className='col-span-3'>
                    <Message currentGroupChat={currentGroupChat} groupMessages={groupMessages} setGroupMessages={setGroupMessages} />
                </div>

            </div>
            <CreateChat groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} />
        </>
    )
}

export default MessageApp