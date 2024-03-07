import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Message } from '@/routes/message/message.entity';
import { Status } from '@/routes/status/status.entity';

import { ActionType } from './action.type';

@Entity()
export class Action extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    name!: string;

    @Column({ type: 'varchar', nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: ActionType,
        default: ActionType.REGULAR,
    })
    type: ActionType = ActionType.REGULAR;

    @JoinColumn()
    @ManyToOne(() => Message, { cascade: true })
    message!: Message;

    @JoinColumn()
    @ManyToOne(() => Status, { cascade: true })
    nextStatus!: Status;

    @CreateDateColumn({ select: false })
    createDate: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deleteDate: Date | null;
}
