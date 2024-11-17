import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import rateLimiter from './middlewares/rateLimiter';
import userRoutes from './routes/UserRoutes';
import userPrivateRoutes from './routes/UsersPrivateRoutes';
import BulkEmailRoutes from './routes/BulkEmailRoutes';
import userApplicant from './routes/ApplicationRoutes';
import AgreementConsentRoutes from './routes/AgreementConsentRoutes';
import ApplicationRoutes from './routes/ApplicationRoutes';
import BankDetailsRoutes from './routes/BankDetailsRoutes';
import NextOfKinRoutes from './routes/NextOfKinRoutes';
import GeneralInfoRoutes from './routes/GeneralInfoRoutes';
import ContactDetailsRoutes from './routes/ContactDetailsRoutes';
import EducationalDetailsRoutes from './routes/EducationalDetailsRoutes'; 
import FoodSafetyQuestionnaireRoutes from './routes/FoodSafetyQuestionnaireRoutes';
import HealthAndDisabilityRoutes from './routes/HealthAndDisabilityRoutes';
import AgreementToReportInfection from './routes/AgreementToReportInfection';

import personalDetailsRoutes from './routes/personalDetailsRoutes';
import ProfessionalDetailsRoutes from './routes/ProfessionalDetailsRoutes';
import ReferenceRoutes from './routes/ReferenceRoutes';
import ReminderRoutes from './routes/ReminderRoutes';
import agreementRoutes from './routes/AgreementDocRoutes';
import locationRoutes from './routes/LocationRoute';
import jobTitleRoutes from './routes/JobTitleRoutes';
import employmentTypeRoutes from './routes/EmploymentTypeRoutes';
import groupRoutes from './routes/GroupRoutes';
import jobListingRoutes from './routes/JobListingRoutes';


import expressWinston from 'express-winston';
import logger from './utils/logger';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully.');

    const app = express();
    const isLocal = process.env.NODE_ENV === 'development';
    const port = process.env.PORT || 8100;
    const url = isLocal ? process.env.LOCAL_URL : process.env.REMOTE_URL;

    // Trust the proxy
    app.set('trust proxy', 1);

    // CORS Configuration
    app.use(cors({
      origin: [
        'http://localhost:3000', // React
        'http://localhost:8080', // Vue
        'http://localhost:4200', // Angular
        'http://localhost:5173',  // Vite
        'http://localhost:5174',
        'https://coporasystem-fe.vercel.app', // Deployed Frontend
        'https://coporajobs.netlify.app',
        'https://staging-coporajobs.netlify.app'
      ],
      credentials: true, // Allow credentials
    }));

    // Handle OPTIONS preflight requests
    app.options('*', cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'http://localhost:4200',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://coporasystem-fe.vercel.app',
        'https://coporajobs.netlify.app',
        'https://staging-coporajobs.netlify.app'
      ],
      credentials: true,
    }));

    app.use(express.json());

    // Apply the rate limiter globally
    app.use(rateLimiter);

    // Request logging with Winston
    app.use(expressWinston.logger({
      winstonInstance: logger,
      meta: true,
      msg: "HTTP {{req.method}} {{req.url}}",
      colorize: false,
      ignoreRoute: function (req, res) { return false; }
    }));

    // API routes
    app.use(`/users`, userRoutes);
    app.use(`/applicant`, userApplicant);
    app.use(`/auth/users`, userPrivateRoutes);
    app.use(`/bulk-email`, BulkEmailRoutes);
    app.use(`/agreement-consent`, AgreementConsentRoutes);
    app.use(`/application`, ApplicationRoutes);
    app.use(`/bank-details`, BankDetailsRoutes);
    app.use(`/contact-details`, ContactDetailsRoutes);
    app.use(`/next-of-kin`, NextOfKinRoutes);
    app.use(`/general-info`, GeneralInfoRoutes);
    app.use(`/educational-details`, EducationalDetailsRoutes);
    app.use(`/food-safety-questionnaire`, FoodSafetyQuestionnaireRoutes);
    app.use(`/licensing-regulation`, FoodSafetyQuestionnaireRoutes);
    app.use(`/health-and-disability`, HealthAndDisabilityRoutes);
    app.use(`/agreement-to-report-infection`, AgreementToReportInfection);
  
    app.use(`/personal-details`, personalDetailsRoutes);
    app.use(`/professional-details`, ProfessionalDetailsRoutes);
    app.use(`/reference`, ReferenceRoutes);
    app.use(`/reminders`, ReminderRoutes);
    app.use('/agreements', agreementRoutes);
    app.use('/api/locations', locationRoutes);
    app.use('/api/job-titles', jobTitleRoutes);
    app.use('/api/employment-types', employmentTypeRoutes);
    app.use('/api/groups', groupRoutes);
    app.use('/api/job-listings', jobListingRoutes);
    
    
    
    // Swagger setup
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // Error logging with Winston
    // app.use(expressWinston.errorLogger({
    //   winstonInstance: logger
    // }));

    // Global error handler
    app.use((err, req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://coporasystem-fe.vercel.app');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    app.listen(port, () => {
      console.log(`Server is running at ${url}`);
      console.log(`Swagger UI is available at ${url}/api-docs`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
