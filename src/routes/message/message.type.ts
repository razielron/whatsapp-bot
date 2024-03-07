import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export type MessageModel = {
    id?: number;
    status: string;
    text: string;
};

export const MessageSchema = z.object({
    id: z.number().optional(),
    status: z.string(),
    text: z.string(),
});

export const GetMessageSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const MessageCreateSchema = z.object({
    status: z.string(),
    text: z.string(),
});
