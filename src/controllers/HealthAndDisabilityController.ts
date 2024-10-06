import { Request, Response } from 'express';
import { HealthAndDisabilityService } from '../services/HealthAndDisabilityService';

export class HealthAndDisabilityController {
    // Create or update a HealthAndDisability entry
    static async createHealthAndDisability(req: Request, res: Response) {
        try {
            const { applicationNo } = req.body;

            // Check if the HealthAndDisability with the given applicationNo exists
            const existingEntry = await HealthAndDisabilityService.getByApplicationNo(applicationNo);

            if (existingEntry) {
                // If it exists, update the existing record
                const updatedEntry = await HealthAndDisabilityService.updateByApplicationNo(applicationNo, req.body);
                return res.status(200).send({ message: 'Health and Disability entry updated', data: updatedEntry });
            } else {
                // If it does not exist, create a new record
                const newEntry = await HealthAndDisabilityService.create(req.body);
                return res.status(201).send({ message: 'Health and Disability entry created', data: newEntry });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error creating or updating Health and Disability entry', error: error.message });
        }
    }

    // Get HealthAndDisability entry by applicationNo
    static async getHealthAndDisabilityByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const entry = await HealthAndDisabilityService.getByApplicationNo(applicationNo);
            if (!entry) {
                return res.status(404).send({ message: 'Health and Disability entry not found' });
            }
            res.status(200).send(entry);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching Health and Disability entry', error: error.message });
        }
    }

    // Update HealthAndDisability entry by applicationNo
    static async updateHealthAndDisabilityByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEntry = await HealthAndDisabilityService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedEntry) {
                return res.status(404).send({ message: 'Health and Disability entry not found' });
            }
            res.status(200).send(updatedEntry);
        } catch (error) {
            res.status(400).send({ message: 'Error updating Health and Disability entry', error: error.message });
        }
    }

    // Delete HealthAndDisability entry by applicationNo
    static async deleteHealthAndDisabilityByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await HealthAndDisabilityService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
