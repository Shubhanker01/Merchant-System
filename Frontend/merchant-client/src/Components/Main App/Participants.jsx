import React from 'react'
import { User, X } from 'lucide-react'
import { toast } from 'react-toastify'

function Participants({ selectedParticipants, setSelectedParticipants }) {
    const removeParticipant = (id) => {
        setSelectedParticipants(selectedParticipants.filter((user) => {
            if (user.id !== id) {
                return user
            }
        }))
        toast.success('Participant removed', { position: 'top-center' })
    }
    return (
        <>
            <div className='m-4 grid grid-cols-4'>
                {
                    selectedParticipants.map((user) => {
                        return (
                            <div key={user.id} className='bg-slate-700 text-gray-100 rounded-xl flex justify-between m-2'>
                                <User color="#ded4d4" className='m-2' />
                                <p className='m-2'>{user.name}</p>
                                <button onClick={() => { removeParticipant(user.id) }} className='justify-self-end'>
                                    <X color="#ded4d4" />
                                </button>
                            </div>
                        )
                    })
                }

            </div>

        </>
    )
}

export default Participants