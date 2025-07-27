import { updateTask, deleteTask, TaskError, ValidationError, TaskNotFoundError } from "@/services/tasks.services";
import { UpdateTaskDTO } from "@/types/task.types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const body = await request.json() as UpdateTaskDTO;
        const updatedTask = await updateTask(id, body);
        return NextResponse.json({ updatedTask });
    } catch (error) {
        console.error('PUT /api/tasks/[id] error:', error);

        if (error instanceof ValidationError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        if (error instanceof TaskNotFoundError) {
            return NextResponse.json(
                { error: error.message },
                { status: 404 }
            );
        }

        if (error instanceof TaskError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const deletedTask = await deleteTask(id);
        return NextResponse.json({ deletedTask });
    } catch (error) {
        console.error('DELETE /api/tasks/[id] error:', error);

        if (error instanceof ValidationError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        if (error instanceof TaskNotFoundError) {
            return NextResponse.json(
                { error: error.message },
                { status: 404 }
            );
        }

        if (error instanceof TaskError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}