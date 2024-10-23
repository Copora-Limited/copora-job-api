import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class PersonalDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    gender: string;

    @Column()
    nationalInsuranceNumber: string;

    @Column()
    passportPhoto: string;
    
}
