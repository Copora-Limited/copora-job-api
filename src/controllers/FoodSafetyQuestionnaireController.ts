import { Request, Response } from 'express';
import { FoodSafetyQuestionnaireService } from '../services/FoodSafetyQuestionnaireService';

export class FoodSafetyQuestionnaireController {
    private static foodSafetyQuestionnaireService = new FoodSafetyQuestionnaireService();

    // Create a new Food Safety Questionnaire or update if it already exists
    static async createFoodSafetyQuestionnaire(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;
    
            // Check if the FoodSafetyQuestionnaire with the given applicationNo exists
            const existingFoodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.getFoodSafetyQuestionnaireByApplicationNo(applicationNo);
    
            if (existingFoodSafetyQuestionnaire) {
                // If it exists, update the existing record
                const updatedFoodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.updateFoodSafetyQuestionnaireByApplicationNo(applicationNo, req.body);
                return res.status(200).send({ message: 'Food Safety Questionnaire updated', data: updatedFoodSafetyQuestionnaire });
            } else {
                // If it does not exist, create a new record with attempted set to true
                const foodSafetyData = { ...req.body, attempted: true };
                const newFoodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.createFoodSafetyQuestionnaire(foodSafetyData);
                return res.status(201).send({ message: 'Food Safety Questionnaire created', data: newFoodSafetyQuestionnaire });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating food safety questionnaire', error: error.message });
        }
    }
    
    // Get Food Safety Questionnaire by applicationNo
    static async getFoodSafetyQuestionnaireByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const foodSafetyQuestionnaire = await FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.getFoodSafetyQuestionnaireByApplicationNo(applicationNo);
            if (!foodSafetyQuestionnaire) {
                return res.status(404).send({ message: 'Food Safety Questionnaire not found' });
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
