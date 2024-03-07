import { DeepPartial } from 'typeorm';

import { Status } from './status.entity';

const save = (status: DeepPartial<Status>) => Status.save(status);

const findById = (id: number) => Status.find({ where: { id } });

const findAll = () => Status.find();

const update = (statusId: number, statusData: Status) => Status.update(statusId, statusData);

const remove = (id: number) => Status.delete({ id });

export default {
    save,
    findById,
    findAll,
    update,
    remove,
};
