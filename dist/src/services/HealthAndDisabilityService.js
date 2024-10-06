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
exports.HealthAndDisabilityService = void 0;
const HealthAndDisabilityEntity_1 = require("../entities/HealthAndDisabilityEntity");
const data_source_1 = require("../data-source");
const healthAndDisabilityRepository = data_source_1.AppDataSource.getRepository(HealthAndDisabilityEntity_1.HealthAndDisability);
class HealthAndDisabilityService {
    // Create a new HealthAndDisability entry
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = healthAndDisabilityRepository.create(data);
            return yield healthAndDisabilityRepository.save(entry);
        });
    }
    // Get all HealthAndDisability entries
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield healthAndDisabilityRepository.find();
        });
    }
    // Get HealthAndDisability entry by applicationNo
    static getByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield healthAndDisabilityRepository.findOneBy({ applicationNo });
        });
    }
    // Update HealthAndDisability entry by applicationNo
    static updateByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield this.getByApplicationNo(applicationNo);
            if (!entry) {
                throw new Error('Health and Disability entry not found');
            }
            Object.assign(entry, data);
            return yield healthAndDisabilityRepository.save(entry);
        });
    }
    // Delete HealthAndDisability entry by applicationNo
    static deleteByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield healthAndDisabilityRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Health and Disability entry not found');
            }
            return 'Health and Disability entry deleted';
        });
    }
}
exports.HealthAndDisabilityService = HealthAndDisabilityService;
