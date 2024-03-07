import { Order } from './order.entity';
import orderRepository from './order.repository';
import { OrderModel, OrderStatus } from './order.type';

const createOrUpdate = (order: OrderModel) => orderRepository.save(order);

const getById = (id: number) => orderRepository.findById(id);

const getInProgressByClientId = (clientId: number) => orderRepository.findInProgressByClientId(clientId);

const getReadyByClientId = (clientId: number) => orderRepository.findReadyByClientId(clientId);

const getAll = () => orderRepository.findAll();

const cancelReadyAndInProgressByClientId = async (clientId: number) => {
    const readyOrders = await getReadyByClientId(clientId);
    const inProgressOrder = await getInProgressByClientId(clientId);
    const clientOrders = [...readyOrders, inProgressOrder].filter((x) => !!x) as Order[];
    console.log({ clientOrders });
    const promiseUpdateOrders = clientOrders.map(async (order) => {
        const updatedOrder = {
            ...order,
            status: OrderStatus.CANCELLED,
        };
        await createOrUpdate(updatedOrder);
    });

    await Promise.all(promiseUpdateOrders);
};

const printReadyByClient = async (clientId: number) => {
    const clientOrders = await getReadyByClientId(clientId);
    console.log({ clientOrders });
    const promiseUpdateOrders = clientOrders.map(async (order) => {
        const updatedOrder = {
            ...order,
            status: OrderStatus.PRINTED,
        };
        await createOrUpdate(updatedOrder);
    });

    await Promise.all(promiseUpdateOrders);
};

const deleteUser = async (id: number) => {
    const order = await orderRepository.findById(id);
    return Order.save({
        ...order,
        deleteDate: new Date(),
    });
};

export default {
    createOrUpdate,
    getById,
    getInProgressByClientId,
    getReadyByClientId,
    getAll,
    cancelReadyAndInProgressByClientId,
    printReadyByClient,
    deleteUser,
};
