import { Request, Response } from 'express';
import { AgreementConsentService } from '../services/AgreementConsentService';
import { UserService } from '../services/UserService';
import {  sendOnboardingCompletionEmail } from '../lib/emailActions';
import { AgreementConsent } from '../entities/AgreementConsentEntity';
import { OnboardingStatus } from '../constants';

 
export class AgreementConsentController {
    // Create or update an AgreementConsent
    static async create(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;

            // Get the applicant's details by application number
            const existingApplicant = await UserService.findApplicationNo(applicationNo);

            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }

            // Check if the AgreementConsent with the given applicationNo exists
            const existingAgreementConsent = await AgreementConsentService.getByApplicationNo(applicationNo);

            let agreementConsent: AgreementConsent | AgreementConsent[];

            if (existingAgreementConsent) {
                // If it exists, update the existing record
                agreementConsent = await AgreementConsentService.updateByApplicationNo(applicationNo, req.body);
                res.status(200).send({ message: 'Agreement Consent updated', data: agreementConsent });
            } else {
                // If it does not exist, create a new record with attempted set to true
                const agreementConsentData = { ...req.body, attempted: true }; // Set attempted to true
                agreementConsent = await AgreementConsentService.create(agreementConsentData);
                res.status(201).send({ message: 'Agreement Consent created', data: agreementConsent });
            }

            // Update the user's onboarding status to "OnboardingCompleted"
            // existingApplicant.onboardingStatus = OnboardingStatus.OnboardingCompleted;
            await UserService.updateOnboardingStatus(applicationNo, OnboardingStatus.OnboardingCompleted);

            // Fetch the user's email and send the onboarding completion email
            const userEmail = existingApplicant.email;
            const emailData = {
                firstName: existingApplicant.firstName,
                email: userEmail,
            };
            await sendOnboardingCompletionEmail(emailData);

        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating Agreement Consent', error: error.message });
        }
    }

    // Get AgreementConsent by applicationNo
    static async getAgreementConsentByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const agreementConsent = await AgreementConsentService.getByApplicationNo(applicationNo);
            if (!agreementConsent) {
                return res.status(404).send({ message: 'Agreement Consent not found' });
            }
            res.status(200).send(agreementConsent);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching Agreement Consent', error: error.message });
        }
    }

    // Update AgreementConsent by applicationNo
    static async updateAgreementConsentByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedAgreementConsent = await AgreementConsentService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedAgreementConsent) {
                return res.status(404).send({ message: 'Agreement Consent not found' });
            }
            res.status(200).send(updatedAgreementConsent);
        } catch (error) {
            res.status(400).send({ message: 'Error updating Agreement Consent', error: error.message });
        }
    }

    // Delete AgreementConsent by applicationNo
    static async deleteAgreementConsentByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await AgreementConsentService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
