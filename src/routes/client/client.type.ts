import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export type ClientModel = {
    id?: number;
    phoneNumber: string;
    name?: string;
    status: string;
};

export type CreateClientModel = {
    id?: number;
    phoneNumber: string;
    name?: string;
    status: string;
};

export const ClientSchema = z.object({
    id: z.number().optional(),
    phoneNumber: z.string(),
    name: z.string().optional(),
    status: z.string().optional(),
});

export const GetClientSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const ClientCreateSchema = z.object({
    phoneNumber: z.string(),
    name: z.string().optional(),
    status: z.string().optional(),
});
