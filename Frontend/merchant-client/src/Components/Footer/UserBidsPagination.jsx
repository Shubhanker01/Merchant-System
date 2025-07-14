import React, { useEffect, useState } from 'react'

function UserBidsPagination({ totalPages }) {
    const [pageNo, setPageNo] = useState([])
    const pageOffset = 2
    const noOfPages = Math.round(totalPages / pageOffset)
    useEffect(() => {
        for (let i = 1; i <= noOfPages; i++) {
            setPageNo([...pageNo, i])
        }
    }, [])
    console.log(pageNo)
    return (
        <>
            <div
                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span class="text-xs xs:text-sm text-gray-900">
                    Showing 1 to {noOfPages} of {totalPages} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">

                </div>
            </div>
        </>
    )
}

export default UserBidsPagination