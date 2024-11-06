import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class PersonalDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    applicationNo: string;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    dateOfBirth: Date;

    @Column({nullable: true})
    gender: string;

    @Column({nullable: true})
    nationalInsuranceNumber: string;

    @Column({nullable: true})
    passportPhoto: string;

    @Column({nullable: true})
    requireWorkVisa: string;

    @Column({ nullable: true })
    internationalPassport: string;

    @Column({ nullable: true })
    visaDocument: string;

    @Column({ nullable: true })
    ninProof: string;

    @Column({ nullable: true })
    addressProof: string;

    @Column({nullable: true, default: false})
    attempted: boolean;

    
}
