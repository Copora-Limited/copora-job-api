import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class PersonalDetails {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    title: string;

    // @Column()
    // firstname: string;

    // @Column()
    // lastname: string;

    // @Column()
    // middlename: string;

    // @Column()
    // email: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    gender: string;

    @Column()
    nationalInsuranceNumber: string;

    @Column()
    passportPhoto: string;
    
}
