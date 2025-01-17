import React from 'react'
import { useSelector } from 'react-redux'
function BidsTable() {
    const state = useSelector(state => state.bids)
    return (
        <div className='m-[100px_auto]'>
            <table className='table-auto sm:text-base text-sm text-gray-200 bg-gray-900 rounded-md ml-auto mr-auto sm:w-[70%] w-[75%]'>
                <thead className=''>
                    <tr className=''>
                        <th className='sm:px-4 sm:py-4 px-2 py-2'>Sr No</th>
                        <th className='sm:px-4 px-2'>Bidder Name</th>
                        <th className='sm:px-24 px-8'>Title</th>
                        <th className='sm:px-8 px-4'>Price</th>
                        <th className='sm:px-4 px-2'>Opening Date</th>
                        <th className='sm:px-4 px-2'>Closing Date</th>
                    </tr>
                </thead>
                {
                    state.map((bid) => {
                        return (
                            <tbody className='bg-gray-300 text-gray-800 rounded-b-md' key={bid.id}>
                                <tr>
                                    <td className='sm:px-4 sm:py-4 px-2 py-2'>{bid.id}</td>
                                    <td className='sm:px-4 px-2'>{bid.bidderName}</td>
                                    <td className='sm:px-24 px-8'>{bid.title}</td>
                                    <td className='sm:px-8 px-4'>{bid.price}</td>
                                    <td className='sm:px-4 px-2'>{bid.openingDate}</td>
                                    <td className='sm:px-4 px-2'>{bid.closingDate}</td>
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