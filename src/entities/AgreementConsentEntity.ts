import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class AgreementConsent {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;

    @Column({ unique: true })
    applicationNo: string;

    @Column({ nullable: true})
    firstName: string;

    @Column({ nullable: true})
    lastName: string;

    @Column({ nullable: true})
    address: string;

    @Column({ nullable: true})
    userConsent: string;

    @Column({nullable: true, default: false})
    attempted: boolean;
}
