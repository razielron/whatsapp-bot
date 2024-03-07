import { DeepPartial } from 'typeorm';

import { Order } from './order.entity';
import { OrderStatus } from './order.type';

const save = (order: DeepPartial<Order>) => Order.save(order);

const findById = (id: number) => Order.find({ where: { id } });

const findInProgressByClientId = (clientId: number) =>
    Order.findOne({
        where: {
            status: OrderStatus.IN_PROGRESS,
            client: { id: clientId },
        },
    });

const findReadyByClientId = (clientId: number) =>
    Order.find({
        where: {
            status: OrderStatus.READY,
            client: { id: clientId },
        },
    });

const findAll = () => Order.find();

const update = (orderId: number, orderData: Order) => Order.update(orderId, orderData);

const remove = (id: number) => Order.delete({ id });

export default {
    save,
    findById,
    findInProgressByClientId,
    findReadyByClientId,
    findAll,
    update,
    remove,
};
