import { Request, Response } from 'express';
import { ProfessionalDetailsService } from '../services/ProfessionalDetailsService';
import { UserService } from '../services/UserService';

export class ProfessionalDetailsController {
    // Create or update ProfessionalDetails
    static async createProfessionalDetails(req: Request, res: Response) {
        try {
            const { applicationNo, ...professionalDetails } = req.body;
    
            // Validate applicationNo
            if (!applicationNo) {
                return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
            }
    
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
    
            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }
    
            // Ensure professionalDetails is in the correct format
            if (typeof professionalDetails !== 'object' || Array.isArray(professionalDetails)) {
                return res.status(400).json({ statusCode: 400, message: 'Invalid professional details format' });
            }
    
            // Process and save each entry in the professionalDetails
            const entries = Object.values(professionalDetails).filter(value => typeof value === 'object' && value !== null) as Record<string, any>[];
            if (entries.length === 0) {
                return res.status(400).json({ statusCode: 400, message: 'No valid professional details provided' });
            }
    
            const updatedEntries = [];
            const newEntries = [];
    
            for (const entry of entries) {
                if (entry && typeof entry === 'object') {
                    const { referenceContactPhone, ...restOfEntry } = entry;
    
                    if (!referenceContactPhone) {
                        return res.status(400).json({ statusCode: 400, message: 'Reference contact phone is required' });
                    }
    
                    const existingEntry = await ProfessionalDetailsService.findByReferenceContactPhone(referenceContactPhone);
    
                    if (existingEntry) {
                        // Update existing entry
                        await ProfessionalDetailsService.update(existingEntry.id, {
                            ...restOfEntry,
                            applicationNo
                        });
                        updatedEntries.push({ ...existingEntry, ...restOfEntry });
                    } else {
                        // Create new entry
                        const newEntry = await ProfessionalDetailsService.create({
                            applicationNo,
                            ...entry
                        });
                        newEntries.push(newEntry);
                    }
                }
            }
    
            return res.status(201).json({
                message: 'Professional details processed',
                data: { updatedEntries, newEntries }
            });
    
        } catch (error) {
            console.error('Error creating or updating professional details:', error);
            res.status(500).json({ message: 'Error creating or updating professional details', error: error.message });
        }
    }
    

    // Get ProfessionalDetails by applicationNo
    static async getProfessionalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const entry = await ProfessionalDetailsService.getByApplicationNo(applicationNo);
            if (!entry) {
                return res.status(404).send({ message: 'Professional details not found' });
            }
            res.status(200).send(entry);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching professional details', error: error.message });
        }
    }

    // Update ProfessionalDetails by applicationNo
    static async updateProfessionalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEntry = await ProfessionalDetailsService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedEntry) {
                return res.status(404).send({ message: 'Professional details not found' });
            }
            res.status(200).send(updatedEntry);
        } catch (error) {
            res.status(400).send({ message: 'Error updating professional details', error: error.message });
        }
    }

    // Delete ProfessionalDetails by applicationNo
    static async deleteProfessionalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await ProfessionalDetailsService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
