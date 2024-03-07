import { BotStatus } from './status.consts';

export enum ConfirmationSelectionOptions {
    ORDER_MORE = 'ORDER_MORE',
    CONFIRM = 'CONFIRM',
    CANCEL = 'CANCEL',
}

export const ConfirmationSelectionNextStatus: Record<string, BotStatus> = {
    [ConfirmationSelectionOptions.ORDER_MORE]: BotStatus.SENT_SIZE_SELECTION,
    [ConfirmationSelectionOptions.CONFIRM]: BotStatus.SENT_ORDER_CONFIRMED,
    [ConfirmationSelectionOptions.CANCEL]: BotStatus.SENT_ORDER_CANCELED,
};
