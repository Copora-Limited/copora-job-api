import { Request, Response } from 'express';
import { FoodSafetyQuestionnaireService } from '../services/FoodSafetyQuestionnaireService';

export class FoodSafetyQuestionnaireController {
    private static foodSafetyQuestionnaireService = new FoodSafetyQuestionnaireService();

    // Create a new Food Safety Questionnaire or update if it already exists
    static async createFoodSafetyQuestionnaire(req: Request, res: Response) {
        try {
            const { applicationNo, ...otherFields  } = req.body;
    
            // Validate required fields
            if (!applicationNo) {
                return res.status(400).json({ message: 'Application number is required.' });
            }
    
            // Additional validation for specific fields can be added here
            // e.g., if certain questions must be answered:
            
            if (otherFields.cleaningRawMeatUtensilsRequired === null || otherFields.cleaningRawMeatUtensilsRequired === "") {
                return res.status(400).json({ message: 'Answer for "Cleaning raw meat utensils" is required.' });
            }
            
            if (otherFields.cleanHandsWhenDirty === null || otherFields.cleanHandsWhenDirty === "") {
                return res.status(400).json({ message: 'Answer for "Clean hands when dirty" is required.' });
            }
            
            if (otherFields.contaminatedFoodCharacteristics === null || otherFields.contaminatedFoodCharacteristics === "") {
                return res.status(400).json({ message: 'Answer for "Contaminated food appearance" is required.' });
            }
            
            if (otherFields.highRiskFoodStorage === null || otherFields.highRiskFoodStorage === "") {
                return res.status(400).json({ message: 'Answer for "High-risk food storage" is required.' });
            }
            
            if (otherFields.temperatureDangerZone === null || otherFields.temperatureDangerZone === "") {
                return res.status(400).json({ message: 'Answer for "Temperature danger zone" is required.' });
            }
            
            if (otherFields.handWashingScenarios === null || otherFields.handWashingScenarios.length === 0) {
                return res.status(400).json({ message: 'Answer for "Hand washing scenarios" is required.' });
            }
            
            // if (otherFields.foodSafetyActTrueOrFalse === null || otherFields.foodSafetyActTrueOrFalse === "") {
            //     return res.status(400).json({ message: 'Answer for "Food Safety Act true or false" is required.' });
            // }
            
            if (otherFields.allergenDefinition === null || otherFields.allergenDefinition === "") {
                return res.status(400).json({ message: 'Answer for "Allergen definition" is required.' });
            }
            
            if (otherFields.highRiskFoods === null || otherFields.highRiskFoods === "") {
                return res.status(400).json({ message: 'Answer for "High-risk foods" is required.' });
            }
            
            if (otherFields.bacteriaFactOne === null || otherFields.bacteriaFactOne === "") {
                return res.status(400).json({ message: 'Answer for "Bacteria facts (first)" is required.' });
            }
            
            if (otherFields.bacteriaFactTwo === null || otherFields.bacteriaFactTwo === "") {
                return res.status(400).json({ message: 'Answer for "Bacteria facts (second)" is required.' });
            }
            
            if (otherFields.foodSafetyActOffence === null || otherFields.foodSafetyActOffence === "") {
                return res.status(400).json({ message: 'Answer for "Food Safety Act offense" is required.' });
            }
            
            

            // if (otherFields.licensingRegulationAgreement === null) {
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
