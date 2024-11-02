import { Request, Response } from 'express';
import { HealthAndDisabilityService } from '../services/HealthAndDisabilityService';

export class HealthAndDisabilityController {
    // Create or update a HealthAndDisability entry
    static async createHealthAndDisability(req: Request, res: Response) {
        try {
            const { applicationNo, gpName, gpAddress, relevantHealthIssues, relevantHealthIssuesDetails, agreementCertification, ...otherFields } = req.body;

            // Validate applicationNo
            if (!applicationNo) {
                return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
            }

            // Validate required fields
            if (!gpName) {
                return res.status(400).json({ statusCode: 400, message: 'GP Name (Doctor) is required' });
            }
            if (!gpAddress) {
                return res.status(400).json({ statusCode: 400, message: 'GP Address is required' });
            }
            // console.log("otherFields", otherFields)


            // Check if the user specified details when relevantHealthIssues is true
            if (relevantHealthIssues && !relevantHealthIssuesDetails){
                return res.status(400).json({ statusCode: 400, message: 'Please provide details about health issues or a disability' });
            }

            // Check if the user specified details when majorIllnessTreatment is true
            if (otherFields.majorIllnessTreatment && !otherFields.majorIllnessDetails) {
                return res.status(400).json({ statusCode: 400, message: 'Please provide details about major illness treatment.' });
            }

            // Check if the user specified details when healthRelatedAbsences is true
            if (otherFields.healthRelatedAbsences && !otherFields.healthRelatedAbsencesDetails) {
                return res.status(400).json({ statusCode: 400, message: 'Please provide details about health-related absences.' });
            }

            // // Check if the user specified details when currentMedications is true
            if (otherFields.currentMedications && !otherFields.medicationDetails) {
                return res.status(400).json({ statusCode: 400, message: 'Please provide details about current medications.' });
            }

            if (otherFields.physicalLimitations && !otherFields.limitationsDetails) {
                return res.status(400).json({ statusCode: 400, message: 'Please provide details limitaion.' });
            }

            if (otherFields.colorVisionDefects && !otherFields.colorVisionDefectsDetails) {
                return res.status(400).json({ statusCode: 400, message: 'Please provide details about color vision defection.' });
            }

            if (!agreementCertification) {
                return res.status(400).json({ statusCode: 400, message: 'Please certify the agreement before proceeding.' });
            }

            // Check if the HealthAndDisability with the given applicationNo exists
            const existingEntry = await HealthAndDisabilityService.getByApplicationNo(applicationNo);

            // Add attempted: true to the data being saved
            const dataToSave = {
                gpName,
                gpAddress,
                relevantHealthIssues,
                relevantHealthIssuesDetails,
                agreementCertification,
                agreementToReportInfection: true,
                ...otherFields,
                applicationNo,
                attempted: true, // Set attempted to true
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
    

    // Get HealthAndDisability entry by applicationNo
    static async getHealthAndDisabilityByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const entry = await HealthAndDisabilityService.getByApplicationNo(applicationNo);
            if (!entry) {
                // return res.status(404).send({ message: 'Health and Disability entry not found' });
                return res.status(200).send([]);

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
