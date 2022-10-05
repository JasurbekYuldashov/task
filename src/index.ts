import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import envVars from '@shared/env-vars';
import server from './server';
import {Server} from "socket.io";
import events from './constants/event';
import userRepo from "@repos/user-repo";
import ChannelRepo from "@repos/channel-repo";
import messageRepo from "@repos/message-repo";
import {INIT_CHAT_TYPE, MESSAGE_SEND_TYPE, TYPING_TYPE} from "./types/socket";
import channelRepo from "@repos/channel-repo";

// Constants
const serverStartMsg = 'Express server started on port: ';

// Start server
server.listen(envVars.port, () => {
    logger.info(serverStartMsg + envVars.port.toString());
});

const io = new Server();


io.on("connection", (socket) => {
    socket.on(events.INIT_CHATS, async (cb: INIT_CHAT_TYPE) => {
        const {users} = cb;
        const channel = await ChannelRepo.initChat([socket.handshake.auth.id, ...users]);
        io.emit(events.INIT_CHATS, ({channel}));
    });

    socket.on(events.MESSAGE_SEND, async (cb: MESSAGE_SEND_TYPE) => {
        const {
            channelId,
            text,
            file
        } = cb;
        const message = await messageRepo.saveMessage(
            socket.handshake.auth.id,
            channelId,
            text,
            file
        );
        const channel = await channelRepo.getOne(channelId);
        socket.join(`channel.username_${socket.handshake.auth.id}`);
        Array.isArray(channel.userId) && channel.userId.map(async (r: string) => {
            io.to(`channel.username_${r}`).emit(events.MESSAGE_SEND, ({message, channel}));
        });
    });

    socket.on(events.TYPING, async (cb: TYPING_TYPE) => {
        const {channelId} = cb;
        const channel = await channelRepo.getOne(channelId);
        Array.isArray(channel.userId) && channel.userId.map(async (r: string) => {
            io.to(`channel.username_${r}`).emit(events.MESSAGE_SEND, ({typing:true}));
        });
    });
});

io.use((socket, next) => {
    const user = atob(socket.handshake.headers["authorization"] || "");
    userRepo.getOneByToken(JSON.parse(user)).then(r => {
        if (r) {
            socket.handshake.auth = r;
            next();
        } else {
            socket.disconnect();
            next(new Error("retry to reconnect"));
        }
    }).catch(e => {
        socket.disconnect();
        next(new Error("retry to reconnect"));
    });
});

io.listen(89, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: false,
    }, transports: ["websocket"]
});
