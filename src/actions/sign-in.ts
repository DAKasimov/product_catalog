"use server"

import {signIn} from "@/src/auth/auth";

export async function signInWithCredentials(email : string, password: string) {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect : false
        })

        return

    } catch (e) {
        console.error('Ошибка авторизации', e)
        throw e
    }
}