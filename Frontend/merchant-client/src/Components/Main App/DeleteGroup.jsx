import React, { useState } from 'react'
import checkAdmin from '../../utils/checkAdmin'
import DeleteGroupModal from '../Popup/DeleteGroupModal'

function DeleteGroup({ admin, participants, groupId, checkDelete, isCheckDelete }) {
    let isAdmin = checkAdmin(participants, admin)
    let [modal, setModal] = useState(false)
    return (
        <>
            {
                isAdmin ? <>
                    <div className='w-[80%] m-4'>
                        <button onClick={() => setModal(true)} className='bg-red-700 text-slate-100 rounded-md p-2'>
                            Delete Group
                        </button>
                    </div>
                    <DeleteGroupModal checkDelete={checkDelete} isCheckDelete={isCheckDelete} modal={modal} setModal={setModal} groupId={groupId} />
                </> : <></>
            }

        </>
    )
}

export default DeleteGroup