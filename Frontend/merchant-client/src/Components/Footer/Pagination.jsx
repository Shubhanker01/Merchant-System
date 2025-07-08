import React from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { bidsSocket } from '../../socket'

function Pagination({ query, prevQuery }) {
    const [firstPage, isFirstPage] = useState(true)
    const [lastPage, isLastPage] = useState(false)
    const nextPage = () => {
        isFirstPage(false)
        bidsSocket.emit('query-bids', query)
        // if (query == "" && prevQuery == "") {
        //     isLastPage(true)
        // }
    }
    const prevPage = () => {
        bidsSocket.emit('query-bids', prevQuery)
    }
    return (
        <>
            <div className='fixed bottom-4 left-[50%] flex'>
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