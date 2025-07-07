"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const dotenv_1 = __importDefault(require("dotenv"));
const rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const UsersPrivateRoutes_1 = __importDefault(
  require("./routes/UsersPrivateRoutes")
);
const BulkEmailRoutes_1 = __importDefault(require("./routes/BulkEmailRoutes"));
const ApplicationRoutes_1 = __importDefault(
  require("./routes/ApplicationRoutes")
);
const AgreementConsentRoutes_1 = __importDefault(
  require("./routes/AgreementConsentRoutes")
);
const ApplicationRoutes_2 = __importDefault(
  require("./routes/ApplicationRoutes")
);
const BankDetailsRoutes_1 = __importDefault(
  require("./routes/BankDetailsRoutes")
);
const NextOfKinRoutes_1 = __importDefault(require("./routes/NextOfKinRoutes"));
const GeneralInfoRoutes_1 = __importDefault(
  require("./routes/GeneralInfoRoutes")
);
const ContactDetailsRoutes_1 = __importDefault(
  require("./routes/ContactDetailsRoutes")
);
const EducationalDetailsRoutes_1 = __importDefault(
  require("./routes/EducationalDetailsRoutes")
);
const FoodSafetyQuestionnaireRoutes_1 = __importDefault(
  require("./routes/FoodSafetyQuestionnaireRoutes")
);
const HealthAndDisabilityRoutes_1 = __importDefault(
  require("./routes/HealthAndDisabilityRoutes")
);
const AgreementToReportInfection_1 = __importDefault(
  require("./routes/AgreementToReportInfection")
);
const personalDetailsRoutes_1 = __importDefault(
  require("./routes/personalDetailsRoutes")
);
const ProfessionalDetailsRoutes_1 = __importDefault(
  require("./routes/ProfessionalDetailsRoutes")
);
const ReferenceRoutes_1 = __importDefault(require("./routes/ReferenceRoutes"));
const ReminderRoutes_1 = __importDefault(require("./routes/ReminderRoutes"));
const AgreementDocRoutes_1 = __importDefault(
  require("./routes/AgreementDocRoutes")
);
const LocationRoute_1 = __importDefault(require("./routes/LocationRoute"));
const JobTitleRoutes_1 = __importDefault(require("./routes/JobTitleRoutes"));
const EmploymentTypeRoutes_1 = __importDefault(
  require("./routes/EmploymentTypeRoutes")
);
const GroupRoutes_1 = __importDefault(require("./routes/GroupRoutes"));
const JobListingRoutes_1 = __importDefault(
  require("./routes/JobListingRoutes")
);
const ContactRoutes_1 = __importDefault(require("./routes/ContactRoutes"));
const express_winston_1 = __importDefault(require("express-winston"));
const logger_1 = __importDefault(require("./utils/logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../swagger");
dotenv_1.default.config();
data_source_1.AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established successfully.");
    const app = (0, express_1.default)();
    const isLocal = process.env.NODE_ENV === "development";
    const port = process.env.PORT || 8100;
    const url = isLocal ? process.env.LOCAL_URL : process.env.REMOTE_URL;
    // Trust the proxy
    app.set("trust proxy", 1);
    // CORS Configuration
    app.use(
      (0, cors_1.default)({
        origin: [
          "http://localhost:3000", // React
          "http://localhost:8080", // Vue
          "http://localhost:4200", // Angular
          "http://localhost:5173", // Vite
          "http://localhost:5174",
          //   "https://coporasystem-fe.vercel.app", // Deployed Frontend
          //   "https://coporajobs.netlify.app",
          //   "https://staging-coporajobs.netlify.app",
          "https://copora-job-app-frontend.vercel.app",
        ],
        credentials: true, // Allow credentials
      })
    );
    // Handle OPTIONS preflight requests
    app.options(
      "*",
      (0, cors_1.default)({
        origin: [
          "http://localhost:3000",
          "http://localhost:8080",
          "http://localhost:4200",
          "http://localhost:5173",
          "http://localhost:5174",
          //   "https://coporasystem-fe.vercel.app", // Deployed Frontend
          //   "https://coporajobs.netlify.app",
          //   "https://staging-coporajobs.netlify.app",
          "https://copora-job-app-frontend.vercel.app",
        ],
        credentials: true,
      })
    );
    app.use(express_1.default.json());
    // Apply the rate limiter globally
    app.use(rateLimiter_1.default);
    // Request logging with Winston
    app.use(
      express_winston_1.default.logger({
        winstonInstance: logger_1.default,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        colorize: false,
        ignoreRoute: function (req, res) {
          return false;
        },
      })
    );
    // API routes
    app.use(`/users`, UserRoutes_1.default);
    app.use(`/applicant`, ApplicationRoutes_1.default);
    app.use(`/auth/users`, UsersPrivateRoutes_1.default);
    app.use(`/bulk-email`, BulkEmailRoutes_1.default);
    app.use(`/agreement-consent`, AgreementConsentRoutes_1.default);
    app.use(`/application`, ApplicationRoutes_2.default);
    app.use(`/bank-details`, BankDetailsRoutes_1.default);
    app.use(`/contact-details`, ContactDetailsRoutes_1.default);
    app.use(`/next-of-kin`, NextOfKinRoutes_1.default);
    app.use(`/general-info`, GeneralInfoRoutes_1.default);
    app.use(`/educational-details`, EducationalDetailsRoutes_1.default);
    app.use(
      `/food-safety-questionnaire`,
      FoodSafetyQuestionnaireRoutes_1.default
    );
    app.use(`/licensing-regulation`, FoodSafetyQuestionnaireRoutes_1.default);
    app.use(`/health-and-disability`, HealthAndDisabilityRoutes_1.default);
    app.use(
      `/agreement-to-report-infection`,
      AgreementToReportInfection_1.default
    );
    app.use(`/personal-details`, personalDetailsRoutes_1.default);
    app.use(`/professional-details`, ProfessionalDetailsRoutes_1.default);
    app.use(`/reference`, ReferenceRoutes_1.default);
    app.use(`/reminders`, ReminderRoutes_1.default);
    app.use("/agreements", AgreementDocRoutes_1.default);
    app.use("/api/locations", LocationRoute_1.default);
    app.use("/api/job-titles", JobTitleRoutes_1.default);
    app.use("/api/employment-types", EmploymentTypeRoutes_1.default);
    app.use("/api/groups", GroupRoutes_1.default);
    app.use("/api/contact", ContactRoutes_1.default);
    app.use("/api/job-listings", JobListingRoutes_1.default);
    // Swagger setup
    app.use(
      "/api-docs",
      swagger_ui_express_1.default.serve,
      swagger_ui_express_1.default.setup(swagger_1.swaggerSpec)
    );
    // Error logging with Winston
    // app.use(expressWinston.errorLogger({
    //   winstonInstance: logger
    // }));
    // Global error handler
    app.use((err, req, res, next) => {
      res.header(
        "Access-Control-Allow-Origin",
        "https://coporasystem-fe.vercel.app"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
    app.listen(port, () => {
      console.log(`Server is running at ${url}`);
      console.log(`Swagger UI is available at ${url}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
