import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'
import RemoveParticipantModal from '../Popup/RemoveParticipantModal'


function RemoveParticipant({ isAdmin, id, name, groupId, participants, showGroupParticipants }) {
    const [modal, setModal] = useState(false)
    const handleClick = () => {
        setModal(true)
        console.log(id)
    }
    return (
        <>
            <div className={`${isAdmin ? `block` : 'hidden'} m-2`}>
                <button onClick={handleClick}>
                    <Trash2 size={20} color="#eae1e1" />
                </button>

            </div>
            <RemoveParticipantModal modal={modal} setModal={setModal} name={name} groupId={groupId} id={id} participants={participants} showGroupParticipants={showGroupParticipants} />
        </>
    )
}

export default RemoveParticipant