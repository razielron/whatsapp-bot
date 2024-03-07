import { Message } from './message.entity';
import messageRepository from './message.repository';
import { MessageModel } from './message.type';

const createOrUpdate = (message: MessageModel) => messageRepository.save(message);

const getById = (id: number) => messageRepository.findById(id);

const getByStatus = (status: string) => messageRepository.findByStatus(status);

const getAll = () => messageRepository.findAll();

const deleteUser = async (id: number) => {
    const message = await messageRepository.findById(id);
    return Message.save({
        ...message,
        deleteDate: new Date(),
    });
};

export default {
    createOrUpdate,
    getById,
    getByStatus,
    getAll,
    deleteUser,
};
