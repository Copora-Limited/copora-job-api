import { Request, Response } from 'express';
import { ReferenceService } from '../services/ReferenceService';
import { UserService } from '../services/UserService';

export class ReferenceController {
    // Create or update Reference
    static async createOrUpdateReferences(req: Request, res: Response) {
        try {
            const { applicationNo, ...references } = req.body;
    
            // Validate applicationNo
            if (!applicationNo) {
                return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
            }
    
            // Check if the applicant exists
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }
    
            // Ensure references are in the correct format
            if (typeof references !== 'object' || Array.isArray(references)) {
                return res.status(400).json({ statusCode: 400, message: 'Invalid references format' });
            }
    
            // Process and save each reference entry
            const entries = Object.values(references).filter(value => typeof value === 'object' && value !== null) as Record<string, any>[];
            if (entries.length === 0) {
                return res.status(400).json({ statusCode: 400, message: 'No valid reference entries provided' });
            }
    
            const updatedEntries: any[] = [];
            const newEntries: any[] = [];
    
            for (const entry of entries) {
                if (entry && typeof entry === 'object') {
                    const { phone, ...restOfEntry } = entry;
    
                    if (!phone) {
                        return res.status(400).json({ statusCode: 400, message: 'Reference contact phone is required' });
                    }
    
                    const existingReference = await ReferenceService.findByApplicationNoAndPhone(applicationNo, phone);
    
                    if (existingReference) {
                        // Update existing reference
                        await ReferenceService.update(existingReference.id, {
                            ...restOfEntry,
                            applicationNo
                        });
                        updatedEntries.push({ ...existingReference, ...restOfEntry });
                    } else {
                        // Create new reference
                        const newReference = await ReferenceService.create({
                            applicationNo, 
                            ...entry
                        });
                        newEntries.push(newReference);
                    }
                }
            }
    
            return res.status(201).json({
                message: 'Reference details processed successfully',
                data: { updatedEntries, newEntries }
            });
    
        } catch (error) {
            console.error('Error creating or updating reference details:', error);
            res.status(500).json({ message: 'Error creating or updating reference details', error: error.message });
        }
    }
    
    

    // Get Reference by applicationNo
    static async getReferenceByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const reference = await ReferenceService.getByApplicationNo(applicationNo);
            if (!reference) {
                return res.status(404).send({ message: 'Reference not found' });
            }
            res.status(200).send(reference);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching reference', error: error.message });
        }
    }

    // Update Reference by applicationNo
    static async updateReferenceByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            
            const updatedReference = await ReferenceService.updateByApplicationNo(applicationNo, req.body);
            if (!updatedReference) {
                return res.status(404).send({ message: 'Reference not found' });
            }
            res.status(200).send({ message: 'Reference created successfully', data: updatedReference});
        } catch (error) {
            res.status(400).send({ message: 'Error updating reference', error: error.message });
        }
    }

    // Delete Reference by applicationNo
    static async deleteReferenceByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await ReferenceService.deleteByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
