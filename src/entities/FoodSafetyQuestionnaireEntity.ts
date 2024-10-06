import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class FoodSafetyQuestionnaire {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Application)
    // applicationNo: Application;

    @Column({ unique: true })
    applicationNo: string;

    @Column()
    cleaningRawMeatUtensilsRequired: boolean;

    @Column()
    foodSafetyAct1990Description: string;

    @Column()
    cleaningRequirement: string;

    @Column()
    contaminatedFoodCharacteristics: string;

    @Column()
    bacteriaFactTrue: string;

    @Column()
    highRiskFoodStoragePosition: string;

    @Column()
    temperatureDangerZone: string;

    @Column()
    handWashingScenarios: string;

    @Column()
    allergenDefinition: string;

    @Column()
    highRiskFoodsExamples: string;

    @Column()
    foodSafetyActOffense: string;

    @Column()
    licensingRegulationAgreement: boolean;
}
