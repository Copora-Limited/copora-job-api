import { Request, Response } from 'express';
import { JobListingService } from '../services/JobListingService';
import { UserService } from '../services/UserService';
import { OnboardingStatus, UserRole } from '../constants';


export class JobListingController {
    // Create a new Job Title
    // static async create(req: Request, res: Response) {
    //     const { applicationNo } = req.body;


    //     const existingApplicant = await UserService.findApplicationNo(applicationNo);

    //     if (!existingApplicant) {
    //         res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
    //         return;
    //     }

    //   const existingEntry = await JobListingService.findByApplicationNo(applicationNo);

    //     try {
    //         const jobListingData = req.body;
    //         const newJobList = await JobListingService.create(jobListingData);
    //         res.status(201).json(newJobList);
    //     } catch (error) {
    //         res.status(400).send({ message: 'Error creating job title', error: error.message });
    //     }
    // }

    static async create(req: Request, res: Response) {
        const { applicationNo } = req.body;
    
        try {
            // Check if the applicant exists
            const existingApplicant = await UserService.findApplicationNo(applicationNo);
    
            if (!existingApplicant) {
                res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                return;
            }
    
            // Check if the applicant has an existing entry in JobListings
            const existingEntry = await JobListingService.findByApplicationNo(applicationNo);
    
            if (existingEntry) {
                // If the entry already exists, update the job listing or onboarding status
                const updatedJobList = await JobListingService.update(existingEntry.id, req.body);
                await UserService.updateOnboardingStatus(applicationNo, OnboardingStatus.Approved);  // Update the applicant's onboarding status
                res.status(200).json({ message: 'Job listing updated and applicant status approved', updatedJobList });
                return;
            }
    
            // If no existing entry found, create a new job listing
            const jobListingData = req.body;
            const newJobList = await JobListingService.create(jobListingData);
    
            // After creating the job listing, update the user's onboarding status
            await UserService.updateOnboardingStatus(applicationNo, OnboardingStatus.Approved);
    
            res.status(201).json({ message: 'New job listing created and applicant status approved', newJobList });
    
        } catch (error) {
            res.status(400).send({ message: 'Error processing request', error: error.message });
        }
    }
    

    // Get all Job Titles
    static async getAll(req: Request, res: Response) {
        try {
            const jobListing = await JobListingService.getAll();
            res.status(200).json(jobListing);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching job titles', error: error.message });
        }
    }

    // Get Job Title by ID
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numericId = parseInt(id, 10);

            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const jobList = await JobListingService.getById(numericId);
            if (!jobList) {
                return res.status(404).send({ message: 'Job Title not found' });
            }
            res.status(200).send(jobList);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching job title', error: error.message });
        }
    }

    // Update Job Title by ID
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numericId = parseInt(id, 10);

            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const updatedJobList = await JobListingService.update(numericId, req.body);
            if (!updatedJobList) {
                return res.status(404).send({ message: 'Job Title not found' });
            }

            res.status(200).send(updatedJobList);
        } catch (error) {
            res.status(400).send({ message: 'Error updating job title', error: error.message });
        }
    }

    // Delete Job Title by ID
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const numericId = parseInt(id, 10);

            // Check if the id is a valid number
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            await JobListingService.delete(numericId);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(404).send({ message: 'Job Title not found', error: error.message });
        }
    }
}
