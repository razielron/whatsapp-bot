import 'express-async-errors';

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

import { botRouter } from './routes/bot/bot.router';
import { clientRouter } from './routes/client/client.router';
import { messageRouter } from './routes/message/message.router';
import { orderRouter } from './routes/order/order.router';
import { responseSelectionRouter } from './routes/responseSelection/responseSelection.router';

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
app.use('/client', clientRouter);
app.use('/responsePhrase', responseSelectionRouter);
app.use('/order', orderRouter);
app.use('/bot', botRouter);

// Swagger UI
app.use(openAPIRouter);

app.use((err, req, res, next) => {
    console.error(err);
    console.log(req, next);
    res.status(400).send(`Something broke! ${err}`);
});

// Error handlers
app.use(errorHandler());

export { app, logger };
