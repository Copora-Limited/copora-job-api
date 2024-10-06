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
exports.BankDetailsService = void 0;
const BankDetailsEntity_1 = require("../entities/BankDetailsEntity");
const data_source_1 = require("../data-source");
const bankDetailsRepository = data_source_1.AppDataSource.getRepository(BankDetailsEntity_1.BankDetails);
class BankDetailsService {
    // Create a new BankDetails
    static createBankDetails(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankDetails = bankDetailsRepository.create(data);
            return yield bankDetailsRepository.save(bankDetails);
        });
    }
    // Get BankDetails by applicationNo
    static getBankDetailsByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bankDetailsRepository.findOneBy({ applicationNo });
        });
    }
    // Update BankDetails by applicationNo
    static updateBankDetailsByApplicationNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield bankDetailsRepository.update({ applicationNo }, data);
            return yield bankDetailsRepository.findOneBy({ applicationNo });
        });
    }
    // Delete BankDetails by applicationNo
    static deleteBankDetailsByApplicationNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield bankDetailsRepository.delete({ applicationNo });
            if (result.affected === 0) {
                throw new Error('Bank Details not found');
            }
            return 'Bank Details deleted';
        });
    }
}
exports.BankDetailsService = BankDetailsService;
