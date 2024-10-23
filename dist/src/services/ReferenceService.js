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
exports.ReferenceService = void 0;
const data_source_1 = require("../data-source");
const ReferenceEntity_1 = require("../entities/ReferenceEntity");
const referenceRepository = data_source_1.AppDataSource.getRepository(ReferenceEntity_1.Reference);
class ReferenceService {
    // Create or update Reference
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = referenceRepository.create(data);
            return yield referenceRepository.save(entry);
        });
    }
    static createOrUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { applicationNo } = data;
            let reference = yield referenceRepository.findOneBy({ applicationNo });
            if (reference) {
                // Update existing reference
                Object.assign(reference, data);
                return yield referenceRepository.save(reference);
            }
            else {
                // Create new reference
                reference = referenceRepository.create(data);
                return yield referenceRepository.save(reference);
            }
        });
    }
    // Get Reference by applicationNo
    static getByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield referenceRepository.findOneBy({ applicationNo });
        });
    }
    // Update Reference by applicationNo
    static updateByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let reference = yield this.getByApplicationNo(applicationNo);
            if (!reference) {
                throw new Error('Reference not found');
            }
            Object.assign(reference, data);
            return yield referenceRepository.save(reference);
        });
    }
    // Delete Reference by applicationNo
    static deleteByApplicationNoAndId(applicationNo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield referenceRepository.delete({ applicationNo, id });
            if (result.affected === 0) {
                throw new Error('Reference not found');
            }
            return 'Reference deleted';
        });
    }
    static findByApplicationNoAndPhone(applicationNo, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the reference details by applicationNo and phone
                const entry = yield referenceRepository.findOne({
                    where: {
                        applicationNo,
                        phone
                    }
                });
                return entry || null; // Return null if entry is not found
            }
            catch (error) {
                console.error('Error finding reference details by applicationNo and phone:', error);
                throw new Error('Error retrieving reference details');
            }
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = yield referenceRepository.findOneBy({ id });
                if (entry) {
                    Object.assign(entry, data);
                    return yield referenceRepository.save(entry);
                }
                return null;
            }
            catch (error) {
                console.error('Error updating professional details:', error);
                throw new Error('Error updating professional details');
            }
        });
    }
}
exports.ReferenceService = ReferenceService;
