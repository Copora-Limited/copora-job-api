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
exports.PersonalDetailsController = void 0;
const PersonalDetailsService_1 = require("../services/PersonalDetailsService");
const UserService_1 = require("../services/UserService");
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class PersonalDetailsController {
    // Helper function to upload a file to Cloudinary
    static uploadPassportPhoto(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                return '';
            try {
                const result = yield cloudinary_1.v2.uploader.upload(file.path);
                return result.secure_url;
            }
            catch (error) {
                console.error('Error uploading passport photo:', error);
                throw new Error('Failed to upload passport photo');
            }
        });
    }
    // Create or update PersonalDetails
    static createOrUpdatePersonalDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.body;
                const file = req.file;
                console.log("req.body", req.body);
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                    return; // Ensure to return here to avoid further execution
                }
                // Check if the PersonalDetails with the given applicationNo exists
                const existingEntry = yield PersonalDetailsService_1.PersonalDetailsService.getByApplicationNo(applicationNo);
                let passportPhoto = (existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.passportPhoto) || ''; // Preserve existing passport photo if no new file is uploaded
                if (file) {
                    passportPhoto = yield PersonalDetailsController.uploadPassportPhoto(file);
                }
                // Merge the new data with the existing data, only updating fields that are provided
                const dataToSave = Object.assign(Object.assign(Object.assign({}, existingEntry), req.body), { passportPhoto: passportPhoto || (existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.passportPhoto) });
                console.log("dataToSave", dataToSave);
                if (existingEntry) {
                    // Update the existing record
                    const updatedEntry = yield PersonalDetailsService_1.PersonalDetailsService.updateByApplicationNo(applicationNo, dataToSave);
                    res.status(200).json({ message: 'Personal details updated', data: updatedEntry });
                }
                else {
                    // Create a new record
                    const newEntry = yield PersonalDetailsService_1.PersonalDetailsService.create(dataToSave);
                    res.status(201).json({ message: 'Personal details created', data: newEntry });
                }
            }
            catch (error) {
                console.error('Error creating or updating personal details:', error);
                res.status(500).json({ message: 'Error creating or updating personal details', error: error.message });
            }
        });
    }
    // Get PersonalDetails by applicationNo
    static getPersonalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("req:", req.params);
            try {
                const { applicationNo } = req.params;
                const entry = yield PersonalDetailsService_1.PersonalDetailsService.getByApplicationNo(applicationNo);
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
    // Update PersonalDetails by applicationNo
    static updatePersonalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedEntry = yield PersonalDetailsService_1.PersonalDetailsService.updateByApplicationNo(applicationNo, req.body);
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
    // Delete PersonalDetails by applicationNo
    static deletePersonalDetailsByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield PersonalDetailsService_1.PersonalDetailsService.deleteByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.PersonalDetailsController = PersonalDetailsController;
