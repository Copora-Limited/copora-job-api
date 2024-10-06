"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./src/config");
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
                url: `${config_1.BASE_URL}`,
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
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const swaggerSetup = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(exports.swaggerSpec));
};
exports.swaggerSetup = swaggerSetup;
