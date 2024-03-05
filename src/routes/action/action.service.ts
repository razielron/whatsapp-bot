import { Action } from './action.entity';
import actionRepository from './action.repository';
import { ActionModel } from './action.type';

const createOrUpdate = (action: ActionModel) => actionRepository.save(action);

const getById = (id: number) => actionRepository.findById(id);

const getInitial = () => actionRepository.findInitial();

const getAll = () => actionRepository.findAll();

const deleteUser = async (id: number) => {
    const action = await actionRepository.findById(id);
    return Action.save({
        ...action,
        deleteDate: new Date(),
    });
};

export default {
    createOrUpdate,
    getById,
    getInitial,
    getAll,
    deleteUser,
};
