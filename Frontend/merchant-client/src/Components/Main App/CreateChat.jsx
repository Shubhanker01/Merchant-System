import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import CreateChatModal from '../Popup/CreateChatModal'

function CreateChat({ groups, showGroups }) {
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        if (!modal) {
            setModal(true)
        }
        else {
            setModal(false)
        }
    }

    return (
        <>
            <button onClick={toggleModal} className='flex fixed p-2 bottom-4 right-4 bg-green-700 text-slate-100 rounded-md hover:bg-green-800'>
                <div>
                    <Plus color="#f1efef" />
                </div>
                <div>
                    Add Chat
                </div>
            </button>
            <CreateChatModal groups={groups} showGroups={showGroups} modal={modal} setModal={setModal} />
        </>
    )
}

export default CreateChat