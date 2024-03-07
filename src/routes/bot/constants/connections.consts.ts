import { OrderModel } from '@/routes/order/order.type';

import { ConfirmationSelectionNextStatus, ConfirmationSelectionOptions } from './confirmationSelection.consts';
import {
    FlavorSelectionOptions,
    FourFlavorsFirstSelectionToNextStatus,
    FourFlavorsFourthSelectionToNextStatus,
    FourFlavorsSecondSelectionToNextStatus,
    FourFlavorsThirdSelectionToNextStatus,
    SingleFlavorSelectionToNextStatus,
    TwoFlavorsFirstSelectionToNextStatus,
    TwoFlavorsSecondSelectionToNextStatus,
} from './flavorSelection.consts';
import { SizeSelectionNextStatus, SizeSelectionOptions } from './sizeSelection.consts';
import { BotStatus } from './status.consts';

export const currentStatusToSelectionNextStatus = {
    [BotStatus.SENT_SIZE_SELECTION]: SizeSelectionNextStatus,
    [BotStatus.SENT_SINGLE_FLAVOR_SELECTION]: SingleFlavorSelectionToNextStatus,
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_1]: FourFlavorsFirstSelectionToNextStatus,
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_2]: FourFlavorsSecondSelectionToNextStatus,
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_3]: FourFlavorsThirdSelectionToNextStatus,
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_4]: FourFlavorsFourthSelectionToNextStatus,
    [BotStatus.SENT_TWO_FLAVOR_SELECTION_1]: TwoFlavorsFirstSelectionToNextStatus,
    [BotStatus.SENT_TWO_FLAVOR_SELECTION_2]: TwoFlavorsSecondSelectionToNextStatus,
    [BotStatus.SENT_ORDER_CONFIRMATION]: ConfirmationSelectionNextStatus,
};

export const currentStatusToNextStatus = {
    [BotStatus.READY]: BotStatus.SENT_SIZE_SELECTION,
    [BotStatus.SENT_ORDER_CONFIRMED]: BotStatus.READY,
    [BotStatus.SENT_ORDER_CANCELED]: BotStatus.READY,
    [BotStatus.PAID]: BotStatus.READY,
};

export const statusToSelectionOptions = {
    [BotStatus.READY]: [],
    [BotStatus.SENT_SIZE_SELECTION]: Object.values(SizeSelectionOptions),
    [BotStatus.SENT_SINGLE_FLAVOR_SELECTION]: Object.values(FlavorSelectionOptions),
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_1]: Object.values(FlavorSelectionOptions),
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_2]: Object.values(FlavorSelectionOptions),
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_3]: Object.values(FlavorSelectionOptions),
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_4]: Object.values(FlavorSelectionOptions),
    [BotStatus.SENT_TWO_FLAVOR_SELECTION_1]: Object.values(FlavorSelectionOptions),
    [BotStatus.SENT_TWO_FLAVOR_SELECTION_2]: Object.values(FlavorSelectionOptions),
    [BotStatus.SENT_ORDER_CONFIRMATION]: Object.values(ConfirmationSelectionOptions),
    [BotStatus.SENT_ORDER_CONFIRMED]: [],
    [BotStatus.SENT_ORDER_CANCELED]: [],
    [BotStatus.PAID]: [],
};

export const statusToOrderProperty: Record<BotStatus, keyof OrderModel | null> = {
    [BotStatus.READY]: null,
    [BotStatus.SENT_SIZE_SELECTION]: 'item',
    [BotStatus.SENT_SINGLE_FLAVOR_SELECTION]: 'flavor1',
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_1]: 'flavor1',
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_2]: 'flavor2',
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_3]: 'flavor3',
    [BotStatus.SENT_FOUR_FLAVOR_SELECTION_4]: 'flavor4',
    [BotStatus.SENT_TWO_FLAVOR_SELECTION_1]: 'flavor1',
    [BotStatus.SENT_TWO_FLAVOR_SELECTION_2]: 'flavor2',
    [BotStatus.SENT_ORDER_CONFIRMATION]: null,
    [BotStatus.SENT_ORDER_CONFIRMED]: null,
    [BotStatus.SENT_ORDER_CANCELED]: null,
    [BotStatus.PAID]: null,
};
