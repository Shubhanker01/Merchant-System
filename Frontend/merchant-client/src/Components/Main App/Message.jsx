import React, { useEffect, useRef, useState } from 'react'
import { sendMessage } from '../../Async logic/message'
import { nanoid } from 'nanoid'
import { socket } from '../../socket'

function Message({ currentGroupChat }) {

    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState('')
    const messageEndRef = useRef(null)

    const sendMsg = () => {
        if (message.trim === '') return
        else {
            let newMsg = {
                id: nanoid(),
                text: message,
                timestamp: new Date()
            }
            setMessages([...messages, newMsg])
            sendMessage('group1', message).then((res) => {
                console.log(res)
                socket.emit('send-message', newMsg)
            }).catch((err) => {
                console.log(err)
            })
        }

        setMessage('')
    }
    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    }, [])
    useEffect(() => {
        socket.on('messages', (arg) => {
            console.log(arg)
            setMessages(arg)
        })
        messageEndRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])
    return (
        <>
            <div className="my-6 p-4 bg-gray-800 h-[85%] w-[100%] mr-4">
                <div className="h-[90%] bg-gray-800 p-4 rounded shadow mb-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className="p-2 border-b">
                            <p className="text-gray-100">{msg.text}</p>
                            {/* <span className="text-xs text-gray-100">
                                {msg.timestamp.toLocaleTimeString()}
                            </span> */}
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
                </div>

                <div className="fixed sm:w-[45%] w-[70%] sm:bottom-[50px] bottom-[20px] flex gap-2">
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
                </div>
            </div>

        </>
    )
}

export default Message