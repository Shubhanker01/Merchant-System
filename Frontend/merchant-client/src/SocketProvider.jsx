import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const URL = `${import.meta.env.VITE_PROD_SERVER}`
const socketContext = createContext()
export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null)
    if (!socketRef.current) {
        socketRef.current = io(URL, {
            autoConnect: false
        })
    }
    useEffect(() => {
        const socket = socketRef.current
        socket.connect()
        // cleanup on unmount
        return () => {
            socket.disconnect()
        }
    }, [])
    return (
        <socketContext.Provider value={socketRef.current}>
            {children}
        </socketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(socketContext)
}

