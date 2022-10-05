import StatusCodes from 'http-status-codes';
import {Response, Router} from 'express';

import channelService from "@services/channel-service";
import userRepo from "@repos/user-repo";

const router = Router();
const {OK} = StatusCodes;

export const p = {
    get: '/all',
} as const;

router.get(p.get, async (_, res: Response) => {
    const userId= _.user
    const user = await userRepo.getOneByToken(userId)
    if (!user){
        return res.status(401).json({error:"Unauthorized"});

    }
    const channels = await channelService.getAll(user.id);
    return res.status(OK).json({channels});
});

export default router;
