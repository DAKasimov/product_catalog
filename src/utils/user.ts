"use server"

import prisma from "@/src/utils/prisma";

export async function getUserFromDb(email ?: string) {
    return prisma.user.findFirst({
        where: { email },
    })
}