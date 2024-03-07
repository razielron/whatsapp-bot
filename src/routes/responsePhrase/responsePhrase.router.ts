import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import { validateRequest } from '@/common/utils/httpHandlers';
import responsePhraseService from '@/routes/responsePhrase/responsePhrase.service';
import {
    GetResponsePhraseSchema,
    ResponsePhraseCreateSchema,
    ResponsePhraseSchema,
} from '@/routes/responsePhrase/responsePhrase.type';

export const responsePhraseRegistry = new OpenAPIRegistry();

export const responsePhraseRouter: Router = (() => {
    const router = express.Router();

    responsePhraseRegistry.registerPath({
        method: 'get',
        path: '/responsePhrase',
        tags: ['ResponsePhrase'],
        responses: createApiResponse(z.array(ResponsePhraseSchema), 'Success'),
    });

    router.get('/', async (_req: Request, res: Response) => {
        const serviceResponse = await responsePhraseService.getAll();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    responsePhraseRegistry.registerPath({
        method: 'get',
        path: '/responsePhrase/{id}',
        tags: ['ResponsePhrase'],
        request: { params: GetResponsePhraseSchema.shape.params },
        responses: createApiResponse(ResponsePhraseSchema, 'Success'),
    });

    router.get('/:id', validateRequest(GetResponsePhraseSchema), async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await responsePhraseService.getById(id);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    responsePhraseRegistry.registerPath({
        method: 'post',
        path: '/responsePhrase',
        tags: ['ResponsePhrase'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: ResponsePhraseCreateSchema,
                    },
                },
            },
        },
        responses: createApiResponse(ResponsePhraseCreateSchema, 'Success'),
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const responsePhraseData = req.body;
            const newResponsePhrase = await responsePhraseService.createOrUpdate(responsePhraseData);
            return res.status(HttpStatusCode.OK).send(newResponsePhrase);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ responsePhrase: 'An error occurred while creating the responsePhrase.' });
        }
    });

    return router;
})();
