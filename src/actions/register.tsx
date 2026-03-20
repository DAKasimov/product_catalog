"use server"

import {IFormData} from "@/src/types/form-data";
import prisma from "@/src/utils/prisma";
import {saltAndHashPassword} from "@/src/utils/password";

export async function registerUser(formData: IFormData) {
    const {email, password, confirmPassword} = formData

    if (password !== confirmPassword) {
        return {error: "Пароли не совпадают"}
    }

    if (password.length < 6) {
        return {error: 'Пароль должен быть не менее 6 символов'}
    }

    try {

        const existingUser = await prisma.user.findUnique({where: {email: email}})

        if (existingUser) {
            return {error: 'Пользователь с таким Email уже существует'}
        }

        const pwHash = await saltAndHashPassword(password)
        const user = await prisma.user.create({
            data: {
                email: email,
                password: pwHash,
            }
        })

        return user

    } catch (e) {
        console.error(e)
        return {error: 'Ошибка регистрации'}
    }


}