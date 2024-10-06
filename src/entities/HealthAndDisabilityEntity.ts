import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class HealthAndDisability {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    gpName: string;

    @Column()
    gpAddress: string;

    @Column()
    relevantHealthIssues: boolean;

    @Column()
    relevantHealthIssuesDetails: string;

    @Column()
    majorIllnessTreatment: boolean;

    @Column()
    majorIllnessDetails: string;

    @Column()
    suddenLossOfConsciousness: boolean;

    @Column()
    consciousnessLossDetails: string;

    @Column()
    healthRelatedAbsences: boolean;

    @Column()
    healthRelatedAbsencesDetails: string;

    @Column()
    currentMedications: boolean;

    @Column()
    medicationDetails: string;

    @Column()
    physicalLimitations: boolean;

    @Column()
    limitationsDetails: string;

    @Column()
    colorVisionDefects: boolean;

    @Column()
    colorVisionDefectsDetails: string;

    @Column()
    disabilityAdjustmentNeeds: string;

    @Column()
    agreementCertification: boolean;

    @Column()
    agreementToReportInfection: boolean;
}
