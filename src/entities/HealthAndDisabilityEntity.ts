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

    @Column({nullable: true})
    gpName: string;

    @Column({nullable: true})
    gpAddress: string;

    @Column({nullable: true})
    relevantHealthIssues: boolean;

    @Column({nullable: true})
    relevantHealthIssuesDetails: string;

    @Column({nullable: true})
    majorIllnessTreatment: boolean;

    @Column({nullable: true})
    majorIllnessDetails: string;

    @Column({nullable: true})
    suddenLossOfConsciousness: boolean;

    @Column({nullable: true})
    consciousnessLossDetails: string;

    @Column({nullable: true})
    healthRelatedAbsences: boolean;

    @Column({nullable: true})
    healthRelatedAbsencesDetails: string;

    @Column({nullable: true})
    currentMedications: boolean;

    @Column({nullable: true})
    medicationDetails: string;

    @Column({nullable: true})
    physicalLimitations: boolean;

    @Column({nullable: true})
    limitationsDetails: string;

    @Column({nullable: true})
    colorVisionDefects: boolean;

    @Column({nullable: true})
    colorVisionDefectsDetails: string;

    @Column({nullable: true})
    disabilityAdjustmentNeeds: string;

    @Column({nullable: true})
    agreementCertification: boolean;

    @Column({nullable: true})
    agreementToReportInfection: boolean;

    @Column({nullable: true, default: false})
    attempted: boolean;
}
