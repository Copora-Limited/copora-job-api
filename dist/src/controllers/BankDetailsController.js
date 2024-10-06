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
exports.BankDetailsController = void 0;
const BankDetailsService_1 = require("../services/BankDetailsService");
class BankDetailsController {
    // Create or update BankDetails based on applicationNo
    static createBankDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.body;
                // Check if the BankDetails with the given applicationNo exists
                const existingBankDetails = yield BankDetailsService_1.BankDetailsService.getBankDetailsByApplicationNo(applicationNo);
                if (existingBankDetails) {
                    // If it exists, update the existing record
                    const updatedBankDetails = yield BankDetailsService_1.BankDetailsService.updateBankDetailsByApplicationNo(applicationNo, req.body);
                    return res.status(200).send({ message: 'Bank Details updated', data: updatedBankDetails });
                }
                else {
                    // If it does not exist, create a new record
                    const newBankDetails = yield BankDetailsService_1.BankDetailsService.createBankDetails(req.body);
                    return res.status(201).send({ message: 'Bank Details created', data: newBankDetails });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Error creating or updating bank details', error: error.message });
            }
        });
    }
    // Get Bank Details by applicationNo
    static getBankDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const bankDetails = yield BankDetailsService_1.BankDetailsService.getBankDetailsByApplicationNo(applicationNo);
                if (!bankDetails) {
                    return res.status(404).send({ message: 'Bank Details not found' });
                }
                res.status(200).send(bankDetails);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching bank details', error: error.message });
            }
        });
    }
    // Update Bank Details by applicationNo
    static updateBankDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedBankDetails = yield BankDetailsService_1.BankDetailsService.updateBankDetailsByApplicationNo(applicationNo, req.body);
                if (!updatedBankDetails) {
                    return res.status(404).send({ message: 'Bank Details not found' });
                }
                res.status(200).send(updatedBankDetails);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating bank details', error: error.message });
            }
        });
    }
    // Delete Bank Details by applicationNo
    static deleteBankDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield BankDetailsService_1.BankDetailsService.deleteBankDetailsByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.BankDetailsController = BankDetailsController;
