import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import { validateRequest } from '@/common/utils/httpHandlers';
import orderService from '@/routes/order/order.service';
import { GetOrderByClientIdSchema, GetOrderSchema, OrderCreateSchema, OrderSchema } from '@/routes/order/order.type';

export const orderRegistry = new OpenAPIRegistry();

export const orderRouter: Router = (() => {
    const router = express.Router();

    orderRegistry.registerPath({
        method: 'get',
        path: '/order',
        tags: ['Order'],
        responses: createApiResponse(z.array(OrderSchema), 'Success'),
    });

    router.get('/', async (_req: Request, res: Response) => {
        const serviceResponse = await orderService.getAll();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    orderRegistry.registerPath({
        method: 'get',
        path: '/order/ready/{clientId}',
        tags: ['Order'],
        request: { params: GetOrderByClientIdSchema.shape.params },
        responses: createApiResponse(GetOrderByClientIdSchema, 'Success'),
    });

    router.get('ready/:clienId', validateRequest(GetOrderByClientIdSchema), async (req: Request, res: Response) => {
        const clienId = parseInt(req.params.clienId as string, 10);
        const serviceResponse = await orderService.getReadyByClientId(clienId);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    orderRegistry.registerPath({
        method: 'get',
        path: '/order/inProgress/{clientId}',
        tags: ['Order'],
        request: { params: GetOrderByClientIdSchema.shape.params },
        responses: createApiResponse(GetOrderByClientIdSchema, 'Success'),
    });

    router.get(
        'inProgress/:clienId',
        validateRequest(GetOrderByClientIdSchema),
        async (req: Request, res: Response) => {
            const clienId = parseInt(req.params.clienId as string, 10);
            const serviceResponse = await orderService.getInProgressByClientId(clienId);
            return res.status(HttpStatusCode.OK).send(serviceResponse);
        }
    );

    orderRegistry.registerPath({
        method: 'get',
        path: '/order/{id}',
        tags: ['Order'],
        request: { params: GetOrderSchema.shape.params },
        responses: createApiResponse(OrderSchema, 'Success'),
    });

    router.get('/:id', validateRequest(GetOrderSchema), async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await orderService.getById(id);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    orderRegistry.registerPath({
        method: 'post',
        path: '/order',
        tags: ['Order'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: OrderCreateSchema,
                    },
                },
            },
        },
        responses: createApiResponse(OrderCreateSchema, 'Success'),
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const orderData = req.body;
            const newOrder = await orderService.createOrUpdate(orderData);
            return res.status(HttpStatusCode.OK).send(newOrder);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ order: 'An error occurred while creating the order.' });
        }
    });

    return router;
})();
