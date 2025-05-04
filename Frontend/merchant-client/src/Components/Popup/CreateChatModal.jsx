import React, { useState } from 'react'
import { Users } from 'lucide-react'
import Participants from '../Main App/Participants'
import Dropdown from './Dropdown'
import queryUser from '../../Async logic/queryUser'
import createGroupChat from '../../Async logic/createChatGroup'
import { toast } from 'react-toastify'

function CreateChatModal({ modal, setModal }) {
    const [selectedParticipants, setSelectedParticipants] = useState([])
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [groupName, setGroupName] = useState("")

    const handleChange = (e) => {
        setSearch(e.target.value)
        if (e.target.value != '') {
            queryUser(e.target.value).then((res) => {
                setResults(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const createChat = () => {
        if (!groupName) {
            toast.error("Please enter group name", { position: 'top-center' })
            return
        }
        createGroupChat(selectedParticipants, groupName).then((res) => {
            toast.success(res, { position: 'top-center' })
        }).catch(err => {
            console.log(err)
        })
        setModal(false)
        setSelectedParticipants([])
        setGroupName("")
        
    }
    
    return (
        <>
            <div id="create-chat-modal" tabIndex="-1" className={`fixed ${modal == true ? `block` : `hidden`} z-50 inset-0 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
                <div className="relative p-4 w-[90%] max-h-full m-[50px_auto]">

                    <div className="relative bg-[#282828] w-[100%] rounded-lg shadow">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-100 dark:text-white">
                                Create Chat
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => { setModal(false) }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>

                        </div>
                        <div>
                            <input type='text' className='bg-gray-600 text-gray-100 w-[90%] m-4 rounded-md p-4 border-solid border-2 border-gray-200' value={groupName} onChange={(e) => { setGroupName(e.target.value) }} placeholder='Enter group name...'></input>
                        </div>
                        <div>
                            <input type='text' className='bg-gray-600 text-gray-100 w-[90%] m-4 rounded-md p-4 border-solid border-2 border-gray-200' value={search} onChange={handleChange} placeholder='Search Participants...'></input>

                            <Dropdown names={results} search={search} selectedParticipants={selectedParticipants} setSelectedParticipants={setSelectedParticipants} />
                        </div>
                        <div className='flex m-4'>
                            <Users color="#f4f1f1" />
                            <h2 className='text-gray-100 font-bold ml-4'>Selected Participants</h2>
                        </div>
                        <Participants selectedParticipants={selectedParticipants} setSelectedParticipants={setSelectedParticipants} />
                        <div className='p-5'>
                            <p className='text-gray-100'>Are you sure you want to create a new group?</p>
                            <button onClick={createChat} type="button" className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Create
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateChatModal