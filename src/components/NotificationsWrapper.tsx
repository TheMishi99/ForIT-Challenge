"use client"
import { useNotifications } from "@/contexts/NotificationsContext"

export default function NotificationsWrapper() {
    const { notifications } = useNotifications()
    return <ul id="notifications" className="fixed right-5 bottom-15 flex flex-col-reverse justify-center items-center p-2 gap-2">
        {notifications.map((notification, index) =>
            <li key={index + notification}
                className="p-2 bg-zinc-700 rounded-xl">
                {notification}
            </li>)
        }
    </ul>
}