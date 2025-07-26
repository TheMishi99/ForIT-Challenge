import { createTask, getTasks, TaskError, ValidationError } from "@/services/tasks.services";
import { CreateTaskDTO } from "@/types/task.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const tasks = await getTasks();
        return NextResponse.json({ tasks });
    } catch (error) {
        console.error('GET /api/tasks error:', error);

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as CreateTaskDTO;
        const newTask = await createTask(body);
        return NextResponse.json({ newTask }, { status: 201 });
    } catch (error) {
        console.error('POST /api/tasks error:', error);

        if (error instanceof ValidationError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
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