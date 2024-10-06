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
exports.PersonalDetailsService = void 0;
const PersonalDetailsEntity_1 = require("../entities/PersonalDetailsEntity");
const data_source_1 = require("../data-source");
const personalDetailsRepository = data_source_1.AppDataSource.getRepository(PersonalDetailsEntity_1.PersonalDetails);
class PersonalDetailsService {
    // Create a new PersonalDetails entry
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = personalDetailsRepository.create(data);
                return yield personalDetailsRepository.save(entry);
            }
            catch (error) {
                console.error('Error creating personal details:', error);
                throw new Error('Error creating personal details');
            }
        });
    }
    // Get all PersonalDetails entries
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield personalDetailsRepository.find();
            }
            catch (error) {
                console.error('Error fetching all personal details:', error);
                throw new Error('Error fetching all personal details');
            }
        });
    }
    // Get PersonalDetails entry by applicationNo
    static getByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("here", applicationNo);
            try {
                // const personalDetails = await personalDetailsRepository.findOneBy({ applicationNo });
                const personalDetails = yield data_source_1.AppDataSource.getRepository(PersonalDetailsEntity_1.PersonalDetails).findOneBy({ applicationNo });
                return personalDetails || null;
            }
            catch (error) {
                console.error('Error fetching personal details by application number:', error);
                throw new Error('Error fetching personal details by application number');
            }
        });
    }
    // Update PersonalDetails entry by applicationNo
    static updateByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = yield this.getByApplicationNo(applicationNo);
                if (!entry) {
                    throw new Error('Personal details not found');
                }
                Object.assign(entry, data);
                return yield personalDetailsRepository.save(entry);
            }
            catch (error) {
                console.error('Error updating personal details:', error);
                throw new Error('Error updating personal details');
            }
        });
    }
    // Delete PersonalDetails entry by applicationNo
    static deleteByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield personalDetailsRepository.delete({ applicationNo });
                if (result.affected === 0) {
                    throw new Error('Personal details not found');
                }
                return 'Personal details deleted';
            }
            catch (error) {
                console.error('Error deleting personal details:', error);
                throw new Error('Error deleting personal details');
            }
        });
    }
}
exports.PersonalDetailsService = PersonalDetailsService;
