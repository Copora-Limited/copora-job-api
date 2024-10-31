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
exports.GeneralInfoController = void 0;
const GeneralInfoService_1 = require("../services/GeneralInfoService");
const UserService_1 = require("../services/UserService");
const uploadToSpace_1 = require("../utils/uploadToSpace"); // Adjust the import path as necessary
class GeneralInfoController {
    static createOrUpdateGeneralInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo, plateWaiting, retailCashier, barWork, hospitality, foodService, barista, supervising, level2FoodHygieneCertificate, personalLicenseHolder, dbsDisclosureAndBarringService, } = req.body;
                console.log("Data:", req.body);
                // Validate applicationNo
                if (!applicationNo) {
                    return res.status(400).json({ message: 'Application number is required' });
                }
                // Check if the applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ message: 'Applicant does not exist' });
                }
                // Validate required fields
                const requiredFields = [
                    { field: plateWaiting, name: 'plate waiting' },
                    { field: retailCashier, name: 'retail cashier' },
                    { field: barWork, name: 'bar work' },
                    { field: hospitality, name: 'hospitality' },
                    { field: foodService, name: 'food service' },
                    { field: barista, name: 'barista' },
                    { field: supervising, name: 'supervising' },
                    { field: personalLicenseHolder, name: 'personal license holder' },
                    { field: dbsDisclosureAndBarringService, name: 'DBS Disclosure and Barring Service' },
                ];
                for (const { field, name } of requiredFields) {
                    if (field === null || field === undefined) {
                        return res.status(400).json({ message: `Please answer Yes or No for ${name} question` });
                    }
                }
                // Check if general info for the application already exists
                const existingEntry = yield GeneralInfoService_1.GeneralInfoService.getByApplicationNo(applicationNo);
                // Files from the request (assuming middleware handles file uploads correctly)
                const { level2FoodHygieneCertificateUpload, personalLicenseCertificateUpload, dbsCertificateUpload } = req.files;
                // Handle file uploads and set URLs
                const level2FoodHygieneCertificateUrl = (level2FoodHygieneCertificateUpload === null || level2FoodHygieneCertificateUpload === void 0 ? void 0 : level2FoodHygieneCertificateUpload[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(level2FoodHygieneCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.level2FoodHygieneCertificateUpload;
                const personalLicenseCertificateUrl = (personalLicenseCertificateUpload === null || personalLicenseCertificateUpload === void 0 ? void 0 : personalLicenseCertificateUpload[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(personalLicenseCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.personalLicenseCertificateUpload;
                const dbsCertificateUrl = (dbsCertificateUpload === null || dbsCertificateUpload === void 0 ? void 0 : dbsCertificateUpload[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(dbsCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.dbsCertificateUpload;
                // Merge data to save with the existing data if present
                const dataToSave = Object.assign(Object.assign({}, existingEntry), { applicationNo,
                    plateWaiting,
                    retailCashier,
                    barWork,
                    hospitality,
                    foodService,
                    barista,
                    supervising,
                    level2FoodHygieneCertificate,
                    personalLicenseHolder,
                    dbsDisclosureAndBarringService, level2FoodHygieneCertificateUpload: level2FoodHygieneCertificateUrl, personalLicenseCertificateUpload: personalLicenseCertificateUrl, dbsCertificateUpload: dbsCertificateUrl, attempted: true });
                // Save or update record
                if (existingEntry) {
                    const updatedEntry = yield GeneralInfoService_1.GeneralInfoService.updateByApplicationNo(applicationNo, dataToSave);
                    res.status(200).json({ message: 'General Info details updated', data: updatedEntry });
                }
                else {
                    const newEntry = yield GeneralInfoService_1.GeneralInfoService.create(dataToSave);
                    res.status(201).json({ message: 'General Info details created', data: newEntry });
                }
            }
            catch (error) {
                console.error('Error creating or updating general info:', error);
                res.status(500).json({ message: 'Error creating or updating general info', error: error.message });
            }
        });
    }
    // Get GeneralInfo by applicationNo
    static getGeneralInfoByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("req:", req.params);
            try {
                const { applicationNo } = req.params;
                const entry = yield GeneralInfoService_1.GeneralInfoService.getByApplicationNo(applicationNo);
                console.log("entry:", entry);
                if (!entry) {
                    return res.status(404).send({ message: 'Personal details not found' });
                }
                res.status(200).send(entry);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching personal details', error: error.message });
            }
        });
    }
    // Update GeneralInfo by applicationNo
    static updateGeneralInfoByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedEntry = yield GeneralInfoService_1.GeneralInfoService.updateByApplicationNo(applicationNo, req.body);
                if (!updatedEntry) {
                    return res.status(404).send({ message: 'Personal details not found' });
                }
                res.status(200).send(updatedEntry);
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating personal details', error: error.message });
            }
        });
    }
    // Delete GeneralInfo by applicationNo
    static deleteGeneralInfoByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield GeneralInfoService_1.GeneralInfoService.deleteByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.GeneralInfoController = GeneralInfoController;
