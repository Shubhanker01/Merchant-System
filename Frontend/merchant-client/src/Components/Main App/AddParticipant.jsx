import React from 'react'
import checkAdmin from '../../utils/checkAdmin'

function AddParticipant({ participants, admin }) {
    let isAdmin = checkAdmin(participants, admin)
    console.log(isAdmin)
    return (
        <>
            <div className={`${isAdmin ? 'block w-[80%] m-4' : 'hidden'}`}>
                <button className='bg-blue-600 text-slate-100 rounded-md p-2'>
                    Add Participant
                </button>
            </div>
        </>
    )
}

export default AddParticipant