"use client";

import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TasksList from "@/components/tasks/TasksList";
import { useModal } from "@/contexts/ModalContext";
import { useTasks } from "@/contexts/TasksContext";
import { Loader } from "lucide-react";

export default function TasksPage() {
    const { tasks, tasksLoading } = useTasks()
    const { openModal } = useModal()
    return <main className="w-full flex flex-1 flex-col justify-start items-center p-2 gap-2">
        <h2 className="text-xl">Estas son tus tareas</h2>
        <button type="button"
            className="bg-gray-800 p-2 rounded-xl hover:cursor-pointer hover:bg-gray-700"
            onClick={() => openModal(<CreateTaskForm />)}>
            Añadir Tarea
        </button>
        {tasksLoading ? <Loader className="animate-spin" /> :
            <TasksList tasks={tasks} />}
    </main>
}