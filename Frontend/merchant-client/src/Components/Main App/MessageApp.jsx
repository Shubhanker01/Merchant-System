import React from 'react'
import NavbarApp from '../Header/NavbarApp'
import CreateChat from './CreateChat'
import ShowGroups from './ShowGroups'

function MessageApp() {

    return (
        <>
            <NavbarApp />
            <div className="w-full fixed mx-auto my-6 p-4 bg-gray-800 h-full">
                <ShowGroups />
                <CreateChat />
            </div>

        </>
    )
}

export default MessageApp