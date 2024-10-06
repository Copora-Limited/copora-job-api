"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingController = void 0;
const ApplicationService_1 = require("../services/ApplicationService");
class OnboardingController {
    constructor() {
        this.applicationService = new ApplicationService_1.ApplicationService();
        // async startOnboarding(req: Request, res: Response) {
        //     try {
        //         const application = await this.applicationService.createApplication();
        //         res.status(200).send({ applicationNo: application.applicationNo });
        //     } catch (error) {
        //         res.status(500).send({ message: 'Error starting onboarding process', error });
        //     }
        // }
    }
}
exports.OnboardingController = OnboardingController;
