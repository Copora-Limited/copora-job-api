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

    // Question 1: Cleaning chopping boards/utensils after using them for raw meat
    @Column({ nullable: true })
    cleaningRawMeatUtensilsRequired: boolean;

    // Question 2: The Food Safety Act 1990 description
    @Column({ nullable: true })
    foodSafetyAct1990Description: boolean;

    // Question 3: When to clean hands and kitchen surfaces
    @Column({ nullable: true })
    cleaningRequirement: string;

    // Question 4: Characteristics of food contaminated with bacteria
    @Column({ nullable: true })
    contaminatedFoodCharacteristics: string;

    // Question 5: Facts about bacteria growth and freezing
    @Column({ nullable: true })
    bacteriaFactTrue: string;

    // Question 6: Where high-risk food should be stored in a refrigerator
    @Column({ nullable: true })
    highRiskFoodStoragePosition: string;

    // Question 7: Temperature danger zone for food safety
    @Column({ nullable: true })
    temperatureDangerZone: string;

    // Question 8: Scenarios for when to wash hands at work
    @Column("simple-array", { nullable: true })
    handWashingScenarios: string[];

    // Question 9: What is an allergen?
    @Column({ nullable: true })
    allergenDefinition: string;

    // Question 10: Examples of high-risk foods
    @Column({ nullable: true })
    highRiskFoodsExamples: string;

    // Question 11: Offense under the Food Safety Act 1990
    @Column({ nullable: true })
    foodSafetyActOffense: string;

    // Additional column: Agreement to licensing regulations
    @Column({ nullable: true })
    licensingRegulationAgreement: boolean;
}
