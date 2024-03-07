import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import { validateRequest } from '@/common/utils/httpHandlers';
import actionService from '@/routes/action/action.service';
import { ActionCreateSchema, ActionSchema, GetActionSchema } from '@/routes/action/action.type';

export const actionRegistry = new OpenAPIRegistry();

export const actionRouter: Router = (() => {
    const router = express.Router();

    actionRegistry.registerPath({
        method: 'get',
        path: '/action',
        tags: ['Action'],
        responses: createApiResponse(z.array(ActionSchema), 'Success'),
    });

    router.get('/', async (_req: Request, res: Response) => {
        const serviceResponse = await actionService.getAll();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    actionRegistry.registerPath({
        method: 'get',
        path: '/action/initial',
        tags: ['Action'],
        responses: createApiResponse(z.array(ActionSchema), 'Success'),
    });

    router.get('/initial', async (_req: Request, res: Response) => {
        const serviceResponse = await actionService.getInitial();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    actionRegistry.registerPath({
        method: 'get',
        path: '/action/{id}',
        tags: ['Action'],
        request: { params: GetActionSchema.shape.params },
        responses: createApiResponse(ActionSchema, 'Success'),
    });

    router.get('/:id', validateRequest(GetActionSchema), async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await actionService.getById(id);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    actionRegistry.registerPath({
        method: 'post',
        path: '/action',
        tags: ['Action'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: ActionCreateSchema,
                    },
                },
            },
        },
        responses: createApiResponse(ActionCreateSchema, 'Success'),
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const actionData = req.body;
            const newAction = await actionService.createOrUpdate(actionData);
            return res.status(HttpStatusCode.OK).send(newAction);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ action: 'An error occurred while creating the action.' });
        }
    });

    return router;
})();
