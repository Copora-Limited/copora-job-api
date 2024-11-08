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
exports.PersonalDetailsController = void 0;
const PersonalDetailsService_1 = require("../services/PersonalDetailsService");
const UserService_1 = require("../services/UserService");
const cloudinary_1 = require("cloudinary");
const date_fns_1 = require("date-fns"); // Use date-fns or similar library to calculate age
const uploadToSpace_1 = require("../utils/uploadToSpace"); // Adjust the import path as necessary
const constants_1 = require("../constants");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class PersonalDetailsController {
    // Helper function to upload a file to Cloudinary
    // static async uploadPassportPhoto(file: Express.Multer.File | undefined): Promise<string> {
    //   if (!file) return '';
    //   try {
    //     const result = await cloudinary.uploader.upload(file.path);
    //     return result.secure_url;
    //   } catch (error) {
    //     console.error('Error uploading passport photo:', error);
    //     throw new Error('Failed to upload passport photo');
    //   }
    // }
    // Create or update PersonalDetails
    static createOrUpdatePersonalDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { applicationNo, dateOfBirth, gender, nationalInsuranceNumber } = _a, otherFields = __rest(_a, ["applicationNo", "dateOfBirth", "gender", "nationalInsuranceNumber"]);
                // Validate required fields
                if (!dateOfBirth) {
                    res.status(400).json({ statusCode: 400, message: 'Date of birth is required' });
                    return;
                }
                // Age validation
                const age = (0, date_fns_1.differenceInYears)(new Date(), new Date(dateOfBirth));
                if (age < 16) {
                    res.status(400).json({
                        statusCode: 400,
                        message: `Date of birth invalid. Age must be 16 and above.`,
                    });
                    return;
                }
                if (!gender || !nationalInsuranceNumber) {
                    res.status(400).json({
                        statusCode: 400,
                        message: 'Gender and National Insurance Number are required',
                    });
                    return;
                }
                // Check if the applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                    return;
                }
                // Get any existing personal details entry
                const existingEntry = yield PersonalDetailsService_1.PersonalDetailsService.getByApplicationNo(applicationNo);
                // File handling with fallback to existing data if files are not uploaded
                const { passportPhoto, internationalPassport, visaDocument, ninProof, addressProof } = req.files;
                const passportPhotoUrl = (passportPhoto === null || passportPhoto === void 0 ? void 0 : passportPhoto[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(passportPhoto[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.passportPhoto;
                const internationalPassportUrl = (internationalPassport === null || internationalPassport === void 0 ? void 0 : internationalPassport[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(internationalPassport[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.internationalPassport;
                const visaDocumentUrl = (visaDocument === null || visaDocument === void 0 ? void 0 : visaDocument[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(visaDocument[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.visaDocument;
                const ninProofUrl = (ninProof === null || ninProof === void 0 ? void 0 : ninProof[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(ninProof[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.ninProof;
                const addressProofUrl = (addressProof === null || addressProof === void 0 ? void 0 : addressProof[0])
                    ? yield (0, uploadToSpace_1.handleFileUpload)(addressProof[0])
                    : existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.addressProof;
                // Merge the new data with the existing data, only updating fields that are provided
                const dataToSave = Object.assign(Object.assign(Object.assign(Object.assign({}, existingEntry), { applicationNo,
                    dateOfBirth,
                    gender,
                    nationalInsuranceNumber }), otherFields), { passportPhoto: passportPhotoUrl, internationalPassport: internationalPassportUrl, visaDocument: visaDocumentUrl, ninProof: ninProofUrl, addressProof: addressProofUrl, attempted: true });
                // Create or update the personal details entry
                if (existingEntry) {
                    const updatedEntry = yield PersonalDetailsService_1.PersonalDetailsService.updateByApplicationNo(applicationNo, dataToSave);
                    res.status(200).json({ message: 'Personal details updated', data: updatedEntry });
                }
                else {
                    const newEntry = yield PersonalDetailsService_1.PersonalDetailsService.create(dataToSave);
                    // Update the user's onboarding status to "Onboarding not completed"
                    yield UserService_1.UserService.updateOnboardingStatus(applicationNo, constants_1.OnboardingStatus.OnboardingNotCompleted);
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
            // console.log("req:", req.params)
            try {
                const { applicationNo } = req.params;
                const entry = yield PersonalDetailsService_1.PersonalDetailsService.getByApplicationNo(applicationNo);
                console.log("entry:", entry);
                if (!entry) {
                    return res.status(200).send([]);
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
