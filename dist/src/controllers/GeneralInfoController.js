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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoController = void 0;
const GeneralInfoService_1 = require("../services/GeneralInfoService");
const UserService_1 = require("../services/UserService");
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class GeneralInfoController {
    // private generalInfoRepository = AppDataSource.getRepository(GeneralInfo);
    // Helper function to upload files to Cloudinary
    static uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                return '';
            try {
                const result = yield cloudinary_1.v2.uploader.upload(file.path);
                return result.secure_url; // Return the secure URL of the uploaded file
            }
            catch (error) {
                console.error('Error uploading file:', error);
                throw new Error('Failed to upload file');
            }
        });
    }
    // Create or update General Info
    static createOrUpdateGeneralInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { applicationNo } = _a, otherFields = __rest(_a, ["applicationNo"]);
                if (!applicationNo) {
                    res.status(400).json({ statusCode: 400, message: 'Application number is required' });
                    return;
                }
                // Check if applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                    return;
                }
                // Check if general info for the application already exists
                const existingEntry = yield GeneralInfoService_1.GeneralInfoService.getByApplicationNo(applicationNo);
                // Files from the request (Assuming files are being uploaded correctly in middleware)
                const { level2FoodHygieneCertificateUpload, personalLicenseCertificateUpload, dbsCertificateUpload } = req.files;
                // Upload files if they are provided and get their URLs
                const level2FoodHygieneCertificateUrl = (level2FoodHygieneCertificateUpload === null || level2FoodHygieneCertificateUpload === void 0 ? void 0 : level2FoodHygieneCertificateUpload[0])
                    ? yield GeneralInfoController.uploadFile(level2FoodHygieneCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.level2FoodHygieneCertificateUpload;
                const personalLicenseCertificateUrl = (personalLicenseCertificateUpload === null || personalLicenseCertificateUpload === void 0 ? void 0 : personalLicenseCertificateUpload[0])
                    ? yield GeneralInfoController.uploadFile(personalLicenseCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.personalLicenseCertificateUpload;
                const dbsCertificateUrl = (dbsCertificateUpload === null || dbsCertificateUpload === void 0 ? void 0 : dbsCertificateUpload[0])
                    ? yield GeneralInfoController.uploadFile(dbsCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.dbsCertificateUpload;
                // Merge the new data with the existing data, only updating fields that are provided
                const dataToSave = Object.assign(Object.assign(Object.assign(Object.assign({}, existingEntry), { // Retain existing fields
                    applicationNo }), otherFields), { level2FoodHygieneCertificateUpload: level2FoodHygieneCertificateUrl, personalLicenseCertificateUpload: personalLicenseCertificateUrl, dbsCertificateUpload: dbsCertificateUrl });
                console.log("dataToSave:", dataToSave);
                // Save or update the record based on whether it exists
                if (existingEntry) {
                    // Update the existing record
                    const updatedEntry = yield GeneralInfoService_1.GeneralInfoService.updateByApplicationNo(applicationNo, dataToSave);
                    res.status(200).json({ message: 'General Info details updated', data: updatedEntry });
                }
                else {
                    // Create a new record
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
