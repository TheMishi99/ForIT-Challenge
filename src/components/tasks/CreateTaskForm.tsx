"use client"
import { useModal } from "@/contexts/ModalContext"
import { useNotifications } from "@/contexts/NotificationsContext"
import { useTasks } from "@/contexts/TasksContext"
import { FormEvent, useState } from "react"

export default function CreateTaskForm() {
    const { closeModal } = useModal()
    const { addNotification } = useNotifications()
    const { addTask } = useTasks()
    const [title, setTitle] = useState<string>(() => "")
    const [description, setDescription] = useState<string>(() => "")
    const [completed, setCompleted] = useState<boolean>(() => false)
    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const taskSuccess = await addTask({ title, description, completed })
        if (taskSuccess) {
            addNotification("Tarea Creada con Exito")
            closeModal()
        }
    }
    return <form
        onSubmit={handleOnSubmit}
        className="w-full max-w-[250px] bg-white rounded-xl flex flex-col justify-center items-center p-2 gap-2 text-black"
    >
        <h2 className="text-xl">Crear Tarea</h2>
        <div className="input-group w-full flex flex-col justify-center items-start">
            <label htmlFor="title">Titulo</label>
            <input type="text" id="title" name="title" placeholder="Nueva Tarea" className="w-full border p-2 rounded-xl" onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="input-group w-full flex flex-col justify-center items-start">
            <label htmlFor="description">Descripcion</label>
            <textarea id="description" name="description" placeholder="Descripcion de Tarea" className="w-full border p-2 rounded-xl" onChange={(event) => setDescription(event.target.value)} />
        </div>
        <div className="input-group w-full flex justify-center items-center p-2 gap-2">
            <input type="checkbox" id="completed" name="completed" defaultChecked={false} onChange={(event) => setCompleted(event.target.checked)} />
            <label htmlFor="completed">Completada?</label>
        </div>
        <div className="w-full flex justify-between items-center p-2 gap-2">
            <button type="reset" className="p-2 rounded-xl hover:cursor-pointer bg-zinc-800 text-white" onClick={() => closeModal()}>Cancelar</button>
            <button type="submit" className="p-2 rounded-xl hover:cursor-pointer bg-green-500 text-white">Crear</button>
        </div>
    </form>
}