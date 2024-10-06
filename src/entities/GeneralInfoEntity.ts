import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class GeneralInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    applicationNo: string;

    @Column()
    plateWaiting: boolean;

    @Column()
    retailCashier: boolean;

    @Column()
    barWork: boolean;

    @Column()
    hospitality: boolean;

    @Column()
    foodService: boolean;

    @Column()
    barista: boolean;

    @Column()
    supervising: boolean;

    @Column({ nullable: true })
    level2FoodHygieneCertificate: string;

    @Column({ nullable: true })
    level2FoodHygieneCertificateUpload: string;

    @Column()
    personalLicenseHolder: boolean;

    @Column({ nullable: true })
    personalLicenseCertificateUpload: string;

    @Column()
    dbsDisclosureAndBarringService: boolean;

    @Column({ nullable: true })
    dbsCertificateUpload: string;
}
