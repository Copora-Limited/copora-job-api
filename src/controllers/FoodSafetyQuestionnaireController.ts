import { Request, Response } from 'express';
import { FoodSafetyQuestionnaireService } from '../services/FoodSafetyQuestionnaireService';

export class FoodSafetyQuestionnaireController {
    private static foodSafetyQuestionnaireService = new FoodSafetyQuestionnaireService();

    // Create a new Food Safety Questionnaire or update if it already exists
    static async createFoodSafetyQuestionnaire(req: Request, res: Response) {
        try {
            const { applicationNo, cleaningRawMeatUtensilsRequired, foodSafetyAct1990Description, cleaningRequirement, contaminatedFoodCharacteristics, bacteriaFactTrue, highRiskFoodStoragePosition, temperatureDangerZone, handWashingScenarios, allergenDefinition, highRiskFoodsExamples, foodSafetyActOffense, licensingRegulationAgreement } = req.body;
    
            // Validate required fields
            if (!applicationNo) {
                return res.status(400).json({ message: 'Application number is required.' });
            }
    
            // Additional validation for specific fields can be added here
            // e.g., if certain questions must be answered:
            
            if (cleaningRawMeatUtensilsRequired === null) {
                return res.status(400).json({ message: 'Answer for "Cleaning raw meat utensils" is required.' });
            }

            if (foodSafetyAct1990Description === null) {
                return res.status(400).json({ message: 'Answer for "Food Safety Act 1990 description" is required.' });
            }
            
            if (cleaningRequirement === null) {
                return res.status(400).json({ message: 'Answer for "Cleaning requirement" is required.' });
            }
            
            if (contaminatedFoodCharacteristics === null) {
                return res.status(400).json({ message: 'Answer for "Contaminated food characteristics" is required.' });
            }
            
            if (bacteriaFactTrue === null) {
                return res.status(400).json({ message: 'Answer for "Bacteria fact true" is required.' });
            }
            
            if (highRiskFoodStoragePosition === null) {
                return res.status(400).json({ message: 'Answer for "High-risk food storage position" is required.' });
            }
            
            if (temperatureDangerZone === null) {
                return res.status(400).json({ message: 'Answer for "Temperature danger zone" is required.' });
            }
            
            if (handWashingScenarios === null) {
                return res.status(400).json({ message: 'Answer for "Hand washing scenarios" is required.' });
            }
            
            if (allergenDefinition === null) {
                return res.status(400).json({ message: 'Answer for "Allergen definition" is required.' });
            }
            
            if (highRiskFoodsExamples === null) {
                return res.status(400).json({ message: 'Answer for "High-risk foods examples" is required.' });
            }
            
            if (foodSafetyActOffense === null) {
                return res.status(400).json({ message: 'Answer for "Food Safety Act offense" is required.' });
            }
            

            // if (licensingRegulationAgreement === null) {
            //     return res.status(400).json({ message: 'Please accept the agreement to proceed.' });
            // }

            
            // Check if the Food Safety Questionnaire with the given applicationNo exists
            const existingFoodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.getFoodSafetyQuestionnaireByApplicationNo(applicationNo);
    
            if (existingFoodSafetyQuestionnaire) {
                // If it exists, update the existing record
                const updateData = { ...req.body, attempted: true };
                const updatedFoodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.updateFoodSafetyQuestionnaireByApplicationNo(applicationNo, updateData);
                return res.status(200).json({ message: 'Food Safety Questionnaire updated', data: updatedFoodSafetyQuestionnaire });
            } else {
                // If it does not exist, create a new record with attempted set to true
                const foodSafetyData = { ...req.body, attempted: true };
                const newFoodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.createFoodSafetyQuestionnaire(foodSafetyData);
                return res.status(201).json({ message: 'Food Safety Questionnaire created', data: newFoodSafetyQuestionnaire });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating or updating food safety questionnaire', error: error.message });
        }
    }
    
    
    // Get Food Safety Questionnaire by applicationNo
    static async getFoodSafetyQuestionnaireByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const foodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.getFoodSafetyQuestionnaireByApplicationNo(applicationNo);
            if (!foodSafetyQuestionnaire) {
                // return res.status(404).send({ message: 'Food Safety Questionnaire not found' });
                return res.status(200).send([]);

            }
            res.status(200).send(foodSafetyQuestionnaire);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching food safety questionnaire', error: error.message });
        }
    }

    // Update Food Safety Questionnaire by applicationNo
    static async updateFoodSafetyQuestionnaireByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedFoodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.updateFoodSafetyQuestionnaireByApplicationNo(applicationNo, req.body);
            if (!updatedFoodSafetyQuestionnaire) {
                return res.status(404).send({ message: 'Food Safety Questionnaire not found' });
            }
            res.status(200).send(updatedFoodSafetyQuestionnaire);
        } catch (error) {
            res.status(400).send({ message: 'Error updating food safety questionnaire', error: error.message });
        }
    }

    // Delete Food Safety Questionnaire by applicationNo
    static async deleteFoodSafetyQuestionnaireByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.deleteFoodSafetyQuestionnaireByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
