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
exports.GeneralInfoService = void 0;
const GeneralInfoEntity_1 = require("../entities/GeneralInfoEntity");
const data_source_1 = require("../data-source");
const generalInfoRepository = data_source_1.AppDataSource.getRepository(GeneralInfoEntity_1.GeneralInfo);
class GeneralInfoService {
    // Create a new PersonalDetails entry
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = generalInfoRepository.create(data);
            return yield generalInfoRepository.save(entry);
        });
    }
    // Get all PersonalDetails entries
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield generalInfoRepository.find();
        });
    }
    // Get PersonalDetails entry by applicationNo
    static getByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield generalInfoRepository.findOneBy({ applicationNo });
        });
    }
    // Update PersonalDetails entry by applicationNo
    static updateByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield this.getByApplicationNo(applicationNo);
            if (!entry) {
                throw new Error('Personal details not found');
            }
            Object.assign(entry, data);
            return yield generalInfoRepository.save(entry);
        });
    }
    // Delete PersonalDetails entry by applicationNo
    static deleteByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield generalInfoRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Personal details not found');
            }
            return 'Personal details deleted';
        });
    }
}
exports.GeneralInfoService = GeneralInfoService;
