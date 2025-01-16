import React from 'react'

function BidsTable() {
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
                <tbody className='bg-gray-300 text-gray-800 rounded-b-md'>
                    <tr>
                        <td className='sm:px-4 sm:py-4 px-2 py-2'>1.</td>
                        <td className='sm:px-4 px-2'>Bidder 1</td>
                        <td className='sm:px-24 px-8'>Auction on Building</td>
                        <td className='sm:px-8 px-4'>Rs 101</td>
                        <td className='sm:px-4 px-2'>10-11-2025</td>
                        <td className='sm:px-4 px-2'>10-11-2026</td>
                    </tr>
                </tbody>
                {/* <tbody className='bg-gray-300 text-gray-800 rounded-b-md'>
                    <tr>
                        <td className='px-4 py-4'>1.</td>
                        <td className='px-4'>Bidder 1</td>
                        <td className='px-24'>Auction on Building</td>
                        <td className='px-8'>Rs 101</td>
                        <td className='px-4'>10-11-2025</td>
                        <td className='px-4'>10-11-2026</td>
                    </tr>
                </tbody> */}
            </table>
        </div>
    )
}

export default BidsTable