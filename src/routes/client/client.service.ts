import { Client } from './client.entity';
import clientRepository from './client.repository';
import { ClientModel, CreateClientModel } from './client.type';

const createOrUpdate = (client: ClientModel | CreateClientModel) => clientRepository.save(client);

const getById = (id: number) => clientRepository.findById(id);

const getByPhoneNumber = (phoneNumber: string) => clientRepository.findByPhoneNumber(phoneNumber);

const getAll = () => clientRepository.findAll();

const deleteUser = async (id: number) => {
    const client = await clientRepository.findById(id);
    return Client.save({
        ...client,
        deleteDate: new Date(),
    });
};

export default {
    createOrUpdate,
    getById,
    getByPhoneNumber,
    getAll,
    deleteUser,
};
