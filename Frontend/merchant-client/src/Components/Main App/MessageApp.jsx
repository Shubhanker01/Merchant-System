import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'
import Message from './Message'

function MessageApp() {
    const [groups, showGroups] = useState([])
    const [chatAdded, isChatAdded] = useState(false)
    const [currentGroupChat, showCurrentGroupChat] = useState('')

    return (
        <>
            <NavbarApp />
            <div className="grid grid-cols-2 w-full mx-auto p-4 bg-gray-800 h-screen">
                <ShowGroups groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} />
                {/* <CreateChat groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded} /> */}
                <Message />
            </div>

        </>
    )
}

export default MessageApp