import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { Status } from '@/routes/status/status.entity';

export type ClientModel = {
    id?: number;
    phoneNumber: string;
    name?: string;
    status?: Status;
};

export type CreateClientModel = {
    id?: number;
    phoneNumber: string;
    name?: string;
    status?: { id: number };
};

export const ClientSchema = z.object({
    id: z.number().optional(),
    phoneNumber: z.string(),
    name: z.string().optional(),
    status: z.object({ id: commonValidations.id }).optional(),
});

export const GetClientSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const ClientCreateSchema = z.object({
    phoneNumber: z.string(),
    name: z.string().optional(),
    status: z.object({ id: commonValidations.id }).optional(),
});
