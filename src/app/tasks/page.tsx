"use client";

import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TasksList from "@/components/tasks/TasksList";
import { useModal } from "@/contexts/ModalContext";
import { useTasks } from "@/contexts/TasksContext";
import { Loader } from "lucide-react";
import { useState, FormEvent } from "react";

export default function TasksPage() {
    const { tasks, tasksLoading } = useTasks()
    const { openModal } = useModal()
    const [term, setTerm] = useState<string>(() => "")
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    return <main className="w-full flex flex-1 flex-col justify-start items-center p-2 gap-2">
        <h2 className="text-xl">Estas son tus tareas</h2>
        <button type="button"
            className="bg-gray-800 p-2 rounded-xl hover:cursor-pointer hover:bg-gray-700"
            onClick={() => openModal(<CreateTaskForm />)}>
            Añadir Tarea
        </button>
        {tasksLoading ? <Loader className="animate-spin" /> :
            <><form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col justify-center items-center p-2 gap-2">
                <div className="input-group w-full flex justify-center items-center p-2 gap-2">
                    <input
                        type="text"
                        name="term"
                        id="term"
                        placeholder="Buscar por titulo de tarea o descripcion"
                        className="w-full p-2 rounded-xl border border-zinc-700"
                        onChange={event => setTerm(event.target.value)} />
                </div>
            </form>
                <TasksList tasks={tasks.filter(task => task.title.toLowerCase().includes(term.toLowerCase()))} /></>}
    </main>
}