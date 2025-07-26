import { Task, CreateTaskDTO, UpdateTaskDTO } from "@/types/task.types"

// Custom error classes
export class TaskError extends Error {
    constructor(message: string, public statusCode: number = 400) {
        super(message)
        this.name = 'TaskError'
    }
}

export class TaskNotFoundError extends TaskError {
    constructor(id: string) {
        super(`Task with id ${id} not found`, 404)
        this.name = 'TaskNotFoundError'
    }
}

export class ValidationError extends TaskError {
    constructor(message: string) {
        super(message, 400)
        this.name = 'ValidationError'
    }
}

let tasks: Task[] = []

export async function getTasks(): Promise<Task[]> {
    try {
        return tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } catch (error) {
        console.error('Error getting tasks:', error)
        throw new TaskError('Failed to retrieve tasks', 500)
    }
}

export async function getTaskById(id: string): Promise<Task> {
    try {
        if (!id || id.trim() === '') {
            throw new ValidationError('Task ID is required')
        }

        const task = tasks.find(task => task.id === id)
        
        if (!task) {
            throw new TaskNotFoundError(id)
        }
        
        return task
    } catch (error) {
        if (error instanceof TaskError) {
            throw error
        }
        console.error('Error getting task by ID:', error)
        throw new TaskError('Failed to retrieve task', 500)
    }
}

export async function createTask(data: CreateTaskDTO): Promise<Task> {
    try {
        // Validating fields
        if (!data.title || data.title.trim() === '') {
            throw new ValidationError('Title is required')
        }
        
        if (!data.description || data.description.trim() === '') {
            throw new ValidationError('Description is required')
        }

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: data.title.trim(),
            description: data.description.trim(),
            completed: false,
            createdAt: new Date()
        }
        
        tasks.push(newTask)
        return newTask
    } catch (error) {
        if (error instanceof TaskError) {
            throw error
        }
        console.error('Error creating task:', error)
        throw new TaskError('Failed to create task', 500)
    }
}

export async function updateTask(id: string, data: UpdateTaskDTO): Promise<Task> {
    try {
        if (!id || id.trim() === '') {
            throw new ValidationError('Task ID is required')
        }

        const taskToUpdate = tasks.find(task => task.id === id)
        
        if (!taskToUpdate) {
            throw new TaskNotFoundError(id)
        }
        
        // Validating title if provided
        if (data.title !== undefined && (!data.title || data.title.trim() === '')) {
            throw new ValidationError('Title cannot be empty')
        }
        
        // Validating description if provided
        if (data.description !== undefined && (!data.description || data.description.trim() === '')) {
            throw new ValidationError('Description cannot be empty')
        }
        
        const updatedTask: Task = {
            ...taskToUpdate,
            ...(data.title && { title: data.title.trim() }),
            ...(data.description && { description: data.description.trim() }),
            ...(data.completed !== undefined && { completed: data.completed }),
            id // Ensure id is preserved
        }
        
        tasks = tasks.map(task => task.id === id ? updatedTask : task)
        return updatedTask
    } catch (error) {
        if (error instanceof TaskError) {
            throw error
        }
        console.error('Error updating task:', error)
        throw new TaskError('Failed to update task', 500)
    }
}

export async function deleteTask(id: string): Promise<Task> {
    try {
        if (!id || id.trim() === '') {
            throw new ValidationError('Task ID is required')
        }

        const deletedTask = tasks.find(task => task.id === id)
        
        if (!deletedTask) {
            throw new TaskNotFoundError(id)
        }
        
        tasks = tasks.filter(task => task.id !== id)
        return deletedTask
    } catch (error) {
        if (error instanceof TaskError) {
            throw error
        }
        console.error('Error deleting task:', error)
        throw new TaskError('Failed to delete task', 500)
    }
}
