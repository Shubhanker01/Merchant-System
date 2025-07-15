import React, { useEffect, useState } from 'react'

function UserBidsPagination({ totalPages, currentPage, setCurrentPage }) {
    const [pageNo, setPageNo] = useState([])
    const handleChangePage = (pageNo) => {
        setCurrentPage(pageNo)
    }
    const pageOffset = 2
    const noOfPages = Math.round(totalPages / pageOffset)
    useEffect(() => {
        let pages = []
        for (let i = 1; i <= noOfPages; i++) {
            pages.push(i)
        }
        setPageNo(pages)

    }, [currentPage, noOfPages])
    return (
        <>
            <div
                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                    Showing {currentPage} to {noOfPages} of {totalPages} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    {
                        pageNo.map((page) => {
                            return <button onClick={() => handleChangePage(page)} key={page} className='bg-slate-800 text-slate-100 p-2 rounded-md m-2 w-[30px]'>{page}</button>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default UserBidsPagination