import { CreateTaskDTO, Task, UpdateTaskDTO } from "@/types/task.types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TasksContext = createContext<
    {
        tasks: Task[],
        tasksLoading: boolean,
        tasksError: string | null,
        addTask: (createTaskData: CreateTaskDTO) => Promise<boolean>,
        editTask: (id: string, updateTaskData: UpdateTaskDTO) => Promise<boolean>,
        removeTask: (id: string) => Promise<boolean>
    }>({
        tasks: [],
        tasksLoading: true,
        tasksError: null,
        addTask: () => Promise.resolve(false),
        editTask: () => Promise.resolve(false),
        removeTask: () => Promise.resolve(false)
    })

export default function TasksContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [tasks, setTasks] = useState<Task[]>(() => [])
    const [tasksLoading, setTasksLoading] = useState<boolean>(() => true)
    const [tasksError, setTasksError] = useState<string | null>(() => null)

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("/api/tasks")
            if (!response.ok) {
                const data = await response.json() as { error: string }
                console.error(data.error)
            } else {
                const data = await response.json() as { tasks: Task[] }
                setTasks(data.tasks)
            }
            setTasksLoading(false)
        }
        fetchTasks();
    }, [])

    async function addTask(createTaskData: CreateTaskDTO) {
        const response = await fetch("/api/tasks", { method: "POST", body: JSON.stringify(createTaskData), headers: { "Content-Type": "application/json" } })
        if (!response.ok) {
            const data = await response.json() as { error: string }
            setTasksError(data.error)
            return false;
        } else {
            const data = await response.json() as { newTask: Task }
            setTasks((tasks) => {
                tasks.push(data.newTask)
                return tasks;
            })
            return true
        }
    }
    async function editTask(id: string, updateTaskData: UpdateTaskDTO) {
        const response = await fetch(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(updateTaskData), headers: { "Content-Type": "application/json" } })
        if (!response.ok) {
            const data = await response.json() as { error: string }
            setTasksError(data.error)
            return false;
        } else {
            const data = await response.json() as { updatedTask: Task }
            setTasks(tasks =>
                tasks.map(task => task.id === id ? data.updatedTask : task)
            )
            return true
        }
    }

    async function removeTask(id: string) {
        const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" })
        if (!response.ok) {
            const data = await response.json() as { error: string }
            setTasksError(data.error)
            return false;
        } else {
            const data = await response.json() as { deletedTask: Task }
            setTasks(tasks => tasks.filter(task => task.id !== data.deletedTask.id))
            return true;
        }
    }

    const tasksContextProviderValues = useMemo(() =>
    ({
        tasks,
        tasksLoading,
        tasksError,
        addTask,
        editTask,
        removeTask
    })
        , [tasks, tasksLoading, tasksError])

    return <TasksContext.Provider value={tasksContextProviderValues}>
        {children}
    </TasksContext.Provider>
}

export const useTasks = () => useContext(TasksContext)