import { createContext, useContext, useState } from "react";
const NotificationContext = createContext()


export const NotificationProvider = ({ children }) => {
    const [notificationCount, setNotificationCount] = useState(0)

    const increment = () => {
        setNotificationCount(prev => prev + 1)
    }
    const decrement = (prev) => {
        setNotificationCount((prev) => (prev > 0 ? prev - 1 : 0))
    }

    return (
        <NotificationContext.Provider value={{ notificationCount, setNotificationCount, increment, decrement }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}