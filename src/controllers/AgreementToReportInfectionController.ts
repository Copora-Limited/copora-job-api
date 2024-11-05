import { Request, Response } from 'express';
import { HealthAndDisabilityService } from '../services/HealthAndDisabilityService';

export class AgreementToReportInfectionController {
    // Create or update a HealthAndDisability entry
    static async updateOrCreate(req: Request, res: Response) {
        try {
            const { applicationNo,  agreementToReportInfection } = req.body;

            // Check if applicationNo is provided
            if (!applicationNo) {
                return res.status(400).json({ statusCode: 400, message: 'Application number is required.' });
            }

           

            if (!agreementToReportInfection || agreementToReportInfection === null) {
                return res.status(400).json({ statusCode: 400, message: 'Please certify the agreement before you proceed' });
            }

            // Check if the HealthAndDisability with the given applicationNo exists
            const existingEntry = await HealthAndDisabilityService.getByApplicationNo(applicationNo);

            const dataToSave = {
                agreementToReportInfection,
                attempted: true, // Set `attempted` to true
            };
            if (existingEntry) {
                // If it exists, update the existing record
                const updatedEntry = await HealthAndDisabilityService.updateByApplicationNo(applicationNo, dataToSave);
                return res.status(200).send({ message: 'Health and Disability entry updated', data: updatedEntry });
            } else {
                // If it does not exist, create a new record
                const newEntry = await HealthAndDisabilityService.create(dataToSave);
                return res.status(201).send({ message: 'Health and Disability entry created', data: newEntry });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating Health and Disability entry', error: error.message });
        }
    }
    
}