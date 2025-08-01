import React, { useEffect, useState } from 'react'
import { Users, EllipsisVertical } from 'lucide-react'
import { showGroupChat } from '../../Async logic/createChatGroup'
import { useParams } from 'react-router-dom'
import AboutGroup from '../Popup/AboutGroup'
import { userSocket } from '../../socket'
import noOfUnreadMessages from '../../utils/unreadMessages'

function ShowGroups({ groups, showGroups, chatAdded, isChatAdded, showCurrentGroupChat, otherMessages, currentGroupChat }) {
  const params = useParams()
  let [checkDelete, isCheckDelete] = useState(false)
  const [modal, setModal] = useState(false)
  const [participants, showParticipants] = useState([])
  const [groupId, currentGroupId] = useState("")
  const [groupParticipants, showGroupParticipants] = useState([])
  const [admin, setAdmin] = useState("")


  useEffect(() => {
    // check if a new group is created
    if (chatAdded == true) {
      isChatAdded(false)
    }
    // to check if the group is deleted
    if (checkDelete == true) {
      setModal(false)
      isCheckDelete(false)
    }
    // shows only the group that the user is a part of 
    showGroupChat(params.userId).then((res) => {

      showGroups(res)
      showParticipants(res.map((group) => {
        return group.members
      }))
    }).catch((err) => {
      console.log(err)
    })

  }, [checkDelete, chatAdded])

  useEffect(() => {
    userSocket.emit('create-room', groups)
  }, [groups])

  if (groups.length == 0) {
    return <div>No groups to show</div>
  }

  const showGroupInfo = (groupId, participants, admin) => {
    // console.log("This group is clicked", groupId)
    setModal(true)
    currentGroupId(groupId)
    showGroupParticipants(participants)
    setAdmin(admin)
  }
  console.log(otherMessages)

  return (
    <>
      <div className='mt-[50px] h-full w-[80%]'>
        <h1 className='text-slate-200 ml-4 pt-4'>Your Groups</h1>
        {
          groups.map((group) => {
            // console.log(group)
            return (
              <div key={group._id}>
                <div className='flex items-center m-2 bg-zinc-900 cursor-pointer rounded-xl' onClick={() => { showCurrentGroupChat(group.name) }}>
                  <button onClick={() => { showGroupInfo(group._id, group.members, group.admin) }}>
                    <EllipsisVertical color="#e9e2e2" />
                  </button>

                  <Users className='m-2' color="#ebe5e5" />
                  <div className='m-2'>
                    <h1 className='text-slate-100 text-bold m-2'>{group.name}</h1>
                    <p className='text-slate-200'>{group.members.length} participants</p>
                  </div>
                  <div className='w-[30px] h-[25px] ml-2 justify-end bg-green-800 rounded-full text-slate-100'>
                    <p className='text-center'>
                      {noOfUnreadMessages(group.name, otherMessages)}
                    </p>
                  </div>
                </div>

              </div>
            )
          })
        }
        <AboutGroup groupId={groupId} modal={modal} setModal={setModal} participants={groupParticipants} admin={admin} checkDelete={checkDelete} isCheckDelete={isCheckDelete} showGroupParticipants={showGroupParticipants} />
      </div>
    </>
  )
}

export default ShowGroups