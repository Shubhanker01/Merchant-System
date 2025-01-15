import React from 'react'

function BidsTable() {
    return (
        <div className='mt-[100px]'>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Bidder Name</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Opening Date</th>
                        <th>Closing Date</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default BidsTable