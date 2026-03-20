"use client"

import {Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/modal";
import {ReactNode} from "react";

interface CustomModalProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CustomModal = ({children, onClose, size = "xs", isOpen, title}: CustomModalProps) => {
    return <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalContent>
            <ModalHeader className={'border-b'}>
                <h3 className={'text-xl text-background font-semibold'}>{title}</h3>
            </ModalHeader>
            <ModalBody className={'space-y-4 py-6'}>{children}</ModalBody>
        </ModalContent>
    </Modal>
}

export default CustomModal