import React from 'react'

function BidsTable() {
    return (
        <div className='m-[100px_auto]'>
            <table className='table-auto text-base text-gray-200 bg-gray-900 rounded-md ml-auto mr-auto sm:w-[70%] w-[50%]'>
                <thead className=''>
                    <tr className=''>
                        <th className='px-4 py-4'>Sr No</th>
                        <th className='px-4'>Bidder Name</th>
                        <th className='px-24'>Title</th>
                        <th className='px-8'>Price</th>
                        <th className='px-4'>Opening Date</th>
                        <th className='px-4'>Closing Date</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-300 text-gray-800 rounded-b-md'>
                    <tr>
                        <td className='px-4 py-4'>1.</td>
                        <td className='px-4'>Bidder 1</td>
                        <td className='px-24'>Auction on Building</td>
                        <td className='px-8'>Rs 101</td>
                        <td className='px-4'>10-11-2025</td>
                        <td className='px-4'>10-11-2026</td>
                    </tr>
                </tbody>
                <tbody className='bg-gray-300 text-gray-800 rounded-b-md'>
                    <tr>
                        <td className='px-4 py-4'>1.</td>
                        <td className='px-4'>Bidder 1</td>
                        <td className='px-24'>Auction on Building</td>
                        <td className='px-8'>Rs 101</td>
                        <td className='px-4'>10-11-2025</td>
                        <td className='px-4'>10-11-2026</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BidsTable