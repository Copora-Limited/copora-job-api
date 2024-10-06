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
exports.EducationalDetailsService = void 0;
const EducationalDetailsEntity_1 = require("../entities/EducationalDetailsEntity");
const data_source_1 = require("../data-source");
const educationalDetailsRepository = data_source_1.AppDataSource.getRepository(EducationalDetailsEntity_1.EducationalDetails);
class EducationalDetailsService {
    // Find educational details by course of study
    static findByApplicationNoAndCourseOfStudy(applicationNo, courseOfStudy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find educational details by both applicationNo and courseOfStudy
                return yield educationalDetailsRepository.findOne({
                    where: {
                        applicationNo,
                        courseOfStudy
                    }
                });
            }
            catch (error) {
                throw new Error(`Error finding educational details by application number and course of study: ${error.message}`);
            }
        });
    }
    // Create a new educational detail
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const educationalDetail = educationalDetailsRepository.create(data);
                return yield educationalDetailsRepository.save(educationalDetail);
            }
            catch (error) {
                throw new Error(`Error creating educational details: ${error.message}`);
            }
        });
    }
    // Update existing educational detail by id
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield educationalDetailsRepository.update(id, data);
                return yield educationalDetailsRepository.findOneBy({ id });
            }
            catch (error) {
                throw new Error(`Error updating educational details: ${error.message}`);
            }
        });
    }
    // Get EducationalDetails by applicationNo
    static getEducationalDetailsByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield educationalDetailsRepository.find({ where: { applicationNo } });
            }
            catch (error) {
                throw new Error(`Error fetching educational details: ${error.message}`);
            }
        });
    }
    // Update existing educational details by applicationNo
    static updateEducationalDetailsByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find existing educational details by applicationNo
                const existingDetails = yield educationalDetailsRepository.find({ where: { applicationNo } });
                if (!existingDetails.length) {
                    throw new Error('Educational Details not found');
                }
                // Update each entry with the provided data
                const updatedEntries = [];
                for (const detail of existingDetails) {
                    const updatedDetail = Object.assign(Object.assign({}, detail), data);
                    yield educationalDetailsRepository.update(detail.id, updatedDetail);
                    updatedEntries.push(yield educationalDetailsRepository.findOneBy({ id: detail.id }));
                }
                return updatedEntries;
            }
            catch (error) {
                throw new Error(`Error updating educational details: ${error.message}`);
            }
        });
    }
    // Delete EducationalDetails by applicationNo
    static deleteEducationalDetailsByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield educationalDetailsRepository.delete({ applicationNo });
                if (result.affected === 0) {
                    throw new Error('Educational Details not found');
                }
                return 'Educational Details deleted';
            }
            catch (error) {
                throw new Error(`Error deleting educational details: ${error.message}`);
            }
        });
    }
}
exports.EducationalDetailsService = EducationalDetailsService;
