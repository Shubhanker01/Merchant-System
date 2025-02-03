import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { showAllBids } from '../../Async logic/bidsThunk'
import { useEffect } from 'react'

function BidsTable() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.bids.bids)

    useEffect(() => {
        dispatch(showAllBids())
    }, [])
    
    return (
        <div className='m-[100px_auto]'>
            <table className='table-auto sm:text-base text-sm text-gray-200 bg-gray-900 rounded-md ml-auto mr-auto sm:w-[70%] w-[85%]'>
                <thead className=''>
                    <tr className=''>
                        <th className='sm:px-4 sm:py-4 px-2 py-2'>Sr No</th>
                        <th className='sm:px-4 px-2'>Bidder Name</th>
                        <th className='sm:px-20 px-6'>Title</th>
                        <th className='sm:px-8 px-4 hidden sm:table-cell'>Price</th>
                        <th className='sm:px-4 px-2 hidden sm:table-cell'>Opening Date</th>
                        <th className='sm:px-4 px-2 hidden sm:table-cell'>Closing Date</th>
                    </tr>
                </thead>
                {
                    state.map((bid) => {
                        return (
                            <tbody className='bg-gray-300 text-gray-800 rounded-b-md hover:bg-slate-400' key={bid.id}>
                                <tr className='cursor-pointer'>
                                    <td className='sm:px-4 sm:py-4 px-2 py-2'>{`${bid.id.substring(0, 10)}..`}</td>
                                    <td className='sm:px-4 px-2'>{bid.bidderName}</td>
                                    <td className='sm:px-20 px-6'>{bid.title}</td>
                                    <td className='sm:px-8 px-4 hidden sm:table-cell'>{bid.price}</td>
                                    <td className='sm:px-4 px-2 hidden sm:table-cell'>{bid.openingDate}</td>
                                    <td className='sm:px-4 px-2 hidden sm:table-cell'>{bid.closingDate}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }

            </table>
        </div>
    )
}

export default BidsTable