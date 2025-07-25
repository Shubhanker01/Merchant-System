import React from 'react'
import { updateUserBid } from '../../Async logic/bidsOperation'
import { toast } from 'react-toastify'
import { bidsSocket } from '../../socket'

function UpdateBidForm({ id, modal, setModal, updateField, setUpdateField, bids, setBids }) {
    const handleFormUpdate = async (e) => {
        e.preventDefault()
        let data = await updateUserBid(id, updateField)
        toast.success(data, { position: 'top-center' })
        // emit to the server that bid has been updated
        bidsSocket.emit('updation-bid', id)
        setBids(bids.filter((bid) => {
            if (bid.id === id) {
                bid.title = updateField.title || bid.title,
                    bid.price = updateField.price || bid.price,
                    bid.closingDate = updateField.closingDate || bid.closingDate
            }
            return bid
        }))
        setModal(false)

    }
    return (
        <>
            <div id="bids-modal" tabIndex="-1" className={`fixed ${modal == true ? `block` : `hidden`}  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
                <div className="relative p-4 w-full max-w-md max-h-full m-[0px_auto]">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Your Bid
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => { setModal(false) }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form className="p-4 md:p-5" onSubmit={handleFormUpdate}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add Title" required={true} value={updateField.title} onChange={(e) => setUpdateField({ ...updateField, title: e.target.value })} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rs2999" required={true} min="0" value={updateField.price} onChange={(e) => setUpdateField({ ...updateField, price: Number(e.target.value) })} />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="closing-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Closing Date</label>
                                    <input type='date' id='closing-date' name='closing-date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required={true} value={updateField.closingDate} onChange={(e) => setUpdateField({ ...updateField, closingDate: e.target.value })}></input>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateBidForm