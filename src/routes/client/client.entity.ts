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

import { Status } from '@/routes/status/status.entity';

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    phoneNumber!: string;

    @Column({ type: 'varchar', nullable: true })
    name?: string;

    @JoinColumn()
    @ManyToOne(() => Status, { cascade: true })
    status?: Status;

    @CreateDateColumn({ select: false })
    createDate: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deleteDate: Date | null;
}
