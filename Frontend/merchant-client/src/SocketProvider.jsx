import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const URL = `${import.meta.env.VITE_PROD_SERVER}`
const socketContext = createContext()
export const SocketProvider = ({ children }) => {
    const [socketInstance, setSocketInstance] = useState(null)
    useEffect(() => {
        const socket = io(URL, {
            autoConnect: false
        })
        setSocketInstance(socket)
        // cleanup on unmount
        return () => {
            socket.disconnect()
        }
    }, [])
    return (
        <socketContext.Provider value={socketInstance}>
            {children}
        </socketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(socketContext)
}

