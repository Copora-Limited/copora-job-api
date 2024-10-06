import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import rateLimiter from './middlewares/rateLimiter'; // Import the rate limiter middleware
import userRoutes from './routes/UserRoutes';
import userPrivateRoutes from './routes/UsersPrivateRoutes';
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
import personalDetailsRoutes from './routes/personalDetailsRoutes';
import ProfessionalDetailsRoutes from './routes/ProfessionalDetailsRoutes';
import ReferenceRoutes from './routes/ReferenceRoutes';
import agreementRoutes from './routes/AgreementDocRoutes';
import expressWinston from 'express-winston';
import logger from './utils/logger'; // Corrected path
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
// const Sentry = require("@sentry/node");

// Sentry.init({
// 	dsn: "https://34b0227e37c718d30bd3221515db17a7@o4507842016509952.ingest.de.sentry.io/4507842022801488",
//   tracesSampleRate: 1.0,
// });

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully.');

    const app = express();
    const isLocal = process.env.NODE_ENV === 'development'; // Check if running in development mode

    const port = process.env.PORT || 8000;
    const url = isLocal ? process.env.LOCAL_URL : process.env.REMOTE_URL;

    // Trust the proxy (important when running behind a load balancer or proxy)
    // app.set('trust proxy', true);  // Add this line
    app.set('trust proxy', 1); // Trust the first proxy (like Nginx)

    app.use(cors({
      origin: [
        'http://localhost:3000', // React
        'http://localhost:8080', // Vue
        'http://localhost:4200', // Angular
        'http://localhost:5173',  // Vite
        'https://coporasystem-fe.vercel.app'
      ]
    }));

    app.use(express.json());

    // Apply the rate limiter globally
    app.use(rateLimiter);

    // Request logging with Winston
    app.use(expressWinston.logger({
      winstonInstance: logger,
      meta: true, // Add meta data about the request
      msg: "HTTP {{req.method}} {{req.url}}", // Customize the logging message
      colorize: false,
      ignoreRoute: function (req, res) { return false; } // Ignore logging some routes
    }));

    // API routes
    app.use(`/users`, userRoutes);
    app.use(`/applicant`, userApplicant);
    app.use(`/auth/users`, userPrivateRoutes);
    app.use(`/agreement-consent`, AgreementConsentRoutes);
    app.use(`/application`, ApplicationRoutes);
    app.use(`/bank-details`, BankDetailsRoutes);
    app.use(`/contact-details`, ContactDetailsRoutes);
    app.use(`/next-of-kin`, NextOfKinRoutes);
    app.use(`/general-info`, GeneralInfoRoutes);
    app.use(`/educational-details`, EducationalDetailsRoutes);
    app.use(`/food-safety-questionnaire`, FoodSafetyQuestionnaireRoutes);
    app.use(`/health-and-disability`, HealthAndDisabilityRoutes);
    app.use(`/personal-details`, personalDetailsRoutes);
    app.use(`/professional-details`, ProfessionalDetailsRoutes);
    app.use(`/reference`, ReferenceRoutes);
    app.use('/agreements', agreementRoutes);
    
    // Swagger setup
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // Error logging with Winston
    app.use(expressWinston.errorLogger({
      winstonInstance: logger
    }));

    // Global error handler (optional)
    app.use((err, req, res, next) => {
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