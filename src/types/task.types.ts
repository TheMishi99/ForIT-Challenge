export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}
export type CreateTaskDTO = Omit<Task, "id" | "createdAt" | "completed">
export type UpdateTaskDTO = Partial<Omit<Task, "id" | "createdAt">>