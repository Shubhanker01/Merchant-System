import React from 'react'
import { Users } from 'lucide-react'

function ShowGroups() {
  return (
    <>
      <div className='mt-[50px] fixed z-20'>
        <h1>Your Groups</h1>
        <div className='flex m-2 bg-zinc-900 cursor-pointer rounded-xl'>
          <Users className='m-2' color="#ebe5e5" />
          <div className='m-2'>
            <h1 className='text-slate-100 text-bold m-2'>Name</h1>
            <p className='text-slate-200'>23 Participants</p>
          </div>

        </div>

      </div>

    </>
  )
}

export default ShowGroups