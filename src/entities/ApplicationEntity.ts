import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
