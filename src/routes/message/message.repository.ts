import { DeepPartial } from 'typeorm';

import { Message } from './message.entity';

const save = (message: DeepPartial<Message>) => Message.save(message);

const findById = (id: number) => Message.find({ where: { id } });

const findByStatus = (status: string) => Message.findOne({ where: { status } });

const findAll = () => Message.find();

const update = (messageId: number, messageData: Message) => Message.update(messageId, messageData);

const remove = (id: number) => Message.delete({ id });

export default {
    save,
    findById,
    findByStatus,
    findAll,
    update,
    remove,
};
