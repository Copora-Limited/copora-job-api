import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmploymentType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
