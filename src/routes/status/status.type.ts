import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export type StatusModel = {
    id?: number;
    name: string;
    isFinal?: boolean;
};

export const StatusSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    isFinal: z.boolean().optional(),
});

export const GetStatusSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const StatusCreateSchema = z.object({
    name: z.string(),
    isFinal: z.boolean().optional(),
});
