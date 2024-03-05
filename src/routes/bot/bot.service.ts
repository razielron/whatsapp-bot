import actionService from '@/routes/action/action.service';
import clientService from '@/routes/client/client.service';
import responsePhraseService from '@/routes/responsePhrase/responsePhrase.service';

import { ActionModel } from '../action/action.type';
import { ClientModel, CreateClientModel } from '../client/client.type';
import { StatusModel } from '../status/status.type';
import { sendMessage } from '../whatsapp/whatsapp.service';

const getCurrentStatus = async (phoneNumber: string): Promise<StatusModel | null> => {
    const client = await clientService.getByPhoneNumber(phoneNumber);
    const status = client?.status ? client.status : null;

    return status;
};

const getAction = async (currentStatus: StatusModel | null, clientMessage: string): Promise<ActionModel | null> => {
    let action = null;

    if (!currentStatus?.id) {
        action = await actionService.getInitial();
    } else {
        const responsePhrase = await responsePhraseService.getSpecific(clientMessage, currentStatus.id);
        action = responsePhrase?.action ?? null;
    }

    return action;
};

const updateStatus = async (phoneNumber: string, nextStatus: StatusModel): Promise<void> => {
    const client: ClientModel | null = await clientService.getByPhoneNumber(phoneNumber);
    let createOrUpdateClient: CreateClientModel | null = null;

    if (!client) {
        createOrUpdateClient = {
            phoneNumber,
            status: { id: nextStatus.id! },
        };
    } else {
        createOrUpdateClient = {
            ...client,
            status: { id: nextStatus.id! },
        };
    }

    await clientService.createOrUpdate(createOrUpdateClient);
};

const respond = async (phoneNumber: string, clientMessage: string): Promise<void> => {
    let currentStatus: StatusModel | null = null;
    let actionModel: ActionModel | null = null;

    try {
        currentStatus = await getCurrentStatus(phoneNumber);
        actionModel = await getAction(currentStatus, clientMessage);

        if (!actionModel) throw 'no action found';

        await sendMessage(phoneNumber, actionModel.message.text);
        await updateStatus(phoneNumber, actionModel.nextStatus);
    } catch (err) {
        let logMessage = 'error handling client request, ';
        logMessage += `phoneNumber: ${phoneNumber}, clientMessage: ${clientMessage},`;
        logMessage += `currentStatusName: ${currentStatus?.name}, actionModelId: ${actionModel?.id},`;
        logMessage += `error: ${err}`;
        console.log(logMessage);
    }
};

export default {
    respond,
};
