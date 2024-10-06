import { Request, Response } from 'express';
import { EducationalDetailsService } from '../services/EducationalDetailsService';
import { UserService } from '../services/UserService';

export class EducationalDetailsController {
    // private static educationalDetailsService = new EducationalDetailsService();

    // Create or update educational details based on applicationNo
    static async createEducationalDetails(req: Request, res: Response) {
        try {
            const { applicationNo, ...educationalDetails } = req.body;
    
            // Validate applicationNo
            if (!applicationNo) {
                return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
            }
    
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
    
            if (!existingApplicant) {
                return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
            }
    
            // Process each entry
            const updatedEntries = [];
            const newEntries = [];
    
            for (const key in educationalDetails) {
                const entry = educationalDetails[key];
    
                if (entry && typeof entry === 'object') {
                    const { courseOfStudy, ...restOfEntry } = entry;
    
                    if (!courseOfStudy) {
                        return res.status(400).json({ statusCode: 400, message: 'Course of study is required' });
                    }
    
                    const existingEntry = await EducationalDetailsService.findByApplicationNoAndCourseOfStudy(applicationNo, courseOfStudy);
    
                    if (existingEntry) {
                        // Update existing entry
                        await EducationalDetailsService.update(existingEntry.id, {
                            ...restOfEntry,
                            applicationNo
                        });
                        updatedEntries.push({ ...existingEntry, ...restOfEntry });
                    } else {
                        // Create new entry
                        const newEntry = await EducationalDetailsService.create({
                            applicationNo,
                            ...entry
                        });
                        newEntries.push(newEntry);
                    }
                }
            }
    
            return res.status(201).json({
                message: 'Educational details processed',
                data: { updatedEntries, newEntries }
            });
    
        } catch (error) {
            console.error('Error creating or updating educational details:', error);
            return res.status(500).json({ message: 'Error creating or updating educational details', error: error.message });
        }
    }
    
    

    // Get Educational Details by applicationNo
    static async getEducationalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const educationalDetails = await EducationalDetailsService.getEducationalDetailsByApplicationNo(applicationNo);
            if (!educationalDetails) {
                return res.status(404).send({ message: 'Educational Details not found' });
            }
            res.status(200).send(educationalDetails);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching educational details', error: error.message });
        }
    }

    // Update Educational Details by applicationNo
    static async updateEducationalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const updatedEducationalDetails = await EducationalDetailsService.updateEducationalDetailsByApplicationNo(applicationNo, req.body);
            if (!updatedEducationalDetails) {
                return res.status(404).send({ message: 'Educational Details not found' });
            }
            res.status(200).send(updatedEducationalDetails);
        } catch (error) {
            res.status(400).send({ message: 'Error updating educational details', error: error.message });
        }
    }

    // Delete Educational Details by applicationNo
    static async deleteEducationalDetailsByNo(req: Request, res: Response) {
        try {
            const { applicationNo } = req.params;
            const message = await EducationalDetailsService.deleteEducationalDetailsByApplicationNo(applicationNo);
            res.status(200).send({ message });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }
}
