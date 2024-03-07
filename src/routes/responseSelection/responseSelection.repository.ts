import { DeepPartial, In } from 'typeorm';

import { ResponseSelection } from './responseSelection.entity';

const save = (responsePhrases: DeepPartial<ResponseSelection>) => ResponseSelection.save(responsePhrases);

const findById = (id: number) => ResponseSelection.find({ where: { id } });

const findByValues = (values: string[]) => ResponseSelection.find({ where: { value: In(values) } });

const findAll = () => ResponseSelection.find();

const update = (responsePhrasesId: number, responsePhraseData: ResponseSelection) =>
    ResponseSelection.update(responsePhrasesId, responsePhraseData);

const remove = (id: number) => ResponseSelection.delete({ id });

export default {
    save,
    findById,
    findByValues,
    findAll,
    update,
    remove,
};
