import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Import all entities
import { User } from './entities/UserEntity';
import { Application } from './entities/ApplicationEntity';
import { PersonalDetails } from './entities/PersonalDetailsEntity';
import { GeneralInfo } from './entities/GeneralInfoEntity';
import { NextOfKin } from './entities/NextOfKinEntity';
import { ContactDetails } from './entities/ContactDetailsEntity';
import { ProfessionalDetails } from './entities/ProfessionalDetailsEntity';
import { EducationalDetails } from './entities/EducationalDetailsEntity';
import { HealthAndDisability } from './entities/HealthAndDisabilityEntity';
import { FoodSafetyQuestionnaire } from './entities/FoodSafetyQuestionnaireEntity';
import { BankDetails } from './entities/BankDetailsEntity';
import { AgreementConsent } from './entities/AgreementConsentEntity';
import { Reference } from './entities/ReferenceEntity';

export const AppDataSource = new DataSource({
  type: 'postgres', // PostgreSQL database type
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'job_application',
  entities: [
    User,
    Application,
    PersonalDetails,
    ContactDetails,
    GeneralInfo,
    NextOfKin,
    ProfessionalDetails,
    EducationalDetails,
    HealthAndDisability,
    FoodSafetyQuestionnaire,
    BankDetails,
    AgreementConsent,
    Reference
  ],
  synchronize: false, // Set to true in production
  logging: false,
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false, // This is necessary if you don't have the SSL certificate; set to true if you have it.
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
