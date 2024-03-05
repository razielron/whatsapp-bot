import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { HttpStatusCode } from '@/common/models/serviceResponse';
import botService from '@/routes/bot/bot.service';
import { BotRespondSchema } from '@/routes/bot/bot.type';

export const botRegistry = new OpenAPIRegistry();

botRegistry.register('Bot', BotRespondSchema);

export const botRouter: Router = (() => {
    const router = express.Router();

    botRegistry.registerPath({
        method: 'post',
        path: '/bot/respond',
        tags: ['Bot'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: BotRespondSchema,
                    },
                },
            },
        },
        responses: createApiResponse(BotRespondSchema, 'Success'),
    });

    router.post('/respond', async (req: Request, res: Response) => {
        try {
            const { phoneNumber, clientMessage } = req.body;
            const newBot = await botService.respond(phoneNumber, clientMessage);
            return res.status(HttpStatusCode.OK).send(newBot);
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatusCode.InternalServerError)
                .send({ bot: 'An error occurred while creating the bot.' });
        }
    });

    return router;
})();
