import React, { useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'

function MessageApp() {
    const [groups, showGroups] = useState([])
    return (
        <>
            <NavbarApp />
            <div className="w-full fixed mx-auto my-6 p-4 bg-gray-800 h-full">
                <ShowGroups groups={groups} showGroups={showGroups} />
                <CreateChat />
            </div>

        </>
    )
}

export default MessageApp