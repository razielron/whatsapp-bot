import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import { validateRequest } from '@/common/utils/httpHandlers';
import responseSelectionService from '@/routes/responseSelection/responseSelection.service';
import {
    GetResponseSelectionByValuesSchema,
    GetResponseSelectionSchema,
    ResponseSelectionCreateSchema,
    ResponseSelectionSchema,
} from '@/routes/responseSelection/responseSelection.type';

export const responseSelectionRegistry = new OpenAPIRegistry();

export const responseSelectionRouter: Router = (() => {
    const router = express.Router();

    responseSelectionRegistry.registerPath({
        method: 'get',
        path: '/responseSelection',
        tags: ['ResponseSelection'],
        responses: createApiResponse(z.array(ResponseSelectionSchema), 'Success'),
    });

    router.get('/', async (_req: Request, res: Response) => {
        const serviceResponse = await responseSelectionService.getAll();
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    responseSelectionRegistry.registerPath({
        method: 'get',
        path: '/responseSelection/{id}',
        tags: ['ResponseSelection'],
        request: { params: GetResponseSelectionSchema.shape.params },
        responses: createApiResponse(ResponseSelectionSchema, 'Success'),
    });

    router.get('/:id', validateRequest(GetResponseSelectionSchema), async (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await responseSelectionService.getById(id);
        return res.status(HttpStatusCode.OK).send(serviceResponse);
    });

    responseSelectionRegistry.registerPath({
        method: 'post',
        path: '/responseSelection/values',
        tags: ['ResponseSelection'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: GetResponseSelectionByValuesSchema,
                    },
                },
            },
        },
        responses: createApiResponse(GetResponseSelectionByValuesSchema, 'Success'),
    });

    router.post('/values', async (req: Request, res: Response) => {
        try {
            const { values } = req.body;
            const allSelections = await responseSelectionService.getByValues(values);
            return res.status(HttpStatusCode.OK).send(allSelections);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ responseSelection: 'An error occurred while getting all responseSelection.' });
        }
    });

    responseSelectionRegistry.registerPath({
        method: 'post',
        path: '/responseSelection',
        tags: ['ResponseSelection'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: ResponseSelectionCreateSchema,
                    },
                },
            },
        },
        responses: createApiResponse(ResponseSelectionCreateSchema, 'Success'),
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            const requestSelectionData = req.body;
            const newResponseSelection = await responseSelectionService.createOrUpdate(requestSelectionData);
            return res.status(HttpStatusCode.OK).send(newResponseSelection);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ responseSelection: 'An error occurred while creating the responseSelection.' });
        }
    });

    return router;
})();
