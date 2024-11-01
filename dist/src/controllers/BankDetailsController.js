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
                const { applicationNo, bankName, accountNumber, sortCode, accountName, employmentStatusDeclaration, studentLoanStatus, p45Attached } = req.body;
                // Validate required fields
                if (!bankName) {
                    return res.status(400).json({ statusCode: 400, message: 'Bank Name is required' });
                }
                if (!/^[A-Za-z\s]+$/.test(bankName)) {
                    return res.status(400).json({ statusCode: 400, message: 'Bank Name should contain letters only' });
                }
                if (!accountNumber) {
                    return res.status(400).json({ statusCode: 400, message: 'Account number is required' });
                }
                if (!/^\d+$/.test(accountNumber)) {
                    return res.status(400).json({ statusCode: 400, message: 'Account number should contain numbers only' });
                }
                if (!sortCode) {
                    return res.status(400).json({ statusCode: 400, message: 'Sort Code is required' });
                }
                if (!accountName) {
                    return res.status(400).json({ statusCode: 400, message: 'Account Name is required' });
                }
                if (!studentLoanStatus) {
                    return res.status(400).json({ statusCode: 400, message: 'Please Tick One of the options' });
                }
                // Check for the removal of Student Loans if one of the statements is ticked
                if (studentLoanStatus === 'I have a student loan and another job.' && employmentStatusDeclaration) {
                    // Assuming employmentStatusDeclaration indicates selection of one of the three statements
                    // You can add logic here if you have specific statements to check against
                    // For example:
                    // if (employmentStatusDeclaration.includes('specific statement')) { ... }
                    return res.status(400).json({ statusCode: 400, message: 'Student Loans tick is removed due to selection of another statement.' });
                }
                // Check if the BankDetails with the given applicationNo exists
                const existingBankDetails = yield BankDetailsService_1.BankDetailsService.getBankDetailsByApplicationNo(applicationNo);
                if (existingBankDetails) {
                    // If it exists, update the existing record
                    const updateData = Object.assign(Object.assign({}, req.body), { attempted: true });
                    const updatedBankDetails = yield BankDetailsService_1.BankDetailsService.updateBankDetailsByApplicationNo(applicationNo, updateData);
                    return res.status(200).send({ message: 'Bank Details updated', data: updatedBankDetails });
                }
                else {
                    // If it does not exist, create a new record with attempted set to true
                    const newBankDetailsData = Object.assign(Object.assign({}, req.body), { attempted: true }); // Set attempted to true
                    const newBankDetails = yield BankDetailsService_1.BankDetailsService.createBankDetails(newBankDetailsData);
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
                    // return res.status(404).send({ message: 'Bank Details not found' });
                    return res.status(200).send([]);
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
