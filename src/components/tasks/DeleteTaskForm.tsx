"use client"
import { useModal } from "@/contexts/ModalContext"
import { useNotifications } from "@/contexts/NotificationsContext"
import { useTasks } from "@/contexts/TasksContext"
import { Task } from "@/types/task.types"
import { FormEvent } from "react"

export default function DeleteTaskForm({ data }: { data: Task }) {
    const { closeModal } = useModal()
    const { addNotification } = useNotifications()
    const { removeTask } = useTasks()
    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const taskSuccess = await removeTask(data.id)
        if (taskSuccess) {
            addNotification("Tarea Eliminada con Exito")
            closeModal()
        }
    }
    return <form
        onSubmit={handleOnSubmit}
        className="w-full max-w-[250px] bg-white rounded-xl flex flex-col justify-center items-center p-2 gap-2 text-black"
    >
        <h2 className="text-xl">Eliminar Tarea</h2>
        <p>¿Estas seguro que deseas eliminar la tarea <span className="font-bold">'{data.title}'</span>?</p>

        <div className="w-full flex justify-between items-center p-2 gap-2">
            <button type="reset" className="p-2 rounded-xl hover:cursor-pointer bg-zinc-800 text-white" onClick={() => closeModal()}>Cancelar</button>
            <button type="submit" className="p-2 rounded-xl hover:cursor-pointer bg-red-500 text-white">Eliminar</button>
        </div>
    </form>
}