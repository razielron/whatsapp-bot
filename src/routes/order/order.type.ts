import { z } from 'zod';

import { Identified } from '@/common/models/serviceResponse';
import { commonValidations } from '@/common/utils/commonValidation';

export enum OrderStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    READY = 'READY',
    CONFIRMED = 'CONFIRMED',
    PRINTED = 'PRINTED',
    DONE = 'DONE',
    CANCELLED = 'CANCELLED',
}

export type OrderModel = {
    id?: number;
    status: OrderStatus;
    item?: string;
    flavor1?: string;
    flavor2?: string;
    flavor3?: string;
    flavor4?: string;
    client: Identified;
};

export const OrderSchema = z.object({
    id: z.number().optional(),
    status: z.enum(Object.values(OrderStatus) as [string, ...string[]]),
    item: z.string().optional(),
    flavor1: z.string().optional(),
    flavor2: z.string().optional(),
    flavor3: z.string().optional(),
    flavor4: z.string().optional(),
    client: z.object({
        id: commonValidations.id,
    }),
});

export const GetOrderSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
});

export const GetOrderByClientIdSchema = z.object({
    params: z.object({
        clientId: commonValidations.id,
    }),
});

export const OrderCreateSchema = z.object({
    status: z.enum(Object.values(OrderStatus) as [string, ...string[]]),
    item: z.string().optional(),
    flavor1: z.string().optional(),
    flavor2: z.string().optional(),
    flavor3: z.string().optional(),
    flavor4: z.string().optional(),
    client: z.object({
        id: commonValidations.id,
    }),
});
