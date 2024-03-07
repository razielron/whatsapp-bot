import { DeepPartial } from 'typeorm';

import { Client } from './client.entity';

const save = (client: DeepPartial<Client>) => Client.save(client);

const findById = (id: number) => Client.find({ where: { id } });

const findByPhoneNumber = (phoneNumber: string) => Client.findOne({ where: { phoneNumber } });

const findAll = () => Client.find();

const update = (clientId: number, clientData: Client) => Client.update(clientId, clientData);

const remove = (id: number) => Client.delete({ id });

export default {
    save,
    findById,
    findByPhoneNumber,
    findAll,
    update,
    remove,
};
