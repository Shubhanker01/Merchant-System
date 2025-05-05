import React from 'react'
import { toast } from 'react-toastify'
import { deleteGroup } from '../../Async logic/createChatGroup'

function DeleteGroupModal({ modal, setModal, groupId, checkDelete, isCheckDelete }) {
    const deleteGroupChat = () => {
        deleteGroup(groupId).then((res) => {
            toast.success(res, { position: 'top-center' })
            isCheckDelete(true)
            setModal(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div id="create-chat-modal" tabIndex="-1" className={`fixed ${modal == true ? `block` : `hidden`} z-50 inset-0 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
                <div className="relative p-4 w-[90%] max-h-full m-[50px_auto]">

                    <div className="relative bg-[#282828] w-[100%] rounded-lg shadow">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-100 dark:text-white">
                                Delete Group Chat
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => { setModal(false) }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>

                        </div>

                        <div className='p-5'>
                            <p className='text-gray-100'>Are you sure you want to delete the group?</p>
                            <button onClick={deleteGroupChat} type="button" className="mt-4 text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteGroupModal