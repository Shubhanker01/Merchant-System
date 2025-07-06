import React from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

function Pagination() {
    return (
        <>
            <div className='fixed bottom-4 left-[50%]'>
                <button className='bg-slate-400 rounded-md m-2'>
                    <ArrowLeft className='m-2' />
                </button>
                <button className='bg-slate-400 rounded-md m-2'>
                    <ArrowRight className='m-2' />
                </button>
            </div>

        </>
    )
}

export default Pagination