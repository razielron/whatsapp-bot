import { DeepPartial } from 'typeorm';

import { ResponsePhrase } from './responsePhrase.entity';

const save = (responsePhrases: DeepPartial<ResponsePhrase>) => ResponsePhrase.save(responsePhrases);

const findById = (id: number) =>
    ResponsePhrase.find({
        where: { id },
        relations: {
            currentStatus: true,
            action: {
                message: true,
                nextStatus: true,
            },
        },
    });

const findSpecific = (text: string, statusId: number) =>
    ResponsePhrase.findOne({
        where: {
            text,
            currentStatus: { id: statusId },
        },
        relations: {
            currentStatus: true,
            action: {
                message: true,
                nextStatus: true,
            },
        },
    });

const findAll = () =>
    ResponsePhrase.find({
        relations: {
            currentStatus: true,
            action: {
                message: true,
                nextStatus: true,
            },
        },
    });

const update = (responsePhrasesId: number, responsePhraseData: ResponsePhrase) =>
    ResponsePhrase.update(responsePhrasesId, responsePhraseData);

const remove = (id: number) => ResponsePhrase.delete({ id });

export default {
    save,
    findById,
    findSpecific,
    findAll,
    update,
    remove,
};
