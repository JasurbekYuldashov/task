import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import logger from 'jet-logger';

import express, {Request, Response, NextFunction} from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from '@routes/api';
import envVars from '@shared/env-vars';
import {CustomError} from '@shared/errors';

// **** Variables **** //

const app = express();

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
if (envVars.nodeEnv === 'development') {
    app.use(morgan('dev'));
}

if (envVars.nodeEnv === 'production') {
    app.use(helmet());
}


app.use((req, res, next) => {
    try {
        let encodedStringAtoB: string | undefined;
        // eslint-disable-next-line prefer-const
        encodedStringAtoB = req.header("authorization");
        const decodedStringAtoB = atob(encodedStringAtoB||"");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        req.user = JSON.parse(decodedStringAtoB);
    } catch (e) {
        req.user = undefined;
    }
    next();
});


// **** Add API Routes ****# //

// Add api router
app.use('/api', apiRouter);

// Error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error | CustomError, req: Request, res: Response, _: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});

// **** Serve front-end content **** //

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public');
const uploadDir = path.join(__dirname, 'upload');
app.use(express.static(staticDir));
app.use(express.static(uploadDir));

// app.get('*', (_: Request, res: Response) => {
//     res.sendFile('index.html', {root: viewsDir});
// });

export default app;
