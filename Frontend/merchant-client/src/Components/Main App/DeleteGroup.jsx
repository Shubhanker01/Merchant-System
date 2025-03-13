import React, { useState } from 'react'
import checkAdmin from '../../utils/checkAdmin'

function DeleteGroup({ admin, participants, groupId }) {
    let isAdmin = checkAdmin(participants, admin)
    let [modal, setModal] = useState(false)
    return (
        <>
            {
                isAdmin ? <>
                    <div className='w-[80%] m-4'>
                        <button className='bg-red-700 text-slate-100 rounded-md p-2'>
                            Delete Group
                        </button>
                    </div>
                </> : <></>
            }

        </>
    )
}

export default DeleteGroup