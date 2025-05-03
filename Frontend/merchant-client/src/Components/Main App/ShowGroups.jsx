import React, { useEffect, useState } from 'react'
import { Users, EllipsisVertical } from 'lucide-react'
import { showGroupChat } from '../../Async logic/createChatGroup'
import { useParams } from 'react-router-dom'
import AboutGroup from '../Popup/AboutGroup'

function ShowGroups({ groups, showGroups }) {
  const params = useParams()
  // const [groups, showGroups] = useState([])
  const [modal, setModal] = useState(false)
  const [participants, showParticipants] = useState([])

  useEffect(() => {
    showGroupChat(params.userId).then((res) => {
      showGroups(res)
      showParticipants(res.map((group) => {
        return group.members
      }))
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  if (groups.length == 0) {
    return <div>No groups to show</div>
  }
  return (
    <>
      {console.log(groups)}
      <div className='mt-[50px] fixed z-20'>
        <h1 className='text-slate-200'>Your Groups</h1>
        {
          groups.map((group) => {
            return <div key={group._id} className='flex items-center m-2 bg-zinc-900 cursor-pointer rounded-xl'>
              <button onClick={() => { setModal(true) }}>
                <EllipsisVertical color="#e9e2e2" />
              </button>

              <Users className='m-2' color="#ebe5e5" />
              <div className='m-2'>
                <h1 className='text-slate-100 text-bold m-2'>{group.name}</h1>
                <p className='text-slate-200'>{group.members.length} participants</p>
              </div>
              <AboutGroup groupId={group._id} modal={modal} setModal={setModal} participants={group.members} admin={group.admin} />
            </div>


          })
        }


      </div>

    </>
  )
}

export default ShowGroups