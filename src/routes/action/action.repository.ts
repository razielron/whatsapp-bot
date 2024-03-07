import { DeepPartial } from 'typeorm';

import { Action } from './action.entity';
import { ActionType } from './action.type';

const save = (action: DeepPartial<Action>) => Action.save(action);

const findById = (id: number) =>
    Action.find({
        where: { id },
        relations: { message: true, nextStatus: true },
    });

const findAll = () => Action.find({ relations: { message: true, nextStatus: true } });

const findInitial = () =>
    Action.findOne({
        where: { type: ActionType.INITIAL },
        relations: { message: true, nextStatus: true },
    });

const update = (actionId: number, actionData: Action) => Action.update(actionId, actionData);

const remove = (id: number) => Action.delete({ id });

export default {
    save,
    findById,
    findInitial,
    findAll,
    update,
    remove,
};
