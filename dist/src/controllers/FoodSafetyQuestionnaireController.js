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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodSafetyQuestionnaireController = void 0;
const FoodSafetyQuestionnaireService_1 = require("../services/FoodSafetyQuestionnaireService");
class FoodSafetyQuestionnaireController {
    // Create a new Food Safety Questionnaire or update if it already exists
    static createFoodSafetyQuestionnaire(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { applicationNo } = _a, otherFields = __rest(_a, ["applicationNo"]);
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
                if (otherFields.handWashingScenarios === null ||
                    otherFields.handWashingScenarios.length === 0) {
                    return res.status(400).json({
                        message: 'Answer for "Hand washing scenarios" is required.'
                    });
                }
                if (otherFields.handWashingScenarios[0] === "") {
                    return res.status(400).json({
                        message: 'Please provide answer for  scenarios 1 for "Hand washing scenarios".'
                    });
                }
                if (otherFields.handWashingScenarios[1] === "") {
                    return res.status(400).json({
                        message: 'Please provide answer for  scenarios 2 for "Hand washing scenarios".'
                    });
                }
                if (otherFields.handWashingScenarios[2] === "") {
                    return res.status(400).json({
                        message: 'Please provide answer for  scenarios 3 for "Hand washing scenarios".'
                    });
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
                const existingFoodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.getFoodSafetyQuestionnaireByApplicationNo(applicationNo);
                if (existingFoodSafetyQuestionnaire) {
                    // If it exists, update the existing record
                    const updateData = Object.assign(Object.assign({}, req.body), { attempted: true });
                    const updatedFoodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.updateFoodSafetyQuestionnaireByApplicationNo(applicationNo, updateData);
                    return res.status(200).json({ message: 'Food Safety Questionnaire updated', data: updatedFoodSafetyQuestionnaire });
                }
                else {
                    // If it does not exist, create a new record with attempted set to true
                    const foodSafetyData = Object.assign(Object.assign({}, req.body), { attempted: true });
                    const newFoodSafetyQuestionnaire = yield FoodSafetyQuestionnaireController.foodSafetyQuestionnaireService.createFoodSafetyQuestionnaire(foodSafetyData);
                    return res.status(201).json({ message: 'Food Safety Questionnaire created', data: newFoodSafetyQuestionnaire });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating or updating food safety questionnaire', error: error.message });
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
