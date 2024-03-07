import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'boolean', default: false })
    isFinal: boolean = false;

    @CreateDateColumn({ select: false })
    createDate: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deleteDate: Date | null;
}
