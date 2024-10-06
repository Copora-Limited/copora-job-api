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
exports.AgreementConsentService = void 0;
const AgreementConsentEntity_1 = require("../entities/AgreementConsentEntity");
const data_source_1 = require("../data-source");
const agreementConsentRepository = data_source_1.AppDataSource.getRepository(AgreementConsentEntity_1.AgreementConsent);
class AgreementConsentService {
    // Create a new AgreementConsent
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreementConsent = agreementConsentRepository.create(data);
            return yield agreementConsentRepository.save(agreementConsent);
        });
    }
    // Get all AgreementConsents
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield agreementConsentRepository.find();
        });
    }
    // Get AgreementConsent by applicationNo
    static getByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield agreementConsentRepository.findOneBy({ applicationNo });
        });
    }
    // Update AgreementConsent by applicationNo
    static updateByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const agreementConsent = yield this.getByApplicationNo(applicationNo);
            if (!agreementConsent) {
                throw new Error('Agreement Consent not found');
            }
            Object.assign(agreementConsent, data);
            return yield agreementConsentRepository.save(agreementConsent);
        });
    }
    // Delete AgreementConsent by applicationNo
    static deleteByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield agreementConsentRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Agreement Consent not found');
            }
            return 'Agreement Consent deleted';
        });
    }
}
exports.AgreementConsentService = AgreementConsentService;
