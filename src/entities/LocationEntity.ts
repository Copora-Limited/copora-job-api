import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: true})
    name: string;

    @Column({type: 'varchar', nullable: true})
    address: string;
}
