import userRepo, {UserType} from '@repos/user-repo';
import {User} from "@prisma/client";


// **** Functions **** //

/**
 * Get all users
 */
function getAll(): Promise<User[]> {
    return userRepo.getAll();
}

/**
 * Add one user
 */
function addOne(user: UserType): Promise<any> {
    return userRepo.add(user);
}

/**
 * Update one user
 */
async function updateOne(id: number, user: UserType): Promise<User> {
    return userRepo.update(id,user);
}

/**
 * Delete a user by their id
 */
async function _delete(id: number): Promise<User> {
    return userRepo.delete(id);
}

async function login(username:string,password:string): Promise<any> {
    return userRepo.login(username,password);
}


// **** Export default **** //

export default {
    getAll,
    addOne,
    updateOne,
    delete: _delete,
    login
} as const;
