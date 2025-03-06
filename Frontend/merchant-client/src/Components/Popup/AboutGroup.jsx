import React from 'react'
import { UsersRound } from 'lucide-react'

function AboutGroup({ modal, setModal, participants }) {
  return (
    <>
      <div id="create-chat-modal" tabIndex="-1" className={`fixed ${modal == true ? `block` : `hidden`} z-50 inset-0 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
        <div className="relative p-4 w-[90%] max-h-full m-[50px_auto]">

          <div className="relative bg-[#282828] w-[100%] rounded-lg shadow">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <div className='m-[0px_auto]'>
                <UsersRound size={48} color="#ece4e4" strokeWidth={2.25} absoluteStrokeWidth />
                <h1 className='text-slate-100 text-2xl'>Group Name</h1>
              </div>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => { setModal(false) }}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

            </div>

            <div className='flex m-4'>
              <h2 className='text-gray-100 font-bold ml-4'>Selected Participants</h2>
              {
                participants.map((members) => {
                  return <p key={members.email}>{members.name}</p>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutGroup