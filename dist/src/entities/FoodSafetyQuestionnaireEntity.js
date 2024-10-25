"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodSafetyQuestionnaire = void 0;
const typeorm_1 = require("typeorm");
let FoodSafetyQuestionnaire = class FoodSafetyQuestionnaire {
};
exports.FoodSafetyQuestionnaire = FoodSafetyQuestionnaire;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FoodSafetyQuestionnaire.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "applicationNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], FoodSafetyQuestionnaire.prototype, "cleaningRawMeatUtensilsRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], FoodSafetyQuestionnaire.prototype, "foodSafetyAct1990Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "cleaningRequirement", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "contaminatedFoodCharacteristics", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "bacteriaFactTrue", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "highRiskFoodStoragePosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "temperatureDangerZone", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], FoodSafetyQuestionnaire.prototype, "handWashingScenarios", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "allergenDefinition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "highRiskFoodsExamples", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FoodSafetyQuestionnaire.prototype, "foodSafetyActOffense", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], FoodSafetyQuestionnaire.prototype, "licensingRegulationAgreement", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], FoodSafetyQuestionnaire.prototype, "attempted", void 0);
exports.FoodSafetyQuestionnaire = FoodSafetyQuestionnaire = __decorate([
    (0, typeorm_1.Entity)()
], FoodSafetyQuestionnaire);
