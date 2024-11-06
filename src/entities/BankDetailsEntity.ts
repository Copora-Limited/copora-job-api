import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BankDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    bankName: string;

    @Column()
    accountNumber: string;

    @Column()
    sortCode: string;

    @Column()
    accountName: string;

    // Field for employment status declaration
    @Column()
    employmentStatusDeclaration: string;

    // Field for student loan status
    @Column({ nullable: true })
    studentLoanStatus: string;

    // Field for indicating whether P45 is attached
    @Column({ default: false, nullable: true })
    p45Attached: boolean;

    @Column({nullable: true, default: false})
attempted: boolean;
}
