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

    @Column({ nullable: true })
    address: string;

    // New fields
    @Column()
    jobTitle: string;

    @Column({ type: 'date', nullable: true  })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ type: 'text', nullable: true })
    responsibilities: string;

}
