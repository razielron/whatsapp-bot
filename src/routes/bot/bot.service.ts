import clientService from '@/routes/client/client.service';
import messageService from '@/routes/message/message.service';
import responseSelectionService from '@/routes/responseSelection/responseSelection.service';

import { ClientModel } from '../client/client.type';
import orderService from '../order/order.service';
import { OrderModel, OrderStatus } from '../order/order.type';
import { ResponseSelection } from '../responseSelection/responseSelection.entity';
import { sendInteractive, sendMessage } from '../whatsapp/whatsapp.service';
import { ConfirmationSelectionOptions } from './constants/confirmationSelection.consts';
import {
    currentStatusToNextStatus,
    currentStatusToSelectionNextStatus,
    statusToOrderProperty,
    statusToSelectionOptions,
} from './constants/connections.consts';
import { BotStatus } from './constants/status.consts';

const getOrCreateClient = async (phoneNumber: string): Promise<ClientModel> => {
    let client = await clientService.getByPhoneNumber(phoneNumber);

    if (!client) {
        const clientModel = {
            phoneNumber,
            status: BotStatus.READY,
        };
        client = await clientService.createOrUpdate(clientModel);
    }

    return client;
};

const getNextStatus = (currentStatus: BotStatus, clientSelection: string): BotStatus => {
    if (
        currentStatus === BotStatus.READY ||
        currentStatus === BotStatus.PAID ||
        currentStatus === BotStatus.SENT_ORDER_CONFIRMED ||
        currentStatus === BotStatus.SENT_ORDER_CANCELED
    ) {
        return currentStatusToNextStatus[currentStatus];
    }

    const MessageSelectionToNextStatus = currentStatusToSelectionNextStatus[currentStatus];
    if (clientSelection in MessageSelectionToNextStatus) {
        return MessageSelectionToNextStatus[clientSelection];
    }

    throw `no next status found for currentStatus: ${currentStatus} and clientSelection: ${clientSelection}`;
};

const getResponseMessage = async (status: BotStatus): Promise<string> => {
    const message = await messageService.getByStatus(status);
    if (!message) throw `no response message found for status: ${status}`;

    return message.text;
};

const convertResponseSelectionToRecord = (responseSelection: ResponseSelection): Record<string, string> => {
    return { [responseSelection.value]: responseSelection.displayName };
};

const getResponseSelectionOptions = async (status: BotStatus): Promise<Record<string, string>[]> => {
    const values = statusToSelectionOptions[status];
    const responseSelection = await responseSelectionService.getByValues(values);

    return responseSelection.map(convertResponseSelectionToRecord);
};

const updateStatus = async (client: ClientModel, nextStatus: string): Promise<void> => {
    const createOrUpdateClient = {
        ...client,
        status: nextStatus,
    };
    await clientService.createOrUpdate(createOrUpdateClient);
};

const saveUserSelection = async (
    clientId: number,
    prevStatus: BotStatus,
    clientSelection: string
): Promise<OrderModel> => {
    const clientOrder =
        (await orderService.getInProgressByClientId(clientId)) ?? ({ client: { id: clientId } } as OrderModel);
    const updateOrderProperty = statusToOrderProperty[prevStatus];

    if (updateOrderProperty) {
        (clientOrder as any)[updateOrderProperty] = clientSelection;
    }

    if (
        clientSelection === ConfirmationSelectionOptions.CONFIRM ||
        clientSelection === ConfirmationSelectionOptions.ORDER_MORE
    ) {
        clientOrder.status = OrderStatus.READY;
    } else if (clientSelection === ConfirmationSelectionOptions.CANCEL) {
        clientOrder.status = OrderStatus.CANCELLED;
    } else {
        clientOrder.status = OrderStatus.IN_PROGRESS;
    }

    return orderService.createOrUpdate(clientOrder);
};

const getStringFromRecordArray = (recordArray: Record<string, string>[]): string => {
    let response = '';
    for (const record of recordArray) {
        response += `${Object.keys(record)[0]}:${Object.values(record)[0]}; `;
    }
    return response;
};

const getResponseString = (
    phoneNumber: string,
    clientMessage: string,
    client: ClientModel | null,
    currentStatus: BotStatus | null,
    nextStatus: BotStatus | null,
    responseMessage: string | null,
    responseSelectionOptions: Record<string, string>[],
    userOrder: OrderModel | null,
    err?: any
): string => {
    let response = `phoneNumber: ${phoneNumber}, clientMessage: ${clientMessage}, `;
    response += `clientId: ${client?.id}, currentStatus: ${currentStatus}, nextStatus: ${nextStatus}, `;
    response += `responseMessage: ${responseMessage}, `;
    response += `responseSelectionOptions: ${getStringFromRecordArray(responseSelectionOptions)}, `;
    response += `userOrderId: ${userOrder?.id}`;
    if (err) response += `, err: ${err}`;
    return response;
};

const handleOrderFinished = async (client: ClientModel, clientMessage: string, status: BotStatus) => {
    if (status === BotStatus.SENT_ORDER_CONFIRMED && clientMessage === ConfirmationSelectionOptions.CONFIRM) {
        await orderService.printReadyByClient(client.id!);
        await updateStatus(client, BotStatus.READY);
    }
};

const handleOrderCancled = async (client: ClientModel, clientMessage: string, status: BotStatus) => {
    if (status === BotStatus.SENT_ORDER_CANCELED && clientMessage === ConfirmationSelectionOptions.CANCEL) {
        await orderService.cancelReadyAndInProgressByClientId(client.id!);
        await updateStatus(client, BotStatus.READY);
    }
};

const handleClientSelection = async (phoneNumber: string, clientMessage: string): Promise<any> => {
    let client: ClientModel | null = null;
    let currentStatus: BotStatus | null = null;
    let nextStatus: BotStatus | null = null;
    let responseMessage: string | null = null;
    let responseSelectionOptions: Record<string, string>[] = [];
    let userOrder: OrderModel | null = null;

    try {
        client = await getOrCreateClient(phoneNumber);
        currentStatus = client.status as BotStatus;
        nextStatus = getNextStatus(currentStatus, clientMessage);
        responseMessage = await getResponseMessage(nextStatus);
        responseSelectionOptions = await getResponseSelectionOptions(nextStatus);

        if (responseSelectionOptions) {
            await sendInteractive(phoneNumber, responseMessage, responseSelectionOptions);
        } else if (responseMessage) {
            await sendMessage(phoneNumber, responseMessage);
        }

        await updateStatus(client, nextStatus);
        userOrder = await saveUserSelection(client.id!, currentStatus, clientMessage);

        await handleOrderFinished(client, clientMessage, nextStatus);
        await handleOrderCancled(client, clientMessage, nextStatus);

        return {
            phoneNumber,
            clientMessage,
            currentStatus,
            nextStatus,
            responseMessage,
            responseSelectionOptions,
            client,
            userOrder,
        };
    } catch (err) {
        const logModel = getResponseString(
            phoneNumber,
            clientMessage,
            client,
            currentStatus,
            nextStatus,
            responseMessage,
            responseSelectionOptions,
            userOrder,
            err
        );
        const logMessage = `error handling client request, ${logModel}`;

        console.log(logMessage);
        throw new Error(logMessage);
    }
};

export default {
    handleClientSelection,
};
