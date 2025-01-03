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
exports.ApplicationService = void 0;
const data_source_1 = require("../data-source");
const UserEntity_1 = require("../entities/UserEntity");
// import { Application } from '../entities/ApplicationEntity';
const PersonalDetailsEntity_1 = require("../entities/PersonalDetailsEntity");
const ContactDetailsEntity_1 = require("../entities/ContactDetailsEntity");
const ProfessionalDetailsEntity_1 = require("../entities/ProfessionalDetailsEntity");
const EducationalDetailsEntity_1 = require("../entities/EducationalDetailsEntity");
const HealthAndDisabilityEntity_1 = require("../entities/HealthAndDisabilityEntity");
const FoodSafetyQuestionnaireEntity_1 = require("../entities/FoodSafetyQuestionnaireEntity");
const BankDetailsEntity_1 = require("../entities/BankDetailsEntity");
const AgreementConsentEntity_1 = require("../entities/AgreementConsentEntity");
const ReferenceEntity_1 = require("../entities/ReferenceEntity");
const GeneralInfoEntity_1 = require("../entities/GeneralInfoEntity");
const NextOfKinEntity_1 = require("../entities/NextOfKinEntity");
const constants_1 = require("../constants");
const typeorm_1 = require("typeorm");
class ApplicationService {
    static createApplication(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation for creating an application
        });
    }
    static updateApplicationByNo(applicationNo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation for updating an application by its number
        });
    }
    static getApplicationByNo(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const application = yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).findOneBy({ applicationNo });
                if (!application) {
                    throw new Error('Application not found');
                }
                return application;
            }
            catch (error) {
                throw new Error(`Error retrieving application: ${error.message}`);
            }
        });
    }
    static getApplicantData(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch user and other details
                const user = yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).findOneBy({ applicationNo });
                const personalDetails = yield data_source_1.AppDataSource.getRepository(PersonalDetailsEntity_1.PersonalDetails).findOneBy({ applicationNo });
                const contactDetails = yield data_source_1.AppDataSource.getRepository(ContactDetailsEntity_1.ContactDetails).findOneBy({ applicationNo });
                // Fetch multiple professional details
                const professionalDetails = yield data_source_1.AppDataSource.getRepository(ProfessionalDetailsEntity_1.ProfessionalDetails).find({
                    where: { applicationNo }
                });
                const educationalDetails = yield data_source_1.AppDataSource.getRepository(EducationalDetailsEntity_1.EducationalDetails).find({ where: { applicationNo } });
                const healthAndDisability = yield data_source_1.AppDataSource.getRepository(HealthAndDisabilityEntity_1.HealthAndDisability).findOneBy({ applicationNo });
                const generalInfo = yield data_source_1.AppDataSource.getRepository(GeneralInfoEntity_1.GeneralInfo).findOneBy({ applicationNo });
                const nextOfKin = yield data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin).findOneBy({ applicationNo });
                const foodSafetyQuestionnaire = yield data_source_1.AppDataSource.getRepository(FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire).findOneBy({ applicationNo });
                const bankDetails = yield data_source_1.AppDataSource.getRepository(BankDetailsEntity_1.BankDetails).findOneBy({ applicationNo });
                const agreementConsent = yield data_source_1.AppDataSource.getRepository(AgreementConsentEntity_1.AgreementConsent).findOneBy({ applicationNo });
                const reference = yield data_source_1.AppDataSource.getRepository(ReferenceEntity_1.Reference).find({
                    where: { applicationNo }
                });
                return {
                    user,
                    personalDetails,
                    contactDetails,
                    generalInfo,
                    nextOfKin,
                    professionalDetails, // This will be an array
                    educationalDetails,
                    healthAndDisability,
                    foodSafetyQuestionnaire,
                    bankDetails,
                    agreementConsent,
                    reference,
                };
            }
            catch (error) {
                throw new Error(`Error retrieving applicant data: ${error.message}`);
            }
        });
    }
    // Services
    static getApplicantAttemptedData(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch `attempted` status from each table
                const user = yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).findOneBy({ applicationNo });
                const personalDetails = yield data_source_1.AppDataSource.getRepository(PersonalDetailsEntity_1.PersonalDetails).findOneBy({ applicationNo });
                const contactDetails = yield data_source_1.AppDataSource.getRepository(ContactDetailsEntity_1.ContactDetails).findOneBy({ applicationNo });
                const professionalDetails = yield data_source_1.AppDataSource.getRepository(ProfessionalDetailsEntity_1.ProfessionalDetails).find({ where: { applicationNo } });
                const educationalDetails = yield data_source_1.AppDataSource.getRepository(EducationalDetailsEntity_1.EducationalDetails).find({ where: { applicationNo } });
                const healthAndDisability = yield data_source_1.AppDataSource.getRepository(HealthAndDisabilityEntity_1.HealthAndDisability).findOneBy({ applicationNo });
                const generalInfo = yield data_source_1.AppDataSource.getRepository(GeneralInfoEntity_1.GeneralInfo).findOneBy({ applicationNo });
                const nextOfKin = yield data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin).findOneBy({ applicationNo });
                const foodSafetyQuestionnaire = yield data_source_1.AppDataSource.getRepository(FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire).findOneBy({ applicationNo });
                const bankDetails = yield data_source_1.AppDataSource.getRepository(BankDetailsEntity_1.BankDetails).findOneBy({ applicationNo });
                const agreementConsent = yield data_source_1.AppDataSource.getRepository(AgreementConsentEntity_1.AgreementConsent).findOneBy({ applicationNo });
                const reference = yield data_source_1.AppDataSource.getRepository(ReferenceEntity_1.Reference).find({ where: { applicationNo } });
                // Consolidate all `attempted` values into a single array
                const result = [
                    // { user: user?.attempted || false },
                    { personalDetails: (personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.attempted) || false },
                    { contactDetails: (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.attempted) || false },
                    { generalInfo: (generalInfo === null || generalInfo === void 0 ? void 0 : generalInfo.attempted) || false },
                    { nextOfKin: (nextOfKin === null || nextOfKin === void 0 ? void 0 : nextOfKin.attempted) || false },
                    // { professionalDetails: professionalDetails.length > 0 ? professionalDetails.some(detail => detail.attempted) : false },
                    { reference: reference.length > 0 ? reference.some(ref => ref.attempted) : false },
                    { educationalDetails: educationalDetails.length > 0 ? educationalDetails.some(detail => detail.attempted) : false },
                    { healthAndDisability: (healthAndDisability === null || healthAndDisability === void 0 ? void 0 : healthAndDisability.attempted) || false },
                    { foodSafetyQuestionnaire: (foodSafetyQuestionnaire === null || foodSafetyQuestionnaire === void 0 ? void 0 : foodSafetyQuestionnaire.attempted) || false },
                    { bankDetails: (bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.attempted) || false },
                    { agreementConsent: (agreementConsent === null || agreementConsent === void 0 ? void 0 : agreementConsent.attempted) || false },
                ];
                return result;
            }
            catch (error) {
                throw new Error(`Error retrieving applicant data: ${error.message}`);
            }
        });
    }
    // Updated getAllApplicants method with relations
    static getAllApplicantsData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users (applicants)
                const users = yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).find();
                // Create an array to hold applicant data
                const allApplicants = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    const applicationNo = user.applicationNo; // Assuming applicationNo is a property of User
                    // Fetch details for each applicant
                    const personalDetails = yield data_source_1.AppDataSource.getRepository(PersonalDetailsEntity_1.PersonalDetails).findOneBy({ applicationNo });
                    const contactDetails = yield data_source_1.AppDataSource.getRepository(ContactDetailsEntity_1.ContactDetails).findOneBy({ applicationNo });
                    const professionalDetails = yield data_source_1.AppDataSource.getRepository(ProfessionalDetailsEntity_1.ProfessionalDetails).find({ where: { applicationNo } });
                    const educationalDetails = yield data_source_1.AppDataSource.getRepository(EducationalDetailsEntity_1.EducationalDetails).find({ where: { applicationNo } });
                    const healthAndDisability = yield data_source_1.AppDataSource.getRepository(HealthAndDisabilityEntity_1.HealthAndDisability).findOneBy({ applicationNo });
                    const generalInfo = yield data_source_1.AppDataSource.getRepository(GeneralInfoEntity_1.GeneralInfo).findOneBy({ applicationNo });
                    const nextOfKin = yield data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin).findOneBy({ applicationNo });
                    const foodSafetyQuestionnaire = yield data_source_1.AppDataSource.getRepository(FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire).findOneBy({ applicationNo });
                    const bankDetails = yield data_source_1.AppDataSource.getRepository(BankDetailsEntity_1.BankDetails).findOneBy({ applicationNo });
                    const agreementConsent = yield data_source_1.AppDataSource.getRepository(AgreementConsentEntity_1.AgreementConsent).findOneBy({ applicationNo });
                    const reference = yield data_source_1.AppDataSource.getRepository(ReferenceEntity_1.Reference).findOneBy({ applicationNo });
                    return {
                        user,
                        personalDetails,
                        contactDetails,
                        generalInfo,
                        nextOfKin,
                        professionalDetails,
                        educationalDetails,
                        healthAndDisability,
                        foodSafetyQuestionnaire,
                        bankDetails,
                        agreementConsent,
                        reference,
                    };
                })));
                return allApplicants;
            }
            catch (error) {
                throw new Error(`Error retrieving all applicants: ${error.message}`);
            }
        });
    }
    static getAllApplicants() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applications = yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).find();
                return applications;
            }
            catch (error) {
                throw new Error(`Error retrieving all applicants: ${error.message}`);
            }
        });
    }
    static deleteApplicantData(applicationNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete records from each table associated with the given application number
                yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(PersonalDetailsEntity_1.PersonalDetails).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(ContactDetailsEntity_1.ContactDetails).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(ProfessionalDetailsEntity_1.ProfessionalDetails).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(EducationalDetailsEntity_1.EducationalDetails).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(HealthAndDisabilityEntity_1.HealthAndDisability).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(GeneralInfoEntity_1.GeneralInfo).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(BankDetailsEntity_1.BankDetails).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(AgreementConsentEntity_1.AgreementConsent).delete({ applicationNo });
                yield data_source_1.AppDataSource.getRepository(ReferenceEntity_1.Reference).delete({ applicationNo });
                // Return a confirmation message after successful deletion
                return { message: `All data for application number ${applicationNo} has been deleted successfully.` };
            }
            catch (error) {
                throw new Error(`Error deleting applicant data: ${error.message}`);
            }
        });
    }
    // Service
    static deleteAllApplicantData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users with the role of Applicant
                const applicantUsers = yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).find({
                    where: { role: constants_1.UserRole.Applicant },
                    select: ['id'], // Select only the id field to optimize performance
                });
                // Extract applicant IDs
                const applicantIds = applicantUsers.map(user => user.id);
                // Check if any applicants exist before attempting to delete associated data
                if (applicantIds.length === 0) {
                    return { message: "No applicants found with role 'applicant'." };
                }
                // List of repositories to clear data related to applicants
                const repositoriesToDeleteData = [
                    PersonalDetailsEntity_1.PersonalDetails,
                    ContactDetailsEntity_1.ContactDetails,
                    ProfessionalDetailsEntity_1.ProfessionalDetails,
                    EducationalDetailsEntity_1.EducationalDetails,
                    HealthAndDisabilityEntity_1.HealthAndDisability,
                    GeneralInfoEntity_1.GeneralInfo,
                    NextOfKinEntity_1.NextOfKin,
                    FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire,
                    BankDetailsEntity_1.BankDetails,
                    AgreementConsentEntity_1.AgreementConsent,
                    ReferenceEntity_1.Reference
                ];
                // Delete data from each repository where it is linked to applicant IDs
                for (const entity of repositoriesToDeleteData) {
                    yield data_source_1.AppDataSource.getRepository(entity).delete({ id: (0, typeorm_1.In)(applicantIds) });
                }
                // Now delete applicants from the User table
                yield data_source_1.AppDataSource.getRepository(UserEntity_1.User).delete({ role: constants_1.UserRole.Applicant });
                // Return a confirmation message after successful deletion
                return { message: "All data related to applicants with role 'applicant' has been deleted successfully." };
            }
            catch (error) {
                // Throw a more descriptive error message
                throw new Error(`Error deleting applicant data: ${error.message}`);
            }
        });
    }
}
exports.ApplicationService = ApplicationService;
