import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class GeneralInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    applicationNo: string;

    @Column({ nullable: true })
    plateWaiting: string;

    @Column({ nullable: true })
    retailCashier: string;

    @Column({ nullable: true })
    barWork: string;

    @Column({ nullable: true })
    hospitality: string;

    @Column({ nullable: true })
    foodService: string;

    @Column({ nullable: true })
    barista: string;

    @Column({ nullable: true })
    supervising: string;

    @Column({ nullable: true })
    level2FoodHygieneCertificate: string;

    @Column({ nullable: true })
    level2FoodHygieneCertificateUpload: string;

    @Column({ nullable: true })
    personalLicenseHolder: string;

    @Column({ nullable: true })
    personalLicenseCertificateUpload: string;

    @Column({ nullable: true })
    dbsDisclosureAndBarringService: string;

    @Column({ nullable: true })
    dbsCertificateUpload: string;
}
