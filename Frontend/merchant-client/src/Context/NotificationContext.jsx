import { createContext, useContext, useState } from "react";
const NotificationContext = createContext()
import { getNotificationCount } from "../Async logic/projectNotification";
import { useEffect } from "react";

export const NotificationProvider = ({ children }) => {
    const [notificationCount, setNotificationCount] = useState(0)

    const increment = (prev) => {
        setNotificationCount((prev) => prev + 1)
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