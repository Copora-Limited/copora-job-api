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
    static getOneByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield generalInfoRepository.findOneBy({ applicationNo });
            if (!data) {
                throw new Error("General information not found.");
            }
            // Transform the data to ensure proper typing
            return {
                id: data.id,
                applicationNo: data.applicationNo,
                plateWaiting: data.plateWaiting === "true",
                retailCashier: data.retailCashier === "true",
                barWork: data.barWork === "true",
                hospitality: data.hospitality === "true",
                foodService: data.foodService === "true",
                barista: data.barista === "true",
                supervising: data.supervising === "true",
                level2FoodHygieneCertificate: data.level2FoodHygieneCertificate === "true",
                level2FoodHygieneCertificateUpload: data.level2FoodHygieneCertificateUpload || null,
                personalLicenseHolder: data.personalLicenseHolder === "true",
                personalLicenseCertificateUpload: data.personalLicenseCertificateUpload || null,
                dbsDisclosureAndBarringService: data.dbsDisclosureAndBarringService === "true",
                dbsCertificateUpload: data.dbsCertificateUpload || null,
                attempted: Boolean(data.attempted),
            };
        });
    }
    // Update PersonalDetails entry by applicationNo
    static updateByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield this.getByApplicationNo(applicationNo);
            if (!entry) {
                throw new Error('General details not found');
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
                throw new Error('General details not found');
            }
            return 'General details deleted';
        });
    }
}
exports.GeneralInfoService = GeneralInfoService;
