import { ResponseSelection } from './responseSelection.entity';
import responsePhraseRepository from './responseSelection.repository';
import { ResponseSelectionModel } from './responseSelection.type';

const createOrUpdate = (responsePhrase: ResponseSelectionModel) => responsePhraseRepository.save(responsePhrase);

const getById = (id: number) => responsePhraseRepository.findById(id);

const getByValues = (values: string[]) => responsePhraseRepository.findByValues(values);

const getAll = () => responsePhraseRepository.findAll();

const deleteUser = async (id: number) => {
    const responsePhrase = await responsePhraseRepository.findById(id);
    return ResponseSelection.save({
        ...responsePhrase,
        deleteDate: new Date(),
    });
};

export default {
    createOrUpdate,
    getById,
    getByValues,
    getAll,
    deleteUser,
};
