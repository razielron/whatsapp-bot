import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import { validateRequest } from '@/common/utils/httpHandlers';
import messageService from '@/routes/message/message.service';
import { GetMessageSchema, MessageCreateSchema, MessageSchema } from '@/routes/message/message.type';

export const messageRegistry = new OpenAPIRegistry();

export const messageRouter: Router = (() => {
    const router = express.Router();

    messageRegistry.registerPath({
        method: 'get',
        path: '/message',
        tags: ['Message'],
        responses: createApiResponse(z.array(MessageSchema), 'Success'),
    });

    router.get('/', async (_req: Request, res: Response) => {
        const serviceResponse = await messageService.getAll();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    messageRegistry.registerPath({
        method: 'get',
        path: '/message/{id}',
        tags: ['Message'],
        request: { params: GetMessageSchema.shape.params },
        responses: createApiResponse(MessageSchema, 'Success'),
    });

    router.get('/:id', validateRequest(GetMessageSchema), async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await messageService.getById(id);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    messageRegistry.registerPath({
        method: 'post',
        path: '/message',
        tags: ['Message'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: MessageCreateSchema,
                    },
                },
            },
        },
        responses: createApiResponse(MessageCreateSchema, 'Success'),
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const messageData = req.body;
            const newMessage = await messageService.createOrUpdate(messageData);
            return res.status(HttpStatusCode.OK).send(newMessage);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ message: 'An error occurred while creating the message.' });
        }
    });

    return router;
})();
