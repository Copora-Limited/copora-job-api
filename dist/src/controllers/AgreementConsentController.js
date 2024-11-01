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
exports.AgreementConsentController = void 0;
const AgreementConsentService_1 = require("../services/AgreementConsentService");
const UserService_1 = require("../services/UserService");
const emailActions_1 = require("../lib/emailActions");
const constants_1 = require("../constants");
class AgreementConsentController {
    // Create or update an AgreementConsent
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.body;
                // Get the applicant's details by application number
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Check if the AgreementConsent with the given applicationNo exists
                const existingAgreementConsent = yield AgreementConsentService_1.AgreementConsentService.getByApplicationNo(applicationNo);
                let agreementConsent;
                if (existingAgreementConsent) {
                    // If it exists, update the existing record
                    const updateData = Object.assign(Object.assign({}, req.body), { attempted: true });
                    agreementConsent = yield AgreementConsentService_1.AgreementConsentService.updateByApplicationNo(applicationNo, updateData);
                    res.status(200).send({ message: 'Agreement Consent updated', data: agreementConsent });
                }
                else {
                    // If it does not exist, create a new record with attempted set to true
                    const agreementConsentData = Object.assign(Object.assign({}, req.body), { attempted: true }); // Set attempted to true
                    agreementConsent = yield AgreementConsentService_1.AgreementConsentService.create(agreementConsentData);
                    res.status(201).send({ message: 'Agreement Consent created', data: agreementConsent });
                }
                // Update the user's onboarding status to "OnboardingCompleted"
                // existingApplicant.onboardingStatus = OnboardingStatus.OnboardingCompleted;
                yield UserService_1.UserService.updateOnboardingStatus(applicationNo, constants_1.OnboardingStatus.OnboardingCompleted);
                // Fetch the user's email and send the onboarding completion email
                const userEmail = existingApplicant.email;
                const emailData = {
                    firstName: existingApplicant.firstName,
                    email: userEmail,
                };
                yield (0, emailActions_1.sendOnboardingCompletionEmail)(emailData);
            }
            catch (error) {
                res.status(500).send({ message: 'Error creating or updating Agreement Consent', error: error.message });
            }
        });
    }
    // Get AgreementConsent by applicationNo
    static getAgreementConsentByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const agreementConsent = yield AgreementConsentService_1.AgreementConsentService.getByApplicationNo(applicationNo);
                if (!agreementConsent) {
                    // return res.status(404).send({ message: 'Agreement Consent not found' });
                    return res.status(200).send([]);
                }
                res.status(200).send(agreementConsent);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching Agreement Consent', error: error.message });
            }
        });
    }
    // Update AgreementConsent by applicationNo
    static updateAgreementConsentByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedAgreementConsent = yield AgreementConsentService_1.AgreementConsentService.updateByApplicationNo(applicationNo, req.body);
                if (!updatedAgreementConsent) {
                    return res.status(404).send({ message: 'Agreement Consent not found' });
                }
                res.status(200).send(updatedAgreementConsent);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating Agreement Consent', error: error.message });
            }
        });
    }
    // Delete AgreementConsent by applicationNo
    static deleteAgreementConsentByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield AgreementConsentService_1.AgreementConsentService.deleteByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.AgreementConsentController = AgreementConsentController;
