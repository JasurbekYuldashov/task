export type INIT_CHAT_TYPE = {
    users: number[]
}

export type MESSAGE_SEND_TYPE = {
    channelId: number,
    text: string,
    file?: string
}

export type TYPING_TYPE = {
    channelId: number,
}
