"use client"
import { useModal } from "@/contexts/ModalContext"
import { useNotifications } from "@/contexts/NotificationsContext"
import { useTasks } from "@/contexts/TasksContext"
import { Task } from "@/types/task.types"
import { FormEvent, useState } from "react"

export default function UpdateTaskForm({ data }: { data: Task }) {
    const { closeModal } = useModal()
    const { addNotification } = useNotifications()
    const { editTask } = useTasks()
    const [title, setTitle] = useState<string>(() => data.title ?? "")
    const [description, setDescription] = useState<string>(() => data.description ?? "")
    const [completed, setCompleted] = useState<boolean>(() => data.completed ?? false)
    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const taskSuccess = await editTask(data.id, { title, description, completed })
        if (taskSuccess) {
            addNotification("Tarea Modificada con Exito")
            closeModal()
        }
    }
    return <form
        onSubmit={handleOnSubmit}
        className="w-full max-w-[250px] bg-white rounded-xl flex flex-col justify-center items-center p-2 gap-2 text-black"
    >
        <h2 className="text-xl">Editar Tarea</h2>
        <div className="input-group w-full flex flex-col justify-center items-start">
            <label htmlFor="title">Titulo</label>
            <input type="text" id="title" name="title" placeholder="Nueva Tarea" defaultValue={data.title} className="w-full border p-2 rounded-xl" onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="input-group w-full flex flex-col justify-center items-start">
            <label htmlFor="description">Descripcion</label>
            <textarea id="description" name="description" placeholder="Descripcion de Tarea" defaultValue={data.description} className="w-full border p-2 rounded-xl" onChange={(event) => setDescription(event.target.value)} />
        </div>
        <div className="input-group w-full flex justify-center items-center p-2 gap-2">
            <input type="checkbox" id="completed" name="completed" defaultChecked={data.completed} onChange={(event) => setCompleted(event.target.checked)} />
            <label htmlFor="completed">Completada?</label>
        </div>
        <div className="w-full flex justify-between items-center p-2 gap-2">
            <button type="reset" className="p-2 rounded-xl hover:cursor-pointer bg-zinc-800 text-white" onClick={() => closeModal()}>Cancelar</button>
            <button type="submit" className="p-2 rounded-xl hover:cursor-pointer bg-blue-500 text-white">Editar</button>
        </div>
    </form>
}