import React from 'react'
import { UsersRound, User } from 'lucide-react'
import RemoveParticipant from '../Main App/RemoveParticipant'
import AddParticipant from '../Main App/AddParticipant'
import DeleteGroup from '../Main App/DeleteGroup'

function AboutGroup({ modal, setModal, participants, admin, groupId, checkDelete, isCheckDelete, showGroupParticipants }) {

  return (
    <>
      <div id="create-chat-modal" tabIndex="-1" className={`fixed ${modal == true ? `w-[100%] block transition duration-300 ease-in-out` : `w-0 hidden`} z-50 inset-0 bg-opacity-60 overflow-y-auto h-full`}>
        <div className="fixed left-[-20px] p-4 w-[50%] h-screen mt-[50px]">

          <div className="relative bg-[#282828] w-full rounded-lg shadow">

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

            <div className='m-4'>
              <h2 className='text-gray-100 text-center font-bold ml-4'>Participants</h2>
              {
                participants.map((members) => {
                  return <div key={members.email} className='flex mx-auto'>
                    <User className='m-2' size={20} color="#f4e1e1" />
                    <p className='text-slate-100 m-2'>{members.name}</p>
                    <RemoveParticipant isAdmin={members._id !== admin} id={members._id} name={members.name} groupId={groupId} participants={participants} showGroupParticipants={showGroupParticipants} />
                    {
                      admin === members._id ? <>
                        <p className='text-slate-200 p-2 border-2 border-solid border-green-600 rounded-xl text-sm'>Admin</p>
                      </> : <></>
                    }
                  </div>
                })
              }

            </div>
            <AddParticipant participants={participants} admin={admin} groupId={groupId} showGroupParticipants={showGroupParticipants} />
            <DeleteGroup checkDelete={checkDelete} isCheckDelete={isCheckDelete} admin={admin} participants={participants} groupId={groupId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutGroup