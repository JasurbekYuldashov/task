import {PrismaClient} from "@prisma/client";
import {makeId} from "@shared/functions";

const prisma = new PrismaClient();

async function saveMessage(
    userId?: number,
    channelId?: number,
    text?: string,
    file?: string
): Promise<any> {
    return await prisma.message.create({
        data: {
            text,
            file,
            channelId,
            userId,
        }
    });
}

async function getAll(channelId?: number): Promise<any> {
    return await prisma.message.findMany({
        where: {
            channelId
        }
    });
}


export default {
    saveMessage,
    getAll
} as const;
