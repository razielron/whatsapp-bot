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

import { Action } from '@/routes/action/action.entity';
import { Status } from '@/routes/status/status.entity';

@Entity()
export class ResponsePhrase extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    text!: string;

    @Column({ type: 'boolean', default: true })
    isAccurate?: boolean = true;

    @JoinColumn()
    @ManyToOne(() => Status, { cascade: true })
    currentStatus!: Status;

    @JoinColumn()
    @ManyToOne(() => Action, { cascade: true })
    action!: Action;

    @CreateDateColumn({ select: false })
    createDate: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deleteDate: Date | null;
}
