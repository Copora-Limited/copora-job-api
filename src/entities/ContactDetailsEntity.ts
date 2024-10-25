import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class ContactDetails {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;
    @Column({ unique: true })
    applicationNo: string;

    @Column()
    phone: string;

    @Column()
    address_line_1: string;

    @Column()
    address_line_2: string;

    @Column()
    country: string;

    @Column()
    town: string;

    @Column({nullable: true})
    postcode: string;

    @Column({nullable: true})
    linkedin: string;

    @Column({nullable: true})
    twitter: string;

    @Column({nullable: true, default: false})
    attempted: boolean;
}
