import { BotStatus } from './status.consts';

export enum FlavorSelectionOptions {
    VANILLA = 'VANILLA',
    CHOCLATE = 'CHOCLATE',
}

export const SingleFlavorSelectionToNextStatus: Record<string, BotStatus> = {
    [FlavorSelectionOptions.VANILLA]: BotStatus.SENT_ORDER_CONFIRMATION,
    [FlavorSelectionOptions.CHOCLATE]: BotStatus.SENT_ORDER_CONFIRMATION,
};

export const TwoFlavorsFirstSelectionToNextStatus: Record<string, BotStatus> = {
    [FlavorSelectionOptions.VANILLA]: BotStatus.SENT_TWO_FLAVOR_SELECTION_2,
    [FlavorSelectionOptions.CHOCLATE]: BotStatus.SENT_TWO_FLAVOR_SELECTION_2,
};

export const TwoFlavorsSecondSelectionToNextStatus: Record<string, BotStatus> = {
    [FlavorSelectionOptions.VANILLA]: BotStatus.SENT_ORDER_CONFIRMATION,
    [FlavorSelectionOptions.CHOCLATE]: BotStatus.SENT_ORDER_CONFIRMATION,
};

export const FourFlavorsFirstSelectionToNextStatus: Record<string, BotStatus> = {
    [FlavorSelectionOptions.VANILLA]: BotStatus.SENT_FOUR_FLAVOR_SELECTION_2,
    [FlavorSelectionOptions.CHOCLATE]: BotStatus.SENT_FOUR_FLAVOR_SELECTION_2,
};

export const FourFlavorsSecondSelectionToNextStatus: Record<string, BotStatus> = {
    [FlavorSelectionOptions.VANILLA]: BotStatus.SENT_FOUR_FLAVOR_SELECTION_3,
    [FlavorSelectionOptions.CHOCLATE]: BotStatus.SENT_FOUR_FLAVOR_SELECTION_3,
};

export const FourFlavorsThirdSelectionToNextStatus: Record<string, BotStatus> = {
    [FlavorSelectionOptions.VANILLA]: BotStatus.SENT_FOUR_FLAVOR_SELECTION_4,
    [FlavorSelectionOptions.CHOCLATE]: BotStatus.SENT_FOUR_FLAVOR_SELECTION_4,
};

export const FourFlavorsFourthSelectionToNextStatus: Record<string, BotStatus> = {
    [FlavorSelectionOptions.VANILLA]: BotStatus.SENT_ORDER_CONFIRMATION,
    [FlavorSelectionOptions.CHOCLATE]: BotStatus.SENT_ORDER_CONFIRMATION,
};
