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
exports.HealthAndDisability = void 0;
const typeorm_1 = require("typeorm");
let HealthAndDisability = class HealthAndDisability {
};
exports.HealthAndDisability = HealthAndDisability;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HealthAndDisability.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "applicationNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "gpName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "gpAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "relevantHealthIssues", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "relevantHealthIssuesDetails", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "majorIllnessTreatment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "majorIllnessDetails", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "suddenLossOfConsciousness", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "consciousnessLossDetails", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "healthRelatedAbsences", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "healthRelatedAbsencesDetails", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "currentMedications", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "medicationDetails", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "physicalLimitations", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "limitationsDetails", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "colorVisionDefects", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "colorVisionDefectsDetails", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HealthAndDisability.prototype, "disabilityAdjustmentNeeds", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "agreementCertification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], HealthAndDisability.prototype, "agreementToReportInfection", void 0);
exports.HealthAndDisability = HealthAndDisability = __decorate([
    (0, typeorm_1.Entity)()
], HealthAndDisability);
