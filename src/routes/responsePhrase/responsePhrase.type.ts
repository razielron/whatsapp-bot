import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { Action } from '@/routes/action/action.entity';
import { Status } from '@/routes/status/status.entity';

export type ResponsePhraseModel = {
    id?: number;
    text: string;
    isAccurate?: boolean;
    currentStatus: Status;
    action: Action;
};

export const ResponsePhraseSchema = z.object({
    id: z.number().optional(),
    text: z.string(),
    isAccurate: z.boolean().optional(),
    currentStatus: z.object({ id: commonValidations.id }),
    action: z.object({ id: commonValidations.id }),
});

export const GetResponsePhraseSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const ResponsePhraseCreateSchema = z.object({
    text: z.string(),
    isAccurate: z.boolean().optional(),
    currentStatus: z.object({ id: commonValidations.id }),
    action: z.object({ id: commonValidations.id }),
});
