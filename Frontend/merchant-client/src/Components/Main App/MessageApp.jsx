import React, { useEffect, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'

function MessageApp() {
    const [groups, showGroups] = useState([])
    const [chatAdded, isChatAdded] = useState(false)
    console.log(groups)
    return (
        <>
            <NavbarApp />
            <div className="w-full fixed mx-auto my-6 p-4 bg-gray-800 h-full">
                <ShowGroups groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded}/>
                <CreateChat groups={groups} showGroups={showGroups} chatAdded={chatAdded} isChatAdded={isChatAdded}/>
            </div>

        </>
    )
}

export default MessageApp