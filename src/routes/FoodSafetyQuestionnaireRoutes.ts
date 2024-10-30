import { Router } from 'express';
import { FoodSafetyQuestionnaireController } from '../controllers/FoodSafetyQuestionnaireController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: FoodSafetyQuestionnaire
 *   description: API for managing food safety questionnaires
 */

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
 *               cleaningRawMeatUtensilsRequired:
 *                 type: boolean
 *                 example: true
 *               foodSafetyAct1990Description:
 *                 type: boolean
 *                 example: true
 *               cleaningRequirement:
 *                 type: boolean
 *                 example: false
 *               contaminatedFoodCharacteristics:
 *                 type: string
 *                 example: "Look and taste normal."
 *               bacteriaFactTrue:
 *                 type: string
 *                 example: "Bacteria grow fastest when they are warm."
 *               highRiskFoodStoragePosition:
 *                 type: string
 *                 example: "Above raw food."
 *               temperatureDangerZone:
 *                 type: string
 *                 example: "5°C to 63°C"
 *               handWashingScenarios:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["After touching raw meat", "Before preparing food", "After sneezing"]
 *               allergenDefinition:
 *                 type: string
 *                 example: "A food or ingredient that causes an allergic reaction."
 *               highRiskFoodsExamples:
 *                 type: string
 *                 example: "Cooked meat, fish, shellfish."
 *               foodSafetyActOffense:
 *                 type: string
 *                 example: "Selling food unfit for consumption."
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

/**
 * @swagger
 * /food-safety-questionnaire/{applicationNo}:
 *   get:
 *     summary: Get Food Safety Questionnaire by Application Number
 *     tags: [FoodSafetyQuestionnaire]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Food Safety Questionnaire retrieved successfully
 *       404:
 *         description: Food Safety Questionnaire not found
 */
router.get('/:applicationNo', FoodSafetyQuestionnaireController.getFoodSafetyQuestionnaireByNo);

/**
 * @swagger
 * /food-safety-questionnaire/{applicationNo}:
 *   put:
 *     summary: Update Food Safety Questionnaire by Application Number
 *     tags: [FoodSafetyQuestionnaire]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cleaningRawMeatUtensilsRequired:
 *                 type: boolean
 *                 example: true
 *               foodSafetyAct1990Description:
 *                 type: boolean
 *                 example: true
 *               cleaningRequirement:
 *                 type: string
 *                 example: "Clean surfaces after preparing raw meat."
 *               contaminatedFoodCharacteristics:
 *                 type: string
 *                 example: "Visible mold, bad smell, off taste."
 *               bacteriaFactTrue:
 *                 type: string
 *                 example: "Bacteria multiply rapidly at room temperature."
 *               highRiskFoodStoragePosition:
 *                 type: string
 *                 example: "Store at the top of the fridge."
 *               temperatureDangerZone:
 *                 type: string
 *                 example: "5°C to 60°C"
 *               handWashingScenarios:
 *                 type: string
 *                 example: "Before eating, after handling raw meat."
 *               allergenDefinition:
 *                 type: string
 *                 example: "Substances that can cause allergic reactions."
 *               highRiskFoodsExamples:
 *                 type: string
 *                 example: "Eggs, dairy, seafood."
 *               foodSafetyActOffense:
 *                 type: string
 *                 example: "Selling contaminated food."
 *               licensingRegulationAgreement:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Food Safety Questionnaire updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Food Safety Questionnaire not found
 */
router.put('/:applicationNo', FoodSafetyQuestionnaireController.updateFoodSafetyQuestionnaireByNo);

/**
 * @swagger
 * /food-safety-questionnaire/{applicationNo}:
 *   delete:
 *     summary: Delete Food Safety Questionnaire by Application Number
 *     tags: [FoodSafetyQuestionnaire]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Food Safety Questionnaire deleted successfully
 *       404:
 *         description: Food Safety Questionnaire not found
 */
router.delete('/:applicationNo', FoodSafetyQuestionnaireController.deleteFoodSafetyQuestionnaireByNo);

export default router;
