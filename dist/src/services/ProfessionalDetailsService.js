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
exports.ProfessionalDetailsService = void 0;
const ProfessionalDetailsEntity_1 = require("../entities/ProfessionalDetailsEntity");
const data_source_1 = require("../data-source");
const professionalDetailsRepository = data_source_1.AppDataSource.getRepository(ProfessionalDetailsEntity_1.ProfessionalDetails);
class ProfessionalDetailsService {
    // Create a new ProfessionalDetails Service entry
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = professionalDetailsRepository.create(data);
            return yield professionalDetailsRepository.save(entry);
        });
    }
    // Get all ProfessionalDetails entries
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield professionalDetailsRepository.find();
        });
    }
    // Get ProfessionalDetails entry by applicationNo
    static getByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield professionalDetailsRepository.findOneBy({ applicationNo });
        });
    }
    // Update ProfessionalDetails entry by applicationNo
    static updateByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield this.getByApplicationNo(applicationNo);
            if (!entry) {
                throw new Error('Professional details not found');
            }
            Object.assign(entry, data);
            return yield professionalDetailsRepository.save(entry);
        });
    }
    // Delete ProfessionalDetails entry by applicationNo
    static deleteByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield professionalDetailsRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Professional details not found');
            }
            return 'Professional details deleted';
        });
    }
    static findByReferenceContactPhone(referenceContactPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the professional details by referenceContactPhone
                const entry = yield professionalDetailsRepository.findOne({
                    where: { referenceContactPhone }
                });
                return entry || null; // Return null if entry is not found
            }
            catch (error) {
                console.error('Error finding professional details by referenceContactPhone:', error);
                throw new Error('Error retrieving professional details');
            }
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = yield professionalDetailsRepository.findOneBy({ id });
                if (entry) {
                    Object.assign(entry, data);
                    return yield professionalDetailsRepository.save(entry);
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
exports.ProfessionalDetailsService = ProfessionalDetailsService;
