import { DeepPartial } from 'typeorm';

import { Message } from './message.entity';

const save = (message: DeepPartial<Message>) => Message.save(message);

const findById = (id: number) => Message.find({ where: { id } });

const findAll = () => Message.find();

const update = (messageId: number, messageData: Message) => Message.update(messageId, messageData);

const remove = (id: number) => Message.delete({ id });

export default {
    save,
    findById,
    findAll,
    update,
    remove,
};
