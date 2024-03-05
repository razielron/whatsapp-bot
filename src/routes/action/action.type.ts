import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { Message } from '@/routes/message/message.entity';
import { Status } from '@/routes/status/status.entity';

export enum ActionType {
    INITIAL = 'INITIAL',
    REGULAR = 'REGULAR',
}

export type ActionModel = {
    id?: number;
    name: string;
    description?: string;
    type: ActionType;
    message: Message;
    nextStatus: Status;
};

export const ActionSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string().optional(),
    type: z.nativeEnum(ActionType).optional(),
    message: z.object({ id: commonValidations.id }),
    nextStatus: z.object({ id: commonValidations.id }),
});

export const GetActionSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const ActionCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    type: z.nativeEnum(ActionType).optional(),
    message: z.object({ id: commonValidations.id }),
    nextStatus: z.object({ id: commonValidations.id }),
});
