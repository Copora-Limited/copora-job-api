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
exports.FoodSafetyQuestionnaireService = void 0;
const FoodSafetyQuestionnaireEntity_1 = require("../entities/FoodSafetyQuestionnaireEntity");
const data_source_1 = require("../data-source");
class FoodSafetyQuestionnaireService {
    constructor() {
        this.foodSafetyQuestionnaireRepository = data_source_1.AppDataSource.getRepository(FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire);
    }
    // Create a new FoodSafetyQuestionnaire
    createFoodSafetyQuestionnaire(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const foodSafetyQuestionnaire = this.foodSafetyQuestionnaireRepository.create(data);
            return yield this.foodSafetyQuestionnaireRepository.save(foodSafetyQuestionnaire);
        });
    }
    // Get FoodSafetyQuestionnaire by applicationNo
    getFoodSafetyQuestionnaireByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.foodSafetyQuestionnaireRepository.findOneBy({ applicationNo });
        });
    }
    // Update FoodSafetyQuestionnaire by applicationNo
    updateFoodSafetyQuestionnaireByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.foodSafetyQuestionnaireRepository.update({ applicationNo }, data);
            return yield this.foodSafetyQuestionnaireRepository.findOneBy({ applicationNo });
        });
    }
    // Delete FoodSafetyQuestionnaire by applicationNo
    deleteFoodSafetyQuestionnaireByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.foodSafetyQuestionnaireRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Food Safety Questionnaire not found');
            }
            return 'Food Safety Questionnaire deleted';
        });
    }
}
exports.FoodSafetyQuestionnaireService = FoodSafetyQuestionnaireService;
