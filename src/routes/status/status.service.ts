import { Status } from './status.entity';
import statusRepository from './status.repository';
import { StatusModel } from './status.type';

const createOrUpdate = (status: StatusModel) => statusRepository.save(status);

const getById = (id: number) => statusRepository.findById(id);

const getAll = () => statusRepository.findAll();

const deleteUser = async (id: number) => {
    const status = await statusRepository.findById(id);
    return Status.save({
        ...status,
        deleteDate: new Date(),
    });
};

export default {
    createOrUpdate,
    getById,
    getAll,
    deleteUser,
};
