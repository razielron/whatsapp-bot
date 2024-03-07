export enum BotStatus {
    RECEIVED_INITIAL_MESSAGE = 'RECEIVED_INITIAL_MESSAGE',
    SENT_SIZE_SELECTION = 'SENT_SIZE_SELECTION',
    RECEIVED_SIZE_SELECTION = 'RECEIVED_SIZE_SELECTION',
    SENT_FLAVOR_SELECTION = 'SENT_FLAVOR_SELECTION',
    RECEIVED_FLAVOR_SELECTION = 'RECEIVED_FLAVOR_SELECTION',
    SENT_ORDER_CONFIRMATION = 'SENT_ORDER_CONFIRMATION',
    RECEIVED_ORDER_CONFIRMATION = 'RECEIVED_ORDER_CONFIRMATION',
    RECEIVED_SUPPORT_REQUEST = 'RECEIVED_SUPPORT_REQUEST',
    PAID = 'PAID',
}

export const BotMessageFlow = {
    [BotStatus.RECEIVED_INITIAL_MESSAGE]: 'message to send',
};

export const BotInitMessageFlow = {};
