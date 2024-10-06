import { Express } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { BASE_URL } from './src/config';

const isLocal = process.env.NODE_ENV === 'development'; // Check if running in development mode

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Copora Job Application API',
      version: '1.1.0',
      description: 'API documentation for the Job Application'
    },
    servers: [
      {
        url: `${BASE_URL}`,
        description: isLocal ? 'Local server' : 'Remote server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format **Bearer &lt;token>**'
        }
      }
    },
    // security: [
    //   {
    //     bearerAuth: []
    //   }
    // ],
    tags: [
      {
        name: "Admin - Private Endpoints",
        description: "Endpoints related to Admin"
      },
      {
        name: "Authentication",
        description: "Endpoints related to Users"
      },
      {
        name: "AgreementConsent",
        description: "Endpoints related to agreement consents"
      },
      {
        name: "Applicants",
        description: "Endpoints related to applicants"
      },
      {
        name: "BankDetails",
        description: "Endpoints related to bank details"
      },
      {
        name: "ContactDetails",
        description: "Endpoints related to contact details"
      },
      {
        name: "EducationalDetails",
        description: "Endpoints related to educational details"
      },
      {
        name: "FoodSafetyQuestionnaire",
        description: "Endpoints related to food safety questionnaires"
      },
      {
        name: "Next Of Kin",
        description: "Endpoint related to Next Of Kin"
      },
      {
        name: "GeneralInfo",
        description: "Endpoint related to GeneralInfo"
      },
      {
        name: "HealthAndDisability",
        description: "Endpoints related to health and disability"
      },
      {
        name: "PersonalDetails",
        description: "Endpoints related to personal details"
      },
      {
        name: "ProfessionalDetails",
        description: "Endpoints related to professional details"
      },
      {
        name: "Reference",
        description: "Endpoints related to references"
      },
      
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Paths to files with OpenAPI annotations
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const swaggerSetup = (app: Express) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
