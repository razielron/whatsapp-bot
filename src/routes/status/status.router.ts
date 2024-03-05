import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import { validateRequest } from '@/common/utils/httpHandlers';
import statusService from '@/routes/status/status.service';
import { GetStatusSchema, StatusCreateSchema, StatusSchema } from '@/routes/status/status.type';

export const statusRegistry = new OpenAPIRegistry();

export const statusRouter: Router = (() => {
    const router = express.Router();

    statusRegistry.registerPath({
        method: 'get',
        path: '/status',
        tags: ['Status'],
        responses: createApiResponse(z.array(StatusSchema), 'Success'),
    });

    router.get('/', async (_req: Request, res: Response) => {
        const serviceResponse = await statusService.getAll();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    statusRegistry.registerPath({
        method: 'get',
        path: '/status/{id}',
        tags: ['Status'],
        request: { params: GetStatusSchema.shape.params },
        responses: createApiResponse(StatusSchema, 'Success'),
    });

    router.get('/:id', validateRequest(GetStatusSchema), async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await statusService.getById(id);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    statusRegistry.registerPath({
        method: 'post',
        path: '/status',
        tags: ['Status'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: StatusCreateSchema,
                    },
                },
            },
        },
        responses: createApiResponse(StatusCreateSchema, 'Success'),
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const statusData = req.body;
            const newStatus = await statusService.createOrUpdate(statusData);
            return res.status(HttpStatusCode.OK).send(newStatus);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ status: 'An error occurred while creating the status.' });
        }
    });

    return router;
})();
