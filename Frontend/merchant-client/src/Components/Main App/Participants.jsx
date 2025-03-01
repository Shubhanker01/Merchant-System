import React from 'react'
import { User, X } from 'lucide-react'

function Participants() {
    return (
        <>
            <div className='bg-slate-700 text-gray-100 rounded-xl flex justify-between m-2'>
                <User color="#ded4d4" className='m-2' />
                <p className='m-2'>Serenity14</p>
                <button className='justify-self-end'>
                    <X color="#ded4d4" />
                </button>
            </div>
        </>
    )
}

export default Participants