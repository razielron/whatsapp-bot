import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';
import { healthCheckRouter } from '@/routes/healthCheck/healthCheckRouter';
import { userRouter } from '@/routes/user/userRouter';

import { actionRouter } from './routes/action/action.router';
import { botRouter } from './routes/bot/bot.router';
import { clientRouter } from './routes/client/client.router';
import { messageRouter } from './routes/message/message.router';
import { responsePhraseRouter } from './routes/responsePhrase/responsePhrase.router';
import { statusRouter } from './routes/status/status.router';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// Request logging
app.use(requestLogger());

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use('/status', statusRouter);
app.use('/client', clientRouter);
app.use('/action', actionRouter);
app.use('/responsePhrase', responsePhraseRouter);
app.use('/bot', botRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(400).send(`Something broke! ${err}`)
})

export { app, logger };
