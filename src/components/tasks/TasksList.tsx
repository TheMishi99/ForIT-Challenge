"use client"
import { useModal } from "@/contexts/ModalContext";
import { Task } from "@/types/task.types";
import { Check, Pen, Trash2, X } from "lucide-react";
import Link from "next/link";
import UpdateTaskForm from "./UpdateTaskForm";
import DeleteTaskForm from "./DeleteTaskForm";

export default function TasksList({ tasks }: { tasks: Task[] }) {
    const { openModal } = useModal()
    if (tasks.length === 0) return <p>No tienes tareas aun</p>
    return (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 gap-2">
            {tasks.map(task =>
                <li key={task.id} className="flex flex-col justify-center items-center p-2 gap-2 border border-gray-800 rounded-xl">
                    <p className="flex justify-center items-center p-2 gap-2">
                        Tarea: {task.title}
                    </p>
                    <p className="flex justify-center items-center p-2 gap-2">
                        Completado: {task.completed ? <Check className="text-green-400" /> : <X className="text-red-400" />}
                    </p>
                    <div className="flex justify-center items-center p-2 gap-2">
                        <Link href={`/tasks/${task.id}`} className="p-2 bg-white text-black rounded-xl">
                            Ver Detalle
                        </Link>
                        <button type="button" className="bg-blue-500 rounded-xl p-2 hover:cursor-pointer" onClick={() => openModal(<UpdateTaskForm data={task} />)}><Pen /></button>
                        <button type="button" className="bg-red-500 rounded-xl p-2 hover:cursor-pointer" onClick={() => openModal(<DeleteTaskForm data={task} />)}><Trash2 /></button>
                    </div>
                </li>)
            }
        </ul>
    )
}