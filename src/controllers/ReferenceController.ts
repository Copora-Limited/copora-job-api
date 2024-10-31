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

            // Process and validate each reference entry
            const entries = Object.values(references).filter(value => typeof value === 'object' && value !== null) as Record<string, any>[];
            if (entries.length === 0) {
                return res.status(400).json({ statusCode: 400, message: 'No valid reference entries provided' });
            }

            const updatedEntries: any[] = [];
            const newEntries: any[] = [];

            for (const entry of entries) {
                if (entry && typeof entry === 'object') {
                    const {
                        employerName,
                        jobTitle,
                        contactName,
                        phone,
                        email,
                        startDate,
                        endDate,
                        ...restOfEntry
                    } = entry;

                    // Validate required fields
                    if (!employerName) {
                        return res.status(400).json({ statusCode: 400, message: 'Employer Name is required' });
                    }
                    if (!jobTitle) {
                        return res.status(400).json({ statusCode: 400, message: 'Job Title is required' });
                    }
                    if (!contactName) {
                        return res.status(400).json({ statusCode: 400, message: 'Contact Name is required' });
                    }
                    if (!phone) {
                        return res.status(400).json({ statusCode: 400, message: 'Phone Number is required' });
                    }
                    if (!email) {
                        return res.status(400).json({ statusCode: 400, message: 'Email is required' });
                    }
                    if (!startDate) {
                        return res.status(400).json({ statusCode: 400, message: 'Start Date is required' });
                    }
                    if (!endDate) {
                        return res.status(400).json({ statusCode: 400, message: 'End Date is required' });
                    }

                    // Ensure startDate is not greater than endDate
                    if (new Date(startDate) > new Date(endDate)) {
                        return res.status(400).json({ statusCode: 400, message: 'Start Date cannot be later than End Date' });
                    }
                    // Check for existing reference by phone
                    const existingReference = await ReferenceService.findByApplicationNoAndPhone(applicationNo, phone, email);

                    if (existingReference) {
                        // Update existing reference with attempted: true
                        await ReferenceService.update(existingReference.id, {
                            ...restOfEntry,
                            attempted: true,
                            applicationNo,
                        });
                        updatedEntries.push({ ...existingReference, ...restOfEntry, attempted: true });
                    } else {
                        // Create new reference with attempted: true
                        const newReference = await ReferenceService.create({
                            applicationNo,
                            attempted: true,
                            ...entry,
                        });
                        newEntries.push(newReference);
                    }
                }
            }

            return res.status(200).json({
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
            
            // If no reference is found, return an empty array with a 200 status
            if (!reference) {
                return res.status(200).send([]);
            }
    
            res.status(200).send(reference);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching reference', error: error.message });
        }
    }
    

    // Update Reference by applicationNo
    static async updateReferenceById(req: Request, res: Response) {
        try {
            const { id } = req.params;
    
            const updatedReference = await ReferenceService.update(Number(id), req.body);
            if (!updatedReference) {
                return res.status(404).send({ message: 'Reference not found' });
            }
            res.status(200).send({ message: 'Reference updated successfully', data: updatedReference });
        } catch (error) {
            res.status(400).send({ message: 'Error updating reference', error: error.message });
        }
    }
    

    // Delete Reference by applicationNo
    static async deleteReferenceByNoAndId(req: Request, res: Response) {
        try {
            const { applicationNo, id } = req.params;  // Extract applicationNo and id from request params
            const message = await ReferenceService.deleteByApplicationNoAndId(applicationNo, parseInt(id));
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
    
}
