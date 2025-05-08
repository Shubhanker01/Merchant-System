import React from 'react'
import { Trash2 } from 'lucide-react'

function RemoveParticipant({ isAdmin, id }) {
    console.log(id)
    return (
        <>
            <div className={`${isAdmin ? `block` : 'hidden'} m-2`}>
                <button>
                    <Trash2 size={20} color="#eae1e1" />
                </button>
            </div>
        </>
    )
}

export default RemoveParticipant