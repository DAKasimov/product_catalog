"use client"

import CustomModal from "@/src/components/common/modal";
import LoginForm from "@/src/forms/login.form";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({isOpen, onClose} : LoginModalProps) => {
    return <CustomModal isOpen={isOpen} onClose={onClose} title={'Авторизация'}>
        <LoginForm onClose={onClose}/>
    </CustomModal>
}

export default LoginModal