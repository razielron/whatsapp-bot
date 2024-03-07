import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export type ResponseSelectionModel = {
    id?: number;
    displayName: string;
    value: string;
};

export const ResponseSelectionSchema = z.object({
    id: z.number().optional(),
    displayName: z.string(),
    value: z.string(),
});

export const GetResponseSelectionSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const GetResponseSelectionByValuesSchema = z.object({
    params: z.object({
        values: z.array(z.string()),
    }),
});

export const ResponseSelectionCreateSchema = z.object({
    displayName: z.string(),
    value: z.string(),
});
