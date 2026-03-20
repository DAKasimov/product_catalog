"use client"

import CustomModal from "@/src/components/common/modal";
import RegistrationForm from "@/src/forms/registration.form";

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal = ({isOpen, onClose} : RegistrationModalProps) => {
    return <CustomModal isOpen={isOpen} onClose={onClose} title={'Создать аккаунт'}>
        <RegistrationForm onClose={onClose}/>
    </CustomModal>
}

export default RegistrationModal