import { Request, Response } from 'express';
import { JobTitleService } from '../services/JobTitleService';

export class JobTitleController {
    // Create a new Job Title
    static async create(req: Request, res: Response) {
        try {
            const jobTitlesData = req.body; // Expecting an array of job title data
            const newJobTitles = [];
    
            for (const jobTitleData of jobTitlesData) {
                // Check if the job title already exists by name
                const existingJobTitle = await JobTitleService.getByName(jobTitleData.name);
    
                if (existingJobTitle) {
                    // If it exists, throw an error
                    throw new Error(`Record already exists for job title: ${jobTitleData.name}`);
                }
    
                // If it doesn't exist, create a new one
                const newJobTitle = await JobTitleService.create(jobTitleData);
                newJobTitles.push(newJobTitle);
            }
    
            res.status(201).json(newJobTitles); // Return the newly created job titles
        } catch (error) {
            res.status(400).send({ message: 'Error creating job titles', error: error.message });
        }
    }
    

    // Get all Job Titles
    static async getAll(req: Request, res: Response) {
        try {
            const jobTitles = await JobTitleService.getAll();
            res.status(200).json(jobTitles);
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

            const jobTitle = await JobTitleService.getById(numericId);
            if (!jobTitle) {
                return res.status(404).send({ message: 'Job Title not found' });
            }
            res.status(200).send(jobTitle);
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

            const updatedJobTitle = await JobTitleService.update(numericId, req.body);
            if (!updatedJobTitle) {
                return res.status(404).send({ message: 'Job Title not found' });
            }

            res.status(200).send(updatedJobTitle);
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

            await JobTitleService.delete(numericId);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(404).send({ message: 'Job Title not found', error: error.message });
        }
    }
}
