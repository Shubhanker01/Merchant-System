import React, { useEffect, useRef, useState } from 'react'
import NavbarApp from '../Header/NavbarApp'
import { nanoid } from 'nanoid'

function Message() {
    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState('')
    const messageEndRef = useRef(null)

    const sendMessage = () => {
        if (message.trim === '') return
        setMessages([...messages, { text: message, timestamp: new Date() }])
        setMessage('')
    }
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])
    return (
        <>
            <NavbarApp />
            <div className="w-full fixed mx-auto my-6 p-4 bg-gray-800 h-full">
                <div className="fixed top-[50px] h-[75%] bg-gray-800 p-4 rounded shadow mb-4 overflow-y-auto w-[70%]">
                    {messages.map((msg) => (
                        <div key={nanoid()} className="p-2 border-b">
                            <p className="text-gray-100">{msg.text}</p>
                            <span className="text-xs text-gray-100">
                                {msg.timestamp.toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
                </div>

                <div className="fixed w-[70%] bottom-[60px] flex gap-2">
                    <input
                        type="text"
                        className="flex-1 text-white p-2 border bg-slate-700 rounded"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    )
}

export default Message