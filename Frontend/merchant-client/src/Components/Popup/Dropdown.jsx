import React from 'react'
import { User } from 'lucide-react'

function Dropdown({ names, search, selectedParticipants, setSelectedParticipants }) {
    const select = () => {
        setSelectedParticipants([...selectedParticipants, "Name1"])
    }
    return (
        <>

            <div id="dropdown" className={`z-10 ${search.length == 0 ? 'hidden' : 'block'} fixed bg-gray-700 divide-y divide-gray-100 rounded-md shadow-sm w-[50%] left-28`}>
                <ul class="py-2 text-gray-100" aria-labelledby="dropdownDefaultButton">
                    {
                        names.map((user) => {
                            return <li key={user.id} onClick={select} className='hover:bg-gray-800 text-md flex cursor-pointer'>
                                <User className='m-2' size={20} color="#e6e0e0" />
                                <p className='m-2'>{user.name}</p>
                            </li>
                        })
                    }

                </ul>
            </div>
        </>
    )
}

export default Dropdown