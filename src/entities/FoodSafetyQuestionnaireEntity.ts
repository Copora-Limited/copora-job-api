import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FoodSafetyQuestionnaire {
    @PrimaryGeneratedColumn()
    id: number;

    // Link to the application (commented out for now)
    // @ManyToOne(() => Application)
    // applicationNo: Application;

    @Column({ unique: true })
    applicationNo: string;

    // Updated: Cleaning chopping boards/utensils after using them for raw meat
    @Column({ nullable: true })
    cleaningRawMeatUtensilsRequired: boolean;

    // New: Clean hands when they are dirty
    @Column({ nullable: true })
    cleanHandsWhenDirty: boolean;

    // Updated: Characteristics of food contaminated with bacteria
    @Column({ nullable: true })
    contaminatedFoodCharacteristics: string;

    // Updated: True statement about bacteria
    // @Column({ nullable: true })
    // trueStatementAboutBacteria: string;

    // Updated: High-risk food storage
    @Column({ nullable: true })
    highRiskFoodStorage: string;

    // Updated: Temperature danger zone
    @Column({ nullable: true })
    temperatureDangerZone: string;

    // Updated: Scenarios for when to wash hands at work
    @Column("simple-array", { nullable: true })
    handWashingScenarios: string[];

    // New: Food Safety Act true or false statement
    // @Column({ nullable: true })
    // foodSafetyActTrueOrFalse: string;

    // Updated: Allergen definition
    @Column({ nullable: true })
    allergenDefinition: string;

    // Updated: High-risk foods
    @Column({ nullable: true })
    highRiskFoods: string;

    // New: Bacteria facts (first)
    @Column({ nullable: true })
    bacteriaFactOne: string;

    // New: Bacteria facts (second)
    @Column({ nullable: true })
    bacteriaFactTwo: string;

    // Updated: Food Safety Act offense
    @Column({ nullable: true })
    foodSafetyActOffence: string;

    // Additional column: Agreement to licensing regulations
    @Column({ nullable: true })
    licensingRegulationAgreement: boolean;

    @Column({nullable: true, default: false})
    attempted: boolean;
}
