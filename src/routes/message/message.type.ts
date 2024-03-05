import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export type MessageModel = {
    id?: number;
    text: string;
};

export const MessageSchema = z.object({
    id: z.number().optional(),
    text: z.string(),
});

export const GetMessageSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const MessageCreateSchema = z.object({
    text: z.string(),
});
