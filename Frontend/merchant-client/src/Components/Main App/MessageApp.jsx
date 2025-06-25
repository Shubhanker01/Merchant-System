import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'
import Message from './Message'
import { userSocket } from '../../socket'


function MessageApp() {
    const [groups, showGroups] = useState([])
    const [chatAdded, isChatAdded] = useState(false)
    const [currentGroupChat, showCurrentGroupChat] = useState('')
    const [groupMessages, setGroupMessages] = useState({ group: "", messages: [] })
    const [otherMessages, setOtherMessages] = useState([])

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
                setOtherMessages([...otherMessages, { groupName: arg.room, message: arg.message }])
            }
            else {
                setGroupMessages({ ...groupMessages, group: currentGroupChat, messages: [...groupMessages.messages, arg.message] })
            }
        }
        userSocket.on('message', receiveMessageEvent)
        // clean up function to remove duplicate events
        return () => {
            userSocket.off('message', receiveMessageEvent)
        }

    }, [groupMessages, otherMessages])
    useEffect(() => {
        setGroupMessages({ ...setGroupMessages, group: currentGroupChat, messages: [] })
    }, [currentGroupChat])
    console.log(otherMessages)
    return (
        <>
            {/* {console.log(tempMessages)} */}
            <NavbarApp />
            <div className="grid grid-cols-4 w-full mx-auto p-4 bg-gray-800 h-screen fixed">
                <div>
                    <ShowGroups groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} showCurrentGroupChat={showCurrentGroupChat} otherMessages={otherMessages} />
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