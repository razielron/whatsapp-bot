import { z } from 'zod';

export type BotModel = {
    phoneNumber: string;
    clientMessage: string;
    previusStatus: string;
    newStatus: string;
    responseMessage: string;
};

export const BotRespondSchema = z.object({
    phoneNumber: z.string(),
    clientMessage: z.string(),
});
