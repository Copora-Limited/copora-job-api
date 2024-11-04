import { Router } from 'express';
import { FoodSafetyQuestionnaireController } from '../controllers/FoodSafetyQuestionnaireController';

const router = Router();

/**
 * @swagger
 * /food-safety-questionnaire:
 *   post:
 *     summary: Create a new Food Safety Questionnaire
 *     tags: [FoodSafetyQuestionnaire]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP67890"
 *               licensingRegulationAgreement:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Food Safety Questionnaire created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', FoodSafetyQuestionnaireController.createFoodSafetyQuestionnaire);