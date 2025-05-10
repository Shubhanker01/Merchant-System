import React, { useState } from 'react'
import checkAdmin from '../../utils/checkAdmin'
import AddParticipantModal from '../Popup/AddParticipantModal'

function AddParticipant({ participants, admin, groupId, showGroupParticipants }) {
    let isAdmin = checkAdmin(participants, admin)
    let [modal, setModal] = useState(false)
    return (
        <>
            {
                isAdmin ? <>
                    <div className='w-[80%] m-4'>
                        <button onClick={() => setModal(true)} className='bg-blue-600 text-slate-100 rounded-md p-2'>
                            Add Participant
                        </button>
                    </div>
                    <AddParticipantModal currentParticipants={participants} groupId={groupId} modal={modal} setModal={setModal} showGroupParticipants={showGroupParticipants} />
                </> : <></>
            }


        </>
    )
}

export default AddParticipant