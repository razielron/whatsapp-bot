import { BotStatus } from './status.consts';

export enum SizeSelectionOptions {
    CASE_OF_4_ML_280 = 'CASE_OF_4_ML_280',
    CASE_OF_2_ML_500 = 'CASE_OF_2_ML_500',
    TRUFFLE = 'TRUFFLE',
    ML_280 = 'ML_280',
    ML_500 = 'ML_500',
}

export const SizeSelectionNextStatus: Record<string, BotStatus> = {
    [SizeSelectionOptions.CASE_OF_4_ML_280]: BotStatus.SENT_FOUR_FLAVOR_SELECTION_1,
    [SizeSelectionOptions.CASE_OF_2_ML_500]: BotStatus.SENT_TWO_FLAVOR_SELECTION_1,
    [SizeSelectionOptions.TRUFFLE]: BotStatus.SENT_SINGLE_FLAVOR_SELECTION,
    [SizeSelectionOptions.ML_280]: BotStatus.SENT_SINGLE_FLAVOR_SELECTION,
    [SizeSelectionOptions.ML_500]: BotStatus.SENT_SINGLE_FLAVOR_SELECTION,
};
