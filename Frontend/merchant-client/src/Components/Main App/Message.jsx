import React, { useEffect, useRef, useState } from 'react'
import { sendMessage } from '../../Async logic/message'
import { nanoid } from 'nanoid'
import { userSocket } from '../../socket'
import decodeToken from '../../utils/decodeJwt'
import getCookie from '../../utils/getCookie'
import { User } from 'lucide-react'
import { toast } from 'react-toastify'

function Message({ currentGroupChat }) {
    let token = getCookie()
    let user = decodeToken(token)
    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState('')
    // let [currentGroup, setCurrentGroup] = useState({ group: '', messages: [] })
    const messageEndRef = useRef(null)

    const sendMsg = () => {
        if (message.trim === '') return
        else {
            let newMsg = {
                user: user.name,
                id: nanoid(),
                text: message,
                timestamp: new Date()
            }
            sendMessage('group1', message).then((res) => {
                // console.log(res)
                // emit message to the server
                userSocket.emit('send-message', { room: currentGroupChat, message: newMsg })
            }).catch((err) => {
                console.log(err)
            })
        }

        setMessage('')
    }

    useEffect(() => {
        console.log("I am called")
        userSocket.on('message', (arg) => {
            console.log(arg.room)
            console.log(currentGroupChat)
            // check if the message sent by other user is of the same group
            // check if someone else is sending the message
            if (arg.message.user !== user.name) {
                console.log("Someone else is sending the message")
                if (arg.room !== currentGroupChat) {
                    toast.info(`${arg.message.user} has sent you a message in other group please check`)
                }
                else {
                    setMessages([...messages, arg.message])
                }
            }

        })

        messageEndRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])

    useEffect(() => {
        console.log(`I am currently in ${currentGroupChat}`)
        console.log(`Messages of ${currentGroupChat}`)
        setMessages([])
    }, [currentGroupChat])
    console.log(messages)
    return (
        <>

            <div className="my-6 p-4 bg-gray-800 h-[85%] w-[100%] mr-4">
                <div className="fixed h-[70%] bg-gray-800 p-4 rounded shadow mb-4 overflow-y-auto w-[80%]">
                    <h1 className='text-gray-200'>{currentGroupChat || "Please Select Group to continue chatting"}</h1>
                    {messages.map((msg) => (
                        <div key={msg.id} className="p-2 bg-gray-700 border-b">
                            <div className='flex'>
                                <User color="#e7dada" />
                                <p className='text-gray-200 ml-2'>{msg.user}</p>
                            </div>
                            <p className="text-gray-100">{msg.text}</p>
                            <span className="text-xs text-gray-100">
                                {msg.timestamp}
                            </span>
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
                </div>

                {/* <div className="fixed sm:w-[45%] w-[70%] sm:bottom-[20px] bottom-[10px] flex gap-2">
                    <input
                        type="text"
                        className="flex-1 text-white p-2 border bg-slate-700 rounded"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled"
                        onClick={sendMsg} disabled={message === '' ? true : false}
                    >
                        Send
                    </button>
                </div> */}
            </div>
            <div className="fixed sm:w-[45%] w-[70%] sm:bottom-[20px] bottom-[10px] flex gap-2">
                <input
                    type="text"
                    className="flex-1 text-white p-2 border bg-slate-700 rounded"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={currentGroupChat === '' ? true : false}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled"
                    onClick={sendMsg} disabled={message === '' ? true : false}
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default Message