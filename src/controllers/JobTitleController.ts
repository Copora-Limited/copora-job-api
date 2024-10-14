import { Request, Response } from 'express';
import { JobTitleService } from '../services/JobTitleService';

const jobTitleService = new JobTitleService();

export class JobTitleController {
    async getAll(req: Request, res: Response) {
        const jobTitles = await jobTitleService.getAll();
        res.json(jobTitles);
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const jobTitle = await jobTitleService.getById(id);
        if (jobTitle) {
            res.json(jobTitle);
        } else {
            res.status(404).json({ message: 'Job Title not found' });
        }
    }

    async create(req: Request, res: Response) {
        const jobTitleData = req.body;
        const newJobTitle = await jobTitleService.create(jobTitleData);
        res.status(201).json(newJobTitle);
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const jobTitleData = req.body;
        const updatedJobTitle = await jobTitleService.update(id, jobTitleData);
        if (updatedJobTitle) {
            res.json(updatedJobTitle);
        } else {
            res.status(404).json({ message: 'Job Title not found' });
        }
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await jobTitleService.delete(id);
        res.status(204).send();
    }
}
