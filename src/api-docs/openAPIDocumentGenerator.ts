import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { actionRegistry } from '@/routes/action/action.router';
import { botRegistry } from '@/routes/bot/bot.router';
import { clientRegistry } from '@/routes/client/client.router';
import { healthCheckRegistry } from '@/routes/healthCheck/healthCheckRouter';
import { messageRegistry } from '@/routes/message/message.router';
import { responsePhraseRegistry } from '@/routes/responsePhrase/responsePhrase.router';
import { statusRegistry } from '@/routes/status/status.router';
import { userRegistry } from '@/routes/user/userRouter';

export function generateOpenAPIDocument() {
    const registry = new OpenAPIRegistry([
        healthCheckRegistry,
        userRegistry,
        messageRegistry,
        statusRegistry,
        clientRegistry,
        actionRegistry,
        responsePhraseRegistry,
        botRegistry,
    ]);
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Swagger API',
        },
        externalDocs: {
            description: 'View the raw OpenAPI Specification in JSON format',
            url: '/swagger.json',
        },
    });
}
