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

    @Column()
    employmentStatusDeclaration: string;

    @Column()
    declarationAgreement: string;

    @Column()
    userConsent: string;
}
