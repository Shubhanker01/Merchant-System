import React, { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import queryUser from '../../Async logic/queryUser'
import Dropdown from './Dropdown'
import { addMembers } from '../../Async logic/createChatGroup'
import Participants from '../Main App/Participants'
import { toast } from 'react-toastify'
import checkParticipantDuplicate from '../../utils/checkParticipantDuplicate'
import useDebounce from '../../hooks/useDebounce'

function AddParticipantModal({ currentParticipants, modal, setModal, groupId, showGroupParticipants }) {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [selectedParticipants, setSelectedParticipants] = useState([])
    const debouncedSearchValue = useDebounce(search, 800)

    // useEffect for debouncing effect
    useEffect(() => {
        if (search === "") return;
        queryUser(search).then((res) => {
            setResults(res)
        }).catch((err) => {
            console.log(err)
        })

    }, [debouncedSearchValue])

    const addMembersToGroup = () => {
        if (selectedParticipants.length === 0) {
            toast.error("Select atleast one participant", { position: 'top-center' })
            return
        }
        if (checkParticipantDuplicate(currentParticipants, selectedParticipants)) {
            toast.error("Participants are already added", { position: 'top-center' })
            return
        }
        addMembers(groupId, selectedParticipants).then((res) => {
            toast.success(res, { position: 'top-center' })
            showGroupParticipants([...currentParticipants, ...selectedParticipants])
        }).catch((err) => {
            console.log(err)
        })
        setModal(false)
        setSelectedParticipants([])
    }
    console.log(selectedParticipants)
    console.log(results)
    return (
        <>
            <div id="add-modal" tabIndex="-1" className={`fixed ${modal == true ? `block` : `hidden`} z-50 inset-0 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
                <div className="relative p-4 w-[90%] max-h-full m-[50px_auto]">

                    <div className="relative bg-[#282828] w-[100%] rounded-lg shadow">
                        <h1 className='text-slate-200'>Add Participants</h1>
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => { setModal(false) }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>

                        </div>
                        <div>
                            <input type='text' className='bg-gray-600 text-gray-100 w-[90%] m-4 rounded-md p-4 border-solid border-2 border-gray-200' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Participants...'></input>
                            <Dropdown names={results} search={search} selectedParticipants={selectedParticipants} setSelectedParticipants={setSelectedParticipants} />
                        </div>

                        <div className='flex m-4'>
                            <Users color="#f4f1f1" />
                            <h2 className='text-gray-100 font-bold ml-4'>Selected Participants</h2>
                        </div>
                        <div>
                            <Participants selectedParticipants={selectedParticipants} setSelectedParticipants={setSelectedParticipants} />
                        </div>
                        <div className='p-5'>
                            <p className='text-gray-100'>Are you sure you want to add more participants?</p>
                            <button onClick={addMembersToGroup} type="button" className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Add
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddParticipantModal