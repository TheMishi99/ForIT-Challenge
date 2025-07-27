"use client"
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const NotificationsContext = createContext<{ notifications: string[], addNotification: (newNotification: string) => void }>({ notifications: [], addNotification: () => ({}) })

export default function NotificationsContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [notifications, setNotifications] = useState<string[]>(() => [])
    const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

    function addNotification(newNotification: string) {
        // Crear un id para cada notificacion nueva
        const notificationId = `${newNotification}-${Date.now()}`
        setNotifications(prev => [...prev, newNotification])

        // Crear timeout para eliminar la notificación
        const timeoutId = setTimeout(() => {
            setNotifications(prev => prev.filter(notification => notification !== newNotification))
            timeoutsRef.current.delete(notificationId)
        }, 3000)

        // Guardar el timeout para poder limpiarlo si es necesario
        timeoutsRef.current.set(notificationId, timeoutId)
    }

    // Limpiar todos los timeouts cuando el componente se desmonte
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId))
            timeoutsRef.current.clear()
        }
    }, [])

    const notificationsContextProviderValues = useMemo(() => ({ notifications, addNotification }), [notifications])

    return <NotificationsContext.Provider value={notificationsContextProviderValues}>
        {children}
    </NotificationsContext.Provider>
}

export const useNotifications = () => useContext(NotificationsContext)