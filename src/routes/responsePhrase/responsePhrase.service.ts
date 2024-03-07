import { ResponsePhrase } from './responsePhrase.entity';
import responsePhraseRepository from './responsePhrase.repository';
import { ResponsePhraseModel } from './responsePhrase.type';

const createOrUpdate = (responsePhrase: ResponsePhraseModel) => responsePhraseRepository.save(responsePhrase);

const getById = (id: number) => responsePhraseRepository.findById(id);

const getSpecific = (text: string, statusId: number) => responsePhraseRepository.findSpecific(text, statusId);

const getAll = () => responsePhraseRepository.findAll();

const deleteUser = async (id: number) => {
    const responsePhrase = await responsePhraseRepository.findById(id);
    return ResponsePhrase.save({
        ...responsePhrase,
        deleteDate: new Date(),
    });
};

export default {
    createOrUpdate,
    getById,
    getSpecific,
    getAll,
    deleteUser,
};
