import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Client } from '@/routes/client/client.entity';
import { Message } from '@/routes/message/message.entity';
import { Order } from '@/routes/order/order.entity';
import { ResponseSelection } from '@/routes/responseSelection/responseSelection.entity';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_SCHEMA, DB_PORT, DATABASE, WORKSPACE } = process.env;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    schema: DB_SCHEMA,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: WORKSPACE === 'local',
    entities: [Message, Client, ResponseSelection, Order],
    subscribers: [],
    migrations: [],
});

export const connectToDb = AppDataSource.initialize();
