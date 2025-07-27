"use client"

import { useModal } from "@/contexts/ModalContext"
import { useEffect, useRef } from "react";

export default function ModalWrapper() {
    const { isOpen, modalContent, closeModal } = useModal()
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal()
            }
        }


        if (isOpen) {
            window.addEventListener("mousedown", handleMouseClickOutside)
        }

        return () => window.removeEventListener("mousedown", handleMouseClickOutside)
    }, [isOpen])

    if (!isOpen) return null;

    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div ref={modalRef} className="bg-white p-4 rounded shadow-lg z-50">
            {modalContent}
        </div>
    </div>
}