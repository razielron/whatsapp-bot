import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import { validateRequest } from '@/common/utils/httpHandlers';
import clientService from '@/routes/client/client.service';
import { ClientCreateSchema, ClientSchema, GetClientSchema } from '@/routes/client/client.type';

export const clientRegistry = new OpenAPIRegistry();

clientRegistry.register('Client', ClientSchema);

export const clientRouter: Router = (() => {
    const router = express.Router();

    clientRegistry.registerPath({
        method: 'get',
        path: '/client',
        tags: ['Client'],
        responses: createApiResponse(z.array(ClientSchema), 'Success'),
    });

    router.get('/', async (_req: Request, res: Response) => {
        const serviceResponse = await clientService.getAll();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    clientRegistry.registerPath({
        method: 'get',
        path: '/client/{id}',
        tags: ['Client'],
        request: { params: GetClientSchema.shape.params },
        responses: createApiResponse(ClientSchema, 'Success'),
    });

    router.get('/:id', validateRequest(GetClientSchema), async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await clientService.getById(id);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    clientRegistry.registerPath({
        method: 'post',
        path: '/client',
        tags: ['Client'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: ClientCreateSchema,
                    },
                },
            },
        },
        responses: createApiResponse(ClientCreateSchema, 'Success'),
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const clientData = req.body;
            const newClient = await clientService.createOrUpdate(clientData);
            return res.status(HttpStatusCode.OK).send(newClient);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ client: 'An error occurred while creating the client.' });
        }
    });

    return router;
})();
