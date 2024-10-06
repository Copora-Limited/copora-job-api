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
    street: string;

    @Column()
    country: string;

    @Column()
    town: string;

    @Column()
    postcode: string;

    @Column()
    linkedin: string;

    @Column()
    twitter: string;

    @Column()
    behance: string;

    @Column()
    dribble: string;

    @Column()
    github: string;

    @Column()
    website: string;
}
