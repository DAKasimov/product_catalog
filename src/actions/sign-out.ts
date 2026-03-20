"use server"

import {signOut} from "@/src/auth/auth";

export async function signOutFunc() {
    try {
        const result = await signOut({redirect: false});
        console.log('result', result)

    } catch (e) {
        console.error('Ошибка авторизации', e)
        throw e
    }
}