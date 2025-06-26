import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'
import Message from './Message'
import { userSocket } from '../../socket'
import { getOldMessages } from '../../Async logic/message'

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
                let index = otherMessages.find((group) => group.groupName == arg.room)
                if (index == undefined) {
                    setOtherMessages([...otherMessages, { groupName: arg.room, noOfMessages: 1 }])
                }
                else {
                    setOtherMessages(otherMessages.map((group) => {
                        if (group.groupName == arg.room) {
                            group.noOfMessages++
                        }
                        return group
                    }))
                }
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
        async function retrieveMessages() {
            if (currentGroupChat !== '') {
                let data = await getOldMessages(currentGroupChat)
                data.map((chat) => {
                    let msg = {
                        id: chat._id,
                        user: chat.username,
                        text: chat.message,
                        timeStamp: chat.updatedAt
                    }
                    setGroupMessages({ ...setGroupMessages, group: currentGroupChat, messages: [...groupMessages.messages, msg] })
                })
            }
        }
        retrieveMessages()
        // setGroupMessages({ ...setGroupMessages, group: currentGroupChat, messages: [] })
        let ind = otherMessages.findIndex((group) => group.groupName == currentGroupChat)
        if (ind !== -1) {
            setOtherMessages(otherMessages.filter((group) => {
                if (group.groupName !== currentGroupChat) {
                    return group
                }
            }))
        }
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