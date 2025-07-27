import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "MISHITASKS | Tasks"
}

export default function TasksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}