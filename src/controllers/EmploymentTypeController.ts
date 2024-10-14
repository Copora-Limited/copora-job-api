import { Request, Response } from 'express';
import { EmploymentTypeService } from '../services/EmploymentTypeService';

const employmentTypeService = new EmploymentTypeService();

export class EmploymentTypeController {
    async getAll(req: Request, res: Response) {
        const employmentTypes = await employmentTypeService.getAll();
        res.json(employmentTypes);
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const employmentType = await employmentTypeService.getById(id);
        if (employmentType) {
            res.json(employmentType);
        } else {
            res.status(404).json({ message: 'Employment Type not found' });
        }
    }

    async create(req: Request, res: Response) {
        const employmentTypeData = req.body;
        const newEmploymentType = await employmentTypeService.create(employmentTypeData);
        res.status(201).json(newEmploymentType);
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const employmentTypeData = req.body;
        const updatedEmploymentType = await employmentTypeService.update(id, employmentTypeData);
        if (updatedEmploymentType) {
            res.json(updatedEmploymentType);
        } else {
            res.status(404).json({ message: 'Employment Type not found' });
        }
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await employmentTypeService.delete(id);
        res.status(204).send();
    }
}
