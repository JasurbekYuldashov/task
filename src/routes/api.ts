import {Router} from 'express';
import userRouter from './user-router';
import channelRouter from "@routes/channel-router";
import messageRouter from "@routes/message-router";
import fileRouter from "@routes/file-router";


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/channel', channelRouter);
baseRouter.use('/message', messageRouter);
baseRouter.use('/file', fileRouter);


// *** Export default **** //

export default baseRouter;
