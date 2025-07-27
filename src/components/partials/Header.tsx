"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname()
    return (
        <header className="w-full bg-zinc-900 flex flex-col md:flex-row justify-between items-center p-2 gap-2">
            <div className="w-full flex justify-center items-center p-2 gap-2">
                <h1>
                    <Link href="/" className="bg-white p-2 text-black rounded-xl text-2xl font-bold">MISHITASKS</Link>
                </h1>
                <Image src={"/forit_software_factory_logo.jpeg"} alt={"ForIT Logo"} width={100} height={100} className="rounded-xl" />
            </div>
            <ul className="w-full flex justify-center items-center p-2 gap-2">
                <li className="flex justify-center items-center">
                    <Link href="/" className={`p-2 rounded-xl hover:bg-gray-900 hover:text-white ${pathname === "/" ? "bg-gray-800" : "bg-white text-black"}`}>Inicio</Link>
                </li>
                <li className="flex justify-center items-center">
                    <Link href="/tasks" className={`p-2 rounded-xl hover:bg-gray-900 hover:text-white ${pathname === "/tasks" ? "bg-gray-800" : "bg-white text-black"}`}>Tareas</Link>
                </li>
            </ul>
        </header>
    )
}