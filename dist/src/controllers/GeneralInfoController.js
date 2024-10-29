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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoController = void 0;
const GeneralInfoService_1 = require("../services/GeneralInfoService");
const UserService_1 = require("../services/UserService");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class GeneralInfoController {
    // Helper function to upload images to Cloudinary
    static uploadImageToCloudinary(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary_1.v2.uploader.upload(file.path);
                return result.secure_url;
            }
            catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                throw new Error('Failed to upload image');
            }
        });
    }
    // Helper function to save document locally and return the path
    static saveDocumentLocally(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadDir = path_1.default.join(__dirname, '../../uploads/certificates');
            if (!fs_1.default.existsSync(uploadDir))
                fs_1.default.mkdirSync(uploadDir);
            const filePath = path_1.default.join(uploadDir, file.originalname);
            fs_1.default.renameSync(file.path, filePath); // Move file to the uploads directory
            return filePath;
        });
    }
    // Helper function to handle file upload based on type
    static handleFileUpload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileExtension = path_1.default.extname(file.originalname).toLowerCase();
            // Document file formats
            if (['.pdf', '.doc', '.docx'].includes(fileExtension)) {
                return yield GeneralInfoController.saveDocumentLocally(file); // Local path for documents
            }
            // Image file formats for Cloudinary
            else if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
                return yield GeneralInfoController.uploadImageToCloudinary(file);
            }
            else {
                throw new Error('Unsupported file format');
            }
        });
    }
    static createOrUpdateGeneralInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo, plateWaiting, retailCashier, barWork, hospitality, foodService, barista, supervising, level2FoodHygieneCertificate, personalLicenseHolder, dbsDisclosureAndBarringService, } = req.body;
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
                    ? yield GeneralInfoController.handleFileUpload(level2FoodHygieneCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.level2FoodHygieneCertificateUpload;
                const personalLicenseCertificateUrl = (personalLicenseCertificateUpload === null || personalLicenseCertificateUpload === void 0 ? void 0 : personalLicenseCertificateUpload[0])
                    ? yield GeneralInfoController.handleFileUpload(personalLicenseCertificateUpload[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.personalLicenseCertificateUpload;
                const dbsCertificateUrl = (dbsCertificateUpload === null || dbsCertificateUpload === void 0 ? void 0 : dbsCertificateUpload[0])
                    ? yield GeneralInfoController.handleFileUpload(dbsCertificateUpload[0])
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
