import React from 'react'
import { useEffect, useState } from "react"
import { Bell, Clock, CheckCircle } from "lucide-react"
import { readProjectNotifications } from '../../Async logic/projectNotification'
import { useParams } from 'react-router-dom'
import NavbarApp from '../Header/NavbarApp.jsx'
import { useNotification } from '../../Context/NotificationContext.jsx'

function Notification() {
    const { userId } = useParams()
    const { decrement } = useNotification()
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await readProjectNotifications(userId)
            setNotifications(response.notifications)
        }
        fetchNotifications()
        setLoading(false)
        decrement()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-600">Loading notifications...</div>
            </div>
        )
    }
    return (
        <>
            <NavbarApp />
            <div className="max-w-3xl mx-auto px-4 py-24">
                <div className="flex items-start gap-2 mb-6">
                    <Bell className="text-blue-600 w-6 h-6" />
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Notifications
                    </h2>
                </div>

                {notifications.length === 0 ? (
                    <div className="text-gray-500 text-center py-10">
                        No new notifications 🎉
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((n) => (
                            <div
                                key={n._id}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition p-4 flex items-start justify-between"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {n.isRead ? (
                                            <CheckCircle className="text-green-500 w-5 h-5" />
                                        ) : (
                                            <Bell className="text-blue-500 w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-gray-800 dark:text-gray-100 font-medium">
                                            {n.message}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">{n.bidderName}</span> placed a bid of{" "}
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                                ₹{n.price.toLocaleString()}
                                            </span>
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(n.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Notification