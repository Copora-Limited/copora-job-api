"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Import all entities
const UserEntity_1 = require("./entities/UserEntity");
const ApplicationEntity_1 = require("./entities/ApplicationEntity");
const PersonalDetailsEntity_1 = require("./entities/PersonalDetailsEntity");
const GeneralInfoEntity_1 = require("./entities/GeneralInfoEntity");
const NextOfKinEntity_1 = require("./entities/NextOfKinEntity");
const ContactDetailsEntity_1 = require("./entities/ContactDetailsEntity");
const ProfessionalDetailsEntity_1 = require("./entities/ProfessionalDetailsEntity");
const EducationalDetailsEntity_1 = require("./entities/EducationalDetailsEntity");
const HealthAndDisabilityEntity_1 = require("./entities/HealthAndDisabilityEntity");
const FoodSafetyQuestionnaireEntity_1 = require("./entities/FoodSafetyQuestionnaireEntity");
const BankDetailsEntity_1 = require("./entities/BankDetailsEntity");
const AgreementConsentEntity_1 = require("./entities/AgreementConsentEntity");
const ReferenceEntity_1 = require("./entities/ReferenceEntity");
const LocationEntity_1 = require("./entities/LocationEntity"); // New entity
const JobTitleEntity_1 = require("./entities/JobTitleEntity"); // New entity
const EmploymentTypeEntity_1 = require("./entities/EmploymentTypeEntity"); // New entity
const GroupEntity_1 = require("./entities/GroupEntity"); // New entity
const JobListingEntity_1 = require("./entities/JobListingEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres', // PostgreSQL database type
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_DATABASE || 'job_application',
    entities: [
        UserEntity_1.User,
        ApplicationEntity_1.Application,
        PersonalDetailsEntity_1.PersonalDetails,
        ContactDetailsEntity_1.ContactDetails,
        GeneralInfoEntity_1.GeneralInfo,
        NextOfKinEntity_1.NextOfKin,
        ProfessionalDetailsEntity_1.ProfessionalDetails,
        EducationalDetailsEntity_1.EducationalDetails,
        HealthAndDisabilityEntity_1.HealthAndDisability,
        FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire,
        BankDetailsEntity_1.BankDetails,
        AgreementConsentEntity_1.AgreementConsent,
        ReferenceEntity_1.Reference,
        LocationEntity_1.Location, // New entity
        JobTitleEntity_1.JobTitle, // New entity
        EmploymentTypeEntity_1.EmploymentType, // New entity
        GroupEntity_1.Group, // New entity
        JobListingEntity_1.JobListing // New entity
    ],
    synchronize: false, // Set to true in development, false in production
    logging: false,
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false, // Necessary if you don't have the SSL certificate; set to true if you have it.
    },
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Database connection established successfully.');
})
    .catch(error => {
    console.error('Error connecting to the database', error);
});
