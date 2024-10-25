import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProfessionalDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    applicationNo: string;

    @Column()
    companyName: string;

    @Column()
    jobTitle: string;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ nullable: true })
    responsibilities: string;

    @Column({ nullable: true })
    achievements: string;

    @Column({ nullable: true })
    referenceContactName: string;

    @Column({ nullable: true })
    referenceContactPhone: string;

    @Column({ nullable: true })
    referenceContactEmail: string;

    @Column({nullable: true, default: false})
    attempted: boolean;
}
