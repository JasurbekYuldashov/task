import {PrismaClient} from "@prisma/client";
import {makeId} from "@shared/functions";

const prisma = new PrismaClient();

async function initChat(users?: number[]): Promise<any> {
    const a: string = makeId();
    return await prisma.channel.create({
        data: {
            username: a,
            userId: users
        }
    });
}

async function getAll(userId?: number): Promise<any> {
    return await prisma.channel.findMany({
        where: {
            userId: {
                has: userId
            }
        }
    });
}

async function hasUser(userId?: number, channelId?: number): Promise<any> {
    return await prisma.channel.findFirst({
        where: {
            userId: {
                has: userId
            },
            id: channelId
        }
    });
}

async function getOne(id?: number): Promise<any> {
    return await prisma.channel.findUnique({
        where: {
            id
        }
    });
}


export default {
    initChat,
    getAll,
    getOne,
    hasUser
} as const;
