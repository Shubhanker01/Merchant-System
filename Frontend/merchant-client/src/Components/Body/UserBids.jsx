import React, { useState } from 'react'
import { Pencil, Trash } from 'lucide-react'
import DeleteBid from '../Popup/DeleteBid'
import UpdateBidForm from '../Popup/UpdateBidForm'
import convertToDateFormat from '../../utils/convertToDateFormat'
import SearchBar from './SearchBar'
import useDebounce from '../../hooks/useDebounce'

function UserBids({ bids, setBids }) {
    const [modal, setModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [id, setId] = useState("")
    const [searchBids, setSearchBids] = useState("")
    const [updateBidFields, setUpdateBidFields] = useState({ title: "", price: 0, closingDate: "" })
    const debouncedValue = useDebounce(searchBids, 2000)
    const openDeleteBidModal = (id) => {
        setModal(true)
        setId(id)
    }
    const openUpdateModal = (id, { title, price, closingDate }) => {
        setUpdateModal(true)
        setId(id)
        setUpdateBidFields({ ...updateBidFields, title: title, price: price, closingDate: convertToDateFormat(closingDate) })
    }
    if (bids.length == 0) {
        return <div>You have added no bids</div>
    }
    console.log(debouncedValue)
    return (
        <>
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div class="my-2 flex sm:flex-row flex-col">
                        <div class="flex flex-row mb-1 sm:mb-0">
                            <div class="relative">
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            <SearchBar searchBids={searchBids} setSearchBids={setSearchBids} />
                        </div>

                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Opening Date
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Closing Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bids.map((bid) => {
                                            return (

                                                <tr key={bid.id}>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex items-center">
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {bid.id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{bid.title}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {bid.price}
                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                            <span aria-hidden
                                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                            <span class="relative">{bid.openingDate}</span>
                                                        </span>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span
                                                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                            <span aria-hidden
                                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                            <span class="relative">{bid.closingDate}</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => openUpdateModal(bid.id, { title: bid.title, price: bid.price, closingDate: bid.closingDate })}>
                                                            <Pencil size={'18px'} />
                                                        </button>

                                                    </td>
                                                    <td>
                                                        <button onClick={() => openDeleteBidModal(bid.id)}>
                                                            <Trash size={'18px'} />
                                                        </button>

                                                    </td>
                                                </tr>


                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <DeleteBid modal={modal} setModal={setModal} id={id} bids={bids} setBids={setBids} />
            <UpdateBidForm id={id} modal={updateModal} setModal={setUpdateModal} updateField={updateBidFields} setUpdateField={setUpdateBidFields} bids={bids} setBids={setBids} />
        </>
    )
}

export default UserBids