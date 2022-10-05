import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient();

// **** Functions **** //
export type UserType = {
    username: string,
    password: string
}

/**
 * Get one user
 */
async function getOne(id: number): Promise<User | null> {
    return prisma.user.findUnique({where: {id: +id}});
}

async function getOneByToken(user: any): Promise<any> {
    return prisma.user.findFirst({where:user});
}

/**
 * Get all users.
 */
async function getAll(): Promise<User[]> {
    return prisma.user.findMany();
}

/**
 * Add one user.
 */
async function add(user: UserType): Promise<any> {
    await prisma.user.create({data: user});
    const token = btoa(JSON.stringify({username: user.username, password: user.password}));
    return {token};
}

/**
 * Update a user.
 */
async function update(id: number, user: UserType): Promise<User> {
    return await prisma.user.update({where: {id: +id}, data: user});
}

/**
 * Delete one user.
 */
async function _delete(id: number): Promise<User> {
    return await prisma.user.delete({where: {id: +id}});
}


async function login(username: string, password: string): Promise<any> {
    const user = await prisma.user.findFirst({where: {username: username, password: password}});
    if (user) {
        const token = btoa(JSON.stringify({username: username, password: password}));
        return {token};
    } else {
        return {error: "Not found"};
    }
}

// **** Export default **** //

export default {
    getOne,
    getAll,
    add,
    update,
    delete: _delete,
    login,
    getOneByToken
} as const;
