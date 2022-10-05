import channelRepo from "@repos/channel-repo";

function getAll(userId?:number): Promise<any> {
    return channelRepo.getAll(userId);
}

export default {
    getAll,
} as const;
