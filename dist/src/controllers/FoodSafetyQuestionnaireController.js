"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodSafetyQuestionnaireController = void 0;
const FoodSafetyQuestionnaireService_1 = require("../services/FoodSafetyQuestionnaireService");
class FoodSafetyQuestionnaireController {
    // Create a new Food Safety Questionnaire or update if it already exists
    static createFoodSafetyQuestionnaire(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.body;
                // Check if the FoodSafetyQuestionnaire with the given applicationNo exists
                const existingFoodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.getFoodSafetyQuestionnaireByApplicationNo(applicationNo);
                if (existingFoodSafetyQuestionnaire) {
                    // If it exists, update the existing record
                    const updateData = Object.assign(Object.assign({}, req.body), { attempted: true });
                    const updatedFoodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.updateFoodSafetyQuestionnaireByApplicationNo(applicationNo, updateData);
                    return res.status(200).send({ message: 'Food Safety Questionnaire updated', data: updatedFoodSafetyQuestionnaire });
                }
                else {
                    // If it does not exist, create a new record with attempted set to true
                    const foodSafetyData = Object.assign(Object.assign({}, req.body), { attempted: true });
                    const newFoodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.createFoodSafetyQuestionnaire(foodSafetyData);
                    return res.status(201).send({ message: 'Food Safety Questionnaire created', data: newFoodSafetyQuestionnaire });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error creating or updating food safety questionnaire', error: error.message });
            }
        });
    }
    // Get Food Safety Questionnaire by applicationNo
    static getFoodSafetyQuestionnaireByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const foodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.getFoodSafetyQuestionnaireByApplicationNo(applicationNo);
                if (!foodSafetyQuestionnaire) {
                    // return res.status(404).send({ message: 'Food Safety Questionnaire not found' });
                    return res.status(200).send([]);
                }
                res.status(200).send(foodSafetyQuestionnaire);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching food safety questionnaire', error: error.message });
            }
        });
    }
    // Update Food Safety Questionnaire by applicationNo
    static updateFoodSafetyQuestionnaireByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedFoodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.updateFoodSafetyQuestionnaireByApplicationNo(applicationNo, req.body);
                if (!updatedFoodSafetyQuestionnaire) {
                    return res.status(404).send({ message: 'Food Safety Questionnaire not found' });
                }
                res.status(200).send(updatedFoodSafetyQuestionnaire);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating food safety questionnaire', error: error.message });
            }
        });
    }
    // Delete Food Safety Questionnaire by applicationNo
    static deleteFoodSafetyQuestionnaireByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.deleteFoodSafetyQuestionnaireByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.FoodSafetyQuestionnaireController = FoodSafetyQuestionnaireController;
FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService = new FoodSafetyQuestionnaireService_1.FoodSafetyQuestionnaireService();
