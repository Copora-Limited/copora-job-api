import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    applicationNo: string;

    @Column()
    employerName: string;

    @Column()
    contactName: string;

    @Column({ nullable: false })
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;
}
