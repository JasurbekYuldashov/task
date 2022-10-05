import messageRepo from "@repos/message-repo";

function getAll(channelId:number): Promise<any> {
    return messageRepo.getAll(channelId);
}

export default {
    getAll,
} as const;
