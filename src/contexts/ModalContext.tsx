"use client"
import { createContext, useContext, useMemo, useState } from "react";

const ModalContext = createContext<
    {
        isOpen: boolean,
        modalContent?: React.ReactNode
        openModal: (content: React.ReactNode) => void,
        closeModal: () => void
    }>(
        {
            isOpen: false,
            modalContent: undefined,
            openModal: () => ({}),
            closeModal: () => ({})
        }
    )

export default function ModalContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isOpen, setIsOpen] = useState<boolean>(() => false)
    const [modalContent, setModalContent] = useState<React.ReactNode>(() => undefined)

    function openModal(content: React.ReactNode) {
        setModalContent(content)
        setIsOpen(true);
    }

    function closeModal() {
        setModalContent(undefined)
        setIsOpen(false);
    }

    const modalContextProviderValues = useMemo(() => ({
        isOpen,
        modalContent,
        openModal,
        closeModal
    }), [isOpen])

    return <ModalContext.Provider value={modalContextProviderValues}>
        {children}
    </ModalContext.Provider>
}

export const useModal = () => useContext(ModalContext)