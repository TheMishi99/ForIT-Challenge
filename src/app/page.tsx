import Link from "next/link";

export default function HomePage() {
  return <main className="w-full flex flex-1 flex-col justify-center items-center p-2 gap-2 text-center">
    <h2>Bienvenido a MISHITASKS, tu app para la gestion de tareas.</h2>
    <p>Para continuar, por favor dirijase a la pestaña de tareas</p>
    <Link href="/tasks" className="underline hover:text-zinc-600">Ir a mis tareas</Link>
  </main>
}