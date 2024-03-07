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

import { Client } from '../client/client.entity';
import { OrderStatus } from './order.type';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: OrderStatus })
    status!: OrderStatus;

    @Column({ type: 'varchar', nullable: true })
    item?: string;

    @Column({ type: 'varchar', nullable: true })
    flavor1?: string;

    @Column({ type: 'varchar', nullable: true })
    flavor2?: string;

    @Column({ type: 'varchar', nullable: true })
    flavor3?: string;

    @Column({ type: 'varchar', nullable: true })
    flavor4?: string;

    @JoinColumn()
    @ManyToOne(() => Client)
    client!: Client;

    @CreateDateColumn({ select: false })
    createDate: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deleteDate: Date | null;
}
