import { Request, Response } from 'express';
import { ApplicationService } from '../services/ApplicationService';

export class OnboardingController {
    private applicationService = new ApplicationService();

    // async startOnboarding(req: Request, res: Response) {
    //     try {
    //         const application = await this.applicationService.createApplication();
    //         res.status(200).send({ applicationNo: application.applicationNo });
    //     } catch (error) {
    //         res.status(500).send({ message: 'Error starting onboarding process', error });
    //     }
    // }
}
