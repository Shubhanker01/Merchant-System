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
    // variable to store and show the current group chats that user clicks in
    const [groupMessages, setGroupMessages] = useState({ group: "", messages: [] })
    // receive unread messages incase of other groups
    const [otherMessages, setOtherMessages] = useState([])

    // connect the user socket instance with the namespace user

    useEffect(() => {
        userSocket.connect()

        return () => {
            userSocket.disconnect()
        }
    }, [])
    useEffect(() => {
        // receive the event from the server
        function receiveMessageEvent(arg) {
            // if the message is received from other rooms
            if (arg.room !== currentGroupChat) {
                console.log("This message is from other group chat")
                // check if the room that message is received in is present in otherMessages variable
                let index = otherMessages.find((group) => group.groupName == arg.room)
                // if the message received from room is for the first time
                if (index == undefined) {
                    setOtherMessages([...otherMessages, { groupName: arg.room, noOfMessages: 1 }])
                }
                // if the message was received before just increase the noOfMessages variable in the object
                else {
                    setOtherMessages(otherMessages.map((group) => {
                        if (group.groupName == arg.room) {
                            group.noOfMessages++
                        }
                        return group
                    }))
                }
            }
            // just append the message in the current group
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
        // retrieve messages from database in case the user moves to other groups
        async function retrieveMessages() {
            if (currentGroupChat !== '') {
                let data = await getOldMessages(currentGroupChat)
                let arr = []
                data.map((chat) => {
                    let msg = {
                        id: chat._id,
                        user: chat.username,
                        text: chat.message,
                        timestamp: chat.updatedAt
                    }
                    arr.push(msg)
                })
                setGroupMessages({ ...groupMessages, group: currentGroupChat, messages: [...arr] })
            }
        }
        retrieveMessages()
        // if the user shifts to the group that has unread messages then just find the currentgroup chat and remove it from the otherMessages array
        let ind = otherMessages.findIndex((group) => group.groupName == currentGroupChat)
        if (ind !== -1) {
            setOtherMessages(otherMessages.filter((group) => {
                if (group.groupName !== currentGroupChat) {
                    return group
                }
            }))
        }
    }, [currentGroupChat])
    // console.log(otherMessages)
    // console.log(groupMessages)
    return (
        <>
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