import StatusCodes from 'http-status-codes';
import {Request, Response, Router} from 'express';

import userService from '@services/user-service';
import {ParamMissingError} from '@shared/errors';
import {IReq} from 'src/types/express';
import {UserType} from "@repos/user-repo";


// **** Variables **** //

// Misc
const router = Router();
const {CREATED, OK} = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    login: '/login',
    delete: '/delete/:id',
} as const;


// **** Routes **** //

/**
 * Get all users
 */
router.get(p.get, async (_: Request, res: Response) => {
    const users = await userService.getAll();
    return res.status(OK).json({users});
});

router.post(p.login, async (_: IReq<{ username: string, password: string }>, res: Response) => {
    const {username, password} = _.body;
    const token = await userService.login(username, password);
    return res.status(OK).json(token);
});

/**
 * Add one user
 */
router.post(p.add, async (req: IReq<UserType>, res: Response) => {
    const user = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    try {
        const user1 = await userService.addOne(user);
        return res.status(CREATED).json(user1);
    } catch (e) {
        return res.status(400).json({error: "username is unique"});
    }
});

/**
 * Update one user
 */
router.put(p.update, async (req: IReq<{ user: UserType, id: number }>, res: Response) => {
    const {user, id} = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.updateOne(id, user);
    return res.status(OK).end();
});

/**
 * Delete one user
 */
router.delete(p.delete, async (req: Request, res: Response) => {
    const {id} = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.delete(Number(id));
    return res.status(OK).end();
});


// **** Export default **** //

export default router;
