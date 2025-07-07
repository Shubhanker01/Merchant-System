import React from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { bidsSocket } from '../../socket'

function Pagination({ query, prevQuery }) {
    const [firstPage, isFirstPage] = useState(true)
    const nextPage = () => {
        bidsSocket.emit('query-bids', query)
    }
    const prevPage = () => {

    }
    return (
        <>
            <div className='fixed bottom-4 left-[50%]'>
                <button onClick={prevPage} className={`bg-slate-400 rounded-md m-2 ${firstPage == true ? 'hidden' : 'block'}`}>
                    <ArrowLeft className='m-2' />
                </button>
                <button onClick={nextPage} className={`bg-slate-400 rounded-md m-2 ${query == "" ? 'hidden' : 'block'}`}>
                    <ArrowRight className='m-2' />
                </button>
            </div>

        </>
    )
}

export default Pagination