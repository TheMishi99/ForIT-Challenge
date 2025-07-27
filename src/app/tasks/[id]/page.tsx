"use client"

import { useTasks } from "@/contexts/TasksContext"
import { Check, X } from "lucide-react";
import { useParams } from "next/navigation"

export default function TaskItem() {
    const { id } = useParams()
    const { tasks } = useTasks();
    const taskFound = tasks.find(task => task.id === id)
    return <main className="w-full flex flex-1 justify-center items-center">
        {!taskFound ?
            <p>No se encontro una tarea con ID {id}</p> :
            <div className="flex flex-col justify-center items-center p-2 gap-2">
                <p className="flex justify-center items-center p-2 gap-2">Tarea: {taskFound.title}</p>
                <p className="flex justify-center items-center p-2 gap-2">Descripcion: {taskFound.description}</p>
                <p className="flex justify-center items-center p-2 gap-2">Completado: {taskFound.completed ? <Check className="text-green-500" /> : <X className="text-red-500" />}</p>
                <p className="flex justify-center items-center p-2 gap-2">
                    Creado: {new Date(taskFound.createdAt).getDate()}/{new Date(taskFound.createdAt).getMonth()}/{new Date(taskFound.createdAt).getFullYear()}
                </p>
            </div>}
    </main>
}