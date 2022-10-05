import StatusCodes from 'http-status-codes';
import {Response, Router} from 'express';

import {IReqQuery} from 'src/types/express';
import messageService from "@services/message-service";
import userRepo from "@repos/user-repo";
import channelRepo from "@repos/channel-repo";

const router = Router();
const {OK} = StatusCodes;

export const p = {
    get: '/all',
} as const;

router.get(p.get, async (_: IReqQuery<any>, res: Response) => {
    const {query: {channelId}} = _;
    const userId = _.user;
    const user = await userRepo.getOneByToken(userId);
    if (!user) {
        return res.status(401).json({error: "Unauthorized"});
    }
    const channel = await channelRepo.hasUser(user.id, +channelId);
    if (!channel) {
        return res.status(400).json({error: "Not found channel"});
    }
    const messages = await messageService.getAll(+channelId);
    return res.status(OK).json({messages});
});

export default router;
